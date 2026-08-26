import { externalLinks } from '../config/links';

export type ModalityId = 'platform' | 'follow-up';

export type ModalityTheme = 'light' | 'dark';

export interface Modality {
  readonly id: ModalityId;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly highlight: string;
  readonly actionLabel: string;
  readonly actionHref: string;
  readonly theme: ModalityTheme;
}

export const modalitiesContent = {
  eyebrow: 'DUAS FORMAS DE OPERAR',
  title: 'Tecnologia para automatizar. Especialistas para acompanhar. Ou os dois.',
  description: 'Escolha como o FUP365 participa da sua operação de Compras.',
} as const;

export const modalities = [
  {
    id: 'platform',
    eyebrow: 'PLATAFORMA FUP365',
    title: 'Plataforma FUP365',
    description: 'Sua equipe opera. O FUP365 automatiza.',
    features: [
      'Pedidos e atualizações centralizados',
      'Comunicação com fornecedores',
      'Histórico completo das tratativas',
      'Indicadores e relatórios',
      'Integração via API, EDI, Excel e ERP',
    ],
    highlight: 'Sua equipe no controle',
    actionLabel: 'Agendar uma demonstração',
    actionHref: externalLinks.booking,
    theme: 'light',
  },
  {
    id: 'follow-up',
    eyebrow: 'PLATAFORMA FUP365 + SERVIÇO DE FOLLOW-UP',
    title: 'FUP365 + Serviço de Follow-up',
    description: 'Nossa equipe acompanha. Seus compradores focam em comprar.',
    features: [
      'Tudo da Plataforma FUP365',
      'Acompanhamento ativo dos fornecedores',
      'Cobrança de retornos e pendências',
      'Atualização contínua dos pedidos',
      'Visibilidade para sua equipe de Compras',
    ],
    highlight: 'Seus compradores focam em comprar. Nós ajudamos a cuidar do acompanhamento',
    actionLabel: 'Falar pelo WhatsApp',
    actionHref: externalLinks.whatsapp,
    theme: 'dark',
  },
] as const satisfies readonly Modality[];
