import { notFound } from "next/navigation";
import { propostas } from "@/data/propostas";
import PropostaView from "./PropostaView";

export async function generateStaticParams() {
  return Object.keys(propostas).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/proposta/[slug]">
) {
  const { slug } = await props.params;
  const p = propostas[slug];
  if (!p) return { title: "Proposta — TDS Soluções Digitais" };
  return {
    title: `Proposta para ${p.cliente.nome} — TDS Soluções Digitais`,
    description: `Proposta comercial #${p.numero} preparada pela TDS Soluções Digitais.`,
  };
}

export default async function PropostaPage(
  props: PageProps<"/proposta/[slug]">
) {
  const { slug } = await props.params;
  const proposta = propostas[slug];
  if (!proposta) notFound();
  return <PropostaView proposta={proposta} />;
}
