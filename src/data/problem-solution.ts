/*
 * ============================================================
 * PROBLEM SOLUTION — CONTEÚDO
 * ============================================================
 *
 * A experiência é composta por quatro casos:
 *
 * 1. Informações
 * 2. Fornecedores
 * 3. Atrasos
 * 4. Dados
 *
 * Cada caso possui os estados challenge e solution.
 *
 * Os quatro elementos visuais continuam ocupando slots estáveis
 * no motor de animação. Isso permite trocar o conteúdo de cada
 * capítulo sem recriar a estrutura visual do card.
 */

export const problemSolutionIntro = {
  eyebrow: 'DO DESAFIO À SOLUÇÃO',
  title: 'Transformamos os principais desafios da gestão de pedidos em resultados reais.',
} as const;

/*
 * ============================================================
 * PROBLEM SOLUTION — ORDEM DOS CASOS
 * ============================================================
 *
 * Esta ordem será utilizada posteriormente para transformar
 * o progresso global do scroll em quatro capítulos.
 */

export const problemSolutionCaseOrder = ['information', 'suppliers', 'delays', 'data'] as const;

/*
 * ============================================================
 * PROBLEM SOLUTION — CASOS
 * ============================================================
 *
 * O campo "slot" já prepara a migração do motor para posições
 * genéricas.
 *
 * O campo "id" ainda preserva os identificadores utilizados pelo
 * motor atual para que esta refatoração não altere visualmente
 * a experiência existente.
 */

export const problemSolutionCases = {
  information: {
    id: 'information',
    label: 'Informações',

    states: {
      challenge: {
        type: 'challenge',
        badge: 'DESAFIO',
        title: 'Informações espalhadas',
        description:
          'Planilhas, e-mails e diferentes sistemas dificultam uma visão completa e atualizada da operação.',
        symbol: '!',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Planilhas',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'E-mails',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'ERP',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Fornecedores',
          },
        ],
      },

      solution: {
        type: 'solution',
        badge: 'SOLUÇÃO',
        title: 'Pedidos centralizados',
        description:
          'Pedidos, atualizações, retornos e históricos organizados em um único fluxo de acompanhamento.',
        symbol: '✓',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Planilhas',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'E-mails',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'ERP',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Fornecedores',
          },
        ],
      },
    },
  },

  suppliers: {
    id: 'suppliers',
    label: 'Fornecedores',

    states: {
      challenge: {
        type: 'challenge',
        badge: 'DESAFIO',
        title: 'Fornecedores sem retorno',
        description:
          'Cobranças dispersas e respostas demoradas dificultam a atualização dos pedidos e aumentam o esforço manual da equipe.',
        symbol: '!',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'E-mail enviado',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Sem resposta',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Pedido pendente',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Cobrança manual',
          },
        ],
      },

      solution: {
        type: 'solution',
        badge: 'SOLUÇÃO',
        title: 'Comunicação automatizada',
        description:
          'Fornecedores recebem notificações sobre novos pedidos e pendências, mantendo o comprador atualizado sobre as tratativas.',
        symbol: '✓',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Pedido novo',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Lembrete',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Resposta',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Comprador informado',
          },
        ],
      },
    },
  },

  delays: {
    id: 'delays',
    label: 'Atrasos',

    states: {
      challenge: {
        type: 'challenge',
        badge: 'DESAFIO',
        title: 'Atrasos identificados tarde',
        description:
          'Sem visibilidade atualizada dos pedidos, desvios de prazo podem ser percebidos somente quando já impactam a operação.',
        symbol: '!',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Prazo vencendo',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Entrega em risco',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Sem atualização',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Comprador sem retorno',
          },
        ],
      },

      solution: {
        type: 'solution',
        badge: 'SOLUÇÃO',
        title: 'Antecipação de riscos',
        description:
          'Atualizações de prazo e ocorrências ajudam compradores a identificar riscos com antecedência e agir antes do impacto.',
        symbol: '✓',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Novo prazo',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Prorrogação',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Ocorrência',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Alerta',
          },
        ],
      },
    },
  },

  data: {
    id: 'data',
    label: 'Dados',

    states: {
      challenge: {
        type: 'challenge',
        badge: 'DESAFIO',
        title: 'Falta de dados confiáveis',
        description:
          'Informações fragmentadas e processos manuais dificultam a análise do desempenho da operação e dos fornecedores.',
        symbol: '!',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Planilhas',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Dados dispersos',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Histórico manual',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Sem indicadores',
          },
        ],
      },

      solution: {
        type: 'solution',
        badge: 'SOLUÇÃO',
        title: 'Indicadores de desempenho',
        description:
          'Histórico, relatórios e indicadores ajudam a acompanhar resultados, atrasos e o desempenho dos fornecedores.',
        symbol: '✓',

        items: [
          {
            id: 'spreadsheets',
            slot: 'one',
            label: 'Histórico',
          },
          {
            id: 'emails',
            slot: 'two',
            label: 'Relatórios',
          },
          {
            id: 'erp',
            slot: 'three',
            label: 'Indicadores',
          },
          {
            id: 'suppliers',
            slot: 'four',
            label: 'Desempenho',
          },
        ],
      },
    },
  },
} as const;

/*
 * ============================================================
 * PROBLEM SOLUTION — TIPOS
 * ============================================================
 */

export type ProblemSolutionCaseId = (typeof problemSolutionCaseOrder)[number];

export type ProblemSolutionCase = (typeof problemSolutionCases)[ProblemSolutionCaseId];

export type ProblemSolutionState =
  ProblemSolutionCase['states']['challenge'] | ProblemSolutionCase['states']['solution'];

/*
 * ============================================================
 * PROBLEM SOLUTION — COMPATIBILIDADE COM O MOTOR ATUAL
 * ============================================================
 *
 * Enquanto o componente ainda trabalha com apenas o primeiro
 * capítulo, mantemos estes exports.
 *
 * Eles serão removidos quando o componente passar a utilizar
 * problemSolutionCases diretamente.
 */

export const problemSolutionStates = problemSolutionCases.information.states;

export const problemSolutionInitialState = problemSolutionStates.challenge;

export const problemSolutionSolutionState = problemSolutionStates.solution;
