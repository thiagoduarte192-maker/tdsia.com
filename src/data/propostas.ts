export type Proposta = {
  slug: string;
  numero: string;
  cliente: {
    nome: string;
    empresa?: string;
    cargo?: string;
  };
  segmento: string;
  data: string;
  validade: string;
  preco: number;
  parcelas: { entrada: number; entregaPct: number };
  mensalidade: number;
  prazoSemanas: number;
  carta: string[];
  dores: { titulo: string; desc: string; impacto: string }[];
  escopo: {
    sistema1: { titulo: string; subtitulo: string; itens: string[] };
    sistema2: { titulo: string; subtitulo: string; itens: string[] };
  };
  inclui: { titulo: string; desc: string }[];
  cronograma: { prazo: string; titulo: string; desc: string }[];
  roadmap: { fase: string; titulo: string; itens: string[] }[];
  whatsappLink: string;
  whatsappMensagemAceitar: string;
  whatsappMensagemDuvida: string;
};

export const propostas: Record<string, Proposta> = {
  gustavo: {
    slug: "gustavo",
    numero: "2026-001",
    cliente: {
      nome: "Gustavo",
      empresa: "Loja de Auto Peças",
      cargo: "Proprietário",
    },
    segmento: "Auto Peças B2B",
    data: "08 de Junho de 2026",
    validade: "30 dias",
    preco: 14900,
    parcelas: { entrada: 7450, entregaPct: 50 },
    mensalidade: 890,
    prazoSemanas: 4,
    carta: [
      "Conversamos sobre como melhorar a relação com seus clientes oficina e dar mais agilidade ao financeiro da sua loja. Esta proposta apresenta a solução que desenhei especificamente para o seu caso.",
      "Em vez de um sistema engessado de prateleira, você vai ter uma plataforma própria que cresce com você, integrada ao seu sistema de vendas, com sua marca e suas regras.",
    ],
    dores: [
      {
        titulo: "Telefone toca o dia inteiro",
        desc: "Oficinas ligam para perguntar 'quanto eu devo?', 'vence quando?', 'tem vale?'. Sua equipe gasta horas respondendo o que poderia ser autosserviço.",
        impacto: "~2 horas/dia perdidas",
      },
      {
        titulo: "Recebimento depende de horário comercial",
        desc: "Boleto, depósito, contato com banco. O dinheiro entra dias depois — quando deveria entrar imediatamente.",
        impacto: "Caixa lento em 5 a 10 dias",
      },
      {
        titulo: "Cobrança manual e desconfortável",
        desc: "Ligar para o cliente cobrar é constrangedor. Muitas notas vencem sem que ninguém perceba.",
        impacto: "Inadimplência mais alta",
      },
      {
        titulo: "Sem visão consolidada do negócio",
        desc: "Quem são seus melhores clientes? Quem está em atraso? Quem sumiu? Hoje a resposta está espalhada em planilhas e na cabeça das pessoas.",
        impacto: "Decisões no escuro",
      },
    ],
    escopo: {
      sistema1: {
        titulo: "Área do Cliente",
        subtitulo: "Para as oficinas que compram com você",
        itens: [
          "Login privado por CNPJ — cada oficina vê só os próprios dados",
          "Dashboard com tudo o que importa — total em aberto, vencido, saldo de vales, limite de crédito",
          "Pagar nota online — PIX (com QR Code) ou cartão de crédito em até 6x sem juros",
          "Comprovante automático — protocolo, dados da nota, envio por WhatsApp",
          "Baixar XML e DANFE direto da nota — sem precisar ligar pro financeiro",
          "Movimentações com filtro e busca — histórico de compras, pagamentos e devoluções",
          "Consulta de vales — não esquece mais o vale na gaveta",
          "Preferências de notificação — WhatsApp e e-mail",
        ],
      },
      sistema2: {
        titulo: "Painel Administrativo da Loja",
        subtitulo: "Só você e sua equipe têm acesso",
        itens: [
          "Visão geral em tempo real — total a receber, vencido, faturamento do mês",
          "Faturamento dos últimos 6 meses em gráfico visual",
          "Top 5 melhores clientes e top 5 inadimplentes em destaque",
          "Lista completa de clientes — busca, filtros por status, ordenação por compras, vencido, ticket médio",
          "Score de cada cliente (A, B, C, D) baseado em comportamento de pagamento",
          "Detalhe de cada cliente com histórico de relacionamento — todas as cobranças, ligações, promessas registradas",
          "Cobrança via WhatsApp em 1 clique — mensagem pronta, link de pagamento embutido",
          "Insights automáticos — clientes premium, inativos, em risco",
        ],
      },
    },
    inclui: [
      { titulo: "Design e UX personalizados", desc: "Sua marca, suas cores, identidade visual própria" },
      { titulo: "Integração com seu sistema", desc: "Conexão com seu ERP de vendas — notas, clientes, vales" },
      { titulo: "Login e autenticação", desc: "Cada oficina com acesso individual seguro" },
      { titulo: "Gateway de pagamento", desc: "PIX + cartão de crédito (Mercado Pago / Asaas)" },
      { titulo: "Hospedagem profissional", desc: "Servidor rápido, SSL, domínio próprio" },
      { titulo: "Painel administrativo completo", desc: "Para você gerir tudo sem depender de mim" },
      { titulo: "Treinamento da equipe", desc: "Sessão online para você e sua equipe usarem" },
      { titulo: "Manual em vídeo", desc: "Para consulta futura, onboarding de novos colaboradores" },
      { titulo: "Suporte pós-entrega", desc: "30 dias de suporte incluído. Depois, plano mensal" },
    ],
    cronograma: [
      {
        prazo: "Semana 1",
        titulo: "Levantamento e integração",
        desc: "Reunião de alinhamento, acesso ao seu sistema de vendas, mapeamento de dados, validação da identidade visual.",
      },
      {
        prazo: "Semanas 2 e 3",
        titulo: "Desenvolvimento",
        desc: "Construção da Área do Cliente, integração com pagamentos (PIX/cartão), desenvolvimento do Painel da Loja.",
      },
      {
        prazo: "Semana 4",
        titulo: "Homologação e treinamento",
        desc: "Testes com você, ajustes finais, treinamento da equipe, manual em vídeo, publicação no ar.",
      },
    ],
    roadmap: [
      {
        fase: "Fase 2",
        titulo: "Compras online",
        itens: [
          "Catálogo de produtos com preço por cliente",
          "Carrinho e pedido online",
          "Consulta de estoque em tempo real",
          "Recompra com 1 clique",
        ],
      },
      {
        fase: "Fase 3",
        titulo: "Programa de fidelidade próprio",
        itens: [
          "Substituir sistema atual de pontos",
          "Pontuação automática (sem QR de cupom)",
          "Campanhas por fornecedor e produto",
          "Catálogo de prêmios personalizado",
          "Notificações via WhatsApp",
        ],
      },
      {
        fase: "Fase 4",
        titulo: "Gestão para a oficina",
        itens: [
          "Ficha de veículo",
          "Ordem de serviço simples",
          "Lembrete de manutenção",
          "CRM básico para o mecânico",
        ],
      },
      {
        fase: "Fase 5",
        titulo: "Engajamento e indicação",
        itens: [
          "Programa indique e ganhe",
          "Stories de promoções",
          "Disparo de comunicados via WhatsApp",
          "Avaliação pós-entrega",
        ],
      },
    ],
    whatsappLink: "https://wa.me/5511999999999",
    whatsappMensagemAceitar:
      "Olá Thiago! Recebi a proposta da TDS Soluções Digitais e quero seguir com o projeto.",
    whatsappMensagemDuvida:
      "Olá Thiago! Recebi a proposta e tenho algumas dúvidas antes de fechar.",
  },
};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
