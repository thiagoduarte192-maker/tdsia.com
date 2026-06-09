"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin/propostas", label: "Propostas" },
  { href: "/admin/financeiro", label: "Financeiro" },
];

export default function AdminHeader() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-tds-border bg-tds-panel/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/propostas" aria-label="Admin TDS — Página inicial">
              <Image
                src="/tds-logo.png"
                alt="TDS Soluções Digitais"
                width={1098}
                height={375}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <span className="hidden rounded-full border border-tds-green/30 bg-tds-green/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-tds-green sm:inline-block">
              Admin
            </span>
          </div>
          <form action="/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-md border border-tds-border bg-tds-bg px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-tds-green hover:text-tds-green"
            >
              Sair
            </button>
          </form>
        </div>
        <nav className="flex gap-1 -mb-px">
          {nav.map((item) => {
            const active = path.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-tds-green text-tds-green-bright"
                    : "border-transparent text-slate-400 hover:text-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
