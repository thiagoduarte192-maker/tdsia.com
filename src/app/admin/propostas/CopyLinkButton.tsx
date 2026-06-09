"use client";

import { useState } from "react";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${window.location.origin}/proposta/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignora
    }
  };

  return (
    <button
      onClick={copy}
      className="rounded-md border border-tds-green/40 bg-tds-green/10 px-3 py-1.5 text-xs font-medium text-tds-green hover:bg-tds-green/20"
    >
      {copied ? "Copiado!" : "Copiar link"}
    </button>
  );
}
