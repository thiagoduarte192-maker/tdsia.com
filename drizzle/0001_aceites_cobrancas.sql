CREATE TYPE "public"."status_aceite" AS ENUM('pendente_pagamento', 'pago', 'cancelado', 'expirado');--> statement-breakpoint
CREATE TYPE "public"."status_cobranca" AS ENUM('criada', 'aprovada', 'rejeitada', 'cancelada', 'estornada', 'pendente');--> statement-breakpoint
CREATE TABLE "aceites" (
	"id" serial PRIMARY KEY NOT NULL,
	"proposta_slug" varchar(64) NOT NULL,
	"proposta_numero" varchar(32) NOT NULL,
	"nome_completo" varchar(200) NOT NULL,
	"tipo_documento" varchar(8) NOT NULL,
	"documento" varchar(20) NOT NULL,
	"email" varchar(200) NOT NULL,
	"telefone" varchar(20),
	"valor_aceito" numeric(12, 2) NOT NULL,
	"numero_parcelas" integer DEFAULT 1 NOT NULL,
	"ip" varchar(45),
	"user_agent" text,
	"termos_aceitos" text,
	"status" "status_aceite" DEFAULT 'pendente_pagamento' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "cobrancas" (
	"id" serial PRIMARY KEY NOT NULL,
	"aceite_id" integer NOT NULL,
	"metodo" varchar(16) NOT NULL,
	"parcelas" integer DEFAULT 1 NOT NULL,
	"valor" numeric(12, 2) NOT NULL,
	"mp_preference_id" varchar(100),
	"mp_payment_id" varchar(100),
	"mp_status" varchar(32),
	"mp_status_detail" varchar(100),
	"mp_payload" jsonb,
	"status" "status_cobranca" DEFAULT 'criada' NOT NULL,
	"paga_em" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cobrancas" ADD CONSTRAINT "cobrancas_aceite_id_aceites_id_fk" FOREIGN KEY ("aceite_id") REFERENCES "public"."aceites"("id") ON DELETE cascade ON UPDATE no action;