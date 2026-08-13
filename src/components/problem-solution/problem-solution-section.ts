import {
  problemSolutionCaseOrder,
  problemSolutionCases,
  problemSolutionInitialState,
  problemSolutionIntro,
  problemSolutionSolutionState,
} from '../../data/problem-solution';

import type { ProblemSolutionState } from '../../data/problem-solution';
/*
 * ============================================================
 * PROBLEM SOLUTION — VISUAL ITEMS
 * ============================================================
 *
 * Cada elemento existe apenas uma vez no DOM.
 * O motor de scroll moverá esses mesmos elementos da composição
 * de desafio para a composição organizada da solução.
 */

const renderVisualItem = (item: (typeof problemSolutionInitialState.items)[number]): string => {
  return `
    <span
      class="
        problem-solution__visual-item
        problem-solution__visual-item--${item.id}
      "
      data-problem-solution-item="${item.id}"
      data-problem-solution-slot="${item.slot}"
    >
      <span
        class="problem-solution__visual-item-label"
        data-problem-solution-item-label
      >
        ${item.label}
      </span>
    </span>
  `;
};

/*
 * ============================================================
 * PROBLEM SOLUTION — CONNECTORS
 * ============================================================
 *
 * As linhas permanecem invisíveis no estado inicial.
 * Durante a transição serão desenhadas progressivamente entre
 * cada item e o núcleo central do FUP365.
 */

const renderConnector = (item: (typeof problemSolutionInitialState.items)[number]): string => {
  return `
    <line
      class="problem-solution__connector"
      data-problem-solution-connector="${item.id}"
      x1="0"
      y1="0"
      x2="0"
      y2="0"
    ></line>
  `;
};

/*
 * ============================================================
 * PROBLEM SOLUTION — SOLUTION ANCHORS
 * ============================================================
 *
 * Os anchors representam destinos geométricos invisíveis para
 * os elementos durante a transformação para o estado solução.
 *
 * O JavaScript mede suas posições reais em cada breakpoint,
 * evitando coordenadas absolutas acopladas ao viewport.
 */

const renderSolutionAnchor = (item: (typeof problemSolutionInitialState.items)[number]): string => {
  return `
    <span
      class="
        problem-solution__solution-anchor
        problem-solution__solution-anchor--${item.id}
      "
      data-problem-solution-solution-anchor="${item.id}"
      data-problem-solution-slot="${item.slot}"
    ></span>
  `;
};

/*
 * ============================================================
 * PROBLEM SOLUTION — COPY STATES
 * ============================================================
 *
 * Os dois estados permanecem na mesma célula do grid.
 * Isso permite crossfade sem alterar a altura do card durante
 * o scroll.
 */

const renderCopyState = (state: ProblemSolutionState, initiallyHidden: boolean): string => {
  return `
    <div
      class="
        problem-solution__copy-state
        problem-solution__copy-state--${state.type}
      "
      data-problem-solution-copy="${state.type}"
      aria-hidden="${String(initiallyHidden)}"
    >
      <p
        class="
          problem-solution__state-badge
          problem-solution__state-badge--${state.type}
        "
        data-problem-solution-copy-badge
      >
        ${state.badge}
      </p>

      <h3
        class="problem-solution__state-title"
        data-problem-solution-copy-title
      >
        ${state.title}
      </h3>

      <p
        class="problem-solution__state-description"
        data-problem-solution-copy-description
      >
        ${state.description}
      </p>
    </div>
  `;
};

const renderReducedMotionItems = (state: ProblemSolutionState): string => {
  return state.items
    .map(
      (item) => `
        <span class="problem-solution__reduced-motion-item">
          ${item.label}
        </span>
      `,
    )
    .join('');
};

const renderReducedMotionState = (state: ProblemSolutionState): string => {
  return `
    <article
      class="
        problem-solution__reduced-motion-state
        problem-solution__reduced-motion-state--${state.type}
      "
    >
      <p
        class="
          problem-solution__state-badge
          problem-solution__state-badge--${state.type}
        "
      >
        ${state.badge}
      </p>

      <h4 class="problem-solution__reduced-motion-state-title">
        ${state.title}
      </h4>

      <p class="problem-solution__reduced-motion-state-description">
        ${state.description}
      </p>

      <div class="problem-solution__reduced-motion-items">
        ${renderReducedMotionItems(state)}
      </div>
    </article>
  `;
};

