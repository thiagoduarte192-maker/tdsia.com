import Link from "next/link";
import { propostas, formatBRL } from "@/data/propostas";
import CopyLinkButton from "./CopyLinkButton";
import AdminHeader from "@/components/AdminHeader";

export const dynamic = "force-dynamic";

export default function AdminPropostasPage() {
  const lista = Object.values(propostas).sort((a, b) =>
    b.data.localeCompare(a.data)
  );
  const totalValor = lista.reduce((s, p) => s + p.preco, 0);
  const totalMrr = lista.reduce((s, p) => s + (p.mensalidade ?? 0), 0);

  return (
    <div className="min-h-screen">
      <AdminHeader />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Minhas propostas</h1>
          <p className="mt-1 text-sm text-slate-400">
            {lista.length}{" "}
            {lista.length === 1 ? "proposta cadastrada" : "propostas cadastradas"}
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Propostas ativas" value={lista.length.toString()} />
          <Stat
            label="Soma dos setups"
            value={formatBRL(totalValor)}
            accent="text-tds-green"
          />
          <Stat
            label="MRR potencial"
            value={`${formatBRL(totalMrr)}/mês`}
            accent="text-tds-green-bright"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-tds-border bg-tds-panel shadow-2xl">
          <table className="w-full text-sm">
            <thead className="border-b border-tds-border bg-tds-bg/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3">Proposta</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Data</th>
                <th className="px-5 py-3 text-right">Setup</th>
                <th className="px-5 py-3 text-right">Mensalidade</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-tds-border">
              {lista.map((p) => (
                <tr key={p.slug} className="hover:bg-tds-bg/50">
                  <td className="px-5 py-3">
                    <p className="font-mono text-xs text-tds-green">
                      #{p.numero}
                    </p>
                    <p className="text-xs text-slate-500">{p.segmento}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-white">{p.cliente.nome}</p>
                    <p className="text-xs text-slate-500">
                      {p.cliente.empresa ?? "—"}
                    </p>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-300">
                    {p.data}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-white whitespace-nowrap">
                    {formatBRL(p.preco)}
                  </td>
                  <td className="px-5 py-3 text-right text-slate-300 whitespace-nowrap">
                    {p.mensalidade ? `${formatBRL(p.mensalidade)}/mês` : "—"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/proposta/${p.slug}`}
                        target="_blank"
                        className="rounded-md border border-tds-border bg-tds-bg px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-tds-green hover:text-tds-green"
                      >
                        Abrir ↗
                      </Link>
                      <CopyLinkButton slug={p.slug} />
                    </div>
                  </td>
                </tr>
              ))}
              {lista.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    Nenhuma proposta cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <section
          id="nova"
          className="mt-10 rounded-xl border border-tds-border bg-tds-panel/50 p-6"
        >
          <h2 className="text-lg font-semibold text-white">
            Como adicionar uma nova proposta
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            <li>
              Edite{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                src/data/propostas.ts
              </code>{" "}
              e duplique uma entrada existente (ex:{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                gustavo
              </code>
              ), trocando slug, cliente, valores e itens
            </li>
            <li>
              Commit e push:{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                git add . &amp;&amp; git commit -m &quot;feat: proposta NOME&quot; &amp;&amp; git push
              </code>
            </li>
            <li>
              No VPS, rebuild:{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                cd /root/tds-site &amp;&amp; git pull &amp;&amp; npm run build &amp;&amp; pm2 restart tds-site
              </code>
            </li>
            <li>
              Pronto:{" "}
              <code className="rounded bg-tds-bg px-2 py-0.5 font-mono text-xs text-tds-green">
                tdsia.com/proposta/SLUG
              </code>
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  accent = "text-white",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-tds-border bg-tds-panel p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
