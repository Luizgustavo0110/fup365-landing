import { resultItems, resultsContent } from '../../data/results';

import type { ResultItem } from '../../data/results';

const renderResultItem = (result: ResultItem): string => {
  return `
    <li
      class="results__item"
      data-result="${result.id}"
    >
      <span
        class="results__number"
        aria-hidden="true"
      >
        ${result.number}
      </span>

      <h3 class="results__item-title">
        ${result.title}
      </h3>

      <p class="results__item-description">
        ${result.description}
      </p>
    </li>
  `;
};

export const renderResultsSection = (): string => {
  const resultsMarkup = resultItems.map(renderResultItem).join('');

  return `
    <section
      id="resultados"
      class="results"
      aria-labelledby="resultados-title"
    >
      <div class="container results__inner">
        <header class="results__header">
          <p class="results__eyebrow">
            ${resultsContent.eyebrow}
          </p>

          <h2
            id="resultados-title"
            class="results__title"
          >
            ${resultsContent.title}
          </h2>

          <p class="results__description">
            ${resultsContent.description}
          </p>
        </header>

        <ol class="results__list">
          ${resultsMarkup}
        </ol>
      </div>
    </section>
  `;
};
