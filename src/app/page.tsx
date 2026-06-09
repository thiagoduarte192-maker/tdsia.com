import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Servico = {
  icone: React.ReactNode;
  titulo: string;
  subtitulo: string;
  itens: string[];
  badge?: { label: string; cor: string };
};

const servicos: Servico[] = [
  {
    icone: <IconDados />,
    titulo: "Automação de Dados",
    subtitulo: "Dados + Dashboard",
    badge: { label: "Mais contratado", cor: "bg-tds-green text-tds-bg" },
    itens: [
      "Integração com API do sistema da empresa",
      "Coleta automática de clientes e transações",
      "Banco de dados estruturado e organizado",
      "Atualização diária automática",
      "Regras de periodicidade personalizadas",
      "Identificação de oportunidades de retorno",
      "Dashboard visual e estratégico em tempo real",
    ],
  },
  {
    icone: <IconWhats />,
    titulo: "WhatsApp Segmentado",
    subtitulo: "Comunicação Inteligente",
    itens: [
      "Integração com WhatsApp Business API",
      "Segmentação de clientes por perfil",
      "Criação de etiquetas e categorias inteligentes",
      "Campanhas automatizadas e personalizadas",
      "Régua de relacionamento por comportamento",
      "Relatórios de entrega e engajamento",
    ],
  },
  {
    icone: <IconProcessos />,
    titulo: "Automação de Processos",
    subtitulo: "Eficiência Operacional",
    itens: [
      "Mapeamento e digitalização de fluxos internos",
      "Integração entre sistemas (CRM, ERP, planilhas)",
      "Alertas automáticos e notificações internas",
      "Eliminação de tarefas manuais repetitivas",
      "Agendamento e follow-up automatizados",
    ],
  },
  {
    icone: <IconIA />,
    titulo: "Agentes de IA",
    subtitulo: "Inteligência Artificial Aplicada",
    badge: { label: "Novidade", cor: "bg-blue-500 text-white" },
    itens: [
      "Chatbots inteligentes para atendimento",
      "Triagem automática de leads e clientes",
      "Respostas personalizadas por contexto",
      "Integração com WhatsApp, Instagram e site",
      "Aprendizado contínuo com o histórico",
    ],
  },
];

