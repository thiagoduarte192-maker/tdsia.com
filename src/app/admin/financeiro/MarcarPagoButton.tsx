"use client";

import { useState, useTransition } from "react";
import { marcarParcelaPaga } from "./actions";

export default function MarcarPagoButton({
  contratoId,
  numero,
  total,
  clienteNome,
  valorSugerido,
  vencimentoSugerido,
}: {
  contratoId: number;
  numero: number;
  total: number;
  clienteNome: string;
  valorSugerido: string;
  vencimentoSugerido: string;
}) {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (fd: FormData) => {
    setErro(null);
    startTransition(async () => {
      const r = await marcarParcelaPaga(fd);
      if (r.ok) {
        setOpen(false);
      } else {
        setErro(r.error);
      }
    });
  };

  // valor padrão da data: hoje (formato AAAA-MM-DD)
  const hoje = new Date();
  const hojeStr = `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1
  ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-tds-green/40 bg-tds-green/10 px-3 py-1 text-[10px] font-semibold text-tds-green hover:bg-tds-green/20"
      >
        Marcar pago
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-tds-border bg-tds-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-tds-border px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Registrar pagamento
                </h3>
                <p className="text-xs text-slate-400">
                  {clienteNome} • Parcela {numero}/{total} •{" "}
                  {valorSugerido}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-tds-bg hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form action={onSubmit} className="space-y-4 px-6 py-5">
              <input type="hidden" name="contratoId" value={contratoId} />
              <input type="hidden" name="numero" value={numero} />

              <div>
                <label className="text-xs font-medium text-slate-300">
                  Data do pagamento <span className="text-red-400">*</span>
                </label>
                <input
                  name="dataPagamento"
                  type="date"
                  required
                  defaultValue={hojeStr}
                  max={hojeStr}
                  className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none [color-scheme:dark]"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  Vencimento original: {vencimentoSugerido}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300">
                  Observação
                </label>
                <input
                  name="observacao"
                  placeholder="(opcional) ex: pago via PIX agora"
                  className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                />
              </div>

              {erro && (
                <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {erro}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-tds-border pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-tds-border px-4 py-2 text-sm font-medium text-slate-300 hover:bg-tds-bg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-md bg-tds-green px-4 py-2 text-sm font-semibold text-tds-bg hover:bg-tds-green-bright disabled:opacity-50"
                >
                  {pending ? "Salvando..." : "Confirmar pagamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
