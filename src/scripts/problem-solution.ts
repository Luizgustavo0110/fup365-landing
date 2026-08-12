import { problemSolutionCaseOrder, problemSolutionCases } from '../data/problem-solution';

import type { ProblemSolutionCaseId, ProblemSolutionState } from '../data/problem-solution';

type ProblemSolutionPhase = 'challenge' | 'transition' | 'solution';

type ProblemSolutionCardState = ProblemSolutionState['type'];

type ProblemSolutionNarrativeMode = 'case' | 'handoff';

interface ProblemSolutionNarrativeFrame {
  readonly caseId: ProblemSolutionCaseId;
  readonly caseIndex: number;
  readonly mode: ProblemSolutionNarrativeMode;
  readonly localProgress: number;
  readonly handoffProgress: number;
  readonly nextCaseId: ProblemSolutionCaseId | null;
}

type ProblemSolutionItemId = ProblemSolutionState['items'][number]['id'];

interface Point {
  readonly x: number;
  readonly y: number;
}

interface ProblemSolutionVisualReference {
  readonly id: ProblemSolutionItemId;
  readonly item: HTMLElement;
  readonly label: HTMLElement;
  readonly anchor: HTMLElement;
  readonly connector: SVGLineElement;
}

interface ProblemSolutionCopyReference {
  readonly type: ProblemSolutionCardState;
  readonly root: HTMLElement;
  readonly badge: HTMLElement;
  readonly title: HTMLElement;
  readonly description: HTMLElement;
}

interface ProblemSolutionItemGeometry extends ProblemSolutionVisualReference {
  readonly startCenter: Point;
  readonly targetCenter: Point;
  readonly halfWidth: number;
  readonly halfHeight: number;
}

interface ProblemSolutionGeometry {
  readonly items: readonly ProblemSolutionItemGeometry[];
  readonly symbolStartCenter: Point;
  readonly symbolTargetCenter: Point;
  readonly symbolRadius: number;
}

const PROBLEM_SOLUTION_ITEM_IDS = [
  'spreadsheets',
  'emails',
  'erp',
  'suppliers',
] as const satisfies readonly ProblemSolutionItemId[];

const CASE_SEGMENT_WEIGHT = 1;

const HANDOFF_SEGMENT_WEIGHT = 0.16;

const SOLUTION_STATE_ENTER_PROGRESS = 0.54;
const CHALLENGE_STATE_RETURN_PROGRESS = 0.42;

const TRANSFORM_START_PROGRESS = 0.2;
const TRANSFORM_END_PROGRESS = 0.78;

const CONNECTOR_PROGRESS_WINDOWS = {
  spreadsheets: [0.46, 0.74],
  emails: [0.49, 0.77],
  erp: [0.52, 0.8],
  suppliers: [0.55, 0.83],
} as const satisfies Record<ProblemSolutionItemId, readonly [number, number]>;

const CONNECTOR_MINIMUM_GAP = 12;

const PROGRESS_PROPERTY = '--problem-solution-progress';

const ITEM_TRANSLATE_X_PROPERTY = '--problem-solution-item-translate-x';

const ITEM_TRANSLATE_Y_PROPERTY = '--problem-solution-item-translate-y';

const SYMBOL_TRANSLATE_X_PROPERTY = '--problem-solution-symbol-translate-x';

const SYMBOL_TRANSLATE_Y_PROPERTY = '--problem-solution-symbol-translate-y';

/*
 * Controla quanto a animação persegue a posição real do scroll.
 *
 * Neste momento mantemos 12.
 *
 * Só vamos recalibrar esse valor depois que chips, núcleo e
 * connectors estiverem participando da animação, porque a
 * percepção de velocidade mudará quando toda a composição
 * estiver em movimento.
 */

const PROGRESS_RESPONSE = 12;

const PROGRESS_EPSILON = 0.0005;

const clampProgress = (value: number): number => {
  return Math.min(1, Math.max(0, value));
};

const interpolate = (start: number, end: number, progress: number): number => {
  return start + (end - start) * progress;
};

const formatCoordinate = (value: number): string => {
  return value.toFixed(2);
};

const formatPixelValue = (value: number): string => {
  return `${formatCoordinate(value)}px`;
};

const resolveCaseId = (value: string | undefined): ProblemSolutionCaseId => {
  return problemSolutionCaseOrder.find((caseId) => caseId === value) ?? problemSolutionCaseOrder[0];
};

