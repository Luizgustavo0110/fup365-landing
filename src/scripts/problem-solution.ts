type ProblemSolutionPhase = 'challenge' | 'transition' | 'solution';

type ProblemSolutionCardState = 'challenge' | 'solution';

const SOLUTION_STATE_ENTER_PROGRESS = 0.56;
const CHALLENGE_STATE_RETURN_PROGRESS = 0.44;

const PROGRESS_PROPERTY = '--problem-solution-progress';

/*
 * Controla quanto a animação persegue a posição real do scroll.
 *
 * Valor maior:
 * - responde mais rápido;
 * - fica mais próximo do scroll físico;
 *
 * Valor menor:
 * - fica mais suave;
 * - porém pode começar a parecer atrasado.
 *
 * 12 é o nosso ponto inicial de calibração.
 */
const PROGRESS_RESPONSE = 12;

const PROGRESS_EPSILON = 0.0005;

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
 * PROBLEM SOLUTION — ESTADO DO CARD
 * ============================================================
 *
 * O card possui apenas dois estados estáveis:
 * challenge e solution.
 *
 * Os limites de entrada e retorno são diferentes de propósito.
 * Essa histerese evita alternâncias rápidas quando o usuário
 * permanece próximo ao centro da transição.
 */

const resolveCardState = (
  progress: number,
  currentState: ProblemSolutionCardState,
): ProblemSolutionCardState => {
  if (currentState === 'challenge' && progress >= SOLUTION_STATE_ENTER_PROGRESS) {
    return 'solution';
  }

  if (currentState === 'solution' && progress <= CHALLENGE_STATE_RETURN_PROGRESS) {
    return 'challenge';
  }

  return currentState;
};

/*
 * ============================================================
 * PROBLEM SOLUTION — PROGRESSO DA PISTA
 * ============================================================
 *
 * O progresso é calculado exclusivamente durante o percurso
 * disponível para o elemento sticky.
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
 * PROBLEM SOLUTION — APLICAÇÃO DO PROGRESSO
 * ============================================================
 *
 * Esta função cuida apenas do progresso contínuo e da fase
 * narrativa global da seção.
 */

const applyProgress = (section: HTMLElement, progress: number): void => {
  const phase = resolvePhase(progress);

  section.style.setProperty(PROGRESS_PROPERTY, progress.toFixed(4));

  if (section.dataset.problemSolutionPhase !== phase) {
    section.dataset.problemSolutionPhase = phase;
  }
};

/*
 * ============================================================
 * PROBLEM SOLUTION — INICIALIZAÇÃO
 * ============================================================
 *
 * O scroll atualiza apenas o alvo da animação.
 *
 * Um loop independente em requestAnimationFrame aproxima
 * gradualmente o progresso exibido do progresso real.
 *
 * Dessa forma, entradas discretas como a rodinha do mouse
 * deixam de gerar saltos visuais bruscos.
 */

