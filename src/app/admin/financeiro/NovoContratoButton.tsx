"use client";

import { useState, useTransition } from "react";
import { criarContrato } from "./actions";

export default function NovoContratoButton() {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (fd: FormData) => {
    setErro(null);
    startTransition(async () => {
      const r = await criarContrato(fd);
      if (r.ok) {
        setOpen(false);
      } else {
        setErro(r.error);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-tds-green px-4 py-2 text-sm font-semibold text-tds-bg shadow-lg shadow-tds-green/20 hover:bg-tds-green-bright"
      >
        + Novo contrato
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-tds-border bg-tds-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-tds-border px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-white">Novo contrato</h3>
                <p className="text-xs text-slate-400">
                  Cadastre um cliente que fechou o serviço
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
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome do cliente" required>
                  <input
                    name="clienteNome"
                    required
                    placeholder="Bruna Abdenur"
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  />
                </Field>
                <Field label="Empresa / Clínica">
                  <input
                    name="clienteEmpresa"
                    placeholder="Clínica Dermatológica"
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  />
                </Field>
              </div>

              <Field
                label="Slug da proposta"
                hint="Opcional. Conecta com a proposta enviada. Ex: bruna, gustavo"
              >
                <input
                  name="clienteSlug"
                  placeholder="gustavo"
                  className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                />
              </Field>

              <Field label="Descrição do projeto" required>
                <textarea
                  name="projeto"
                  required
                  rows={2}
                  placeholder="Automação Clínica — Feegow + 5 fluxos WhatsApp"
                  className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Valor total (R$)" required>
                  <input
                    name="valorTotal"
                    required
                    placeholder="6000,00"
                    inputMode="decimal"
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  />
                </Field>
                <Field label="Nº de parcelas" required>
                  <input
                    name="numeroParcelas"
                    required
                    type="number"
                    min={1}
                    max={48}
                    defaultValue={1}
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  />
                </Field>
                <Field label="Método" required>
                  <select
                    name="metodo"
                    defaultValue="PIX"
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Boleto">Boleto</option>
                    <option value="Cartão">Cartão</option>
                    <option value="Transferência">Transferência</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Data da 1ª parcela" required>
                  <input
                    name="dataInicio"
                    required
                    type="date"
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none [color-scheme:dark]"
                  />
                </Field>
                <Field label="Dia de vencimento das demais" required>
                  <input
                    name="diaVencimento"
                    required
                    type="number"
                    min={1}
                    max={31}
                    defaultValue={20}
                    className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                  />
                </Field>
              </div>

              <Field label="Observações">
                <textarea
                  name="observacoes"
                  rows={2}
                  placeholder="PIX recorrente todo dia 20"
                  className="w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none"
                />
              </Field>

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
                  {pending ? "Salvando..." : "Cadastrar contrato"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  children,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-[10px] text-slate-500">{hint}</p>}
    </div>
  );
}
