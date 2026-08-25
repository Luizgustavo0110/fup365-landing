export type SocialProofMetricId =
  'buyers' | 'items' | 'suppliers' | 'automations' | 'monitored-orders';

export interface SocialProofMetric {
  readonly id: SocialProofMetricId;
  readonly value: string;
  readonly label: string;
}

export interface SocialProofTestimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
}

export const socialProofContent = {
  eyebrow: 'NA PRÁTICA',
  title: 'Veja o FUP365 operando em escala.',
  context: 'Em uma única operação:',
  highlight: 'Mais de 8 mil atualizações automatizadas por mês',
  footnote: 'Resultados de uma operação que substituiu controles manuais pelo FUP365.',
} as const;

export const socialProofMetrics = [
  {
    id: 'buyers',
    value: '10+',
    label: 'Compradores ativos',
  },
  {
    id: 'items',
    value: '3.000+',
    label: 'Itens comprados por mês',
  },
  {
    id: 'suppliers',
    value: '350+',
    label: 'Fornecedores ativos',
  },
  {
    id: 'automations',
    value: '8.000+',
    label: 'Atualizações automatizadas/mês',
  },
  {
    id: 'monitored-orders',
    value: '1.500+',
    label: 'Pedidos monitorados simultaneamente',
  },
] as const satisfies readonly SocialProofMetric[];

export const socialProofTestimonials = [
  {
    id: 'maria-eduarda-agropeu',
    quote:
      'O FUP365 une um sistema eficiente ao empenho e proatividade dos fornecedores. Uma ferramenta essencial para quem busca informações precisas e rápidas.',
    author: 'Maria Eduarda',
    role: 'Compras',
    company: 'Agropeu Agro Industrial',
  },
] as const satisfies readonly SocialProofTestimonial[];
