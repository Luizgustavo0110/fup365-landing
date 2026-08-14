import { renderClientsSection } from './components/clients/clients-section';
import { renderHeroSection } from './components/hero/hero-section';
import { renderHowItWorksSection } from './components/how-it-works/how-it-works-section';
import { renderModalitiesSection } from './components/modalities/modalities-section';
import { renderProblemSolutionSection } from './components/problem-solution/problem-solution-section';
import { renderResultsSection } from './components/results/results-section';
import { renderSocialProofSection } from './components/social-proof/social-proof-section';
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
      ${renderProblemSolutionSection()}
      ${renderHowItWorksSection()}
      ${renderModalitiesSection()}
      ${renderResultsSection()}
      ${renderSocialProofSection()}
      ${sectionsMarkup}
    </main>

    ${renderSiteFooter()}
  `;
};