const diferenciais = [
  { titulo: "Implementação rápida", desc: "Da reunião ao no ar em poucas semanas" },
  { titulo: "Dados seguros e privados", desc: "Infraestrutura própria, sem compartilhar com terceiros" },
  { titulo: "Foco em resultado", desc: "Cada projeto tem KPI claro definido antes de começar" },
  { titulo: "Suporte contínuo", desc: "Plano mensal de manutenção, melhorias e suporte" },
  { titulo: "Soluções sob medida", desc: "Sem templates engessados — feito pro seu negócio" },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #10b981 1px, transparent 1px), radial-gradient(circle at 70% 80%, #10b981 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-tds-green/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-tds-green/30 bg-tds-green/5 px-3 py-1 text-xs font-medium text-tds-green-bright">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-tds-green glow" />
                Soluções Digitais para o seu Negócio
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
                Transforme seu negócio com{" "}
                <span className="text-tds-green">automação inteligente</span>,
                dados estruturados e relacionamento{" "}
                <span className="text-tds-green">automatizado</span>.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-400">
                Somos especialistas em automação de processos e inteligência
                de dados para empresas que querem crescer com eficiência.
                Integramos seu sistema, organizamos seus dados e te damos
                visão estratégica em tempo real.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contato"
                  className="rounded-lg bg-tds-green px-6 py-3 text-sm font-bold text-tds-bg hover:bg-tds-green-bright shadow-lg shadow-tds-green/20"
                >
                  Quero uma consultoria gratuita
                </a>
                <a
                  href="#servicos"
                  className="rounded-lg border border-tds-border bg-tds-panel px-6 py-3 text-sm font-semibold text-slate-200 hover:border-tds-green hover:text-tds-green"
                >
                  Ver serviços
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs text-slate-500">
                <Metric n="100%" label="Sob medida" />
                <Metric n="API-first" label="Integrações" />
                <Metric n="LGPD" label="Compliance" />
                <Metric n="24/7" label="Monitoramento" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="sobre" className="border-t border-tds-border bg-tds-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
                Quem somos
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                A TDS em uma frase
              </h2>
            </div>
            <p className="lg:col-span-2 text-lg leading-relaxed text-slate-300">
              Especialistas em <strong className="text-white">automação de processos e inteligência de dados</strong> para empresas que querem crescer com eficiência. Conectamos seus sistemas, transformamos dados brutos em decisão e automatizamos o que ainda é manual no seu dia a dia.
            </p>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-t border-tds-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
              Nossos serviços
            </p>
            <h2 className="mt-3 text-4xl font-bold text-white">
              4 frentes para escalar seu negócio
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Cada serviço pode ser contratado individualmente ou combinado em
              uma solução completa. Investimento sob consulta.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {servicos.map((s) => (
              <ServicoCard key={s.titulo} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="border-t border-tds-border bg-tds-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
              Por que TDS
            </p>
            <h2 className="mt-3 text-4xl font-bold text-white">
              5 razões para escolher a TDS
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {diferenciais.map((d) => (
              <div
                key={d.titulo}
                className="rounded-xl border border-tds-border bg-tds-bg p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-tds-green/10 text-tds-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-3 font-semibold text-white">{d.titulo}</p>
                <p className="mt-1 text-sm text-slate-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPORTE */}
      <section className="border-t border-tds-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl border border-tds-green/30 bg-gradient-to-br from-tds-green/5 to-transparent p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
                  Plano de suporte e manutenção
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  Suporte contínuo para todos os serviços contratados
                </h2>
                <p className="mt-3 text-slate-400">
                  Implementamos e mantemos. Você não fica sozinho depois da
                  entrega.
                </p>
              </div>
              <ul className="lg:col-span-5 space-y-2 text-sm">
                <SuporteItem>Monitoramento das automações</SuporteItem>
                <SuporteItem>Ajustes técnicos e correções</SuporteItem>
                <SuporteItem>Pequenas melhorias contínuas</SuporteItem>
                <SuporteItem>Suporte técnico prioritário</SuporteItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="border-t border-tds-border bg-tds-panel/40">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-tds-green">
            Vamos conversar
          </p>
          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
            Pronto para automatizar?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Diagnóstico gratuito por WhatsApp. Em 30 minutos você sai com um
            plano de ação claro para seu negócio.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20uma%20consultoria%20gratuita%20com%20a%20TDS."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-tds-green px-8 py-4 text-base font-bold text-tds-bg shadow-lg shadow-tds-green/30 hover:bg-tds-green-bright"
            >
              💬 Falar no WhatsApp
            </a>
            <a
              href="mailto:tdsautomacoesia@gmail.com"
              className="rounded-lg border border-tds-border bg-tds-bg px-8 py-4 text-base font-semibold text-slate-200 hover:border-tds-green hover:text-tds-green"
            >
              tdsautomacoesia@gmail.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ServicoCard({ icone, titulo, subtitulo, itens, badge }: Servico) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-tds-border bg-tds-panel p-6 transition hover:border-tds-green/50">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-tds-green/5 blur-2xl transition group-hover:bg-tds-green/10" />
      {badge && (
        <span
          className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.cor}`}
        >
          {badge.label}
        </span>
      )}
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tds-green/10 text-tds-green">
          {icone}
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">{titulo}</h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-tds-green">
          {subtitulo}
        </p>
        <ul className="mt-4 space-y-2">
          {itens.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm text-slate-300">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-tds-green" />
              {it}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-tds-border pt-4">
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Investimento
          </span>
          <span className="text-lg font-bold text-tds-green">Sob consulta</span>
        </div>
      </div>
    </div>
  );
}

function Metric({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-tds-green">{n}</p>
      <p className="uppercase tracking-wider">{label}</p>
    </div>
  );
}

function SuporteItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-tds-green/20 text-tds-green">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-slate-200">{children}</span>
    </li>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-tds-green/10 blur-2xl" />
      <div className="relative rounded-2xl border border-tds-border bg-tds-panel p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-tds-border pb-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-tds-green" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            Dashboard TDS
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Kpi label="Clientes" valor="2.847" />
          <Kpi label="Receita" valor="R$ 184k" />
          <Kpi label="Conversão" valor="32%" />
        </div>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Crescimento 6 meses
          </p>
          <div className="mt-2 flex items-end justify-between gap-1.5 h-24">
            {[40, 52, 48, 65, 78, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-tds-green to-tds-green-bright" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <Atividade tipo="✓" texto="WhatsApp enviado para 240 clientes" cor="text-tds-green" />
          <Atividade tipo="↻" texto="Sincronização com ERP concluída" cor="text-blue-400" />
          <Atividade tipo="!" texto="3 oportunidades de retorno detectadas" cor="text-amber-400" />
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="rounded-md border border-tds-border bg-tds-bg p-2">
      <p className="text-[9px] uppercase text-slate-500">{label}</p>
      <p className="text-sm font-bold text-white">{valor}</p>
    </div>
  );
}

function Atividade({ tipo, texto, cor }: { tipo: string; texto: string; cor: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-tds-bg/50 px-2 py-1.5 text-[10px]">
      <span className={`font-bold ${cor}`}>{tipo}</span>
      <span className="text-slate-300">{texto}</span>
    </div>
  );
}

function IconDados() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
      <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  );
}

function IconWhats() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
    </svg>
  );
}

function IconProcessos() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconIA() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v1H7a3 3 0 0 0-3 3v1H3a2 2 0 1 0 0 4h1v1a3 3 0 0 0 3 3h1v1a4 4 0 0 0 8 0v-1h1a3 3 0 0 0 3-3v-1h1a2 2 0 1 0 0-4h-1v-1a3 3 0 0 0-3-3h-1V6a4 4 0 0 0-4-4z" />
      <path d="M9 11h.01M15 11h.01M9 15c.83.67 1.83 1 3 1s2.17-.33 3-1" />
    </svg>
  );
}
