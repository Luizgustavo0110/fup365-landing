import { renderClientsSection } from './components/clients/clients-section';
import { renderFinalCtaSection } from './components/final-cta/final-cta-section';
import { renderHeroSection } from './components/hero/hero-section';
import { renderHowItWorksSection } from './components/how-it-works/how-it-works-section';
import { renderModalitiesSection } from './components/modalities/modalities-section';
import { renderProblemSolutionSection } from './components/problem-solution/problem-solution-section';
import { renderResultsSection } from './components/results/results-section';
import { renderSocialProofSection } from './components/social-proof/social-proof-section';
import { renderSiteFooter } from './components/site-footer';
import { renderSiteHeader } from './components/site-header';

export const renderApp = (): string => {
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
      ${renderFinalCtaSection()}
    </main>

    ${renderSiteFooter()}
  `;
};
