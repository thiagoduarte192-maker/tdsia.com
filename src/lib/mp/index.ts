import "server-only";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

let _client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (!_client) {
    const token = process.env.MP_ACCESS_TOKEN;
    if (!token) throw new Error("MP_ACCESS_TOKEN não configurado");
    _client = new MercadoPagoConfig({
      accessToken: token,
      options: { timeout: 10000 },
    });
  }
  return _client;
}

export function getPreferenceClient(): Preference {
  return new Preference(getClient());
}

export function getPaymentClient(): Payment {
  return new Payment(getClient());
}

export function getPublicBaseUrl(): string {
  // Em produção usa o domínio. Em dev, pode ser sobrescrito por env.
  return process.env.PUBLIC_BASE_URL ?? "https://tdsia.com";
}
