import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  date,
  timestamp,
  numeric,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const metodoEnum = pgEnum("metodo_pagamento", [
  "PIX",
  "Boleto",
  "Cartão",
  "Transferência",
]);

export const statusContratoEnum = pgEnum("status_contrato", [
  "ativo",
  "concluido",
  "cancelado",
]);

export const contratos = pgTable("contratos", {
  id: serial("id").primaryKey(),
  clienteSlug: varchar("cliente_slug", { length: 64 }),
  clienteNome: varchar("cliente_nome", { length: 200 }).notNull(),
  clienteEmpresa: varchar("cliente_empresa", { length: 200 }),
  projeto: text("projeto").notNull(),
  valorTotal: numeric("valor_total", { precision: 12, scale: 2 }).notNull(),
  metodo: metodoEnum("metodo").notNull().default("PIX"),
  diaVencimento: integer("dia_vencimento").notNull(),
  dataInicio: date("data_inicio").notNull(),
  numeroParcelas: integer("numero_parcelas").notNull(),
  status: statusContratoEnum("status").notNull().default("ativo"),
  observacoes: text("observacoes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pagamentos = pgTable("pagamentos", {
  id: serial("id").primaryKey(),
  contratoId: integer("contrato_id")
    .notNull()
    .references(() => contratos.id, { onDelete: "cascade" }),
  numero: integer("numero").notNull(),
  dataPagamento: date("data_pagamento").notNull(),
  valor: numeric("valor", { precision: 12, scale: 2 }),
  metodo: metodoEnum("metodo"),
  observacao: text("observacao"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ContratoRow = typeof contratos.$inferSelect;
export type ContratoInsert = typeof contratos.$inferInsert;
export type PagamentoRow = typeof pagamentos.$inferSelect;
export type PagamentoInsert = typeof pagamentos.$inferInsert;

/* ============================================================
 * Aceite formal da proposta + Cobrança via gateway
 * ========================================================== */

export const statusAceiteEnum = pgEnum("status_aceite", [
  "pendente_pagamento",
  "pago",
  "cancelado",
  "expirado",
]);

export const aceites = pgTable("aceites", {
  id: serial("id").primaryKey(),
  propostaSlug: varchar("proposta_slug", { length: 64 }).notNull(),
  propostaNumero: varchar("proposta_numero", { length: 32 }).notNull(),

  // identificação do contratante
  nomeCompleto: varchar("nome_completo", { length: 200 }).notNull(),
  tipoDocumento: varchar("tipo_documento", { length: 8 }).notNull(), // CPF | CNPJ
  documento: varchar("documento", { length: 20 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  telefone: varchar("telefone", { length: 20 }),

  // valor e parcelas no momento do aceite (snapshot)
  valorAceito: numeric("valor_aceito", { precision: 12, scale: 2 }).notNull(),
  numeroParcelas: integer("numero_parcelas").notNull().default(1),

  // prova LGPD
  ip: varchar("ip", { length: 45 }),
  userAgent: text("user_agent"),
  termosAceitos: text("termos_aceitos"), // texto literal do termo aceito

  status: statusAceiteEnum("status").notNull().default("pendente_pagamento"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const statusCobrancaEnum = pgEnum("status_cobranca", [
  "criada",
  "aprovada",
  "rejeitada",
  "cancelada",
  "estornada",
  "pendente",
]);

export const cobrancas = pgTable("cobrancas", {
  id: serial("id").primaryKey(),
  aceiteId: integer("aceite_id")
    .notNull()
    .references(() => aceites.id, { onDelete: "cascade" }),

  metodo: varchar("metodo", { length: 16 }).notNull(), // pix | cartao
  parcelas: integer("parcelas").notNull().default(1),
  valor: numeric("valor", { precision: 12, scale: 2 }).notNull(),

  mpPreferenceId: varchar("mp_preference_id", { length: 100 }),
  mpPaymentId: varchar("mp_payment_id", { length: 100 }),
  mpStatus: varchar("mp_status", { length: 32 }),
  mpStatusDetail: varchar("mp_status_detail", { length: 100 }),
  mpPayload: jsonb("mp_payload"),

  status: statusCobrancaEnum("status").notNull().default("criada"),
  pagaEm: timestamp("paga_em", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type AceiteRow = typeof aceites.$inferSelect;
export type AceiteInsert = typeof aceites.$inferInsert;
export type CobrancaRow = typeof cobrancas.$inferSelect;
export type CobrancaInsert = typeof cobrancas.$inferInsert;
