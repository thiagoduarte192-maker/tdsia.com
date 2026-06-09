import { NextResponse } from "next/server";
import { getPaymentClient } from "@/lib/mp";
import {
  ativarPagamentoAprovado,
  encontrarCobrancaPorExternalReference,
  marcarCobrancaComoFalha,
} from "@/lib/mp/ativar-pagamento";

export const runtime = "nodejs";

/**
 * Webhook do Mercado Pago.
 * Documentação: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 *
 * MP envia POST com body assim:
 *   { id: "12345", live_mode: false, type: "payment", action: "payment.created", data: { id: "9876" }, ... }
 *
 * Estratégia:
 *   1. Recebe notificação com payment_id
 *   2. Busca o payment completo via API (não confia no body)
 *   3. Identifica a cobrança pelo external_reference (aceite-{id})
 *   4. Atualiza cobrança + ativa pagamento (cria contrato, marca aceite como pago)
 *
 * Idempotente: pode ser chamado várias vezes pra mesma payment.
 */
export async function POST(request: Request) {
  let body: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    body = await request.json();
  } catch {
    // Mercado Pago às vezes manda querystring sem body em pings; ignora
  }

  const tipo = body.type ?? new URL(request.url).searchParams.get("type") ?? "";
  const dataId =
    body.data?.id ??
    new URL(request.url).searchParams.get("data.id") ??
    new URL(request.url).searchParams.get("id");

  // Aceita apenas notificações de payment
  if (tipo !== "payment" || !dataId) {
    return NextResponse.json({ ignored: true, reason: "not a payment event" });
  }

  try {
    // Busca o payment completo pelo ID
    const payment = await getPaymentClient().get({ id: String(dataId) });

    const externalRef = payment.external_reference ?? "";
    const cobranca = await encontrarCobrancaPorExternalReference(externalRef);

    if (!cobranca) {
      console.warn(
        "[MP Webhook] cobrança não encontrada para payment",
        payment.id,
        "external_ref:",
        externalRef
      );
      return NextResponse.json({
        ok: false,
        error: "cobrança não encontrada",
      });
    }

    // Decide o que fazer com base no status
    if (payment.status === "approved") {
      const r = await ativarPagamentoAprovado(cobranca.id, {
        id: String(payment.id),
        status: payment.status,
        statusDetail: payment.status_detail ?? undefined,
        paymentMethodId: payment.payment_method_id ?? undefined,
        paymentTypeId: payment.payment_type_id ?? undefined,
        transactionAmount: payment.transaction_amount ?? undefined,
        dateApproved: payment.date_approved ?? undefined,
        installments: payment.installments ?? undefined,
        raw: payment,
      });

      return NextResponse.json({ ...r });
    }

    if (
      payment.status === "rejected" ||
      payment.status === "cancelled" ||
      payment.status === "refunded"
    ) {
      await marcarCobrancaComoFalha(
        cobranca.id,
        payment.status === "rejected" ? "rejeitada" : "cancelada",
        {
          mpPaymentId: String(payment.id),
          mpStatus: payment.status,
          mpStatusDetail: payment.status_detail ?? undefined,
          raw: payment,
        }
      );
      return NextResponse.json({ ok: true, status: payment.status });
    }

    // pending / in_process / authorized
    await marcarCobrancaComoFalha(cobranca.id, "pendente", {
      mpPaymentId: String(payment.id),
      mpStatus: payment.status ?? undefined,
      mpStatusDetail: payment.status_detail ?? undefined,
      raw: payment,
    });

    return NextResponse.json({ ok: true, status: payment.status ?? "pending" });
  } catch (e) {
    console.error("[MP Webhook] erro:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "erro" },
      { status: 500 }
    );
  }
}

// MP também pode pingar GET pra validar a URL
export async function GET() {
  return NextResponse.json({ ok: true, message: "MP webhook endpoint" });
}
