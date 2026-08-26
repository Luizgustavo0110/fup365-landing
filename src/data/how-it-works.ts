export type HowItWorksStepId = 'orders' | 'suppliers' | 'follow-up' | 'management';

export interface HowItWorksStep {
  readonly id: HowItWorksStepId;
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export const howItWorksContent = {
  eyebrow: 'COMO FUNCIONA',
  title: 'Um fluxo conectado do pedido à gestão.',
  description:
    'O FUP365 integra os pedidos da operação, facilita a comunicação com fornecedores e transforma cada atualização em visibilidade para o comprador.',
} as const;

export const howItWorksSteps = [
  {
    id: 'orders',
    number: '01',
    title: 'Integre seus pedidos',
    description: 'Centralize os pedidos recebidos via API, EDI, Excel ou integração com ERP.',
  },
  {
    id: 'suppliers',
    number: '02',
    title: 'Automatize o contato com fornecedores',
    description:
      'O FUP365 envia novos pedidos, lembretes e solicitações de atualização automaticamente, mantendo as tratativas centralizadas e rastreáveis.',
  },
  {
    id: 'follow-up',
    number: '03',
    title: 'Acompanhe as tratativas',
    description:
      'Confirmações, prorrogações, NF e atualizações de coleta e entrega ficam registradas em um único fluxo.',
  },
  {
    id: 'management',
    number: '04',
    title: 'Gerencie com informação',
    description:
      'Acompanhe prazos, atrasos, fornecedores, relatórios e indicadores para apoiar suas decisões.',
  },
] as const satisfies readonly HowItWorksStep[];
