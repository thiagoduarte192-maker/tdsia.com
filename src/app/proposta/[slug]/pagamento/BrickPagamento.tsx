"use client";

import { useEffect, useState } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

type Props = {
  preferenceId: string;
  valor: number;
  parcelas: number;
  publicKey: string;
};

let mpInitialized = false;

export default function BrickPagamento({
  preferenceId,
  valor,
  parcelas,
  publicKey,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mpInitialized) {
      initMercadoPago(publicKey, { locale: "pt-BR" });
      mpInitialized = true;
    }
    setReady(true);
  }, [publicKey]);

  if (!ready) {
    return (
      <div className="rounded-xl border border-tds-border bg-tds-panel p-12 text-center text-sm text-slate-400">
        Carregando opções de pagamento...
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-1">
      <Payment
        initialization={{
          amount: valor,
          preferenceId,
        }}
        customization={{
          paymentMethods: {
            creditCard: "all",
            bankTransfer: ["pix"],
            maxInstallments: parcelas,
          },
          visual: {
            style: {
              theme: "default",
            },
          },
        }}
        onSubmit={async () => {
          // Como usamos preference_id, o MP processa o pagamento sozinho.
          // Esse onSubmit não precisa fazer nada — o webhook é quem decide.
        }}
        onReady={() => {
          // pronto pra interação
        }}
        onError={(error) => {
          console.error("[MP Brick] erro:", error);
        }}
      />
    </div>
  );
}
