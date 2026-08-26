import { externalLinks } from '../../config/links';
import { renderHeroDashboard } from './hero-dashboard';

/*
 * ============================================================
 * HERO — CONTEÚDO
 * ============================================================
 *
 * Mantém a mensagem comercial separada do mockup operacional,
 * permitindo evoluir conteúdo e dashboard de forma independente.
 */

export const renderHeroSection = (): string => {
  return `
    <section
      id="inicio"
      class="hero-section"
      aria-labelledby="hero-title"
    >
      <div class="hero-section__inner">
        <div class="hero-section__content">
          <p class="hero-section__eyebrow">
            Gestão de pedidos e follow-up
          </p>

          <h1
          id="hero-title"
          class="hero-section__title"
          >
          Sua equipe compra. O FUP365 cuida do follow-up.
          </h1>

          <p class="hero-section__description">
            Automatize o acompanhamento dos pedidos, centralize a comunicação com 
            fornecedores e antecipe riscos de atraso antes que impactem sua operação.
          </p>

          <p class="hero-section__support">
            Antecipe o problema: sua equipe sabendo do atraso antes mesmo dele acontecer.
          </p>

          <div class="hero-section__actions">
            <a
              class="button hero-section__action hero-section__action--primary"
              href="${externalLinks.booking}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar uma demonstração
            </a>

            <a
              class="button hero-section__action hero-section__action--secondary"
              href="${externalLinks.whatsapp}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>

        ${renderHeroDashboard()}
      </div>
    </section>
  `;
};