const resolveNarrativeFrame = (progress: number): ProblemSolutionNarrativeFrame => {
  const caseCount = problemSolutionCaseOrder.length;

  const handoffCount = Math.max(0, caseCount - 1);

  const totalWeight = caseCount * CASE_SEGMENT_WEIGHT + handoffCount * HANDOFF_SEGMENT_WEIGHT;

  const weightedProgress = clampProgress(progress) * totalWeight;

  let cursor = 0;

  for (const [caseIndex, caseId] of problemSolutionCaseOrder.entries()) {
    const caseStart = cursor;
    const caseEnd = caseStart + CASE_SEGMENT_WEIGHT;

    if (weightedProgress <= caseEnd || caseIndex === caseCount - 1) {
      return {
        caseId,
        caseIndex,
        mode: 'case',
        localProgress: clampProgress((weightedProgress - caseStart) / CASE_SEGMENT_WEIGHT),
        handoffProgress: 0,
        nextCaseId: null,
      };
    }

    cursor = caseEnd;

    const nextCaseId = problemSolutionCaseOrder[caseIndex + 1];

    const handoffStart = cursor;
    const handoffEnd = handoffStart + HANDOFF_SEGMENT_WEIGHT;

    if (weightedProgress <= handoffEnd) {
      return {
        caseId,
        caseIndex,
        mode: 'handoff',
        localProgress: 1,
        handoffProgress: clampProgress((weightedProgress - handoffStart) / HANDOFF_SEGMENT_WEIGHT),
        nextCaseId,
      };
    }

    cursor = handoffEnd;
  }

  const lastCaseIndex = problemSolutionCaseOrder.length - 1;

  const lastCaseId = problemSolutionCaseOrder[lastCaseIndex];

  return {
    caseId: lastCaseId,
    caseIndex: lastCaseIndex,
    mode: 'case',
    localProgress: 1,
    handoffProgress: 0,
    nextCaseId: null,
  };
};

const applyNarrativeDebugState = (
  section: HTMLElement,
  frame: ProblemSolutionNarrativeFrame,
): void => {
  section.dataset.problemSolutionNarrativeCase = frame.caseId;

  section.dataset.problemSolutionNarrativeCaseIndex = String(frame.caseIndex);

  section.dataset.problemSolutionNarrativeMode = frame.mode;

  section.dataset.problemSolutionNarrativeLocalProgress = frame.localProgress.toFixed(4);

  section.dataset.problemSolutionNarrativeHandoffProgress = frame.handoffProgress.toFixed(4);

  if (frame.nextCaseId) {
    section.dataset.problemSolutionNarrativeNextCase = frame.nextCaseId;
  } else {
    section.removeAttribute('data-problem-solution-narrative-next-case');
  }
};

/*
 * ============================================================
 * PROBLEM SOLUTION — WINDOWED PROGRESS
 * ============================================================
 *
 * Nem toda a animação precisa utilizar os 100% da pista.
 *
 * Esta função transforma uma janela do progresso global em um
 * novo progresso de 0 a 1 e aplica smoothstep.
 *
 * Assim evitamos movimentos começando cedo demais ou parando
 * abruptamente.
 */

const resolveWindowedProgress = (progress: number, start: number, end: number): number => {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  const normalizedProgress = clampProgress((progress - start) / (end - start));

  return normalizedProgress * normalizedProgress * (3 - 2 * normalizedProgress);
};

/*
 * ============================================================
 * PROBLEM SOLUTION — GEOMETRIA
 * ============================================================
 */

const getElementCenter = (element: Element, visualRect: DOMRect): Point => {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2 - visualRect.left,
    y: rect.top + rect.height / 2 - visualRect.top,
  };
};

/*
 * Descobre o ponto da borda do chip que está voltado para
 * o núcleo.
 *
 * Isso é melhor do que simplesmente ligar a linha ao centro
 * do chip, pois a linha visualmente começa exatamente na
 * superfície do elemento.
 */

const resolveRectangleEdgePoint = (
  center: Point,
  target: Point,
  halfWidth: number,
  halfHeight: number,
): Point => {
  const deltaX = target.x - center.x;
  const deltaY = target.y - center.y;

  if (deltaX === 0 && deltaY === 0) {
    return center;
  }

  const horizontalScale = deltaX === 0 ? Number.POSITIVE_INFINITY : halfWidth / Math.abs(deltaX);

  const verticalScale = deltaY === 0 ? Number.POSITIVE_INFINITY : halfHeight / Math.abs(deltaY);

  const scale = Math.min(1, horizontalScale, verticalScale);

  return {
    x: center.x + deltaX * scale,
    y: center.y + deltaY * scale,
  };
};

