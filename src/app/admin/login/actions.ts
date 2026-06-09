"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/propostas");

  if (!password) {
    return { error: "Informe a senha." };
  }

  const ok = await checkPassword(password);
  if (!ok) {
    return { error: "Senha incorreta." };
  }

  const { token, expSeconds } = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: expSeconds,
    path: "/",
  });

  const safeNext = next.startsWith("/admin") ? next : "/admin/propostas";
  redirect(safeNext);
}
