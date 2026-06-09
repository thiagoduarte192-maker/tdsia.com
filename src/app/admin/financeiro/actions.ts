"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

function parseValor(v: FormDataEntryValue | null): number {
  const s = String(v ?? "")
    .replace(/\s/g, "")
    .replace(/R\$/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export async function criarContrato(formData: FormData): Promise<ActionResult> {
  try {
    const clienteNome = String(formData.get("clienteNome") ?? "").trim();
    const clienteEmpresa = String(formData.get("clienteEmpresa") ?? "").trim();
    const clienteSlug = String(formData.get("clienteSlug") ?? "").trim();
    const projeto = String(formData.get("projeto") ?? "").trim();
    const valorTotal = parseValor(formData.get("valorTotal"));
    const metodo = String(formData.get("metodo") ?? "PIX") as
      | "PIX"
      | "Boleto"
      | "Cartão"
      | "Transferência";
    const diaVencimento = Number(formData.get("diaVencimento") ?? 0);
    const dataInicio = String(formData.get("dataInicio") ?? "").trim();
    const numeroParcelas = Number(formData.get("numeroParcelas") ?? 0);
    const observacoes = String(formData.get("observacoes") ?? "").trim();

    if (!clienteNome) return { ok: false, error: "Nome do cliente é obrigatório." };
    if (!projeto) return { ok: false, error: "Descrição do projeto é obrigatória." };
    if (!Number.isFinite(valorTotal) || valorTotal <= 0)
      return { ok: false, error: "Valor total inválido." };
    if (diaVencimento < 1 || diaVencimento > 31)
      return { ok: false, error: "Dia de vencimento deve ser entre 1 e 31." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataInicio))
      return { ok: false, error: "Data de início inválida (use AAAA-MM-DD)." };
    if (numeroParcelas < 1)
      return { ok: false, error: "Número de parcelas deve ser pelo menos 1." };

    await db.insert(schema.contratos).values({
      clienteNome,
      clienteEmpresa: clienteEmpresa || null,
      clienteSlug: clienteSlug || null,
      projeto,
      valorTotal: valorTotal.toFixed(2),
      metodo,
      diaVencimento,
      dataInicio,
      numeroParcelas,
      observacoes: observacoes || null,
    });

    revalidatePath("/admin/financeiro");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}

export async function marcarParcelaPaga(
  formData: FormData
): Promise<ActionResult> {
  try {
    const contratoId = Number(formData.get("contratoId"));
    const numero = Number(formData.get("numero"));
    const dataPagamento = String(formData.get("dataPagamento") ?? "").trim();
    const observacao = String(formData.get("observacao") ?? "").trim();

    if (!contratoId || !numero)
      return { ok: false, error: "Contrato/parcela inválido." };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataPagamento))
      return { ok: false, error: "Data inválida (use AAAA-MM-DD)." };

    const existente = await db
      .select()
      .from(schema.pagamentos)
      .where(
        and(
          eq(schema.pagamentos.contratoId, contratoId),
          eq(schema.pagamentos.numero, numero)
        )
      );

    if (existente.length > 0) {
      return { ok: false, error: "Essa parcela já foi marcada como paga." };
    }

    await db.insert(schema.pagamentos).values({
      contratoId,
      numero,
      dataPagamento,
      observacao: observacao || null,
    });

    revalidatePath("/admin/financeiro");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}

export async function removerPagamento(
  formData: FormData
): Promise<ActionResult> {
  try {
    const contratoId = Number(formData.get("contratoId"));
    const numero = Number(formData.get("numero"));

    if (!contratoId || !numero)
      return { ok: false, error: "Contrato/parcela inválido." };

    await db
      .delete(schema.pagamentos)
      .where(
        and(
          eq(schema.pagamentos.contratoId, contratoId),
          eq(schema.pagamentos.numero, numero)
        )
      );

    revalidatePath("/admin/financeiro");
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Erro desconhecido",
    };
  }
}