const renderReducedMotionCase = (caseId: (typeof problemSolutionCaseOrder)[number]): string => {
  const currentCase = problemSolutionCases[caseId];

  return `
    <section class="problem-solution__reduced-motion-case">
      <header class="problem-solution__reduced-motion-case-header">
        <p class="problem-solution__reduced-motion-case-index">
          ${String(problemSolutionCaseOrder.indexOf(caseId) + 1).padStart(2, '0')}
        </p>

        <h3 class="problem-solution__reduced-motion-case-title">
          ${currentCase.label}
        </h3>
      </header>

      <div class="problem-solution__reduced-motion-comparison">
        ${renderReducedMotionState(currentCase.states.challenge)}
        ${renderReducedMotionState(currentCase.states.solution)}
      </div>
    </section>
  `;
};

const renderReducedMotionCases = (): string => {
  return problemSolutionCaseOrder.map(renderReducedMotionCase).join('');
};

/*
 * ============================================================
 * PROBLEM SOLUTION — SEÇÃO
 * ============================================================
 */

export const renderProblemSolutionSection = (): string => {
  const visualItemsMarkup = problemSolutionInitialState.items.map(renderVisualItem).join('');

  const connectorsMarkup = problemSolutionInitialState.items.map(renderConnector).join('');

  const solutionAnchorsMarkup = problemSolutionInitialState.items
    .map(renderSolutionAnchor)
    .join('');

  const challengeCopyMarkup = renderCopyState(problemSolutionInitialState, false);

  const solutionCopyMarkup = renderCopyState(problemSolutionSolutionState, true);

  const reducedMotionCasesMarkup = renderReducedMotionCases();

  return `
    <section
      id="desafio-solucao"
      class="problem-solution"
      aria-labelledby="problem-solution-title"
      data-problem-solution
      data-problem-solution-case="${problemSolutionCases.information.id}"
    >
      <div class="container problem-solution__inner">
        <header class="problem-solution__intro">
          <p class="problem-solution__eyebrow">
            ${problemSolutionIntro.eyebrow}
          </p>

          <h2
            id="problem-solution-title"
            class="problem-solution__title"
          >
            ${problemSolutionIntro.title}
          </h2>
        </header>

      <div
            class="problem-solution__interactive"
            data-problem-solution-interactive
            aria-hidden="true"
          >
      <div
            class="problem-solution__stage"
            data-problem-solution-stage
          >
            <span
              class="
                problem-solution__glow
                problem-solution__glow--left
              "
              aria-hidden="true"
            ></span>

            <span
              class="
                problem-solution__glow
                problem-solution__glow--right
              "
              aria-hidden="true"
            ></span>

            <article
              class="problem-solution__card"
              data-problem-solution-card
              data-problem-solution-state="${problemSolutionInitialState.type}"
            >
              <div class="problem-solution__copy">
                ${challengeCopyMarkup}
                ${solutionCopyMarkup}
              </div>

              <div
                class="problem-solution__visual"
                data-problem-solution-visual
                aria-hidden="true"
              >
                <svg
                  class="problem-solution__connectors"
                  data-problem-solution-connectors
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  ${connectorsMarkup}
                </svg>

                <div
                    class="problem-solution__solution-layout"
                    data-problem-solution-solution-layout
                >
                    ${solutionAnchorsMarkup}

                <span
                    class="problem-solution__solution-core-anchor"
                    data-problem-solution-solution-core-anchor
                ></span>
                </div>

                ${visualItemsMarkup}

                <div
                  class="problem-solution__main-symbol"
                  data-problem-solution-symbol
                >
                  <span
                    class="
                      problem-solution__main-ring
                      problem-solution__main-ring--challenge
                    "
                  ></span>

                  <span
                    class="
                      problem-solution__main-ring
                      problem-solution__main-ring--solution
                    "
                  ></span>

                  <span
                    class="
                      problem-solution__main-icon
                      problem-solution__main-icon--challenge
                    "
                  >
                    ${problemSolutionInitialState.symbol}
                  </span>

                  <span
                    class="
                        problem-solution__main-icon
                        problem-solution__main-icon--solution
                    "
                    >
                    <span class="problem-solution__main-check">
                        ${problemSolutionSolutionState.symbol}
                    </span>
                    </span>
                </div>
                </div>
                </article>
            </div>
           </div>

           <div class="problem-solution__reduced-motion">
                ${reducedMotionCasesMarkup}
           </div>
         </div>
    </section>
  `;
};
