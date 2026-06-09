import "server-only";
import { eq, and } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { propostas } from "@/data/propostas";

/**
 * Quando um pagamento é aprovado:
 * 1) Marca aceite como pago + cobrança como aprovada
 * 2) Cria contrato em /admin/financeiro (se ainda não existir)
 * 3) Cria a primeira parcela como paga
 *
 * Idempotente: pode ser chamado várias vezes pra mesma cobrança.
 */
export async function ativarPagamentoAprovado(
  cobrancaId: number,
  mpPayment: {
    id: string;
    status: string;
    statusDetail?: string;
    paymentMethodId?: string;
    paymentTypeId?: string;
    transactionAmount?: number;
    dateApproved?: string;
    installments?: number;
    raw?: unknown;
  }
): Promise<{ ok: boolean; criouContrato: boolean; contratoId?: number }> {
  const [cobranca] = await db
    .select()
    .from(schema.cobrancas)
    .where(eq(schema.cobrancas.id, cobrancaId))
    .limit(1);

  if (!cobranca) return { ok: false, criouContrato: false };

  // Atualiza dados do MP
  await db
    .update(schema.cobrancas)
    .set({
      mpPaymentId: mpPayment.id,
      mpStatus: mpPayment.status,
      mpStatusDetail: mpPayment.statusDetail ?? null,
      mpPayload: (mpPayment.raw ?? {}) as object,
      status: "aprovada",
      pagaEm: mpPayment.dateApproved
        ? new Date(mpPayment.dateApproved)
        : new Date(),
      updatedAt: new Date(),
    })
    .where(eq(schema.cobrancas.id, cobrancaId));

  const [aceite] = await db
    .select()
    .from(schema.aceites)
    .where(eq(schema.aceites.id, cobranca.aceiteId))
    .limit(1);

  if (!aceite) return { ok: false, criouContrato: false };

  // Marca aceite como pago (se ainda não está)
  if (aceite.status !== "pago") {
    await db
      .update(schema.aceites)
      .set({
        status: "pago",
        paidAt: new Date(),
      })
      .where(eq(schema.aceites.id, aceite.id));
  }

  // Verifica se já existe contrato pra esse aceite/slug
  const contratosExistentes = await db
    .select()
    .from(schema.contratos)
    .where(eq(schema.contratos.clienteSlug, aceite.propostaSlug));

  if (contratosExistentes.length > 0) {
    return {
      ok: true,
      criouContrato: false,
      contratoId: contratosExistentes[0].id,
    };
  }

  // Cria contrato novo
  const proposta = propostas[aceite.propostaSlug];
  const projeto =
    proposta?.subtituloHero ??
    `Plataforma Digital — Proposta ${aceite.propostaNumero}`;

  const valorTotal = Number(aceite.valorAceito);
  const dataPagamento = mpPayment.dateApproved
    ? new Date(mpPayment.dateApproved).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const ehPix = mpPayment.paymentTypeId === "bank_transfer";
  const metodoContrato = ehPix ? "PIX" : "Cartão";
  const parcelasContrato = mpPayment.installments ?? cobranca.parcelas ?? 1;

  const [contrato] = await db
    .insert(schema.contratos)
    .values({
      clienteSlug: aceite.propostaSlug,
      clienteNome: aceite.nomeCompleto,
      clienteEmpresa: proposta?.cliente.empresa ?? null,
      projeto,
      valorTotal: valorTotal.toFixed(2),
      metodo: metodoContrato,
      diaVencimento: new Date(dataPagamento).getUTCDate(),
      dataInicio: dataPagamento,
      numeroParcelas: parcelasContrato,
      status: "ativo",
      observacoes: `Aceite #${aceite.id} • MP Payment ${mpPayment.id}`,
    })
    .returning({ id: schema.contratos.id });

  // Cria a primeira parcela como paga (o cliente pagou pra esse aceite)
  await db.insert(schema.pagamentos).values({
    contratoId: contrato.id,
    numero: 1,
    dataPagamento,
    valor: (mpPayment.transactionAmount ?? valorTotal / parcelasContrato).toFixed(
      2
    ),
    metodo: metodoContrato,
    observacao: `Mercado Pago ${mpPayment.id} (${mpPayment.statusDetail ?? "aprovado"})`,
  });

  return { ok: true, criouContrato: true, contratoId: contrato.id };
}

export async function marcarCobrancaComoFalha(
  cobrancaId: number,
  status: "rejeitada" | "cancelada" | "pendente",
  payload: {
    mpPaymentId?: string;
    mpStatus?: string;
    mpStatusDetail?: string;
    raw?: unknown;
  }
) {
  await db
    .update(schema.cobrancas)
    .set({
      status,
      mpPaymentId: payload.mpPaymentId ?? null,
      mpStatus: payload.mpStatus ?? null,
      mpStatusDetail: payload.mpStatusDetail ?? null,
      mpPayload: (payload.raw ?? {}) as object,
      updatedAt: new Date(),
    })
    .where(eq(schema.cobrancas.id, cobrancaId));
}

export async function encontrarCobrancaPorPreference(preferenceId: string) {
  const rows = await db
    .select()
    .from(schema.cobrancas)
    .where(eq(schema.cobrancas.mpPreferenceId, preferenceId))
    .limit(1);
  return rows[0] ?? null;
}

export async function encontrarCobrancaPorExternalReference(
  externalReference: string
) {
  // formato: aceite-{id}
  const match = /^aceite-(\d+)$/.exec(externalReference);
  if (!match) return null;
  const aceiteId = Number(match[1]);

  const rows = await db
    .select()
    .from(schema.cobrancas)
    .where(eq(schema.cobrancas.aceiteId, aceiteId))
    .limit(1);
  return rows[0] ?? null;
}
