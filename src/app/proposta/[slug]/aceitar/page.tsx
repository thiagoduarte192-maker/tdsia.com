import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { propostas, formatBRL } from "@/data/propostas";
import AceiteForm from "./AceiteForm";

export const dynamic = "force-dynamic";

export default async function AceitarPropostaPage(
  props: PageProps<"/proposta/[slug]/aceitar">
) {
  const { slug } = await props.params;
  const proposta = propostas[slug];
  if (!proposta) notFound();

  return (
    <div className="min-h-screen">
      {/* Top bar simples */}
      <header className="border-b border-tds-border bg-tds-panel/60 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <Link href={`/proposta/${slug}`} className="flex items-center gap-3">
            <Image
              src="/tds-logo.png"
              alt="TDS Soluções Digitais"
              width={1098}
              height={375}
              className="h-9 w-auto"
              priority
            />
          </Link>
          <Link
            href={`/proposta/${slug}`}
            className="rounded-md border border-tds-border bg-tds-bg px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
          >
            ← Voltar à proposta
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6">
          <span className="inline-block rounded-full border border-tds-green/30 bg-tds-green/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-tds-green">
            Aceite formal • Proposta #{proposta.numero}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Confirmar a contratação
          </h1>
          <p className="mt-2 text-slate-400">
            Antes de seguir para o pagamento, preencha os dados abaixo e
            confirme o aceite. Tudo é registrado para LGPD.
          </p>
        </div>

        {/* Resumo da proposta */}
        <section className="rounded-xl border border-tds-border bg-tds-panel p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
            Resumo do que está sendo contratado
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            {proposta.subtituloHero ??
              `Plataforma Digital para ${proposta.segmento}`}
          </h2>
          <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Cliente
              </p>
              <p className="font-medium text-white">{proposta.cliente.nome}</p>
              <p className="text-xs text-slate-500">
                {proposta.cliente.empresa}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Valor total
              </p>
              <p className="text-xl font-bold text-tds-green">
                {formatBRL(proposta.preco)}
              </p>
              {proposta.mensalidade && (
                <p className="text-xs text-slate-500">
                  + {formatBRL(proposta.mensalidade)}/mês depois
                </p>
              )}
            </div>
          </div>
        </section>

        <AceiteForm
          slug={slug}
          numero={proposta.numero}
          valor={proposta.preco}
          permiteParcelar={true}
        />
      </main>
    </div>
  );
}
