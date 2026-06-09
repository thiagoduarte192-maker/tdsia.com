import AdminHeader from "@/components/AdminHeader";
import { propostas } from "@/data/propostas";
import {
  contratos,
  calcularResumo,
  todasAsParcelas,
  receitaPorMes,
  progressoContrato,
  formatBRL,
  formatDate,
  diasEntre,
  getHoje,
  labelStatusParcela,
  badgeStatusParcela,
  type Parcela,
} from "@/data/financeiro";

export const dynamic = "force-dynamic";

export default function AdminFinanceiroPage() {
  const hoje = getHoje();
  const resumo = calcularResumo(hoje);
  const todas = todasAsParcelas(hoje);

  const proximas = todas
    .filter((p) => p.status === "pendente" || p.status === "atrasado")
    .sort((a, b) => a.vencimento.localeCompare(b.vencimento));

  const recentes = todas
    .filter((p) => p.status === "pago")
    .sort((a, b) => (b.pagamento ?? "").localeCompare(a.pagamento ?? ""))
    .slice(0, 5);

  const grafico = receitaPorMes(6, 6, hoje);
  const maxValor = Math.max(
    ...grafico.map((m) => Math.max(m.recebido, m.previsto)),
    1
  );

  // Pipeline: propostas que ainda não viraram contrato
  const propostasFechadas = new Set(
    contratos.map((c) => c.clienteSlug).filter(Boolean)
  );
  const pipeline = Object.values(propostas).filter(
    (p) => !propostasFechadas.has(p.slug)
  );
  const valorPipeline = pipeline.reduce((s, p) => s + p.preco, 0);

  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">Financeiro</h1>
            <p className="mt-1 text-sm text-slate-400">
              Visão geral dos recebimentos, parcelas e contratos ativos
            </p>
          </div>
          <p className="text-xs text-slate-500">
            Hoje: <span className="font-semibold text-slate-300">{formatDate(hoje)}</span>
          </p>
        </div>

        {/* KPIs principais */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            label="Recebido no mês"
            valor={formatBRL(resumo.recebidoMes)}
            hint={`Total no ano: ${formatBRL(resumo.recebidoAno)}`}
            cor="text-tds-green"
          />
          <Kpi
            label="A receber (30 dias)"
            valor={formatBRL(resumo.aReceber30d)}
            hint={`12 meses: ${formatBRL(resumo.aReceber12m)}`}
            cor="text-blue-300"
          />
          <Kpi
            label="Atrasado"
            valor={formatBRL(resumo.atrasado)}
            hint={resumo.atrasado > 0 ? "Atenção!" : "Tudo em dia"}
            cor={resumo.atrasado > 0 ? "text-red-300" : "text-slate-300"}
            alert={resumo.atrasado > 0}
          />
          <Kpi
            label="Contratos ativos"
            valor={resumo.contratosAtivos.toString()}
            hint={`${formatBRL(resumo.recebidoTotal)} recebidos no total`}
            cor="text-white"
          />
        </section>

        {/* Gráfico de receita */}
        <section className="mb-8">
          <Card title="Receita por mês" subtitle="6 meses passados + 6 meses futuros">
            <div className="mt-3 flex h-48 items-end gap-1.5">
              {grafico.map((m, i) => {
                const isCurrent = i === 6;
                const hPago = (m.recebido / maxValor) * 100;
                const hPrev = (m.previsto / maxValor) * 100;
                return (
                  <div
                    key={m.mes}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <div className="flex w-full flex-1 items-end justify-center gap-0.5">
                      {m.recebido > 0 && (
                        <div
                          className="w-2/3 rounded-t bg-tds-green transition"
                          style={{ height: `${hPago}%` }}
                          title={`Recebido: ${formatBRL(m.recebido)}`}
                        />
                      )}
                      {m.previsto > 0 && (
                        <div
                          className="w-2/3 rounded-t border border-tds-green/40 bg-tds-green/15 transition"
                          style={{ height: `${hPrev}%` }}
                          title={`Previsto: ${formatBRL(m.previsto)}`}
                        />
                      )}
                      {m.recebido === 0 && m.previsto === 0 && (
                        <div className="h-1 w-2/3 rounded-t bg-tds-border" />
                      )}
                    </div>
                    <p
                      className={`text-[9px] font-medium ${
                        isCurrent ? "text-amber-400" : "text-slate-500"
                      }`}
                    >
                      {m.mes}
                    </p>
                    {(m.recebido > 0 || m.previsto > 0) && (
                      <p className="text-[8px] text-slate-500">
                        {((m.recebido + m.previsto) / 1000).toFixed(0)}k
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex gap-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm bg-tds-green" />
                Recebido
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-sm border border-tds-green/40 bg-tds-green/15" />
                Previsto
              </span>
              <span className="ml-auto text-amber-400">↓ Mês atual</span>
            </div>
          </Card>
        </section>

        {/* Próximas parcelas + Últimos recebidos */}
        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <Card
            title="Próximas parcelas"
            subtitle={`${proximas.length} parcela(s) a receber`}
            danger={proximas.some((p) => p.status === "atrasado")}
          >
            <ul className="divide-y divide-tds-border">
              {proximas.length === 0 ? (
                <li className="py-6 text-center text-sm text-slate-500">
                  Nenhuma parcela em aberto. ✨
                </li>
              ) : (
                proximas.slice(0, 8).map((p) => (
                  <ParcelaRow key={p.id} parcela={p} hoje={hoje} />
                ))
              )}
            </ul>
          </Card>

          <Card
            title="Últimos recebimentos"
            subtitle={`${recentes.length} parcela(s) recebida(s)`}
          >
            <ul className="divide-y divide-tds-border">
              {recentes.length === 0 ? (
                <li className="py-6 text-center text-sm text-slate-500">
                  Nenhum recebimento ainda.
                </li>
              ) : (
                recentes.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">
                        {p.clienteNome}
                      </p>
                      <p className="text-xs text-slate-500">
                        Parcela {p.numero}/{p.total} • {p.projeto}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-tds-green">
                        + {formatBRL(p.valor)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {p.pagamento && formatDate(p.pagamento)}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </Card>
        </section>

        {/* Contratos ativos */}
        <section className="mb-8">
          <Card
            title="Contratos ativos"
            subtitle={`${resumo.contratosAtivos} de ${resumo.totalContratos}`}
          >
            <div className="space-y-3">
              {contratos.map((c) => {
                const prog = progressoContrato(c, hoje);
                return (
                  <div
                    key={c.id}
                    className="rounded-xl border border-tds-border bg-tds-bg/50 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">
                          {c.clienteNome}
                        </p>
                        <p className="text-xs text-slate-500">{c.projeto}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">
                          {c.metodo} • Dia {c.diaVencimento} • Início{" "}
                          {formatDate(c.dataInicio)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">
                          {formatBRL(c.valorTotal)}
                        </p>
                        <p className="text-xs text-tds-green">
                          {prog.parcelasPagas}/{prog.parcelasTotal} parcelas pagas
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>Progresso: {prog.percentual}%</span>
                          <span>
                            Restam {formatBRL(prog.valorRestante)}
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-tds-border">
                          <div
                            className="h-full bg-gradient-to-r from-tds-green to-tds-green-bright transition-all"
                            style={{ width: `${prog.percentual}%` }}
                          />
                        </div>
                      </div>
                      {prog.proximaParcela && (
                        <div className="text-right text-[10px]">
                          <p className="text-slate-500">Próxima</p>
                          <p className="font-semibold text-white">
                            {formatDate(prog.proximaParcela.vencimento)}
                          </p>
                        </div>
                      )}
                    </div>

                    {c.observacoes && (
                      <p className="mt-2 text-[10px] italic text-slate-500">
                        {c.observacoes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* Pipeline */}
        {pipeline.length > 0 && (
          <section className="mb-8">
            <Card
              title="Pipeline — Propostas em aberto"
              subtitle={`${pipeline.length} proposta(s) enviada(s), aguardando fechamento`}
            >
              <ul className="divide-y divide-tds-border">
                {pipeline.map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white">{p.cliente.nome}</p>
                      <p className="text-xs text-slate-500">
                        {p.cliente.empresa} • Enviada em {p.data}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-tds-green">
                        {formatBRL(p.preco)}
                      </p>
                      {p.mensalidade && (
                        <p className="text-[10px] text-slate-400">
                          + {formatBRL(p.mensalidade)}/mês
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-tds-border pt-3 flex justify-between text-sm">
                <span className="text-slate-400">Valor total do pipeline</span>
                <span className="font-bold text-tds-green-bright">
                  {formatBRL(valorPipeline)}
                </span>
              </div>
            </Card>
          </section>
        )}

        {/* Instruções de como editar */}
        <section className="rounded-xl border border-tds-border bg-tds-panel/40 p-6">
          <h2 className="text-base font-semibold text-white">
            Como registrar um pagamento recebido
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            <li>
              Abra{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                src/data/financeiro.ts
              </code>
            </li>
            <li>
              No array <code className="text-tds-green">pagamentos</code>,
              adicione uma linha:{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-[10px] text-tds-green">
                {`{ contratoId: "bruna-001", numero: 3, dataPagamento: "2026-06-20" }`}
              </code>
            </li>
            <li>
              Commit + push e o painel atualiza automaticamente após o redeploy
            </li>
          </ol>
          <p className="mt-3 text-xs text-slate-500">
            Em breve: formulário para registrar pagamentos direto pelo painel.
          </p>
        </section>
      </main>
    </div>
  );
}

function Kpi({
  label,
  valor,
  hint,
  cor,
  alert,
}: {
  label: string;
  valor: string;
  hint?: string;
  cor: string;
  alert?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-tds-panel p-5 shadow-sm ${
        alert ? "border-red-500/40 ring-1 ring-red-500/20" : "border-tds-border"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${cor}`}>{valor}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  danger,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-tds-panel shadow-sm ${
        danger ? "border-red-500/40" : "border-tds-border"
      }`}
    >
      <div className="border-b border-tds-border px-5 py-3">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      <div className="px-5 py-3">{children}</div>
    </div>
  );
}

function ParcelaRow({ parcela, hoje }: { parcela: Parcela; hoje: string }) {
  const dias = diasEntre(hoje, parcela.vencimento);
  const dataInfo =
    parcela.status === "atrasado"
      ? `Atrasada ${Math.abs(dias)} dia(s)`
      : `Vence em ${dias} dia(s)`;
  return (
    <li className="flex items-center justify-between py-3">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white">
            {parcela.clienteNome}
          </p>
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${badgeStatusParcela[parcela.status]}`}
          >
            {labelStatusParcela[parcela.status]}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Parcela {parcela.numero}/{parcela.total} • {formatDate(parcela.vencimento)}
          {" "}• {dataInfo}
        </p>
      </div>
      <p className="text-sm font-bold text-white">{formatBRL(parcela.valor)}</p>
    </li>
  );
}
