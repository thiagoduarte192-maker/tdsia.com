"use client";

import { useState, useTransition } from "react";
import {
  formatarDocumento,
  formatarTelefone,
  validarDocumento,
  validarEmail,
} from "@/lib/validacao";
import { criarAceiteAction } from "./actions";

export default function AceiteForm({
  slug,
  numero,
  valor,
  permiteParcelar,
}: {
  slug: string;
  numero: string;
  valor: number;
  permiteParcelar: boolean;
}) {
  const [erro, setErro] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [concordou, setConcordou] = useState(false);

  const docInfo = validarDocumento(documento);
  const emailOk = email === "" || validarEmail(email);
  const podeEnviar =
    nome.trim().split(" ").length >= 2 &&
    docInfo.ok &&
    validarEmail(email) &&
    concordou;

  const onSubmit = (fd: FormData) => {
    setErro(null);
    startTransition(async () => {
      const r = await criarAceiteAction(fd);
      if (!r.ok) setErro(r.error);
    });
  };

  const valorParcela = valor / parcelas;
  const valorFmt = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <form action={onSubmit} className="mt-6 space-y-5">
      <input type="hidden" name="slug" value={slug} />

      <section className="rounded-xl border border-tds-border bg-tds-panel p-5">
        <h2 className="text-base font-semibold text-white">Seus dados</h2>
        <p className="text-xs text-slate-500">
          Quem está aceitando a proposta {numero}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Nome completo</Label>
            <input
              name="nomeCompleto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoComplete="name"
              className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
              placeholder="Como aparece nos documentos"
            />
          </div>

          <div>
            <Label>CPF ou CNPJ</Label>
            <input
              name="documento"
              value={documento}
              onChange={(e) => setDocumento(formatarDocumento(e.target.value))}
              required
              inputMode="numeric"
              autoComplete="off"
              className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
              placeholder="000.000.000-00"
            />
            {documento && (
              <p
                className={`mt-1 text-[10px] ${
                  docInfo.ok ? "text-tds-green" : "text-amber-300"
                }`}
              >
                {docInfo.tipo} {docInfo.ok ? "válido ✓" : "incompleto/inválido"}
              </p>
            )}
          </div>

          <div>
            <Label>Telefone / WhatsApp</Label>
            <input
              name="telefone"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              autoComplete="tel"
              inputMode="numeric"
              className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
              placeholder="(21) 99999-9999"
            />
          </div>

          <div className="sm:col-span-2">
            <Label>E-mail</Label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
              placeholder="seu@email.com"
            />
            {email && !emailOk && (
              <p className="mt-1 text-[10px] text-amber-300">
                Formato de e-mail inválido
              </p>
            )}
          </div>
        </div>
      </section>

      {permiteParcelar && (
        <section className="rounded-xl border border-tds-border bg-tds-panel p-5">
          <h2 className="text-base font-semibold text-white">
            Como você prefere pagar?
          </h2>
          <p className="text-xs text-slate-500">
            Você escolhe o método (PIX ou Cartão) e o número de parcelas no
            próximo passo. Aqui você adianta a quantidade de parcelas no
            cartão, se for usar.
          </p>

          <div className="mt-3">
            <Label>Parcelas no cartão</Label>
            <select
              name="numeroParcelas"
              value={parcelas}
              onChange={(e) => setParcelas(Number(e.target.value))}
              className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const n = i + 1;
                const valorP = valor / n;
                return (
                  <option key={n} value={n}>
                    {n}x de{" "}
                    {valorP.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    {n === 1 ? " à vista" : ""}
                  </option>
                );
              })}
            </select>
            <p className="mt-2 text-xs text-slate-500">
              Se escolher PIX no próximo passo, o valor é único:{" "}
              <strong className="text-tds-green">{valorFmt}</strong>
            </p>
          </div>
        </section>
      )}

      <section className="rounded-xl border border-tds-border bg-tds-panel p-5">
        <h2 className="text-base font-semibold text-white">Termo de aceite</h2>

        <div className="mt-3 max-h-48 overflow-y-auto rounded-lg border border-tds-border bg-tds-bg/60 p-4 text-xs leading-relaxed text-slate-300">
          <p className="font-semibold text-tds-green-bright">
            Termos da proposta #{numero}
          </p>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4">
            <li>
              Eu confirmo a contratação dos serviços descritos na proposta
              acima, no valor total de <strong>{valorFmt}</strong>.
            </li>
            <li>
              Reconheço que esta proposta é válida nas condições apresentadas em{" "}
              <span className="font-mono text-tds-green">
                tdsia.com/proposta/{slug}
              </span>
              .
            </li>
            <li>
              Autorizo a TDS Soluções Digitais a iniciar a execução do projeto
              após a confirmação do pagamento inicial.
            </li>
            <li>
              Para fins de LGPD, autorizo o armazenamento dos meus dados
              pessoais (nome, documento, e-mail, telefone) com a única
              finalidade de execução deste contrato.
            </li>
            <li>
              Os dados de pagamento (cartão) são processados pelo Mercado Pago
              e não são armazenados pela TDS.
            </li>
            <li>
              Esta declaração é registrada com identificação eletrônica (IP,
              navegador, data/hora) como prova de consentimento.
            </li>
          </ol>
        </div>

        <label className="mt-4 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="concordou"
            checked={concordou}
            onChange={(e) => setConcordou(e.target.checked)}
            className="mt-1 h-4 w-4 accent-tds-green"
          />
          <span className="text-sm text-slate-200">
            <strong>Li e concordo</strong> com os termos acima e estou ciente
            de que esta é uma manifestação formal de vontade equivalente a
            uma assinatura em contrato.
          </span>
        </label>
      </section>

      {erro && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {erro}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <a
          href={`/proposta/${slug}`}
          className="rounded-md border border-tds-border bg-tds-bg px-5 py-2.5 text-center text-sm font-medium text-slate-300 hover:text-white"
        >
          Cancelar
        </a>
        <button
          type="submit"
          disabled={!podeEnviar || pending}
          className="rounded-md bg-tds-green px-6 py-2.5 text-sm font-bold text-tds-bg shadow-lg shadow-tds-green/30 hover:bg-tds-green-bright disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Registrando..." : "Confirmar e ir para pagamento →"}
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-slate-300">
      {children} <span className="text-red-400">*</span>
    </label>
  );
}
