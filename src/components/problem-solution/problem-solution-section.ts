import { problemSolutionInitialState, problemSolutionIntro } from '../../data/problem-solution';

/*
 * ============================================================
 * PROBLEM SOLUTION — VISUAL ITEMS
 * ============================================================
 *
 * Os mesmos elementos visuais serão reaproveitados futuramente
 * durante a transição entre desafio e solução.
 */

const renderVisualItem = (item: (typeof problemSolutionInitialState.items)[number]): string => {
  return `
    <span
      class="
        problem-solution__visual-item
        problem-solution__visual-item--${item.id}
      "
      data-problem-solution-item="${item.id}"
    >
      ${item.label}
    </span>
  `;
};

/*
 * ============================================================
 * PROBLEM SOLUTION — SEÇÃO
 * ============================================================
 *
 * A estrutura abaixo permanece independente da lógica de scroll.
 * O componente apenas descreve o conteúdo e fornece pontos
 * semânticos para a camada responsável pela interação.
 */

export const renderProblemSolutionSection = (): string => {
  const visualItemsMarkup = problemSolutionInitialState.items.map(renderVisualItem).join('');

  return `
    <section
      id="desafio-solucao"
      class="problem-solution"
      aria-labelledby="problem-solution-title"
      data-problem-solution
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
                <p
                  class="problem-solution__state-badge"
                  data-problem-solution-badge
                >
                  ${problemSolutionInitialState.badge}
                </p>

                <h3
                  class="problem-solution__state-title"
                  data-problem-solution-state-title
                >
                  ${problemSolutionInitialState.title}
                </h3>

                <p
                  class="problem-solution__state-description"
                  data-problem-solution-state-description
                >
                  ${problemSolutionInitialState.description}
                </p>
              </div>

              <div
                class="problem-solution__visual"
                data-problem-solution-visual
                aria-hidden="true"
              >
                ${visualItemsMarkup}

                <div
                  class="problem-solution__main-symbol"
                  data-problem-solution-symbol
                >
                  <span class="problem-solution__main-ring"></span>

                  <span
                    class="problem-solution__main-icon"
                    data-problem-solution-symbol-icon
                  >
                    ${problemSolutionInitialState.symbol}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  `;
};
