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
    segmento: "NovaGush — Auto Peças (3 lojas)",
    subtituloHero:
      "Plataforma Completa NovaGush — Pós-Venda + Fidelidade Própria para 3 lojas",
    data: "09 de Junho de 2026",
    validade: "15 dias",
    preco: 30000,
    mensalidade: 1000,
    prazoSemanas: 10,
    setupItens: [
      "Tudo da Fase 1 (Área do Cliente + Painel da Loja)",
      "+ Programa de Fidelidade próprio substituindo o meuappdefidelidade",
      "+ App do cliente (PWA) com saldo, catálogo e resgate",
      "+ Pontuação automática integrada ao EMSOFT (sem QR de cupom)",
      "+ Multi-perfil: oficina x consumidor final",
      "+ Notificações via WhatsApp",
      "+ Suporte às 3 lojas em painel único + fidelidade consolidada",
      "Integração com EMSOFT via backup automático do Google Drive (sem instalar nada nas lojas)",
      "Integração com o e-commerce (novagush.com.br)",
      "Hospedagem profissional + SSL + domínio próprio",
      "30 dias de suporte pós-entrega",
      "⚡ Economia de R$ 8.000 vs contratar as fases separadas",
    ],
    carta: [
      "Gustavo, com base nas nossas conversas: faz total sentido o seu raciocínio. A Fase 1 te entrega controle e organização do financeiro, mas é a Fase 2 (fidelidade) que vai realmente trazer ROI — recompra, cashback, retenção dos clientes oficina.",
      "Atualizei a proposta com as 2 novas lojas que você vai abrir. A plataforma agora consolida as 3 unidades em um painel só: um cliente que compra em qualquer loja vê todas as suas notas, e os pontos da fidelidade somam independente de onde ele comprou.",
      "Boa notícia técnica: descobri que o EMSOFT já faz backup automático todo dia 18:30 pro seu Google Drive. Isso simplifica MUITO a integração — em vez de instalar software nos 3 PCs das lojas (e ter risco de cada um quebrar), a TDS baixa o backup do Drive todo dia de madrugada, processa, e às 6h da manhã tudo está sincronizado. Sua rotina nas lojas continua inalterada.",
      "Em vez de um sistema engessado de prateleira (e pagando 'pra sempre' por isso), a NovaGush passa a ter uma plataforma própria de pós-venda + fidelidade, com a sua marca e as suas regras — e o código fonte fica com você.",
    ],
    dores: [
      {
        titulo: "Telefone toca o dia inteiro com cobrança",
        desc: "Oficinas ligam para perguntar 'quanto eu devo?'. Sua equipe gasta horas no que poderia ser autosserviço.",
        impacto: "~2h/dia da equipe",
      },
      {
        titulo: "Fidelidade depende de cupom fiscal + SEFAZ",
        desc: "O meuappdefidelidade exige o cliente escanear cupom, depender do SEFAZ (lento e instável). Muitos clientes não pontuam por isso.",
        impacto: "Pontuação falhada",
      },
      {
        titulo: "Painel de fidelidade atual é pobre",
        desc: "Não pesquisa cliente, não edita cadastro, não vê pontos por cliente, não estorna pontuação, não bloqueia cliente.",
        impacto: "Gestão manual",
      },
      {
        titulo: "Comunicação só por e-mail",
        desc: "Oficina nem abre o e-mail. WhatsApp seria o canal certo — mas o sistema atual não tem.",
        impacto: "Comunicação perdida",
      },
      {
        titulo: "Cobrança manual e desconfortável",
        desc: "Ligar para o cliente cobrar é constrangedor. Muitas notas vencem sem que ninguém perceba.",
        impacto: "Inadimplência maior",
      },
      {
        titulo: "Sem visão consolidada do negócio",
        desc: "Quem são seus melhores clientes? Quem está em atraso? Quem sumiu? Hoje a resposta está espalhada em planilhas.",
        impacto: "Decisões no escuro",
      },
      {
        titulo: "3 lojas separadas dificultam a gestão",
        desc: "Com a expansão pras 2 lojas novas, cada uma tem o próprio EMSOFT local. Sem consolidação, cliente recorrente que compra em mais de uma unidade vira 3 cadastros diferentes — e a fidelidade não soma.",
        impacto: "Gestão fragmentada",
      },
    ],
    escopo: {
      sistema1: {
        titulo: "Pós-Venda — Área do Cliente + Painel das 3 lojas",
        subtitulo: "Cobrança + relacionamento + admin consolidado",
        itens: [
          "Login privado por CNPJ — cliente vê notas das 3 lojas em um só lugar",
          "Dashboard consolidado: total em aberto, vencido, saldo de vales, limite de crédito",
          "Pagar nota online — PIX (com QR Code) ou cartão de crédito",
          "Comprovante automático com envio por WhatsApp",
          "Baixar XML e DANFE direto da nota",
          "Movimentações das 3 lojas com filtro por loja, status, busca",
          "Painel Administrativo com 4 KPIs em tempo real + filtro por loja",
          "Score A/B/C/D de cada cliente baseado no comportamento nas 3 unidades",
          "Cobrança via WhatsApp em 1 clique",
          "Sincronização automática via backup do Google Drive (madrugada)",
        ],
      },
      sistema2: {
        titulo: "Fidelidade Própria — Pontuação Consolidada + App",
        subtitulo: "Substitui o meuappdefidelidade. Pontos somam nas 3 lojas.",
        itens: [
          "Pontuação automática direto do EMSOFT das 3 lojas — sem QR, sem SEFAZ",
          "À vista (PIX/cartão) libera ponto na hora; carteira libera só com baixa do pagamento",
          "Devolução abate pontos automaticamente",
          "Pontos somam independente da loja onde o cliente comprou",
          "Painel admin completo: buscar cliente, ver pontos, editar cadastro, bloquear, estornar",
          "Pontuação manual com workflow de aprovação",
          "Acelerador de pontos: campanhas por fornecedor (COFAP, etc), produto ou categoria",
          "Catálogo de prêmios com produtos do EMSOFT + vouchers (estoque consolidado das 3 lojas)",
          "Bloqueio de resgate se houver nota em atraso em qualquer loja",
          "Resgate com código entregue por WhatsApp — pode ser usado em qualquer unidade",
          "Multi-perfil: oficina e consumidor final, com regras diferentes",
          "Indique e ganhe: consumidor compra por indicação de oficina, ambos pontuam",
          "App do cliente (PWA): saldo, histórico, catálogo, resgate, stories de promoções",
          "Notificações WhatsApp + e-mail em todos os eventos",
          "Relatórios: ranking de clientes, prêmios mais resgatados, performance por loja",
          "Regulamento versionado (LGPD)",
        ],
      },
    },
    inclui: [
      { titulo: "Design e UX personalizados", desc: "Sua marca, suas cores" },
      { titulo: "Integração com EMSOFT (3 lojas)", desc: "Sincronização noturna automática via backup do Google Drive — sem instalar nada nas lojas" },
      { titulo: "Integração com o e-commerce", desc: "novagush.com.br ↔ área do cliente" },
      { titulo: "Login e autenticação", desc: "Cada oficina/consumidor com acesso próprio" },
      { titulo: "Gateway de pagamento", desc: "PIX + cartão (Mercado Pago)" },
      { titulo: "WhatsApp Business API", desc: "Disparo de notificações + cobranças" },
      { titulo: "Multi-loja consolidado", desc: "Painel único pras 3 lojas + filtro por unidade + visão geral" },
      { titulo: "Hospedagem profissional", desc: "Servidor TDS, SSL, subdomínio NovaGush" },
      { titulo: "Painel admin completo", desc: "Cobrança + clientes + fidelidade num só lugar" },
      { titulo: "Migração do meuappdefidelidade", desc: "Trazemos os pontos já acumulados dos seus clientes" },
      { titulo: "30 dias de suporte pós-entrega", desc: "Ajustes finos durante o uso" },
    ],
    cronograma: [
      {
        prazo: "Semanas 1 e 2",
        titulo: "Levantamento + Sync EMSOFT (3 lojas)",
        desc: "Acesso ao Google Drive das 3 lojas, setup do Firebird-runtime no servidor TDS, primeira sincronização noturna funcionando, modelagem do banco consolidado.",
      },
      {
        prazo: "Semanas 3 e 4",
        titulo: "Fase 1 — Pós-Venda no ar",
        desc: "Área do cliente + painel admin com filtro por loja, integração de pagamento, primeiros clientes acessando o portal.",
      },
      {
        prazo: "Semana 5",
        titulo: "Multi-loja: consolidação total",
        desc: "Cliente com cadastro em mais de uma loja unificado, fidelidade somando entre unidades, painel admin com visão por loja + geral.",
      },
      {
        prazo: "Semanas 6 a 8",
        titulo: "Fase 2 — Fidelidade Própria",
        desc: "Núcleo de pontos consolidado, painel admin de fidelidade, catálogo de prêmios, app do cliente PWA, migração do meuappdefidelidade.",
      },
      {
        prazo: "Semanas 9 e 10",
        titulo: "Homologação + Lançamento",
        desc: "Testes finais com dados reais das 3 lojas, treinamento da equipe, manual em vídeo, comunicação para os clientes, plataforma 100% no ar.",
      },
    ],
    roadmap: [
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
          "Disparo de comunicados via WhatsApp em massa",
          "Avaliação pós-entrega",
        ],
      },
    ],
    whatsappLink: "https://wa.me/5521965269795",
    whatsappMensagemAceitar:
      "Olá Thiago! Sou o Gustavo da NovaGush. Recebi a proposta combo Fase 1+2 e quero seguir com o projeto.",
    whatsappMensagemDuvida:
      "Olá Thiago! Sou o Gustavo da NovaGush. Recebi a proposta combo Fase 1+2 e tenho algumas dúvidas antes de fechar.",
  },

};

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
