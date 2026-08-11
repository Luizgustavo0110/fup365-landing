import type { NavigationItem } from '../types/navigation';

export const navigationItems = [
  {
    label: 'Solução',
    sectionId: 'desafio-solucao',
  },
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
    label: 'Clientes',
    sectionId: 'empresas',
    desktopOnly: true,
  },
  {
    label: 'Contato',
    sectionId: 'contato',
    desktopOnly: true,
  },
] as const satisfies readonly NavigationItem[];
