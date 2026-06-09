CREATE TYPE "public"."metodo_pagamento" AS ENUM('PIX', 'Boleto', 'Cartão', 'Transferência');--> statement-breakpoint
CREATE TYPE "public"."status_contrato" AS ENUM('ativo', 'concluido', 'cancelado');--> statement-breakpoint
CREATE TABLE "contratos" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_slug" varchar(64),
	"cliente_nome" varchar(200) NOT NULL,
	"cliente_empresa" varchar(200),
	"projeto" text NOT NULL,
	"valor_total" numeric(12, 2) NOT NULL,
	"metodo" "metodo_pagamento" DEFAULT 'PIX' NOT NULL,
	"dia_vencimento" integer NOT NULL,
	"data_inicio" date NOT NULL,
	"numero_parcelas" integer NOT NULL,
	"status" "status_contrato" DEFAULT 'ativo' NOT NULL,
	"observacoes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagamentos" (
	"id" serial PRIMARY KEY NOT NULL,
	"contrato_id" integer NOT NULL,
	"numero" integer NOT NULL,
	"data_pagamento" date NOT NULL,
	"valor" numeric(12, 2),
	"metodo" "metodo_pagamento",
	"observacao" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_contrato_id_contratos_id_fk" FOREIGN KEY ("contrato_id") REFERENCES "public"."contratos"("id") ON DELETE cascade ON UPDATE no action;