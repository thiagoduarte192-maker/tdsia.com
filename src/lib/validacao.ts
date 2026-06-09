/* ============================================================
 * Validação de CPF/CNPJ + e-mail + telefone
 * ========================================================== */

export function apenasDigitos(v: string): string {
  return (v ?? "").replace(/\D/g, "");
}

export function validarCPF(cpf: string): boolean {
  const d = apenasDigitos(cpf);
  if (d.length !== 11) return false;
  if (/^(\d)\1+$/.test(d)) return false;

  const calc = (slice: string, mult: number) =>
    slice
      .split("")
      .reduce((s, ch, i) => s + Number(ch) * (mult - i), 0);

  const r1 = (calc(d.slice(0, 9), 10) * 10) % 11;
  if ((r1 === 10 ? 0 : r1) !== Number(d[9])) return false;
  const r2 = (calc(d.slice(0, 10), 11) * 10) % 11;
  if ((r2 === 10 ? 0 : r2) !== Number(d[10])) return false;
  return true;
}

export function validarCNPJ(cnpj: string): boolean {
  const d = apenasDigitos(cnpj);
  if (d.length !== 14) return false;
  if (/^(\d)\1+$/.test(d)) return false;

  const calc = (slice: string, pesos: number[]) =>
    slice.split("").reduce((s, ch, i) => s + Number(ch) * pesos[i], 0);

  const p1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const p2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const r1 = calc(d.slice(0, 12), p1) % 11;
  if ((r1 < 2 ? 0 : 11 - r1) !== Number(d[12])) return false;
  const r2 = calc(d.slice(0, 13), p2) % 11;
  if ((r2 < 2 ? 0 : 11 - r2) !== Number(d[13])) return false;
  return true;
}

export function validarDocumento(doc: string): {
  tipo: "CPF" | "CNPJ";
  ok: boolean;
} {
  const d = apenasDigitos(doc);
  if (d.length === 11) return { tipo: "CPF", ok: validarCPF(d) };
  if (d.length === 14) return { tipo: "CNPJ", ok: validarCNPJ(d) };
  return { tipo: d.length > 11 ? "CNPJ" : "CPF", ok: false };
}

export function formatarCPF(v: string): string {
  const d = apenasDigitos(v).slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatarCNPJ(v: string): string {
  const d = apenasDigitos(v).slice(0, 14);
  return d
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export function formatarDocumento(v: string): string {
  const d = apenasDigitos(v);
  return d.length <= 11 ? formatarCPF(d) : formatarCNPJ(d);
}

export function formatarTelefone(v: string): string {
  const d = apenasDigitos(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return d.replace(/(\d{2})(\d+)/, "($1) $2");
  if (d.length <= 10)
    return d.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  return d.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
}

export function validarEmail(e: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((e ?? "").trim());
}
