import { modalities, modalitiesContent } from '../../data/modalities';

import type { Modality } from '../../data/modalities';

const renderModalityFeature = (feature: string): string => {
  return `
    <li class="modalities__feature">
      <span
        class="modalities__feature-check"
        aria-hidden="true"
      >
        ✓
      </span>

      <span class="modalities__feature-text">
        ${feature}
      </span>
    </li>
  `;
};

const renderModalityCard = (modality: Modality): string => {
  const featuresMarkup = modality.features.map(renderModalityFeature).join('');

  return `
    <article
      class="modalities__card modalities__card--${modality.theme}"
      aria-labelledby="modalidade-${modality.id}-title"
    >
      <div class="modalities__card-main">
        <header class="modalities__card-header">
          <p class="modalities__card-eyebrow">
            ${modality.eyebrow}
          </p>

          <h3
            id="modalidade-${modality.id}-title"
            class="modalities__card-title"
          >
            ${modality.title}
          </h3>

          <p class="modalities__card-description">
            ${modality.description}
          </p>
        </header>

        <ul class="modalities__features">
          ${featuresMarkup}
        </ul>
      </div>

      <div class="modalities__card-footer">
        <p class="modalities__highlight">
          ${modality.highlight}
        </p>

        <a
          class="modalities__action"
          href="${modality.actionHref}"
        >
          ${modality.actionLabel}
        </a>
      </div>
    </article>
  `;
};

export const renderModalitiesSection = (): string => {
  const cardsMarkup = modalities.map(renderModalityCard).join('');

  return `
    <section
      id="modalidades"
      class="modalities"
      aria-labelledby="modalidades-title"
    >
      <div class="container modalities__inner">
        <header class="modalities__header">
          <p class="modalities__eyebrow">
            ${modalitiesContent.eyebrow}
          </p>

          <h2
            id="modalidades-title"
            class="modalities__title"
          >
            ${modalitiesContent.title}
          </h2>

          <p class="modalities__description">
            ${modalitiesContent.description}
          </p>
        </header>

        <div class="modalities__cards">
          ${cardsMarkup}
        </div>
      </div>
    </section>
  `;
};
