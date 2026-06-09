export type Proposta = {
  slug: string;
  numero: string;
  cliente: {
    nome: string;
    empresa?: string;
    cargo?: string;
  };
  segmento: string;
  subtituloHero?: string;
  data: string;
  validade: string;
  preco: number;
  parcelas?: { entrada: number; entregaPct: number };
  mensalidade?: number;
  setupItens?: string[];
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
  bruna: {
    slug: "bruna",
    numero: "2026-000",
    cliente: {
      nome: "Bruna Abdenur",
      empresa: "Clínica Dermatológica",
      cargo: "Proprietária",
    },
    segmento: "Clínica Dermatológica",
    subtituloHero:
      "Automação Clínica e Inteligência de Dados — Clínica Bruna Abdenur",
    data: "15 de Janeiro de 2026",
    validade: "30 dias",
    preco: 6000,
    setupItens: [
      "Base de Dados Feegow estruturada e atualizada diariamente",
      "5 fluxos automáticos via WhatsApp em produção",
      "Integração com ChatGPT (IA) para mensagens personalizadas",
      "Conexão Z-API ativa e monitorada",
      "Hospedagem do n8n na VPS da TDS",
      "Planilhas de gestão (Google Sheets)",
      "Treinamento da equipe",
      "30 dias de suporte pós-entrega",
    ],
    prazoSemanas: 4,
    carta: [
      "Bruna, conversamos sobre como aproveitar melhor a base de pacientes que a clínica já tem dentro do Feegow. Hoje os dados ficam dentro do sistema, mas pouco se transforma em relacionamento ativo com o paciente.",
      "Esta proposta apresenta uma solução completa de automação clínica: integramos o Feegow a uma base de dados própria, e a partir dela disparamos comunicações inteligentes via WhatsApp em todos os momentos importantes da jornada do paciente — do aniversário ao pós-procedimento, do lembrete de consulta à recaptação de quem sumiu.",
    ],
    dores: [
      {
        titulo: "Paciente esquece a consulta agendada",
        desc: "Sem lembrete automático, a taxa de no-show é alta. Horário perdido = receita perdida + agenda desorganizada.",
        impacto: "Faturamento perdido",
      },
      {
        titulo: "Pós-procedimento sem acompanhamento",
        desc: "Paciente sai da clínica e não recebe orientações de cuidado. Aumenta dúvidas no WhatsApp da recepção e reduz satisfação.",
        impacto: "Atendimento sobrecarregado",
      },
      {
        titulo: "Pacientes inativos não voltam",
        desc: "Quem fez um procedimento há 6+ meses e não voltou simplesmente some. Sem ação ativa, vira churn silencioso.",
        impacto: "Recompra perdida",
      },
      {
        titulo: "Dados ricos no Feegow, mas isolados",
        desc: "Toda a história do paciente está no sistema, mas não vira ação: campanhas certas para o público certo, no momento certo.",
        impacto: "Oportunidade desperdiçada",
      },
    ],
    escopo: {
      sistema1: {
        titulo: "Base de Dados + Integração Feegow",
        subtitulo: "A fundação técnica de tudo",
        itens: [
          "Integração diária com a API do Feegow",
          "Coleta automática de pacientes, agendamentos e procedimentos",
          "Banco de dados próprio, estruturado e organizado",
          "Atualização diária automática (cron job)",
          "Hospedagem da automação na infra da TDS (n8n na VPS)",
          "Logs e monitoramento de cada ciclo de sincronização",
        ],
      },
      sistema2: {
        titulo: "5 Fluxos Automáticos via WhatsApp",
        subtitulo: "Rodando 24/7 sobre a base estruturada",
        itens: [
          "Aniversariantes: mensagem personalizada por IA (ChatGPT) no dia do aniversário",
          "Pós-procedimento: orientações de cuidado enviadas automaticamente após o atendimento",
          "Lembrete de consulta: confirmação automática 24h antes do horário marcado",
          "Campanhas: disparos segmentados por procedimento, com texto + imagem ou vídeo",
          "Recaptação: identifica pacientes que ultrapassaram a periodicidade e dispara mensagem para voltarem",
          "Envio via Z-API (WhatsApp não oficial, sem limite por dia)",
        ],
      },
    },
    inclui: [
      {
        titulo: "Integração com Feegow",
        desc: "API oficial, coleta automatizada diária",
      },
      {
        titulo: "Banco de dados estruturado",
        desc: "Tabelas próprias para pacientes, agendamentos, procedimentos",
      },
      {
        titulo: "Conexão Z-API + WhatsApp",
        desc: "Configuração e manutenção do número conectado",
      },
      {
        titulo: "Integração com ChatGPT",
        desc: "Mensagens personalizadas por IA quando o fluxo pede",
      },
      {
        titulo: "5 fluxos completos no n8n",
        desc: "Cada fluxo testado, documentado e versionado",
      },
      {
        titulo: "Planilhas de gestão",
        desc: "Google Sheets como interface para campanhas e leads",
      },
      {
        titulo: "Hospedagem do n8n",
        desc: "Roda na VPS da TDS, com backup e SSL",
      },
      {
        titulo: "Treinamento",
        desc: "Sessão online para você e a equipe usarem o sistema",
      },
      {
        titulo: "30 dias de suporte pós-entrega",
        desc: "Para ajustar fluxos e mensagens conforme uso",
      },
    ],
    cronograma: [
      {
        prazo: "Semana 1",
        titulo: "Integração com Feegow",
        desc: "Acesso à API, modelagem da base de dados, primeira sincronização funcionando.",
      },
      {
        prazo: "Semanas 2 e 3",
        titulo: "Construção dos fluxos",
        desc: "Aniversariantes, pós-procedimento, lembrete de consulta, campanhas e recaptação no n8n. Conexão Z-API + ChatGPT.",
      },
      {
        prazo: "Semana 4",
        titulo: "Testes e ativação",
        desc: "Testes com envios reais controlados, ajustes de mensagem, treinamento da equipe, ativação dos fluxos em produção.",
      },
    ],
    roadmap: [
      {
        fase: "Fase 2",
        titulo: "Dashboard de inteligência",
        itens: [
          "Painel visual com indicadores da clínica em tempo real",
          "Análise de aderência aos lembretes (no-show vs presença)",
          "Ranking de procedimentos mais agendados / mais lucrativos",
          "Identificação de pacientes em risco de churn",
        ],
      },
      {
        fase: "Fase 3",
        titulo: "Agente de IA para atendimento",
        itens: [
          "Chatbot inteligente para receber e responder dúvidas no WhatsApp",
          "Triagem automática (orçamento, agendamento, dúvida técnica)",
          "Escalação para humano quando necessário",
          "Aprendizado com o histórico do paciente",
        ],
      },
      {
        fase: "Fase 4",
        titulo: "Captação e nutrição de leads",
        itens: [
          "Integração com formulários do site e Instagram",
          "Régua automática de nutrição via WhatsApp",
          "Qualificação automática do lead",
          "Conversão em agendamento Feegow",
        ],
      },
    ],
    whatsappLink: "https://wa.me/5521965269795",
    whatsappMensagemAceitar:
      "Olá Thiago! Sou a Bruna. Recebi a proposta da TDS Soluções Digitais e quero seguir com o projeto.",
    whatsappMensagemDuvida:
      "Olá Thiago! Sou a Bruna. Recebi a proposta e tenho algumas dúvidas antes de fechar.",
  },

  gustavo: {
    slug: "gustavo",
    numero: "2026-001",
    cliente: {
      nome: "Gustavo",
      empresa: "NovaGush",
      cargo: "Proprietário",
    },
    segmento: "NovaGush — Auto Peças",
    subtituloHero: "Plataforma de Pós-Venda e Relacionamento — NovaGush",
    data: "09 de Junho de 2026",
    validade: "30 dias",
    preco: 12000,
    parcelas: { entrada: 6000, entregaPct: 50 },
    mensalidade: 600,
    prazoSemanas: 4,
    carta: [
      "Conversamos sobre como melhorar a relação com seus clientes oficina depois da venda. A NovaGush já tem o e-commerce (novagush.com.br) rodando muito bem para captar e fechar pedidos — esta proposta é sobre o que acontece DEPOIS: cobrança, fidelidade, recompra e suporte aos clientes recorrentes.",
      "Em vez de um sistema engessado de prateleira, você vai ter uma plataforma própria de pós-venda, integrada ao seu sistema de vendas e ao seu e-commerce, com a sua marca e as suas regras.",
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
          "Pagar nota online — PIX (com QR Code) ou cartão de crédito",
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
      { titulo: "Integração com o e-commerce", desc: "Conexão com novagush.com.br — histórico de compras unificado" },
      { titulo: "Login e autenticação", desc: "Cada oficina com acesso individual seguro" },
      { titulo: "Gateway de pagamento", desc: "PIX + cartão de crédito (Mercado Pago / Asaas)" },
      { titulo: "Hospedagem profissional", desc: "Servidor próprio gerenciado pela TDS, SSL automático, subdomínio da NovaGush (ex: clientes.novagush.com.br)" },
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
        fase: "Fase 3",
        titulo: "Gestão para a oficina cliente",
        itens: [
          "Ficha de veículo dos clientes da oficina",
          "Ordem de serviço simples",
          "Lembrete de manutenção (oficina → cliente final)",
          "CRM básico para o mecânico",
        ],
      },
      {
        fase: "Fase 4",
        titulo: "Engajamento e indicação",
        itens: [
          "Programa indique e ganhe (oficina → oficina)",
          "Stories de promoções da NovaGush",
          "Disparo de comunicados via WhatsApp",
          "Avaliação pós-entrega",
        ],
      },
    ],
    whatsappLink: "https://wa.me/5521965269795",
    whatsappMensagemAceitar:
      "Olá Thiago! Sou o Gustavo da NovaGush. Recebi a proposta da TDS Soluções Digitais e quero seguir com o projeto.",
    whatsappMensagemDuvida:
      "Olá Thiago! Sou o Gustavo da NovaGush. Recebi a proposta e tenho algumas dúvidas antes de fechar.",
  },
};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
