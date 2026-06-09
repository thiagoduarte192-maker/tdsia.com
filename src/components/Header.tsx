"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" aria-label="TDS Soluções Digitais — Página inicial" className="flex items-center">
          <Image
            src="/tds-logo.png"
            alt="TDS Soluções Digitais"
            width={1098}
            height={375}
            priority
            className="h-12 w-auto sm:h-14"
          />
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
            href="https://wa.me/5521965269795"
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
