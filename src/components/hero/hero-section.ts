import { externalLinks } from '../../config/links';

/*
 * ============================================================
 * HERO — CONTEÚDO
 * ============================================================
 *
 * Mantém a mensagem comercial separada do mockup operacional,
 * permitindo evoluir conteúdo e dashboard de forma independente.
 */

const heroBenefits = [
  'Antecipe riscos antes que impactem a operação',
  'Centralize a comunicação com fornecedores',
  'Tome decisões com mais visibilidade e histórico',
] as const;

const renderHeroBenefit = (benefit: string): string => {
  return `
    <li class="hero-section__benefit">
      ${benefit}
    </li>
  `;
};

export const renderHeroSection = (): string => {
  const benefitsMarkup = heroBenefits.map(renderHeroBenefit).join('');

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
            Mais controle e previsibilidade para seus pedidos de compra.
          </h1>

          <p class="hero-section__description">
            Automatize o follow-up, centralize a comunicação com fornecedores
            e acompanhe pedidos, prazos e ocorrências em uma única plataforma
            integrada à sua operação.
          </p>

          <ul class="hero-section__benefits">
            ${benefitsMarkup}
          </ul>

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

          <p class="hero-section__integrations">
            Integrações via API, EDI, Excel e ERP
          </p>
        </div>

        <div
          class="hero-section__dashboard-slot"
          aria-hidden="true"
        ></div>
      </div>
    </section>
  `;
};
