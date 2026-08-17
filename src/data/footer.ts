import type { NavigationItem } from '../types/navigation';

/*
 * Mantém a copy e os atalhos do Footer fora do componente para
 * permitir revisões de conteúdo sem alterar sua estrutura HTML.
 */
export const footerContent = {
  brand: 'FUP365',
  description:
    'Tecnologia e acompanhamento para transformar o follow-up de pedidos em um fluxo mais previsível, centralizado e eficiente.',
  navigationTitle: 'Navegação',
  contactTitle: 'Contato',
  copyright: '© 2026 FUP365. Todos os direitos reservados.',
  privacyLabel: 'Política de Privacidade',
  termsLabel: 'Termos de Uso',
} as const;

export const footerNavigationItems = [
  {
    label: 'Como funciona',
    sectionId: 'como-funciona',
  },
  {
    label: 'Modalidades',
    sectionId: 'modalidades',
  },
  {
    label: 'Resultados',
    sectionId: 'resultados',
  },
  {
    label: 'Fale com a gente',
    sectionId: 'contato',
  },
] as const satisfies readonly NavigationItem[];