/*
 * Mesma ideia, porém para o núcleo circular.
 *
 * A linha termina na circunferência e não no centro da esfera.
 */

const resolveCircleEdgePoint = (center: Point, target: Point, radius: number): Point => {
  const deltaX = target.x - center.x;
  const deltaY = target.y - center.y;

  const distance = Math.hypot(deltaX, deltaY);

  if (distance === 0) {
    return center;
  }

  return {
    x: center.x + (deltaX / distance) * radius,
    y: center.y + (deltaY / distance) * radius,
  };
};

/*
 * ============================================================
 * PROBLEM SOLUTION — TARGET SEGURO
 * ============================================================
 *
 * Preserva a posição solicitada pelos anchors sempre que existe
 * espaço suficiente entre o chip e o núcleo.
 *
 * Caso os dois elementos estejam próximos demais, o chip é
 * deslocado para fora ao longo da mesma direção, preservando
 * a composição definida pelo CSS.
 *
 * Diferentemente da estratégia anterior, esta solução não
 * pressupõe que todos os chips estejam à esquerda do núcleo.
 */

const resolveSafeTargetCenter = (
  requestedCenter: Point,
  coreCenter: Point,
  halfWidth: number,
  halfHeight: number,
  coreRadius: number,
): Point => {
  const deltaX = requestedCenter.x - coreCenter.x;
  const deltaY = requestedCenter.y - coreCenter.y;

  const distance = Math.hypot(deltaX, deltaY);

  /*
   * Caso anchor e núcleo coincidam exatamente, usamos a esquerda
   * como direção de segurança para evitar divisão por zero.
   */
  const unitX = distance > 0 ? deltaX / distance : -1;
  const unitY = distance > 0 ? deltaY / distance : 0;

  /*
   * Calcula quanto o retângulo ocupa na direção do núcleo.
   *
   * Dessa maneira a proteção considera tanto largura quanto
   * altura do chip, inclusive em conexões diagonais.
   */
  const safeHalfWidth = Math.max(halfWidth, 0.001);
  const safeHalfHeight = Math.max(halfHeight, 0.001);

  const rectangleRadius =
    1 / Math.max(Math.abs(unitX) / safeHalfWidth, Math.abs(unitY) / safeHalfHeight);

  const minimumDistance = coreRadius + CONNECTOR_MINIMUM_GAP + rectangleRadius;

  if (distance >= minimumDistance) {
    return requestedCenter;
  }

  return {
    x: coreCenter.x + unitX * minimumDistance,
    y: coreCenter.y + unitY * minimumDistance,
  };
};

/*
 * ============================================================
 * PROBLEM SOLUTION — FASES
 * ============================================================
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
 * PROBLEM SOLUTION — MEDIÇÃO DOS DESTINOS
 * ============================================================
 *
 * Esta função roda somente quando precisamos recalcular a
 * geometria, e não a cada frame.
 *
 * Primeiro colocamos os elementos temporariamente em suas
 * posições Challenge. Depois medimos:
 *
 * - posição inicial;
 * - posição do anchor;
 * - tamanho real do chip;
 * - posição inicial do núcleo;
 * - posição final do núcleo.
 *
 * O navegador passa a ser nossa fonte de verdade.
 */

