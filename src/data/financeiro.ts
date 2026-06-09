import "server-only";
import { eq, asc } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export type MetodoPagamento = "PIX" | "Boleto" | "Cartão" | "Transferência";
export type StatusContrato = "ativo" | "concluido" | "cancelado";
export type StatusParcela = "pago" | "pendente" | "atrasado" | "futuro";

export type Contrato = {
  id: number;
  clienteSlug?: string | null;
  clienteNome: string;
  clienteEmpresa?: string | null;
  projeto: string;
  valorTotal: number;
  metodo: MetodoPagamento;
  diaVencimento: number;
  dataInicio: string;
  numeroParcelas: number;
  status: StatusContrato;
  observacoes?: string | null;
};

export type Pagamento = {
  id: number;
  contratoId: number;
  numero: number;
  dataPagamento: string;
  valor?: number | null;
  metodo?: MetodoPagamento | null;
  observacao?: string | null;
};

export type Parcela = {
  id: string;
  contratoId: number;
  clienteNome: string;
  projeto: string;
  numero: number;
  total: number;
  valor: number;
  vencimento: string;
  pagamento?: string;
  status: StatusParcela;
};

/* ============================================================
 * Helpers de data e formatação
 * ========================================================== */

export function getHoje(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function diasEntre(de: string, ate: string): number {
  const t = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((t(ate) - t(de)) / (1000 * 60 * 60 * 24));
}

function addMeses(iso: string, n: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const totalMonth = m - 1 + n;
  const novoAno = y + Math.floor(totalMonth / 12);
  const novoMes = ((totalMonth % 12) + 12) % 12;
  const ultimoDiaMes = new Date(Date.UTC(novoAno, novoMes + 1, 0)).getUTCDate();
  const novoDia = Math.min(d, ultimoDiaMes);
  return `${novoAno}-${String(novoMes + 1).padStart(2, "0")}-${String(
    novoDia
  ).padStart(2, "0")}`;
}

/* ============================================================
 * Acesso ao banco
 * ========================================================== */

export async function listarContratos(): Promise<Contrato[]> {
  const rows = await db
    .select()
    .from(schema.contratos)
    .orderBy(asc(schema.contratos.dataInicio));

  return rows.map((r) => ({
    id: r.id,
    clienteSlug: r.clienteSlug,
    clienteNome: r.clienteNome,
    clienteEmpresa: r.clienteEmpresa,
    projeto: r.projeto,
    valorTotal: Number(r.valorTotal),
    metodo: r.metodo as MetodoPagamento,
    diaVencimento: r.diaVencimento,
    dataInicio: r.dataInicio,
    numeroParcelas: r.numeroParcelas,
    status: r.status as StatusContrato,
    observacoes: r.observacoes,
  }));
}

export async function listarPagamentos(): Promise<Pagamento[]> {
  const rows = await db
    .select()
    .from(schema.pagamentos)
    .orderBy(asc(schema.pagamentos.dataPagamento));

  return rows.map((r) => ({
    id: r.id,
    contratoId: r.contratoId,
    numero: r.numero,
    dataPagamento: r.dataPagamento,
    valor: r.valor ? Number(r.valor) : null,
    metodo: r.metodo as MetodoPagamento | null,
    observacao: r.observacao,
  }));
}

export async function getPagamentoExistente(
  contratoId: number,
  numero: number
): Promise<Pagamento | null> {
  const rows = await db
    .select()
    .from(schema.pagamentos)
    .where(eq(schema.pagamentos.contratoId, contratoId));
  const p = rows.find((r) => r.numero === numero);
  return p
    ? {
        id: p.id,
        contratoId: p.contratoId,
        numero: p.numero,
        dataPagamento: p.dataPagamento,
        valor: p.valor ? Number(p.valor) : null,
        metodo: p.metodo as MetodoPagamento | null,
        observacao: p.observacao,
      }
    : null;
}

/* ============================================================
 * Lógica de parcelas (calcula sob demanda)
 * ========================================================== */

export function gerarParcelas(
  contrato: Contrato,
  pagamentos: Pagamento[],
  hoje: string
): Parcela[] {
  const valorParcela = contrato.valorTotal / contrato.numeroParcelas;
  const parcelas: Parcela[] = [];
  const pagamentosDoContrato = pagamentos.filter(
    (p) => p.contratoId === contrato.id
  );

  for (let i = 0; i < contrato.numeroParcelas; i++) {
    const numero = i + 1;
    const vencimento = addMeses(contrato.dataInicio, i);
    const pagamento = pagamentosDoContrato.find((p) => p.numero === numero);

    let status: StatusParcela;
    if (pagamento) {
      status = "pago";
    } else if (vencimento < hoje) {
      status = "atrasado";
    } else if (diasEntre(hoje, vencimento) <= 30) {
      status = "pendente";
    } else {
      status = "futuro";
    }

    parcelas.push({
      id: `${contrato.id}-p${numero}`,
      contratoId: contrato.id,
      clienteNome: contrato.clienteNome,
      projeto: contrato.projeto,
      numero,
      total: contrato.numeroParcelas,
      valor: pagamento?.valor ?? valorParcela,
      vencimento,
      pagamento: pagamento?.dataPagamento,
      status,
    });
  }
  return parcelas;
}

export type ResumoFinanceiro = {
  recebidoTotal: number;
  recebidoMes: number;
  recebidoAno: number;
  aReceber30d: number;
  aReceber12m: number;
  atrasado: number;
  mrr: number;
  totalContratos: number;
  contratosAtivos: number;
};

export type DashboardData = {
  hoje: string;
  contratos: Contrato[];
  parcelas: Parcela[];
  resumo: ResumoFinanceiro;
  receitaPorMes: { mes: string; recebido: number; previsto: number }[];
};

export async function carregarDashboard(): Promise<DashboardData> {
  const hoje = getHoje();
  const [contratos, pagamentos] = await Promise.all([
    listarContratos(),
    listarPagamentos(),
  ]);

  const parcelas = contratos.flatMap((c) =>
    gerarParcelas(c, pagamentos, hoje)
  );

  const dataLimit30d = addMeses(hoje, 1);
  const dataLimit12m = addMeses(hoje, 12);
  const inicioMes = hoje.slice(0, 7) + "-01";
  const inicioAno = hoje.slice(0, 4) + "-01-01";

  const resumo: ResumoFinanceiro = {
    recebidoTotal: parcelas
      .filter((p) => p.status === "pago")
      .reduce((s, p) => s + p.valor, 0),
    recebidoMes: parcelas
      .filter(
        (p) => p.status === "pago" && p.pagamento && p.pagamento >= inicioMes
      )
      .reduce((s, p) => s + p.valor, 0),
    recebidoAno: parcelas
      .filter(
        (p) => p.status === "pago" && p.pagamento && p.pagamento >= inicioAno
      )
      .reduce((s, p) => s + p.valor, 0),
    aReceber30d: parcelas
      .filter(
        (p) =>
          p.status !== "pago" &&
          p.vencimento >= hoje &&
          p.vencimento <= dataLimit30d
      )
      .reduce((s, p) => s + p.valor, 0),
    aReceber12m: parcelas
      .filter(
        (p) =>
          p.status !== "pago" &&
          p.vencimento >= hoje &&
          p.vencimento <= dataLimit12m
      )
      .reduce((s, p) => s + p.valor, 0),
    atrasado: parcelas
      .filter((p) => p.status === "atrasado")
      .reduce((s, p) => s + p.valor, 0),
    mrr: 0,
    totalContratos: contratos.length,
    contratosAtivos: contratos.filter((c) => c.status === "ativo").length,
  };

  const receitaPorMes = montarReceitaPorMes(parcelas, hoje, 6, 6);

  return { hoje, contratos, parcelas, resumo, receitaPorMes };
}

function montarReceitaPorMes(
  parcelas: Parcela[],
  hoje: string,
  mesesAtras: number,
  mesesAFrente: number
): { mes: string; recebido: number; previsto: number }[] {
  const out: { mes: string; recebido: number; previsto: number }[] = [];
  const [y, m] = hoje.split("-").map(Number);
  const nomes = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  for (let i = -mesesAtras; i < mesesAFrente; i++) {
    const totalMonth = m - 1 + i;
    const ano = y + Math.floor(totalMonth / 12);
    const mes = ((totalMonth % 12) + 12) % 12 + 1;
    const key = `${ano}-${String(mes).padStart(2, "0")}`;
    const label = `${nomes[mes - 1]}/${String(ano).slice(2)}`;

    const recebido = parcelas
      .filter((p) => p.pagamento?.startsWith(key))
      .reduce((s, p) => s + p.valor, 0);

    const previsto = parcelas
      .filter((p) => p.status !== "pago" && p.vencimento.startsWith(key))
      .reduce((s, p) => s + p.valor, 0);

    out.push({ mes: label, recebido, previsto });
  }
  return out;
}

export function progressoContrato(contrato: Contrato, parcelas: Parcela[]) {
  const parcelasDoContrato = parcelas.filter(
    (p) => p.contratoId === contrato.id
  );
  const pagas = parcelasDoContrato.filter((p) => p.status === "pago");
  const valorPago = pagas.reduce((s, p) => s + p.valor, 0);
  return {
    parcelasPagas: pagas.length,
    parcelasTotal: contrato.numeroParcelas,
    valorPago,
    valorRestante: contrato.valorTotal - valorPago,
    percentual: Math.round((valorPago / contrato.valorTotal) * 100),
    proximaParcela: parcelasDoContrato.find((p) => p.status !== "pago"),
  };
}

export const labelStatusParcela: Record<StatusParcela, string> = {
  pago: "Pago",
  pendente: "A vencer",
  atrasado: "Atrasado",
  futuro: "Futuro",
};

export const badgeStatusParcela: Record<StatusParcela, string> = {
  pago: "bg-tds-green/20 text-tds-green",
  pendente: "bg-amber-500/20 text-amber-300",
  atrasado: "bg-red-500/20 text-red-300",
  futuro: "bg-slate-500/20 text-slate-400",
};
