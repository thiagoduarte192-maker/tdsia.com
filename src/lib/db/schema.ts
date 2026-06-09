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