const measureVisualGeometry = (
  visual: HTMLElement,
  symbol: HTMLElement,
  coreAnchor: HTMLElement,
  connectorsSvg: SVGSVGElement,
  references: readonly ProblemSolutionVisualReference[],
): ProblemSolutionGeometry => {
  references.forEach(({ item }) => {
    item.style.setProperty(ITEM_TRANSLATE_X_PROPERTY, '0px');

    item.style.setProperty(ITEM_TRANSLATE_Y_PROPERTY, '0px');
  });

  symbol.style.setProperty(SYMBOL_TRANSLATE_X_PROPERTY, '0px');

  symbol.style.setProperty(SYMBOL_TRANSLATE_Y_PROPERTY, '0px');

  const visualRect = visual.getBoundingClientRect();

  const symbolRect = symbol.getBoundingClientRect();

  /*
   * Faz o sistema de coordenadas do SVG acompanhar exatamente
   * o tamanho real do visual.
   */

  connectorsSvg.setAttribute(
    'viewBox',
    ['0', '0', formatCoordinate(visualRect.width), formatCoordinate(visualRect.height)].join(' '),
  );

  const symbolStartCenter = getElementCenter(symbol, visualRect);

  const symbolTargetCenter = getElementCenter(coreAnchor, visualRect);

  const symbolRadius = symbolRect.width / 2;

  const measuredItems = references.map((reference) => {
    const itemRect = reference.item.getBoundingClientRect();

    return {
      ...reference,

      startCenter: getElementCenter(reference.item, visualRect),

      requestedTargetCenter: getElementCenter(reference.anchor, visualRect),

      halfWidth: itemRect.width / 2,
      halfHeight: itemRect.height / 2,
    };
  });

  /*
   * Este é um detalhe importante da responsividade.
   *
   * Nos seus testes compactos o anchor e o core ficaram com
   * aproximadamente 80px de distância.
   *
   * Isso pode ser insuficiente para o maior chip +
   * o raio do núcleo.
   *
   * Em vez de criar outro breakpoint, descobrimos o maior chip
   * dinamicamente e preservamos pelo menos 12px de respiro.
   */

  const items = measuredItems.map(({ requestedTargetCenter, ...item }) => ({
    ...item,

    targetCenter: resolveSafeTargetCenter(
      requestedTargetCenter,
      symbolTargetCenter,
      item.halfWidth,
      item.halfHeight,
      symbolRadius,
    ),
  }));

  return {
    items,
    symbolStartCenter,
    symbolTargetCenter,
    symbolRadius,
  };
};

/*
 * ============================================================
 * PROBLEM SOLUTION — MOVIMENTO
 * ============================================================
 *
 * Aqui acontece a transformação visual.
 *
 * Não consultamos layout nesta função.
 *
 * Tudo foi medido previamente, portanto cada frame exige
 * apenas interpolação matemática e escrita de propriedades.
 */

const applyVisualGeometry = (
  geometry: ProblemSolutionGeometry,
  symbol: HTMLElement,
  progress: number,
): void => {
  const movementProgress = resolveWindowedProgress(
    progress,
    TRANSFORM_START_PROGRESS,
    TRANSFORM_END_PROGRESS,
  );

  /*
   * ------------------------------------------------------------
   * NÚCLEO
   * ------------------------------------------------------------
   */

  const symbolCenter = {
    x: interpolate(geometry.symbolStartCenter.x, geometry.symbolTargetCenter.x, movementProgress),

    y: interpolate(geometry.symbolStartCenter.y, geometry.symbolTargetCenter.y, movementProgress),
  };

  symbol.style.setProperty(
    SYMBOL_TRANSLATE_X_PROPERTY,
    formatPixelValue(symbolCenter.x - geometry.symbolStartCenter.x),
  );

  symbol.style.setProperty(
    SYMBOL_TRANSLATE_Y_PROPERTY,
    formatPixelValue(symbolCenter.y - geometry.symbolStartCenter.y),
  );

  /*
   * ------------------------------------------------------------
   * CHIPS + CONNECTORS
   * ------------------------------------------------------------
   */

  geometry.items.forEach((itemGeometry) => {
    const itemCenter = {
      x: interpolate(itemGeometry.startCenter.x, itemGeometry.targetCenter.x, movementProgress),

      y: interpolate(itemGeometry.startCenter.y, itemGeometry.targetCenter.y, movementProgress),
    };

    const [connectorStartProgress, connectorEndProgress] =
      CONNECTOR_PROGRESS_WINDOWS[itemGeometry.id];

    const connectorProgress = resolveWindowedProgress(
      progress,
      connectorStartProgress,
      connectorEndProgress,
    );

    itemGeometry.item.style.setProperty(
      ITEM_TRANSLATE_X_PROPERTY,
      formatPixelValue(itemCenter.x - itemGeometry.startCenter.x),
    );

    itemGeometry.item.style.setProperty(
      ITEM_TRANSLATE_Y_PROPERTY,
      formatPixelValue(itemCenter.y - itemGeometry.startCenter.y),
    );
    /*
     * O início da linha é calculado na borda do chip.
     */

    const connectorStart = resolveRectangleEdgePoint(
      itemCenter,
      symbolCenter,
      itemGeometry.halfWidth,
      itemGeometry.halfHeight,
    );

    /*
     * E o fim está exatamente na circunferência do núcleo.
     */

    const connectorEnd = resolveCircleEdgePoint(symbolCenter, itemCenter, geometry.symbolRadius);

    const connectorLength = Math.hypot(
      connectorEnd.x - connectorStart.x,
      connectorEnd.y - connectorStart.y,
    );

    itemGeometry.connector.setAttribute('x1', connectorStart.x.toFixed(2));

    itemGeometry.connector.setAttribute('y1', connectorStart.y.toFixed(2));

    itemGeometry.connector.setAttribute('x2', connectorEnd.x.toFixed(2));

    itemGeometry.connector.setAttribute('y2', connectorEnd.y.toFixed(2));

    /*
     * Além do fade, a linha é desenhada progressivamente.
     *
     * Ela nasce do item e avança em direção ao FUP365.
     */

    itemGeometry.connector.style.opacity = connectorProgress.toFixed(3);

    itemGeometry.connector.style.strokeDasharray = connectorLength.toFixed(2);

    itemGeometry.connector.style.strokeDashoffset = (
      connectorLength *
      (1 - connectorProgress)
    ).toFixed(2);
  });
};

