import { clients } from '../../data/clients';

/*
 * ============================================================
 * CLIENTES — LOGOS
 * ============================================================
 *
 * Renderiza cada marca dentro de uma área consistente para
 * preservar proporção e alinhamento entre logos diferentes.
 */

const renderClientLogo = (client: (typeof clients)[number]): string => {
  return `
    <li class="clients-section__item">
      <img
        class="clients-section__logo clients-section__logo--${client.id}"
        src="${client.imageSrc}"
        alt="${client.name}"
        decoding="async"
      />
    </li>
  `;
};

/*
 * ============================================================
 * CLIENTES — SEÇÃO
 * ============================================================
 *
 * Apresenta as empresas que utilizam o FUP365 seguindo a
 * composição aprovada para Desktop, Tablet e Mobile.
 */

export const renderClientsSection = (): string => {
  const clientsMarkup = clients.map(renderClientLogo).join('');

  return `
    <section
      id="empresas"
      class="clients-section"
      aria-labelledby="clients-section-title"
    >
      <div class="container clients-section__inner">
        <h2
          id="clients-section-title"
          class="clients-section__title"
        >
          Empresas que confiam no FUP365
        </h2>

        <ul
          class="clients-section__list"
          aria-label="Clientes do FUP365"
        >
          ${clientsMarkup}
        </ul>
      </div>
    </section>
  `;
};
