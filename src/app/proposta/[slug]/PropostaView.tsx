"use client";

import Image from "next/image";
import { formatBRL, type Proposta } from "@/data/propostas";

export default function PropostaView({ proposta: p }: { proposta: Proposta }) {
  const aceitar = () =>
    window.open(
      `${p.whatsappLink}?text=${encodeURIComponent(p.whatsappMensagemAceitar)}`,
      "_blank"
    );

  const duvida = () =>
    window.open(
      `${p.whatsappLink}?text=${encodeURIComponent(p.whatsappMensagemDuvida)}`,
      "_blank"
    );

  return (
    <article className="font-sans">
      {/* Action bar */}
      <div className="sticky top-0 z-40 border-b border-tds-border bg-tds-bg/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/tds-logo.png"
              alt="TDS Soluções Digitais"
              width={1098}
              height={375}
              className="h-10 w-auto"
              priority
            />
            <div className="hidden sm:block border-l border-tds-border pl-3">
              <p className="text-xs text-slate-400">
                Proposta <span className="font-mono text-tds-green">#{p.numero}</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Confidencial
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="rounded-md border border-tds-border bg-tds-panel px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-tds-green hover:text-tds-green"
            >
              🖨 Imprimir / PDF
            </button>
            <button
              onClick={aceitar}
              className="rounded-md bg-tds-green px-4 py-1.5 text-xs font-bold text-tds-bg hover:bg-tds-green-bright"
            >
              ✓ Aceitar proposta
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-tds-border">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #10b981 1px, transparent 1px), radial-gradient(circle at 80% 80%, #10b981 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-tds-green/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-tds-green/30 bg-tds-green/5 px-3 py-1 text-xs font-medium text-tds-green-bright">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-tds-green glow" />
            TDS Soluções Digitais
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
            Proposta Comercial
            <span className="mt-2 block text-2xl font-medium text-tds-green lg:text-3xl">
              Plataforma Digital para {p.segmento}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-slate-400">
            Uma área do cliente moderna + painel administrativo, integrados ao
            seu sistema de vendas. Reduza ligações de cobrança, acelere o
            recebimento e tenha visão completa do seu negócio.
          </p>

          <div className="mt-12 grid gap-4 border-t border-tds-border pt-6 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-tds-green">Para</p>
              <p className="mt-1 font-semibold text-white">{p.cliente.nome}</p>
              <p className="text-slate-500">{p.cliente.empresa}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-tds-green">Data</p>
              <p className="mt-1 font-semibold text-white">{p.data}</p>
              <p className="text-slate-500">Validade: {p.validade}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-tds-green">Investimento</p>
              <p className="mt-1 text-2xl font-bold text-tds-green">{formatBRL(p.preco)}</p>
              <p className="text-slate-500">+ {formatBRL(p.mensalidade)}/mês</p>
            </div>
          </div>
        </div>
      </header>

      {/* CARTA */}
      <section className="border-b border-tds-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
          <Eyebrow numero="01" titulo="Abertura" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Olá, {p.cliente.nome}!
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-300">
            {p.carta.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNÓSTICO */}
      <section className="border-b border-tds-border bg-tds-panel/40">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Eyebrow numero="02" titulo="Diagnóstico" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            O que está custando dinheiro hoje
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Antes da solução, vamos olhar para a dor. Esses são problemas reais
            que toda loja de auto peças enfrenta:
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {p.dores.map((d) => (
              <DorCard key={d.titulo} {...d} />
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section className="border-b border-tds-border">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Eyebrow numero="03" titulo="Solução" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Dois sistemas. Uma plataforma.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Você não compra uma &quot;página&quot;. Você compra{" "}
            <strong className="text-white">dois ambientes</strong> que conversam entre si.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Tag cor="tds-green">Sistema 1</Tag>
              <h3 className="mt-3 text-2xl font-bold text-white">
                {p.escopo.sistema1.titulo}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{p.escopo.sistema1.subtitulo}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.escopo.sistema1.itens.map((it) => (
                  <Check key={it}>{it}</Check>
                ))}
              </ul>
            </div>
            <MockClient />
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <MockLoja />
            </div>
            <div className="order-1 lg:order-2">
              <Tag cor="blue">Sistema 2 — Bônus incluso</Tag>
              <h3 className="mt-3 text-2xl font-bold text-white">
                {p.escopo.sistema2.titulo}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{p.escopo.sistema2.subtitulo}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.escopo.sistema2.itens.map((it) => (
                  <Check key={it}>{it}</Check>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUI */}
      <section className="border-b border-tds-border bg-tds-panel/40">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Eyebrow numero="04" titulo="O que está incluso" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Tudo o que você precisa para ir do zero ao ar
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.inclui.map((i) => (
              <div
                key={i.titulo}
                className="rounded-xl border border-tds-border bg-tds-bg p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-tds-green text-tds-bg text-sm font-bold">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-white">{i.titulo}</p>
                    <p className="mt-1 text-sm text-slate-400">{i.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRONOGRAMA */}
      <section className="border-b border-tds-border">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Eyebrow numero="05" titulo="Cronograma" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Do contrato ao ar em {p.prazoSemanas} semanas
          </h2>
          <ol className="mt-10 space-y-6">
            {p.cronograma.map((c, i) => (
              <FaseLinha
                key={c.titulo}
                n={(i + 1).toString()}
                prazo={c.prazo}
                titulo={c.titulo}
                desc={c.desc}
                ultima={i === p.cronograma.length - 1}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section className="relative overflow-hidden border-b border-tds-border">
        <div className="absolute inset-0 bg-gradient-to-br from-tds-green/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 lg:py-24">
          <Eyebrow numero="06" titulo="Investimento" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Valor justo, sem surpresas
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border-2 border-tds-green bg-tds-panel p-8 shadow-2xl shadow-tds-green/10">
              <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
                Setup do projeto (pagamento único)
              </p>
              <p className="mt-2 text-5xl font-bold text-white">
                {formatBRL(p.preco)}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Pagamento em 2 parcelas:{" "}
                {formatBRL(p.preco * (p.parcelas.entregaPct / 100))} no início +{" "}
                {formatBRL(p.preco * (1 - p.parcelas.entregaPct / 100))} na entrega
              </p>

              <ul className="mt-6 space-y-2 text-sm">
                <Check>Área do Cliente completa</Check>
                <Check>Painel Administrativo da Loja</Check>
                <Check>Integração com seu sistema de vendas</Check>
                <Check>Integração com gateway de pagamento</Check>
                <Check>Hospedagem (primeiros 90 dias inclusos)</Check>
                <Check>Treinamento da equipe</Check>
                <Check>30 dias de suporte pós-entrega</Check>
              </ul>
            </div>

            <div className="rounded-2xl border border-tds-border bg-tds-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
                Manutenção mensal
              </p>
              <p className="mt-2 text-4xl font-bold text-white">
                {formatBRL(p.mensalidade)}
                <span className="text-base font-normal text-slate-500">/mês</span>
              </p>
              <p className="mt-1 text-sm text-slate-400">
                A partir do 4º mês após go-live
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                <Check>Hospedagem e SSL</Check>
                <Check>Backup diário</Check>
                <Check>Suporte por WhatsApp</Check>
                <Check>Correções de bugs</Check>
                <Check>Pequenos ajustes mensais</Check>
                <Check>Monitoramento 24/7</Check>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <p className="text-sm text-amber-200">
              <strong>O que NÃO está incluso:</strong> taxas do gateway de
              pagamento (PIX ~0,99% / cartão ~3,99%, repassadas pelo Mercado
              Pago ou Asaas) e eventual custo de liberação da API do seu sistema
              de vendas pelo fornecedor.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-b border-tds-border">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <Eyebrow numero="07" titulo="Roadmap futuro" />
          <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
            Esta é a Fase 1 de uma plataforma maior
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            A plataforma foi desenhada para crescer com seu negócio. Quando esta
            fase estiver consolidada, podemos avançar para:
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {p.roadmap.map((f) => (
              <div
                key={f.fase}
                className="rounded-xl border border-tds-border bg-tds-panel p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
                  {f.fase}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{f.titulo}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                  {f.itens.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tds-green" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Cada fase é orçada e contratada separadamente. Você decide o ritmo.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-b border-tds-border">
        <div className="absolute inset-0 bg-gradient-to-br from-tds-green/20 via-tds-green/5 to-transparent" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-tds-green/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <Eyebrow numero="08" titulo="Próximos passos" />
          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Aceite a proposta pelo botão abaixo e iniciamos a primeira fase de
            levantamento esta semana. Em {p.prazoSemanas} semanas sua plataforma
            está no ar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row print:hidden">
            <button
              onClick={aceitar}
              className="rounded-lg bg-tds-green px-8 py-4 text-base font-bold text-tds-bg shadow-2xl shadow-tds-green/30 hover:bg-tds-green-bright"
            >
              ✓ Aceitar proposta via WhatsApp
            </button>
            <button
              onClick={duvida}
              className="rounded-lg border-2 border-tds-green/50 bg-tds-bg/50 px-8 py-4 text-base font-bold text-white hover:bg-tds-green/10"
            >
              Tirar dúvidas antes
            </button>
          </div>

          <p className="mt-10 text-xs text-slate-500">
            Esta proposta é válida por {p.validade} a partir de {p.data}.
          </p>
        </div>
      </section>

      {/* TERMOS */}
      <section className="border-b border-tds-border">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-lg font-bold text-white">Termos e condições</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>• Pagamento em 2 parcelas: 50% no início, 50% na entrega.</li>
            <li>• Mensalidade de manutenção cobrada a partir do 4º mês após go-live.</li>
            <li>• Prazo de {p.prazoSemanas} semanas contado a partir da liberação do acesso ao sistema de vendas atual.</li>
            <li>• Caso a integração com o ERP exija liberação ou custo do fornecedor, esse custo é repassado.</li>
            <li>• Garantia de 30 dias para correção de bugs após entrega, sem custo adicional.</li>
            <li>• Alterações de escopo após início do projeto são orçadas separadamente.</li>
            <li>• O código-fonte é entregue ao cliente ao final do projeto.</li>
            <li>• Proposta válida por {p.validade} a partir de {p.data}.</li>
          </ul>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-tds-bg">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <Image
                src="/tds-logo.png"
                alt="TDS Soluções Digitais"
                width={1098}
                height={375}
                className="h-12 w-auto"
              />
              <p className="mt-2 text-sm text-slate-500">
                Automação · Inteligência de Dados · CRM · WhatsApp · IA
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-slate-300">tdsautomacoesia@gmail.com</p>
              <p className="text-slate-500">WhatsApp: (21) 96526-9795</p>
              <p className="text-slate-500">tdsia.com</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-600">
            Proposta confidencial — uso exclusivo do destinatário.
          </p>
        </div>
      </footer>
    </article>
  );
}

function Eyebrow({ numero, titulo }: { numero: string; titulo: string }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-tds-green">
      {numero} — {titulo}
    </p>
  );
}

function Tag({ children, cor }: { children: React.ReactNode; cor: "tds-green" | "blue" }) {
  const map = {
    "tds-green": "bg-tds-green/10 text-tds-green border-tds-green/30",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  };
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${map[cor]}`}>
      {children}
    </span>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-slate-300">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="mt-0.5 flex-shrink-0 text-tds-green"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function DorCard({
  titulo,
  desc,
  impacto,
}: {
  titulo: string;
  desc: string;
  impacto: string;
}) {
  return (
    <div className="rounded-xl border border-tds-border bg-tds-bg p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
      </div>
      <h3 className="mt-3 font-bold text-white">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-400">{desc}</p>
      <p className="mt-3 inline-block rounded-md bg-red-500/10 px-2 py-1 text-xs font-semibold text-red-400">
        {impacto}
      </p>
    </div>
  );
}

function FaseLinha({
  n,
  prazo,
  titulo,
  desc,
  ultima = false,
}: {
  n: string;
  prazo: string;
  titulo: string;
  desc: string;
  ultima?: boolean;
}) {
  return (
    <li className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-tds-green text-lg font-bold text-tds-bg shadow-lg shadow-tds-green/30">
          {n}
        </div>
        {!ultima && <div className="mt-2 w-px flex-1 bg-tds-border" />}
      </div>
      <div className="flex-1 pb-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
          {prazo}
        </p>
        <h3 className="mt-1 text-lg font-bold text-white">{titulo}</h3>
        <p className="mt-2 text-sm text-slate-400">{desc}</p>
      </div>
    </li>
  );
}

function MockClient() {
  return (
    <div className="rounded-2xl border border-tds-border bg-tds-panel p-4 shadow-2xl">
      <div className="rounded-xl bg-tds-bg p-4 border border-tds-border">
        <div className="flex items-center justify-between border-b border-tds-border pb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-tds-green" />
            <span className="text-xs font-semibold text-white">Área do Cliente</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <MiniKpi label="A pagar" valor="R$ 4.227" cor="text-tds-green" />
          <MiniKpi label="Vencido" valor="R$ 2.180" cor="text-red-400" />
          <MiniKpi label="Vales" valor="R$ 380" cor="text-blue-400" />
        </div>
        <div className="mt-3 space-y-1.5">
          <MiniLinha numero="NF 18.452" valor="R$ 1.245,90" status="aberta" />
          <MiniLinha numero="NF 18.501" valor="R$ 2.180,50" status="vencida" />
          <MiniLinha numero="NF 18.498" valor="R$ 489,00" status="aberta" />
        </div>
      </div>
    </div>
  );
}

function MockLoja() {
  return (
    <div className="rounded-2xl border border-tds-border bg-tds-panel p-4 shadow-2xl">
      <div className="rounded-xl bg-tds-bg p-4 border border-tds-border">
        <div className="flex items-center justify-between border-b border-tds-border pb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-tds-green" />
            <span className="text-xs font-semibold text-white">Painel da Loja</span>
          </div>
          <span className="rounded bg-tds-green/20 px-2 py-0.5 text-[10px] font-semibold text-tds-green">
            ADMIN
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <MiniKpi label="A receber" valor="R$ 69.227" cor="text-tds-green" />
          <MiniKpi label="Vencido" valor="R$ 15.930" cor="text-red-400" />
        </div>
        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Top clientes
          </p>
          <div className="mt-1 space-y-1">
            <MiniBarra nome="Diesel Pesados" valor={100} />
            <MiniBarra nome="Auto Service Premium" valor={85} />
            <MiniBarra nome="Ferreira & Filhos" valor={70} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniKpi({
  label,
  valor,
  cor,
}: {
  label: string;
  valor: string;
  cor: string;
}) {
  return (
    <div className="rounded border border-tds-border bg-tds-panel p-2">
      <p className="text-[9px] uppercase text-slate-500">{label}</p>
      <p className={`text-sm font-bold ${cor}`}>{valor}</p>
    </div>
  );
}

function MiniLinha({
  numero,
  valor,
  status,
}: {
  numero: string;
  valor: string;
  status: "aberta" | "vencida";
}) {
  return (
    <div className="flex items-center justify-between rounded border border-tds-border bg-tds-panel/50 px-2 py-1.5 text-xs">
      <div className="flex items-center gap-2">
        <div
          className={`h-1.5 w-1.5 rounded-full ${
            status === "vencida" ? "bg-red-400" : "bg-amber-400"
          }`}
        />
        <span className="font-medium text-slate-300">{numero}</span>
      </div>
      <span className="font-semibold text-white">{valor}</span>
    </div>
  );
}

function MiniBarra({ nome, valor }: { nome: string; valor: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32 truncate text-[10px] text-slate-300">{nome}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-tds-border">
        <div
          className="h-full bg-tds-green"
          style={{ width: `${valor}%` }}
        />
      </div>
    </div>
  );
}
