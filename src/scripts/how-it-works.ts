type HowItWorksStepState = 'upcoming' | 'active' | 'completed';

const HOW_IT_WORKS_STEP_SELECTOR = '[data-how-it-works-step]';

const HOW_IT_WORKS_TRACK_PROGRESS_PROPERTY = '--how-it-works-track-progress';

/*
 * No desktop e tablet, a narrativa percorre uma viewport completa
 * sem alterar a altura natural da seção ou prender o scroll.
 *
 * A distribuição em 0.8 antecipa a ativação do quarto passo,
 * enquanto 0.84 preserva um pequeno intervalo para ele permanecer
 * ativo antes de todo o fluxo assumir o estado concluído.
 */

const DESKTOP_PROGRESS_START_VIEWPORT_RATIO = 1;
const DESKTOP_PROGRESS_END_VIEWPORT_RATIO = 0;

const DESKTOP_STEP_SEQUENCE_END_PROGRESS = 0.8;
const DESKTOP_COMPLETION_PROGRESS = 0.84;

const MOBILE_FOCUS_VIEWPORT_RATIO = 0.52;

const clampProgress = (value: number): number => {
  return Math.min(1, Math.max(0, value));
};

const applyStepStates = (steps: readonly HTMLElement[], activeIndex: number): void => {
  steps.forEach((step, index) => {
    let state: HowItWorksStepState = 'upcoming';

    if (index < activeIndex) {
      state = 'completed';
    } else if (index === activeIndex) {
      state = 'active';
    }

    step.dataset.howItWorksState = state;
  });
};

const applyCompletedStepStates = (steps: readonly HTMLElement[]): void => {
  steps.forEach((step) => {
    step.dataset.howItWorksState = 'completed';
  });
};

const applyTrackProgress = (flow: HTMLElement, progress: number): void => {
  flow.style.setProperty(HOW_IT_WORKS_TRACK_PROGRESS_PROPERTY, clampProgress(progress).toFixed(4));
};

const resolveDesktopProgress = (flow: HTMLElement): number => {
  const flowRect = flow.getBoundingClientRect();

  const progressStart = window.innerHeight * DESKTOP_PROGRESS_START_VIEWPORT_RATIO;

  const progressEnd = window.innerHeight * DESKTOP_PROGRESS_END_VIEWPORT_RATIO;

  const progressDistance = Math.max(1, progressStart - progressEnd);

  const travelledDistance = progressStart - flowRect.top;

  return clampProgress(travelledDistance / progressDistance);
};

const resolveDesktopActiveIndex = (progress: number, stepCount: number): number => {
  if (stepCount <= 1) {
    return 0;
  }

  const sequenceProgress = clampProgress(progress / DESKTOP_STEP_SEQUENCE_END_PROGRESS);

  return Math.min(stepCount - 1, Math.floor(sequenceProgress * stepCount));
};

const resolveMobileActiveIndex = (steps: readonly HTMLElement[]): number => {
  const focusY = window.innerHeight * MOBILE_FOCUS_VIEWPORT_RATIO;
  const finalStep = steps[steps.length - 1];

  const finalStepRect = finalStep.getBoundingClientRect();

  if (finalStepRect.bottom <= focusY) {
    return steps.length;
  }

  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  steps.forEach((step, index) => {
    const stepRect = step.getBoundingClientRect();

    const stepCenterY = stepRect.top + stepRect.height / 2;

    const distance = Math.abs(stepCenterY - focusY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

const applyReducedMotionState = (flow: HTMLElement, steps: readonly HTMLElement[]): void => {
  applyCompletedStepStates(steps);

  applyTrackProgress(flow, 1);
};

export const initHowItWorks = (): void => {
  const flow = document.querySelector<HTMLElement>('[data-how-it-works]');

  if (!flow) {
    return;
  }

  const steps = Array.from(flow.querySelectorAll<HTMLElement>(HOW_IT_WORKS_STEP_SELECTOR));

  if (steps.length === 0) {
    return;
  }

  const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reducedMotionMediaQuery.matches) {
    applyReducedMotionState(flow, steps);

    return;
  }

  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');

  let animationFrameId: number | null = null;

  const update = (): void => {
    animationFrameId = null;

    if (mobileMediaQuery.matches) {
      const activeIndex = resolveMobileActiveIndex(steps);

      if (activeIndex >= steps.length) {
        applyCompletedStepStates(steps);

        return;
      }

      applyStepStates(steps, activeIndex);

      return;
    }

    const progress = resolveDesktopProgress(flow);

    if (progress >= DESKTOP_COMPLETION_PROGRESS) {
      applyCompletedStepStates(steps);
      applyTrackProgress(flow, 1);

      return;
    }

    const activeIndex = resolveDesktopActiveIndex(progress, steps.length);

    applyStepStates(steps, activeIndex);

    const trackProgress = steps.length <= 1 ? 1 : activeIndex / (steps.length - 1);

    applyTrackProgress(flow, trackProgress);
  };

  const requestUpdate = (): void => {
    if (animationFrameId !== null) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, {
    passive: true,
  });

  window.addEventListener('resize', requestUpdate);

  requestUpdate();
};
