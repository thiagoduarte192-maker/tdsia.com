import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsappFloat from "@/components/WhatsappFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tdsia.com"),
  title: "TDS Soluções Digitais — Automação, Dados, WhatsApp e IA",
  description:
    "Especialistas em automação de processos e inteligência de dados. Soluções sob medida para empresas que querem crescer com eficiência.",
  openGraph: {
    title: "TDS Soluções Digitais",
    description:
      "Automação · Inteligência de Dados · CRM · WhatsApp · IA. Soluções digitais sob medida.",
    url: "https://tdsia.com",
    siteName: "TDS Soluções Digitais",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/tds-avatar.png",
        width: 1024,
        height: 1024,
        alt: "TDS Soluções Digitais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TDS Soluções Digitais",
    description:
      "Automação · Inteligência de Dados · CRM · WhatsApp · IA",
    images: ["/tds-avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-tds-bg text-slate-200">
        {children}
        <WhatsappFloat />
      </body>
    </html>
  );
}
