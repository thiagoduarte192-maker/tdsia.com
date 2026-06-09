"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/#sobre", label: "Quem somos" },
  { href: "/#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-tds-border bg-tds-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:block">
            <p className="font-semibold text-white leading-tight">
              TDS <span className="text-tds-green">Soluções Digitais</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Automação · Dados · WhatsApp · IA
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-tds-panel hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-tds-green px-4 py-2 text-sm font-semibold text-tds-bg hover:bg-tds-green-bright"
          >
            Fale conosco
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-md border border-tds-border p-2 text-slate-300 hover:bg-tds-panel"
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-tds-border bg-tds-panel">
          <div className="mx-auto max-w-6xl px-6 py-3 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-tds-bg hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tds-green text-tds-bg shadow-lg shadow-tds-green/20">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a4 4 0 0 0-4 4v1H7a3 3 0 0 0-3 3v1H3a2 2 0 1 0 0 4h1v1a3 3 0 0 0 3 3h1v1a4 4 0 0 0 8 0v-1h1a3 3 0 0 0 3-3v-1h1a2 2 0 1 0 0-4h-1v-1a3 3 0 0 0-3-3h-1V6a4 4 0 0 0-4-4zm0 5a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v1a2 2 0 0 1-4 0v-1H9a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1V9a2 2 0 0 1 2-2z" />
      </svg>
    </div>
  );
}
