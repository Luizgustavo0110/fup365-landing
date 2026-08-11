export type SectionId =
  | 'inicio'
  | 'empresas'
  | 'desafio-solucao'
  | 'como-funciona'
  | 'modalidades'
  | 'resultados'
  | 'depoimentos'
  | 'contato';

export interface NavigationItem {
  readonly label: string;
  readonly sectionId: SectionId;
  readonly desktopOnly?: boolean;
}