export const initProblemSolution = (): void => {
  const section = document.querySelector<HTMLElement>('[data-problem-solution]');

  if (!section) {
    return;
  }

  const interactive = section.querySelector<HTMLElement>('[data-problem-solution-interactive]');

  const stage = section.querySelector<HTMLElement>('[data-problem-solution-stage]');

  const card = section.querySelector<HTMLElement>('[data-problem-solution-card]');

  if (!interactive || !stage || !card) {
    return;
  }

  /*
   * Guardamos as referências uma única vez.
   *
   * Não faremos querySelectorAll durante cada frame da animação.
   * Isso reduz trabalho desnecessário durante o scroll.
   */
  const copyStates = Array.from(card.querySelectorAll<HTMLElement>('[data-problem-solution-copy]'));

  const initialProgress = calculateProgress(interactive, stage);

  let targetProgress = initialProgress;
  let displayedProgress = initialProgress;

  let animationFrameId: number | null = null;
  let previousTimestamp: number | null = null;

  let cardState: ProblemSolutionCardState =
    card.dataset.problemSolutionState === 'solution' ? 'solution' : 'challenge';

  /*
   * ------------------------------------------------------------
   * ESTADO SEMÂNTICO DO CARD
   * ------------------------------------------------------------
   *
   * O progresso é contínuo, mas o card possui dois estados
   * semânticos estáveis.
   *
   * Esta função atualiza o atributo usado pelo CSS e mantém
   * aria-hidden sincronizado entre os dois conteúdos.
   */

  const applyCardState = (progress: number): void => {
    const nextCardState = resolveCardState(progress, cardState);

    if (nextCardState === cardState) {
      return;
    }

    cardState = nextCardState;

    card.dataset.problemSolutionState = cardState;

    copyStates.forEach((copyState) => {
      const isActive = copyState.dataset.problemSolutionCopy === cardState;

      copyState.setAttribute('aria-hidden', String(!isActive));
    });
  };

  /*
   * ------------------------------------------------------------
   * LOOP DE SUAVIZAÇÃO
   * ------------------------------------------------------------
   *
   * Utilizamos interpolação exponencial baseada no tempo real
   * entre frames.
   *
   * Isso evita que monitores de 60 Hz, 120 Hz ou 144 Hz tenham
   * velocidades perceptivelmente diferentes.
   */

  const renderFrame = (timestamp: number): void => {
    animationFrameId = null;

    const elapsedMilliseconds =
      previousTimestamp === null ? 1000 / 60 : Math.min(64, timestamp - previousTimestamp);

    previousTimestamp = timestamp;

    const elapsedSeconds = elapsedMilliseconds / 1000;

    const smoothingFactor = 1 - Math.exp(-PROGRESS_RESPONSE * elapsedSeconds);

    displayedProgress += (targetProgress - displayedProgress) * smoothingFactor;

    /*
     * Quando a diferença já é imperceptível, igualamos os valores.
     *
     * Isso permite encerrar o requestAnimationFrame em vez de
     * manter um loop permanente consumindo recursos.
     */

    if (Math.abs(targetProgress - displayedProgress) <= PROGRESS_EPSILON) {
      displayedProgress = targetProgress;
    }

    applyProgress(section, displayedProgress);
    applyCardState(displayedProgress);

    if (displayedProgress !== targetProgress) {
      animationFrameId = window.requestAnimationFrame(renderFrame);

      return;
    }

    previousTimestamp = null;
  };

  /*
   * ------------------------------------------------------------
   * INÍCIO DO LOOP
   * ------------------------------------------------------------
   */

  const requestAnimationUpdate = (): void => {
    if (animationFrameId !== null) {
      return;
    }

    animationFrameId = window.requestAnimationFrame(renderFrame);
  };

  /*
   * ------------------------------------------------------------
   * SCROLL
   * ------------------------------------------------------------
   *
   * Aqui não alteramos diretamente o progresso visual.
   *
   * Apenas informamos ao sistema para onde a animação
   * deve caminhar.
   */

  const updateTargetProgress = (): void => {
    targetProgress = calculateProgress(interactive, stage);

    requestAnimationUpdate();
  };

  /*
   * ------------------------------------------------------------
   * RESIZE
   * ------------------------------------------------------------
   *
   * Durante mudanças de viewport não queremos uma animação
   * tentando perseguir coordenadas pertencentes ao layout antigo.
   *
   * Portanto sincronizamos imediatamente o estado visual com
   * a nova geometria.
   */

  const synchronizeProgress = (): void => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);

      animationFrameId = null;
    }

    targetProgress = calculateProgress(interactive, stage);

    displayedProgress = targetProgress;
    previousTimestamp = null;

    applyProgress(section, displayedProgress);
    applyCardState(displayedProgress);
  };

  window.addEventListener('scroll', updateTargetProgress, {
    passive: true,
  });

  window.addEventListener('resize', synchronizeProgress);

  synchronizeProgress();
};
