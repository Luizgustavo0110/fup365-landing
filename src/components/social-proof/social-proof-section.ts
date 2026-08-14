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
        ${metric.value}
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

export const renderSocialProofSection = (): string => {
  const metricsMarkup = socialProofMetrics.map(renderSocialProofMetric).join('');

  const featuredTestimonial = socialProofTestimonials[0];

  const testimonialMarkup = renderSocialProofTestimonial(featuredTestimonial);

  return `
    <section
      id="depoimentos"
      class="social-proof"
      aria-labelledby="social-proof-title"
    >
      <div class="container social-proof__inner">
        <div class="social-proof__content">
          <div class="social-proof__metrics">
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

          <div class="social-proof__testimonial-area">
            ${testimonialMarkup}
          </div>
        </div>
      </div>
    </section>
  `;
};
