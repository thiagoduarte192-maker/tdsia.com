import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { propostas, formatBRL } from "@/data/propostas";

export const dynamic = "force-dynamic";

export default async function PagamentoPage(
  props: PageProps<"/proposta/[slug]/pagamento">
) {
  const { slug } = await props.params;
  const sp = await props.searchParams;
  const aceiteId = Number(sp.aceite);

  const proposta = propostas[slug];
  if (!proposta) notFound();
  if (!aceiteId) redirect(`/proposta/${slug}/aceitar`);

  const [aceite] = await db
    .select()
    .from(schema.aceites)
    .where(eq(schema.aceites.id, aceiteId))
    .limit(1);

  if (!aceite || aceite.propostaSlug !== slug) {
    redirect(`/proposta/${slug}/aceitar`);
  }

  const valor = Number(aceite.valorAceito);
  const valorParcelado = valor / aceite.numeroParcelas;

  return (
    <div className="min-h-screen">
      <header className="border-b border-tds-border bg-tds-panel/60 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <Link href={`/proposta/${slug}`} className="flex items-center">
            <Image
              src="/tds-logo.png"
              alt="TDS Soluções Digitais"
              width={1098}
              height={375}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-tds-green">
            Aceite #{aceite.id} • Proposta {aceite.propostaNumero}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6 rounded-xl border border-tds-green/40 bg-tds-green/5 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-tds-green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Aceite registrado com sucesso — {aceite.nomeCompleto}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Sua manifestação de vontade foi gravada às{" "}
            {new Date(aceite.createdAt).toLocaleString("pt-BR")} com IP{" "}
            <span className="font-mono">{aceite.ip ?? "—"}</span>
          </p>
        </div>

        <h1 className="text-3xl font-bold text-white lg:text-4xl">Pagamento</h1>
        <p className="mt-2 text-slate-400">
          Escolha a forma de pagar. Tudo processado com segurança pelo Mercado
          Pago, sem você sair do site.
        </p>

        {/* Resumo */}
        <section className="mt-6 rounded-xl border border-tds-border bg-tds-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
            Resumo
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">
                {proposta.cliente.nome} • {proposta.cliente.empresa}
              </p>
              <p className="text-xs text-slate-500">
                {proposta.subtituloHero ??
                  `Plataforma Digital para ${proposta.segmento}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-tds-green">
                {formatBRL(valor)}
              </p>
              {aceite.numeroParcelas > 1 && (
                <p className="text-xs text-slate-400">
                  ou {aceite.numeroParcelas}x de {formatBRL(valorParcelado)} no
                  cartão
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Placeholder enquanto MP não está integrado */}
        <section className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <h2 className="text-base font-bold text-amber-200">
                Aguardando configuração do Mercado Pago
              </h2>
              <p className="mt-2 text-sm text-amber-100/80">
                O aceite formal já está registrado e tem validade jurídica. O
                checkout integrado (PIX + Cartão) será ativado assim que as
                credenciais do Mercado Pago forem configuradas.
              </p>
              <p className="mt-3 text-sm text-amber-100/80">
                Enquanto isso, a TDS entrará em contato pelo WhatsApp em{" "}
                <a
                  href={`https://wa.me/5521965269795?text=${encodeURIComponent(
                    `Olá! Aceitei a proposta #${aceite.propostaNumero}. Aceite ID: ${aceite.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-tds-green underline"
                >
                  (21) 96526-9795
                </a>{" "}
                para combinar a forma de pagamento.
              </p>
              <a
                href={`https://wa.me/5521965269795?text=${encodeURIComponent(
                  `Olá! Aceitei a proposta #${aceite.propostaNumero} agora. Aceite ID: ${aceite.id}. Como combinamos o pagamento?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
              >
                💬 Falar no WhatsApp agora
              </a>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-500">
          Aceite registrado em {new Date(aceite.createdAt).toLocaleString("pt-BR")}{" "}
          • {aceite.tipoDocumento}: {aceite.documento}
        </p>
      </main>
    </div>
  );
}