/*
 * ============================================================
 * PROBLEM SOLUTION — INICIALIZAÇÃO
 * ============================================================
 */

const applyVisualItemContent = (
  state: ProblemSolutionState,
  references: readonly ProblemSolutionVisualReference[],
): void => {
  references.forEach((reference) => {
    const itemContent = state.items.find((item) => item.id === reference.id);

    if (!itemContent) {
      return;
    }

    reference.label.textContent = itemContent.label;
  });
};

const applyCopyContent = (
  caseId: ProblemSolutionCaseId,
  references: readonly ProblemSolutionCopyReference[],
): void => {
  const currentCase = problemSolutionCases[caseId];

  references.forEach((reference) => {
    const stateContent = currentCase.states[reference.type];

    reference.badge.textContent = stateContent.badge;
    reference.title.textContent = stateContent.title;
    reference.description.textContent = stateContent.description;
  });
};

export const initProblemSolution = (): void => {
  const section = document.querySelector<HTMLElement>('[data-problem-solution]');

  if (!section) {
    return;
  }

  const interactive = section.querySelector<HTMLElement>('[data-problem-solution-interactive]');

  const stage = section.querySelector<HTMLElement>('[data-problem-solution-stage]');

  const card = section.querySelector<HTMLElement>('[data-problem-solution-card]');

  const visual = section.querySelector<HTMLElement>('[data-problem-solution-visual]');

  const symbol = section.querySelector<HTMLElement>('[data-problem-solution-symbol]');

  const coreAnchor = section.querySelector<HTMLElement>(
    '[data-problem-solution-solution-core-anchor]',
  );

  const connectorsSvg = section.querySelector<SVGSVGElement>('[data-problem-solution-connectors]');

  if (!interactive || !stage || !card || !visual || !symbol || !coreAnchor || !connectorsSvg) {
    return;
  }

  /*
   * ------------------------------------------------------------
   * REFERÊNCIAS DOS ELEMENTOS
   * ------------------------------------------------------------
   */

  const visualReferences = PROBLEM_SOLUTION_ITEM_IDS.map((id) => {
    const item = visual.querySelector<HTMLElement>(`[data-problem-solution-item="${id}"]`);

    const label = item?.querySelector<HTMLElement>('[data-problem-solution-item-label]');

    const anchor = visual.querySelector<HTMLElement>(
      `[data-problem-solution-solution-anchor="${id}"]`,
    );

    const connector = visual.querySelector<SVGLineElement>(
      `[data-problem-solution-connector="${id}"]`,
    );

    if (!item || !label || !anchor || !connector) {
      return null;
    }

    return {
      id,
      item,
      label,
      anchor,
      connector,
    } satisfies ProblemSolutionVisualReference;
  });

  if (visualReferences.some((reference) => reference === null)) {
    return;
  }

  const resolvedVisualReferences = visualReferences.filter(
    (reference): reference is ProblemSolutionVisualReference => reference !== null,
  );

  const copyReferences = (['challenge', 'solution'] as const).map((type) => {
    const root = card.querySelector<HTMLElement>(`[data-problem-solution-copy="${type}"]`);

    const badge = root?.querySelector<HTMLElement>('[data-problem-solution-copy-badge]');

    const title = root?.querySelector<HTMLElement>('[data-problem-solution-copy-title]');

    const description = root?.querySelector<HTMLElement>(
      '[data-problem-solution-copy-description]',
    );

    if (!root || !badge || !title || !description) {
      return null;
    }

    return {
      type,
      root,
      badge,
      title,
      description,
    } satisfies ProblemSolutionCopyReference;
  });

  if (copyReferences.some((reference) => reference === null)) {
    return;
  }

  const resolvedCopyReferences = copyReferences.filter(
    (reference): reference is ProblemSolutionCopyReference => reference !== null,
  );

  const activeCaseId = resolveCaseId(section.dataset.problemSolutionCase);

  const copyStates = resolvedCopyReferences.map(({ root }) => root);

  const initialProgress = calculateProgress(interactive, stage);

  let targetProgress = initialProgress;

  let displayedProgress = initialProgress;

  let geometry = measureVisualGeometry(
    visual,
    symbol,
    coreAnchor,
    connectorsSvg,
    resolvedVisualReferences,
  );

  const refreshVisualGeometry = (): void => {
    geometry = measureVisualGeometry(
      visual,
      symbol,
      coreAnchor,
      connectorsSvg,
      resolvedVisualReferences,
    );
  };

  let animationFrameId: number | null = null;

  let previousTimestamp: number | null = null;

  let cardState: ProblemSolutionCardState =
    card.dataset.problemSolutionState === 'solution' ? 'solution' : 'challenge';

  applyCopyContent(activeCaseId, resolvedCopyReferences);

  applyVisualItemContent(
    problemSolutionCases[activeCaseId].states[cardState],
    resolvedVisualReferences,
  );

  refreshVisualGeometry();

  /*
   * ------------------------------------------------------------
   * ESTADO SEMÂNTICO DO CARD
   * ------------------------------------------------------------
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

    applyVisualItemContent(
      problemSolutionCases[activeCaseId].states[cardState],
      resolvedVisualReferences,
    );

    refreshVisualGeometry();
  };

  /*
   * ------------------------------------------------------------
   * LOOP DE SUAVIZAÇÃO
   * ------------------------------------------------------------
   */

  const renderFrame = (timestamp: number): void => {
    animationFrameId = null;

    const elapsedMilliseconds =
      previousTimestamp === null ? 1000 / 60 : Math.min(64, timestamp - previousTimestamp);

    previousTimestamp = timestamp;

    const elapsedSeconds = elapsedMilliseconds / 1000;

    const smoothingFactor = 1 - Math.exp(-PROGRESS_RESPONSE * elapsedSeconds);

    displayedProgress += (targetProgress - displayedProgress) * smoothingFactor;

    if (Math.abs(targetProgress - displayedProgress) <= PROGRESS_EPSILON) {
      displayedProgress = targetProgress;
    }

    const narrativeFrame = resolveNarrativeFrame(displayedProgress);

    applyNarrativeDebugState(section, narrativeFrame);

    applyProgress(section, displayedProgress);

    applyCardState(displayedProgress);

    applyVisualGeometry(geometry, symbol, displayedProgress);

    if (displayedProgress !== targetProgress) {
      animationFrameId = window.requestAnimationFrame(renderFrame);

      return;
    }

    previousTimestamp = null;
  };

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
   */

  const updateTargetProgress = (): void => {
    targetProgress = calculateProgress(interactive, stage);

    requestAnimationUpdate();
  };

  /*
   * ------------------------------------------------------------
   * RECÁLCULO RESPONSIVO
   * ------------------------------------------------------------
   *
   * Sempre que a geometria real mudar:
   *
   * 1. pausamos a animação anterior;
   * 2. medimos novamente os anchors;
   * 3. recalculamos os destinos;
   * 4. reaplicamos o progresso atual.
   */

  const synchronizeProgress = (): void => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);

      animationFrameId = null;
    }

    targetProgress = calculateProgress(interactive, stage);

    displayedProgress = targetProgress;

    previousTimestamp = null;

    geometry = measureVisualGeometry(
      visual,
      symbol,
      coreAnchor,
      connectorsSvg,
      resolvedVisualReferences,
    );

    const narrativeFrame = resolveNarrativeFrame(displayedProgress);

    applyNarrativeDebugState(section, narrativeFrame);

    applyProgress(section, displayedProgress);

    applyCardState(displayedProgress);

    applyVisualGeometry(geometry, symbol, displayedProgress);
  };

  window.addEventListener('scroll', updateTargetProgress, {
    passive: true,
  });

  window.addEventListener('resize', synchronizeProgress);

  /*
   * ResizeObserver cobre alterações reais da área visual que
   * podem ocorrer sem um resize clássico da janela.
   */

  const resizeObserver = new ResizeObserver(synchronizeProgress);

  resizeObserver.observe(visual);

  /*
   * Se a métrica das fontes mudar depois do primeiro paint,
   * refazemos a geometria uma única vez.
   */

  void document.fonts.ready.then(synchronizeProgress);

  synchronizeProgress();
};
