const SOCIAL_PROOF_SELECTOR = '[data-social-proof]';

const SOCIAL_PROOF_METRICS_SELECTOR = '[data-social-proof-metrics]';

const SOCIAL_PROOF_METRIC_SELECTOR = '[data-social-proof-metric]';

const SOCIAL_PROOF_METRIC_VALUE_SELECTOR = '[data-social-proof-metric-value]';

const SOCIAL_PROOF_TESTIMONIAL_AREA_SELECTOR = '[data-social-proof-testimonial-area]';

const SOCIAL_PROOF_TESTIMONIAL_SELECTOR = '[data-social-proof-testimonial]';

const SOCIAL_PROOF_TESTIMONIAL_PREVIOUS_SELECTOR = '[data-social-proof-testimonial-previous]';

const SOCIAL_PROOF_TESTIMONIAL_NEXT_SELECTOR = '[data-social-proof-testimonial-next]';

const SOCIAL_PROOF_TESTIMONIAL_STATUS_SELECTOR = '[data-social-proof-testimonial-status]';

const MOTION_READY_CLASS = 'social-proof--motion-ready';

const METRICS_VISIBLE_CLASS = 'social-proof--metrics-visible';

const TESTIMONIAL_AREA_VISIBLE_CLASS = 'social-proof__testimonial-area--visible';

const CAROUSEL_READY_CLASS = 'social-proof--carousel-ready';

const TESTIMONIAL_ACTIVE_CLASS = 'social-proof__testimonial--active';

const METRIC_ANIMATION_DURATION_MS = 900;

const METRIC_ANIMATION_STAGGER_MS = 90;

const INTERSECTION_THRESHOLD = 0.22;

interface SocialProofMetricAnimationReference {
  readonly value: HTMLElement;
  readonly finalText: string;
  readonly target: number;
  readonly suffix: string;
}

const numberFormatter = new Intl.NumberFormat('pt-BR');

const clampProgress = (value: number): number => {
  return Math.min(1, Math.max(0, value));
};

const easeOutCubic = (progress: number): number => {
  return 1 - Math.pow(1 - progress, 3);
};

const resolveMetricAnimationReference = (
  metric: HTMLElement,
): SocialProofMetricAnimationReference | null => {
  const value = metric.querySelector<HTMLElement>(SOCIAL_PROOF_METRIC_VALUE_SELECTOR);

  if (!value) {
    return null;
  }

  const finalText = value.dataset.socialProofMetricValue;

  if (!finalText) {
    return null;
  }

  const numericText = finalText.replace(/\D/g, '');

  if (numericText.length === 0) {
    return null;
  }

  return {
    value,
    finalText,
    target: Number.parseInt(numericText, 10),
    suffix: finalText.endsWith('+') ? '+' : '',
  };
};

const animateMetricValues = (references: readonly SocialProofMetricAnimationReference[]): void => {
  if (references.length === 0) {
    return;
  }

  references.forEach((reference) => {
    reference.value.textContent = `0${reference.suffix}`;
  });

  const animationStart = performance.now();

  const totalDuration =
    METRIC_ANIMATION_DURATION_MS + METRIC_ANIMATION_STAGGER_MS * (references.length - 1);

  const renderFrame = (timestamp: number): void => {
    const elapsed = timestamp - animationStart;

    references.forEach((reference, index) => {
      const metricElapsed = elapsed - index * METRIC_ANIMATION_STAGGER_MS;

      if (metricElapsed <= 0) {
        return;
      }

      const progress = clampProgress(metricElapsed / METRIC_ANIMATION_DURATION_MS);

      const easedProgress = easeOutCubic(progress);

      const currentValue = Math.round(reference.target * easedProgress);

      reference.value.textContent = `${numberFormatter.format(currentValue)}${reference.suffix}`;
    });

    if (elapsed < totalDuration) {
      window.requestAnimationFrame(renderFrame);

      return;
    }

    references.forEach((reference) => {
      reference.value.textContent = reference.finalText;
    });
  };

  window.requestAnimationFrame(renderFrame);
};

const initTestimonialCarousel = (
  section: HTMLElement,
  testimonials: readonly HTMLElement[],
): void => {
  if (testimonials.length <= 1) {
    return;
  }

  const previousButton = section.querySelector<HTMLButtonElement>(
    SOCIAL_PROOF_TESTIMONIAL_PREVIOUS_SELECTOR,
  );

  const nextButton = section.querySelector<HTMLButtonElement>(
    SOCIAL_PROOF_TESTIMONIAL_NEXT_SELECTOR,
  );

  const status = section.querySelector<HTMLElement>(SOCIAL_PROOF_TESTIMONIAL_STATUS_SELECTOR);

  if (!previousButton || !nextButton || !status) {
    return;
  }

  let activeIndex = 0;

  const applyActiveTestimonial = (): void => {
    testimonials.forEach((testimonial, index) => {
      const isActive = index === activeIndex;

      testimonial.classList.toggle(TESTIMONIAL_ACTIVE_CLASS, isActive);

      testimonial.setAttribute('aria-hidden', String(!isActive));
    });

    const currentPosition = String(activeIndex + 1);
    const testimonialCount = String(testimonials.length);

    status.textContent = currentPosition + ' de ' + testimonialCount;
  };

  previousButton.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;

    applyActiveTestimonial();
  });

  nextButton.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % testimonials.length;

    applyActiveTestimonial();
  });

  section.classList.add(CAROUSEL_READY_CLASS);

  applyActiveTestimonial();
};

export const initSocialProof = (): void => {
  const section = document.querySelector<HTMLElement>(SOCIAL_PROOF_SELECTOR);

  if (!section) {
    return;
  }

  const metrics = section.querySelector<HTMLElement>(SOCIAL_PROOF_METRICS_SELECTOR);

  if (!metrics) {
    return;
  }

  const testimonialArea = section.querySelector<HTMLElement>(
    SOCIAL_PROOF_TESTIMONIAL_AREA_SELECTOR,
  );

  const metricElements = Array.from(
    section.querySelectorAll<HTMLElement>(SOCIAL_PROOF_METRIC_SELECTOR),
  );

  const metricReferences = metricElements
    .map(resolveMetricAnimationReference)
    .filter((reference): reference is SocialProofMetricAnimationReference => reference !== null);

  const testimonials = Array.from(
    section.querySelectorAll<HTMLElement>(SOCIAL_PROOF_TESTIMONIAL_SELECTOR),
  );

  initTestimonialCarousel(section, testimonials);

  const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotionMediaQuery.matches) {
    return;
  }

  section.classList.add(MOTION_READY_CLASS);

  let metricsRevealed = false;

  const revealMetrics = (): void => {
    if (metricsRevealed) {
      return;
    }

    metricsRevealed = true;

    section.classList.add(METRICS_VISIBLE_CLASS);

    animateMetricValues(metricReferences);
  };

  const revealTestimonialArea = (): void => {
    testimonialArea?.classList.add(TESTIMONIAL_AREA_VISIBLE_CLASS);
  };

  if (!('IntersectionObserver' in window)) {
    revealMetrics();
    revealTestimonialArea();

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (entry.target === metrics) {
          revealMetrics();
        } else if (entry.target === testimonialArea) {
          revealTestimonialArea();
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: INTERSECTION_THRESHOLD,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  observer.observe(metrics);

  if (testimonialArea) {
    observer.observe(testimonialArea);
  }
};
