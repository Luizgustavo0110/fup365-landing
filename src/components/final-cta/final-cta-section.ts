import { externalLinks } from '../../config/links';
import { finalCtaContent } from '../../data/final-cta';

export const renderFinalCtaSection = (): string => {
  return `
    <section
      id="contato"
      class="final-cta"
      aria-labelledby="final-cta-title"
    >
      <div class="final-cta__inner">
        <div class="final-cta__panel">
          <div class="final-cta__content">
            <p class="final-cta__eyebrow">
              ${finalCtaContent.eyebrow}
            </p>

            <h2
              id="final-cta-title"
              class="final-cta__title"
            >
              ${finalCtaContent.title}
            </h2>

            <div class="final-cta__descriptions">
              <p class="final-cta__description">
                ${finalCtaContent.description}
              </p>

              <p class="final-cta__description">
                ${finalCtaContent.secondaryDescription}
              </p>
            </div>
          </div>

          <div class="final-cta__actions">
            <a
              class="final-cta__action final-cta__action--primary"
              href="${externalLinks.booking}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${finalCtaContent.primaryActionLabel}
            </a>

            <a
              class="final-cta__action final-cta__action--secondary"
              href="${externalLinks.whatsapp}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${finalCtaContent.secondaryActionLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
};
