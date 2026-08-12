/*
 * ============================================================
 * PROBLEM SOLUTION — CONTEÚDO
 * ============================================================
 *
 * Centraliza os dados utilizados pela primeira transformação
 * da experiência "Do desafio à solução".
 *
 * Challenge e Solution compartilham os mesmos elementos visuais
 * para permitir que a interface transforme o estado existente,
 * em vez de substituir um card por outro.
 */

export const problemSolutionIntro = {
  eyebrow: 'DO DESAFIO À SOLUÇÃO',
  title: 'Transformamos os principais desafios da gestão de pedidos em resultados reais.',
} as const;

const problemSolutionItems = [
  {
    id: 'spreadsheets',
    label: 'Planilhas',
  },
  {
    id: 'emails',
    label: 'E-mails',
  },
  {
    id: 'erp',
    label: 'ERP',
  },
  {
    id: 'suppliers',
    label: 'Fornecedores',
  },
] as const;

export const problemSolutionStates = {
  challenge: {
    type: 'challenge',
    badge: 'DESAFIO',
    title: 'Informações espalhadas',
    description:
      'Planilhas, e-mails e diferentes sistemas dificultam uma visão completa e atualizada da operação.',
    symbol: '!',
    items: problemSolutionItems,
  },
  solution: {
    type: 'solution',
    badge: 'SOLUÇÃO',
    title: 'Pedidos centralizados',
    description:
      'Pedidos, atualizações, retornos e históricos organizados em um único fluxo de acompanhamento.',
    symbol: '✓',
    items: problemSolutionItems,
  },
} as const;

export const problemSolutionInitialState = problemSolutionStates.challenge;

export const problemSolutionSolutionState = problemSolutionStates.solution;
