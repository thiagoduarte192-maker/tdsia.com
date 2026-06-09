"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db, schema } from "@/lib/db";
import { propostas } from "@/data/propostas";
import {
  apenasDigitos,
  validarDocumento,
  validarEmail,
} from "@/lib/validacao";

export type AceiteResult = { ok: true; aceiteId: number } | { ok: false; error: string };

const TERMOS_VERSAO = "v1.0 — 2026-06-09";

function montarTermosLiterais(propostaNumero: string, valor: number): string {
  const valorFmt = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `Termos de aceite da proposta ${propostaNumero} (${TERMOS_VERSAO})

1. Eu confirmo a contratação dos serviços descritos na proposta acima, no valor total de ${valorFmt}.
2. Reconheço que esta proposta é válida nas condições apresentadas em tdsia.com/proposta/{slug}.
3. Autorizo a TDS Soluções Digitais a iniciar a execução do projeto após a confirmação do pagamento inicial.
4. Para fins de LGPD, autorizo o armazenamento dos meus dados pessoais (nome, documento, e-mail, telefone) com a única finalidade de execução deste contrato e cumprimento de obrigações legais.
5. Os dados de pagamento (cartão) são processados diretamente pelo Mercado Pago e não são armazenados pela TDS.
6. A presente declaração é registrada com identificação eletrônica (IP, navegador, data/hora) como prova de consentimento.`;
}

export async function criarAceiteAction(
  formData: FormData
): Promise<AceiteResult> {
  const slug = String(formData.get("slug") ?? "").trim();
  const proposta = propostas[slug];
  if (!proposta) return { ok: false, error: "Proposta não encontrada." };

  const nomeCompleto = String(formData.get("nomeCompleto") ?? "").trim();
  const documentoRaw = String(formData.get("documento") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const telefoneRaw = String(formData.get("telefone") ?? "").trim();
  const numeroParcelas = Math.max(1, Math.min(12, Number(formData.get("numeroParcelas") ?? 1)));
  const concordou = formData.get("concordou") === "on";

  if (!nomeCompleto || nomeCompleto.split(" ").length < 2) {
    return { ok: false, error: "Informe seu nome completo." };
  }

  const doc = validarDocumento(documentoRaw);
  if (!doc.ok) {
    return { ok: false, error: "CPF ou CNPJ inválido." };
  }

  if (!validarEmail(email)) {
    return { ok: false, error: "E-mail inválido." };
  }

  if (!concordou) {
    return { ok: false, error: "Você precisa concordar com os termos para continuar." };
  }

  // Captura IP e User-Agent para registro LGPD
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    null;
  const userAgent = h.get("user-agent") ?? null;

  const termos = montarTermosLiterais(proposta.numero, proposta.preco);

  const [inserido] = await db
    .insert(schema.aceites)
    .values({
      propostaSlug: slug,
      propostaNumero: proposta.numero,
      nomeCompleto,
      tipoDocumento: doc.tipo,
      documento: apenasDigitos(documentoRaw),
      email,
      telefone: telefoneRaw ? apenasDigitos(telefoneRaw) : null,
      valorAceito: proposta.preco.toFixed(2),
      numeroParcelas,
      ip,
      userAgent,
      termosAceitos: termos,
      status: "pendente_pagamento",
    })
    .returning({ id: schema.aceites.id });

  redirect(`/proposta/${slug}/pagamento?aceite=${inserido.id}`);
}
