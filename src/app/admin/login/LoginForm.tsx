"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { loginAction } from "./actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin/propostas";
  const [erro, setErro] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    setErro(null);
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) setErro(res.error);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Image
            src="/tds-logo.png"
            alt="TDS Soluções Digitais"
            width={1098}
            height={375}
            priority
            className="h-14 w-auto"
          />
        </div>

        <div className="rounded-2xl border border-tds-border bg-tds-panel p-6 shadow-2xl">
          <h1 className="text-xl font-bold text-white">Área administrativa</h1>
          <p className="mt-1 text-sm text-slate-400">
            Acesso restrito. Informe sua senha para continuar.
          </p>

          <form action={onSubmit} className="mt-5 space-y-3">
            <input type="hidden" name="next" value={next} />
            <div>
              <label
                htmlFor="password"
                className="text-xs font-medium text-slate-300"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                disabled={pending}
                className="mt-1 w-full rounded-md border border-tds-border bg-tds-bg px-3 py-2 text-sm text-white focus:border-tds-green focus:outline-none disabled:opacity-50"
              />
            </div>

            {erro && (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-tds-green px-4 py-2.5 text-sm font-bold text-tds-bg shadow-lg shadow-tds-green/20 hover:bg-tds-green-bright disabled:opacity-50"
            >
              {pending ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          Apenas administradores autorizados
        </p>
      </div>
    </div>
  );
}
