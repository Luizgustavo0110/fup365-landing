export type ResultId = 'centralization' | 'risk-visibility' | 'traceability' | 'decision-context';

export interface ResultItem {
  readonly id: ResultId;
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export const resultsContent = {
  eyebrow: 'RESULTADOS',
  title: 'Mais visibilidade para agir antes que o atraso aconteça.',
  description:
    'O FUP365 transforma atualizações, ocorrências e históricos em uma visão mais clara da operação, apoiando o acompanhamento de pedidos, fornecedores e riscos.',
} as const;

export const resultItems = [
  {
    id: 'centralization',
    number: '01',
    title: 'Follow-up centralizado',
    description:
      'Pedidos, atualizações e históricos reunidos em um único fluxo para reduzir a dispersão de informações.',
  },
  {
    id: 'risk-visibility',
    number: '02',
    title: 'Riscos mais visíveis',
    description:
      'Prazos, ocorrências e pendências ganham mais visibilidade para que a equipe identifique riscos antes que afetem a operação.',
  },
  {
    id: 'traceability',
    number: '03',
    title: 'Comunicação rastreável',
    description:
      'Interações, retornos e atualizações permanecem registrados para facilitar consultas e manter o histórico da operação acessível.',
  },
  {
    id: 'decision-context',
    number: '04',
    title: 'Decisões com mais contexto',
    description:
      'Informações consolidadas ajudam compradores e gestores a acompanhar a operação e priorizar ações com maior clareza.',
  },
] as const satisfies readonly ResultItem[];
