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
  eyebrow: 'MODALIDADES',
  title: 'Escolha a forma ideal de operar com o FUP365.',
  description:
    'Utilize a tecnologia com sua própria equipe ou conte também com um serviço especializado de follow-up para acompanhar fornecedores e pedidos.',
} as const;

export const modalities = [
  {
    id: 'platform',
    eyebrow: 'PLATAFORMA',
    title: 'Plataforma FUP365',
    description:
      'Centralize pedidos, atualizações e históricos em uma única plataforma para sua equipe acompanhar toda a operação.',
    features: [
      'Centralização de pedidos e atualizações',
      'Comunicação e histórico em um único fluxo',
      'Indicadores, relatórios e acompanhamento',
      'Integrações via API, EDI, Excel e ERP',
    ],
    highlight: 'Sua equipe no controle',
    actionLabel: 'Agendar uma demonstração',
    actionHref:
      'https://bookings.cloud.microsoft/book/DemonstraesFUP365@telog.com.br/s/WncH-Rsb40GkgC2F8fvDYw2?ismsaljsauthenabled',
    theme: 'light',
  },
  {
    id: 'follow-up',
    eyebrow: 'PLATAFORMA + FOLLOW-UP',
    title: 'FUP365 + Serviço de Follow-up',
    description:
      'Tecnologia e acompanhamento especializado para apoiar sua operação e manter fornecedores e pedidos sob controle.',
    features: [
      'Tudo o que você tem na Plataforma FUP365',
      'Acompanhamento ativo dos fornecedores',
      'Cobranças e tratativas de pendências',
      'Visibilidade contínua para a equipe de compras',
    ],
    highlight: 'Especialistas apoiando sua operação',
    actionLabel: 'Falar pelo WhatsApp',
    actionHref:
      'https://wa.me/5516997400361?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20FUP365%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20solu%C3%A7%C3%A3o',
    theme: 'dark',
  },
] as const satisfies readonly Modality[];
