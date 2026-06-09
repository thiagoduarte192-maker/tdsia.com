"use server";

import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getPreferenceClient, getPublicBaseUrl } from "@/lib/mp";

export type CriarPreferenciaResult =
  | { ok: true; preferenceId: string; cobrancaId: number }
  | { ok: false; error: string };

export async function criarPreferenciaParaAceite(
  aceiteId: number
): Promise<CriarPreferenciaResult> {
  try {
    // 1) Busca aceite (fonte de verdade do valor)
    const [aceite] = await db
      .select()
      .from(schema.aceites)
      .where(eq(schema.aceites.id, aceiteId))
      .limit(1);

    if (!aceite) return { ok: false, error: "Aceite não encontrado." };
    if (aceite.status !== "pendente_pagamento") {
      return { ok: false, error: `Aceite com status '${aceite.status}'.` };
    }

    // 2) Reaproveita preference existente se já tem uma cobrança "criada"
    const cobrancasExistentes = await db
      .select()
      .from(schema.cobrancas)
      .where(eq(schema.cobrancas.aceiteId, aceiteId));

    const reaproveitavel = cobrancasExistentes.find(
      (c) => c.status === "criada" && c.mpPreferenceId
    );
    if (reaproveitavel?.mpPreferenceId) {
      return {
        ok: true,
        preferenceId: reaproveitavel.mpPreferenceId,
        cobrancaId: reaproveitavel.id,
      };
    }

    // 3) Cria a preference no MP
    const valor = Number(aceite.valorAceito);
    const baseUrl = getPublicBaseUrl();
    const preference = getPreferenceClient();

    const result = await preference.create({
      body: {
        items: [
          {
            id: `aceite-${aceite.id}`,
            title: `Proposta ${aceite.propostaNumero} — TDS Soluções Digitais`,
            description: `Aceite formal #${aceite.id} para ${aceite.nomeCompleto}`,
            category_id: "services",
            quantity: 1,
            unit_price: valor,
            currency_id: "BRL",
          },
        ],
        payer: {
          name: aceite.nomeCompleto,
          email: aceite.email,
          identification:
            aceite.tipoDocumento && aceite.documento
              ? {
                  type: aceite.tipoDocumento,
                  number: aceite.documento,
                }
              : undefined,
        },
        external_reference: `aceite-${aceite.id}`,
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
        back_urls: {
          success: `${baseUrl}/proposta/${aceite.propostaSlug}/sucesso?aceite=${aceite.id}`,
          pending: `${baseUrl}/proposta/${aceite.propostaSlug}/sucesso?aceite=${aceite.id}&status=pending`,
          failure: `${baseUrl}/proposta/${aceite.propostaSlug}/pagamento?aceite=${aceite.id}&status=failure`,
        },
        auto_return: "approved",
        payment_methods: {
          installments: Math.max(1, Math.min(12, aceite.numeroParcelas)),
          excluded_payment_types: [{ id: "ticket" }, { id: "atm" }],
        },
        statement_descriptor: "TDS Solucoes",
      },
    });

    if (!result.id) {
      return { ok: false, error: "Mercado Pago não retornou preference_id." };
    }

    // 4) Persiste cobrança
    const [cobranca] = await db
      .insert(schema.cobrancas)
      .values({
        aceiteId: aceite.id,
        metodo: "ambos",
        parcelas: aceite.numeroParcelas,
        valor: valor.toFixed(2),
        mpPreferenceId: result.id,
        status: "criada",
      })
      .returning({ id: schema.cobrancas.id });

    return {
      ok: true,
      preferenceId: result.id,
      cobrancaId: cobranca.id,
    };
  } catch (e) {
    console.error("[MP criarPreferenciaParaAceite] erro:", e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erro ao criar preferência",
    };
  }
}
