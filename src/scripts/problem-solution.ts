type ProblemSolutionPhase = 'challenge' | 'transition' | 'solution';

const PROGRESS_PROPERTY = '--problem-solution-progress';

const clampProgress = (value: number): number => {
  return Math.min(1, Math.max(0, value));
};

/*
 * ============================================================
 * PROBLEM SOLUTION — FASES
 * ============================================================
 *
 * As fases representam estados semânticos da narrativa.
 * O movimento continua sendo controlado por um progresso
 * contínuo entre 0 e 1.
 */

const resolvePhase = (progress: number): ProblemSolutionPhase => {
  if (progress < 0.22) {
    return 'challenge';
  }

  if (progress < 0.78) {
    return 'transition';
  }

  return 'solution';
};

/*
 * ============================================================
 * PROBLEM SOLUTION — PROGRESSO DA PISTA
 * ============================================================
 *
 * O progresso passa a ser calculado exclusivamente durante
 * o percurso disponível para o elemento sticky.
 *
 * 0 = início da pista.
 * 1 = fim da pista.
 */

const calculateProgress = (interactive: HTMLElement, stage: HTMLElement): number => {
  const interactiveRect = interactive.getBoundingClientRect();
  const stageHeight = stage.getBoundingClientRect().height;

  const computedStageStyle = window.getComputedStyle(stage);
  const stickyTop = Number.parseFloat(computedStageStyle.top) || 0;

  const scrollableDistance = Math.max(1, interactiveRect.height - stageHeight);

  const travelledDistance = stickyTop - interactiveRect.top;

  return clampProgress(travelledDistance / scrollableDistance);
};

/*
 * ============================================================
 * PROBLEM SOLUTION — INICIALIZAÇÃO
 * ============================================================
 *
 * Scroll e resize apenas solicitam uma atualização.
 * requestAnimationFrame evita trabalho redundante entre frames.
 */

export const initProblemSolution = (): void => {
  const section = document.querySelector<HTMLElement>('[data-problem-solution]');

  if (!section) {
    return;
  }

  const interactive = section.querySelector<HTMLElement>('[data-problem-solution-interactive]');

  const stage = section.querySelector<HTMLElement>('[data-problem-solution-stage]');

  if (!interactive || !stage) {
    return;
  }

  let animationFrameId: number | null = null;

  const updateProgress = (): void => {
    animationFrameId = null;

    const progress = calculateProgress(interactive, stage);
    const phase = resolvePhase(progress);

    section.style.setProperty(PROGRESS_PROPERTY, progress.toFixed(4));

    if (section.dataset.problemSolutionPhase !== phase) {
      section.dataset.problemSolutionPhase = phase;
    }
  };

  const requestProgressUpdate = (): void => {
    if (animationFrameId !== null) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener('scroll', requestProgressUpdate, {
    passive: true,
  });

  window.addEventListener('resize', requestProgressUpdate);

  updateProgress();
};
