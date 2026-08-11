/*
 * ============================================================
 * PROBLEM SOLUTION — CONTEÚDO
 * ============================================================
 *
 * Centraliza os textos e elementos utilizados pelo primeiro
 * estado da experiência "Do desafio à solução".
 *
 * Os demais cenários serão adicionados quando a estrutura
 * visual estiver validada em todos os breakpoints.
 */

export const problemSolutionIntro = {
  eyebrow: 'DO DESAFIO À SOLUÇÃO',
  title: 'Transformamos os principais desafios da gestão de pedidos em resultados reais.',
} as const;

export const problemSolutionInitialState = {
  type: 'challenge',
  badge: 'DESAFIO',
  title: 'Informações espalhadas',
  description:
    'Planilhas, e-mails e diferentes sistemas dificultam uma visão completa e atualizada da operação.',
  symbol: '!',
  items: [
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
  ],
} as const;
