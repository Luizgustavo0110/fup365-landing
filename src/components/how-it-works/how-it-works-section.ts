import { howItWorksContent, howItWorksSteps } from '../../data/how-it-works';

import type { HowItWorksStep } from '../../data/how-it-works';

const renderHowItWorksStep = (step: HowItWorksStep, index: number): string => {
  const state = index === 0 ? 'active' : 'upcoming';

  return `
    <li
      class="how-it-works__step"
      data-how-it-works-step="${step.id}"
      data-how-it-works-state="${state}"
    >
      <span class="how-it-works__step-number">
        ${step.number}
      </span>

      <span
        class="how-it-works__step-marker"
        aria-hidden="true"
      ></span>

      <div class="how-it-works__step-copy">
        <h3 class="how-it-works__step-title">
          ${step.title}
        </h3>

        <p class="how-it-works__step-description">
          ${step.description}
        </p>
      </div>
    </li>
  `;
};

export const renderHowItWorksSection = (): string => {
  const stepsMarkup = howItWorksSteps.map(renderHowItWorksStep).join('');

  return `
    <section
      id="como-funciona"
      class="how-it-works"
      aria-labelledby="como-funciona-title"
    >
      <div class="container how-it-works__inner">
        <header class="how-it-works__header">
          <p class="how-it-works__eyebrow">
            ${howItWorksContent.eyebrow}
          </p>

          <h2
            id="como-funciona-title"
            class="how-it-works__title"
          >
            ${howItWorksContent.title}
          </h2>

          <p class="how-it-works__description">
            ${howItWorksContent.description}
          </p>
        </header>

        <div
          class="how-it-works__flow"
          data-how-it-works
        >
          <ol class="how-it-works__steps">
            ${stepsMarkup}
          </ol>
        </div>
      </div>
    </section>
  `;
};
