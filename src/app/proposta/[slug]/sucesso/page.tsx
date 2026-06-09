import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { propostas, formatBRL } from "@/data/propostas";

export const dynamic = "force-dynamic";

export default async function SucessoPage(
  props: PageProps<"/proposta/[slug]/sucesso">
) {
  const { slug } = await props.params;
  const sp = await props.searchParams;
  const aceiteId = Number(sp.aceite);
  const statusParam = String(sp.status ?? "");

  const proposta = propostas[slug];
  if (!proposta) notFound();
  if (!aceiteId) redirect(`/proposta/${slug}`);

  const [aceite] = await db
    .select()
    .from(schema.aceites)
    .where(eq(schema.aceites.id, aceiteId))
    .limit(1);

  if (!aceite) redirect(`/proposta/${slug}`);

  const cobrancas = await db
    .select()
    .from(schema.cobrancas)
    .where(eq(schema.cobrancas.aceiteId, aceiteId));
  const cobranca = cobrancas.sort((a, b) => b.id - a.id)[0];

  // Estado: aprovado, pendente, erro
  const aprovado =
    aceite.status === "pago" ||
    cobranca?.status === "aprovada" ||
    cobranca?.mpStatus === "approved";
  const pendente = !aprovado && statusParam === "pending";

  const valor = Number(aceite.valorAceito);

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
            Proposta {aceite.propostaNumero}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {aprovado ? (
          <BlocoSucesso
            aceite={aceite}
            valor={valor}
            cobranca={cobranca}
            empresa={proposta.cliente.empresa ?? null}
          />
        ) : pendente ? (
          <BlocoPendente
            aceite={aceite}
            valor={valor}
          />
        ) : (
          <BlocoAguardando
            aceite={aceite}
            slug={slug}
          />
        )}
      </main>
    </div>
  );
}

function BlocoSucesso({
  aceite,
  valor,
  cobranca,
  empresa,
}: {
  aceite: { id: number; nomeCompleto: string; propostaNumero: string; paidAt: Date | null; createdAt: Date };
  valor: number;
  cobranca?: { mpPaymentId: string | null; mpStatusDetail: string | null };
  empresa: string | null;
}) {
  return (
    <>
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-tds-green/20 text-tds-green">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-center text-4xl font-bold text-white">
        Pagamento confirmado!
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-slate-400">
        Obrigado, {aceite.nomeCompleto.split(" ")[0]}! O contrato com a TDS
        Soluções Digitais está oficialmente ativo.
      </p>

      <div className="mt-8 rounded-xl border border-tds-green/30 bg-tds-green/5 p-6">
        <p className="text-xs uppercase tracking-widest text-tds-green">
          Comprovante
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          <Item label="Proposta" valor={`#${aceite.propostaNumero}`} mono />
          <Item label="Aceite" valor={`#${aceite.id}`} mono />
          <Item label="Cliente" valor={aceite.nomeCompleto} />
          {empresa && <Item label="Empresa" valor={empresa} />}
          <Item label="Valor" valor={formatBRL(valor)} destaque />
          {cobranca?.mpPaymentId && (
            <Item label="MP Payment" valor={cobranca.mpPaymentId} mono />
          )}
          <Item
            label="Pago em"
            valor={
              aceite.paidAt
                ? new Date(aceite.paidAt).toLocaleString("pt-BR")
                : new Date().toLocaleString("pt-BR")
            }
          />
        </dl>
      </div>

      <div className="mt-8 rounded-xl border border-tds-border bg-tds-panel p-5">
        <h2 className="text-base font-bold text-white">O que acontece agora?</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>
            Você vai receber um e-mail confirmando o pagamento e os próximos
            passos
          </li>
          <li>
            A TDS entra em contato em até 1 dia útil pelo WhatsApp para
            agendar a reunião de kickoff
          </li>
          <li>
            Na semana 1 começamos o levantamento e a integração técnica
          </li>
        </ol>
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://wa.me/5521965269795"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
        >
          💬 Falar com a TDS no WhatsApp
        </a>
      </div>
    </>
  );
}

function BlocoPendente({
  aceite,
  valor,
}: {
  aceite: { id: number; nomeCompleto: string; propostaNumero: string };
  valor: number;
}) {
  return (
    <>
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l3 2" />
        </svg>
      </div>

      <h1 className="text-center text-4xl font-bold text-white">
        Pagamento em processamento
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-slate-400">
        Recebemos sua solicitação, {aceite.nomeCompleto.split(" ")[0]}. Assim
        que o Mercado Pago confirmar (em até alguns minutos), você recebe um
        e-mail e o projeto começa.
      </p>

      <div className="mt-8 rounded-xl border border-tds-border bg-tds-panel p-5 text-sm">
        <Item label="Proposta" valor={`#${aceite.propostaNumero}`} mono />
        <Item label="Aceite" valor={`#${aceite.id}`} mono />
        <Item label="Valor" valor={formatBRL(valor)} destaque />
      </div>
    </>
  );
}

function BlocoAguardando({
  aceite,
  slug,
}: {
  aceite: { id: number; propostaNumero: string };
  slug: string;
}) {
  return (
    <>
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 text-slate-300">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>

      <h1 className="text-center text-3xl font-bold text-white">
        Aguardando confirmação do pagamento
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-slate-400">
        Estamos verificando o status com o Mercado Pago. Atualize esta página
        em alguns segundos.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href={`/proposta/${slug}/pagamento?aceite=${aceite.id}`}
          className="rounded-md border border-tds-border bg-tds-bg px-4 py-2 text-sm font-medium text-slate-200 hover:text-white"
        >
          Voltar para pagamento
        </Link>
      </div>
    </>
  );
}

function Item({
  label,
  valor,
  mono,
  destaque,
}: {
  label: string;
  valor: string;
  mono?: boolean;
  destaque?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 py-1">
      <dt className="text-slate-500">{label}</dt>
      <dd
        className={`text-right ${
          destaque ? "text-tds-green font-bold" : "text-white font-medium"
        } ${mono ? "font-mono" : ""}`}
      >
        {valor}
      </dd>
    </div>
  );
}
