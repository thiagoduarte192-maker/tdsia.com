export type MetodoPagamento = "PIX" | "Boleto" | "Cartão" | "Transferência";
export type StatusContrato = "ativo" | "concluido" | "cancelado";
export type StatusParcela = "pago" | "pendente" | "atrasado" | "futuro";

export type Contrato = {
  id: string;
  clienteSlug?: string; // se vem de uma proposta cadastrada
  clienteNome: string;
  clienteEmpresa?: string;
  projeto: string;
  valorTotal: number;
  metodo: MetodoPagamento;
  diaVencimento: number;
  dataInicio: string; // ISO YYYY-MM-DD da primeira parcela
  numeroParcelas: number;
  status: StatusContrato;
  observacoes?: string;
};

export type Pagamento = {
  contratoId: string;
  numero: number; // número da parcela paga
  dataPagamento: string; // ISO YYYY-MM-DD
  valor?: number; // se diferente do valor da parcela
  metodo?: MetodoPagamento; // se diferente do método do contrato
  observacao?: string;
};

export type Parcela = {
  id: string;
  contratoId: string;
  clienteNome: string;
  projeto: string;
  numero: number;
  total: number;
  valor: number;
  vencimento: string;
  pagamento?: string;
  status: StatusParcela;
};

const HOJE = "2026-06-09"; // congelar pra desenvolvimento consistente

/* ============================================================
 * CONTRATOS — fonte da verdade do que foi fechado com clientes
 * Para adicionar novo cliente: duplique uma entrada e ajuste os
 * valores. Para registrar pagamento: adicione em "pagamentos".
 * ========================================================== */

export const contratos: Contrato[] = [
  {
    id: "bruna-001",
    clienteSlug: "bruna",
    clienteNome: "Bruna Abdenur",
    clienteEmpresa: "Clínica Dermatológica",
    projeto: "Automação Clínica — Feegow + 5 fluxos WhatsApp",
    valorTotal: 6000,
    metodo: "PIX",
    diaVencimento: 20,
    dataInicio: "2026-04-20",
    numeroParcelas: 6,
    status: "ativo",
    observacoes: "PIX recorrente todo dia 20",
  },
];

/* ============================================================
 * PAGAMENTOS — só os RECEBIDOS de fato
 * Cada vez que receber um PIX, adicione uma linha aqui.
 * ========================================================== */

export const pagamentos: Pagamento[] = [
  // Bruna - parcelas 1 e 2 já pagas
  {
    contratoId: "bruna-001",
    numero: 1,
    dataPagamento: "2026-04-20",
  },
  {
    contratoId: "bruna-001",
    numero: 2,
    dataPagamento: "2026-05-20",
  },
];

/* ============================================================
 * HELPERS
 * ========================================================== */

export function getHoje(): string {
  return HOJE;
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

export function gerarParcelas(contrato: Contrato, hoje = HOJE): Parcela[] {
  const valorParcela = contrato.valorTotal / contrato.numeroParcelas;
  const parcelas: Parcela[] = [];

  for (let i = 0; i < contrato.numeroParcelas; i++) {
    const numero = i + 1;
    const vencimento = addMeses(contrato.dataInicio, i);
    const pagamento = pagamentos.find(
      (p) => p.contratoId === contrato.id && p.numero === numero
    );

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

export function todasAsParcelas(hoje = HOJE): Parcela[] {
  return contratos.flatMap((c) => gerarParcelas(c, hoje));
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

export function calcularResumo(hoje = HOJE): ResumoFinanceiro {
  const parcelas = todasAsParcelas(hoje);
  const dataLimit30d = addMeses(hoje, 1);
  const dataLimit12m = addMeses(hoje, 12);
  const inicioMes = hoje.slice(0, 7) + "-01";
  const inicioAno = hoje.slice(0, 4) + "-01-01";

  return {
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
    mrr: 0, // Bruna não tem; cálculo será adicionado quando houver contratos recorrentes
    totalContratos: contratos.length,
    contratosAtivos: contratos.filter((c) => c.status === "ativo").length,
  };
}

export function receitaPorMes(
  mesesAtras = 6,
  mesesAFrente = 6,
  hoje = HOJE
): { mes: string; recebido: number; previsto: number }[] {
  const todas = todasAsParcelas(hoje);
  const resultado: { mes: string; recebido: number; previsto: number }[] = [];
  const [y, m] = hoje.split("-").map(Number);

  for (let i = -mesesAtras; i < mesesAFrente; i++) {
    const totalMonth = m - 1 + i;
    const ano = y + Math.floor(totalMonth / 12);
    const mes = ((totalMonth % 12) + 12) % 12 + 1;
    const key = `${ano}-${String(mes).padStart(2, "0")}`;
    const label =
      ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][
        mes - 1
      ] +
      "/" +
      String(ano).slice(2);

    const recebido = todas
      .filter((p) => p.pagamento?.startsWith(key))
      .reduce((s, p) => s + p.valor, 0);

    const previsto = todas
      .filter(
        (p) => p.status !== "pago" && p.vencimento.startsWith(key)
      )
      .reduce((s, p) => s + p.valor, 0);

    resultado.push({ mes: label, recebido, previsto });
  }
  return resultado;
}

export function progressoContrato(contrato: Contrato, hoje = HOJE) {
  const parcelas = gerarParcelas(contrato, hoje);
  const pagas = parcelas.filter((p) => p.status === "pago");
  const valorPago = pagas.reduce((s, p) => s + p.valor, 0);
  return {
    parcelasPagas: pagas.length,
    parcelasTotal: contrato.numeroParcelas,
    valorPago,
    valorRestante: contrato.valorTotal - valorPago,
    percentual: Math.round((valorPago / contrato.valorTotal) * 100),
    proximaParcela: parcelas.find((p) => p.status !== "pago"),
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
