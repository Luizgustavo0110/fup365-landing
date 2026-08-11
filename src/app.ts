import { renderClientsSection } from './components/clients/clients-section';
import { renderHeroSection } from './components/hero/hero-section';
import { renderSiteFooter } from './components/site-footer';
import { renderSiteHeader } from './components/site-header';
import type { SectionId } from './types/navigation';

interface SectionDefinition {
  readonly id: SectionId;
  readonly title: string;
  readonly theme: 'light' | 'dark';
}

const sections = [
  {
    id: 'desafio-solucao',
    title: 'Do desafio à solução',
    theme: 'dark',
  },
  {
    id: 'como-funciona',
    title: 'Como funciona',
    theme: 'light',
  },
  {
    id: 'modalidades',
    title: 'Modalidades',
    theme: 'dark',
  },
  {
    id: 'resultados',
    title: 'Resultados',
    theme: 'light',
  },
  {
    id: 'depoimentos',
    title: 'Prova social e depoimentos',
    theme: 'light',
  },
  {
    id: 'contato',
    title: 'CTA final',
    theme: 'dark',
  },
] as const satisfies readonly SectionDefinition[];

const renderScaffoldSection = (section: SectionDefinition): string => {
  return `
    <section
      id="${section.id}"
      class="development-section development-section--${section.theme}"
      aria-labelledby="${section.id}-title"
    >
      <div class="container development-section__content">
        <p class="development-section__eyebrow">
          Estrutura de desenvolvimento
        </p>

        <h2
          id="${section.id}-title"
          class="development-section__title"
        >
          ${section.title}
        </h2>

        <p class="development-section__description">
          Seção reservada para a implementação fiel ao layout aprovado no Figma.
        </p>
      </div>
    </section>
  `;
};

export const renderApp = (): string => {
  const sectionsMarkup = sections.map(renderScaffoldSection).join('');

  return `
    ${renderSiteHeader()}

    <main id="main-content">
      ${renderHeroSection()}
      ${renderClientsSection()}
      ${sectionsMarkup}
    </main>

    ${renderSiteFooter()}
  `;
};
