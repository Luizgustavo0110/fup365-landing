import { heroDashboardData } from '../../data/hero-dashboard';

/*
 * ============================================================
 * HERO DASHBOARD — MÉTRICAS
 * ============================================================
 *
 * Gera os cards superiores e preserva o significado visual dos
 * estados sem duplicar dados diretamente no template.
 */

const renderMetricCard = (metric: (typeof heroDashboardData.metrics)[number]): string => {
  return `
    <div class="hero-dashboard__metric hero-dashboard__metric--${metric.tone}">
      <dt class="hero-dashboard__metric-label">
        ${metric.label}
      </dt>

      <dd class="hero-dashboard__metric-value">
        ${metric.value}
      </dd>
    </div>
  `;
};

/*
 * ============================================================
 * HERO DASHBOARD — STATUS
 * ============================================================
 *
 * O gráfico utiliza SVG real para representar os percentuais,
 * mantendo nitidez e responsividade sem bibliotecas externas.
 */

const renderStatusChart = (): string => {
  let accumulatedValue = 0;

  const segmentsMarkup = heroDashboardData.statuses
    .map((status) => {
      const statusValue = status.value;
      const dashOffset = -accumulatedValue;
      const remainingValue = 100 - statusValue;

      accumulatedValue += statusValue;

      return `
        <circle
          class="hero-dashboard__chart-segment hero-dashboard__chart-segment--${status.tone}"
          cx="50"
          cy="50"
          r="40"
          pathLength="100"
          stroke-dasharray="${String(statusValue)} ${String(remainingValue)}"
          stroke-dashoffset="${String(dashOffset)}"
        ></circle>
      `;
    })
    .join('');

  const accessibleDescription = heroDashboardData.statuses
    .map((status) => `${status.label} ${String(status.value)}%`)
    .join(', ');

  return `
    <svg
      class="hero-dashboard__chart"
      viewBox="0 0 100 100"
      role="img"
      aria-label="Distribuição dos pedidos: ${accessibleDescription}"
    >
      <circle
        class="hero-dashboard__chart-track"
        cx="50"
        cy="50"
        r="40"
      ></circle>

      <g transform="rotate(-90 50 50)">
        ${segmentsMarkup}
      </g>
    </svg>
  `;
};

const renderStatusItem = (status: (typeof heroDashboardData.statuses)[number]): string => {
  const statusValue = String(status.value);

  return `
    <li class="hero-dashboard__status-item">
      ${status.label} ${statusValue}%
    </li>
  `;
};

/*
 * ============================================================
 * HERO DASHBOARD — OCORRÊNCIAS
 * ============================================================
 *
 * Os estados utilizam marcadores semânticos independentes do
 * conteúdo textual para facilitar futuras alterações visuais.
 */

const renderOccurrence = (occurrence: (typeof heroDashboardData.occurrences)[number]): string => {
  return `
    <li class="hero-dashboard__occurrence">
      <span
        class="hero-dashboard__occurrence-indicator hero-dashboard__occurrence-indicator--${occurrence.tone}"
        aria-hidden="true"
      ></span>

      <span class="hero-dashboard__occurrence-label">
        ${occurrence.label}
      </span>
    </li>
  `;
};

const renderFooterMetric = (metric: (typeof heroDashboardData.footerMetrics)[number]): string => {
  return `
    <div class="hero-dashboard__footer-metric">
      <dt class="hero-dashboard__footer-label">
        ${metric.label}
      </dt>

      <dd class="hero-dashboard__footer-value">
        ${metric.value}
      </dd>
    </div>
  `;
};

/*
 * ============================================================
 * HERO DASHBOARD — MOCKUP
 * ============================================================
 *
 * Reproduz o painel operacional aprovado no Figma e permite
 * adaptar sua densidade de informação conforme o breakpoint.
 */

export const renderHeroDashboard = (): string => {
  const metricsMarkup = heroDashboardData.metrics.map(renderMetricCard).join('');

  const statusMarkup = heroDashboardData.statuses.map(renderStatusItem).join('');

  const occurrencesMarkup = heroDashboardData.occurrences.map(renderOccurrence).join('');

  const footerMetricsMarkup = heroDashboardData.footerMetrics.map(renderFooterMetric).join('');

  return `
    <aside
      class="hero-dashboard"
      aria-labelledby="hero-dashboard-title"
    >
      <div class="hero-dashboard__mockup">
        <header class="hero-dashboard__header">
          <h2
            id="hero-dashboard-title"
            class="hero-dashboard__title"
          >
            ${heroDashboardData.title}
          </h2>

          <p class="hero-dashboard__period">
            ${heroDashboardData.period}
          </p>
        </header>

        <dl class="hero-dashboard__metrics">
          ${metricsMarkup}
        </dl>

        <div class="hero-dashboard__main">
          <section
            class="hero-dashboard__status"
            aria-labelledby="hero-dashboard-status-title"
          >
            <h3
              id="hero-dashboard-status-title"
              class="hero-dashboard__section-title"
            >
              Pedidos por status
            </h3>

            <div class="hero-dashboard__status-body">
              ${renderStatusChart()}

              <ul class="hero-dashboard__status-list">
                ${statusMarkup}
              </ul>
            </div>
          </section>

          <section
            class="hero-dashboard__occurrences"
            aria-labelledby="hero-dashboard-occurrences-title"
          >
            <h3
              id="hero-dashboard-occurrences-title"
              class="hero-dashboard__section-title"
            >
              Ocorrências prioritárias
            </h3>

            <ul class="hero-dashboard__occurrence-list">
              ${occurrencesMarkup}
            </ul>
          </section>
        </div>

        <dl class="hero-dashboard__footer-metrics">
          ${footerMetricsMarkup}
        </dl>
      </div>
    </aside>
  `;
};
