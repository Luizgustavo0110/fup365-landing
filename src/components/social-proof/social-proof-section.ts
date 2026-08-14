import {
  socialProofContent,
  socialProofMetrics,
  socialProofTestimonials,
} from '../../data/social-proof';

import type { SocialProofMetric, SocialProofTestimonial } from '../../data/social-proof';

const renderSocialProofMetric = (metric: SocialProofMetric): string => {
  return `
    <div
      class="social-proof__metric"
      data-social-proof-metric="${metric.id}"
    >
      <dt class="social-proof__metric-label">
        ${metric.label}
      </dt>

      <dd class="social-proof__metric-value">
        <span class="social-proof__metric-value-accessible">
          ${metric.value}
        </span>

        <span
          aria-hidden="true"
          data-social-proof-metric-value="${metric.value}"
        >
          ${metric.value}
        </span>
      </dd>
    </div>
  `;
};

const renderSocialProofTestimonial = (testimonial: SocialProofTestimonial): string => {
  return `
    <figure
      class="social-proof__testimonial"
      data-social-proof-testimonial="${testimonial.id}"
    >
      <blockquote class="social-proof__quote">
        <span
          class="social-proof__quote-mark"
          aria-hidden="true"
        >
          “
        </span>

        <p class="social-proof__quote-text">
          ${testimonial.quote}
        </p>
      </blockquote>

      <figcaption class="social-proof__author">
        <strong class="social-proof__author-name">
          ${testimonial.author}
        </strong>

        <span class="social-proof__author-meta">
          ${testimonial.role} • ${testimonial.company}
        </span>
      </figcaption>
    </figure>
  `;
};

const renderTestimonialControls = (testimonialCount: number): string => {
  if (testimonialCount <= 1) {
    return '';
  }

  return `
    <div
      class="social-proof__testimonial-controls"
      data-social-proof-testimonial-controls
      role="group"
      aria-label="Navegação dos depoimentos"
    >
      <button
        class="social-proof__testimonial-control"
        type="button"
        data-social-proof-testimonial-previous
        aria-label="Ver depoimento anterior"
        aria-controls="social-proof-testimonial-stage"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M15 18 9 12l6-6"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>

      <span
        class="social-proof__testimonial-status"
        data-social-proof-testimonial-status
        aria-live="polite"
        aria-atomic="true"
      >
        1 de ${String(testimonialCount)}
      </span>

      <button
        class="social-proof__testimonial-control"
        type="button"
        data-social-proof-testimonial-next
        aria-label="Ver próximo depoimento"
        aria-controls="social-proof-testimonial-stage"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="m9 6 6 6-6 6"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  `;
};

const resolveTestimonialAreaAttributes = (testimonialCount: number): string => {
  if (testimonialCount > 1) {
    return 'role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes"';
  }

  return 'role="region" aria-label="Depoimento de cliente"';
};

export const renderSocialProofSection = (): string => {
  const metricsMarkup = socialProofMetrics.map(renderSocialProofMetric).join('');

  const testimonialsMarkup = socialProofTestimonials.map(renderSocialProofTestimonial).join('');

  const testimonialControlsMarkup = renderTestimonialControls(socialProofTestimonials.length);

  const testimonialAreaAttributes = resolveTestimonialAreaAttributes(
    socialProofTestimonials.length,
  );

  return `
    <section
      id="depoimentos"
      class="social-proof"
      aria-labelledby="social-proof-title"
      data-social-proof
    >
      <div class="container social-proof__inner">
        <div class="social-proof__content">
          <div
            class="social-proof__metrics"
            data-social-proof-metrics
          >
            <header class="social-proof__header">
              <p class="social-proof__eyebrow">
                ${socialProofContent.eyebrow}
              </p>

              <h2
                id="social-proof-title"
                class="social-proof__title"
              >
                ${socialProofContent.title}
              </h2>
            </header>

            <dl
              class="social-proof__metrics-grid"
              aria-label="Indicadores de impacto do FUP365"
            >
              ${metricsMarkup}
            </dl>

            <p class="social-proof__footnote">
              ${socialProofContent.footnote}
            </p>
          </div>

          <div
            class="social-proof__testimonial-area"
            data-social-proof-testimonial-area
            ${testimonialAreaAttributes}
          >
            <div
              id="social-proof-testimonial-stage"
              class="social-proof__testimonial-stage"
            >
              ${testimonialsMarkup}
            </div>

            ${testimonialControlsMarkup}
          </div>
        </div>
      </div>
    </section>
  `;
};
