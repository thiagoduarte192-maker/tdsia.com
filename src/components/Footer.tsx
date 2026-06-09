import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-tds-border bg-tds-bg">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">
              TDS <span className="text-tds-green">Soluções Digitais</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Automação · Inteligência de Dados · CRM · WhatsApp · IA
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Navegação
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              <li><Link href="/#servicos" className="hover:text-tds-green">Serviços</Link></li>
              <li><Link href="/#diferenciais" className="hover:text-tds-green">Diferenciais</Link></li>
              <li><Link href="/#contato" className="hover:text-tds-green">Contato</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Contato
            </p>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              <li>tdsautomacoesia@gmail.com</li>
              <li>WhatsApp: (11) 99999-9999</li>
              <li>tdsia.com</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-tds-border pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TDS Soluções Digitais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
