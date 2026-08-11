import { externalLinks } from '../config/links';
import { navigationItems } from '../data/navigation';
import type { NavigationItem } from '../types/navigation';

/*
 * ============================================================
 * NAVEGAÇÃO
 * ============================================================
 *
 * Constrói os links a partir da configuração central do Header.
 */
const renderNavigationItem = (item: NavigationItem): string => {
  const responsiveClass = item.desktopOnly ? ' site-navigation__item--desktop-only' : '';

  return `
    <li class="site-navigation__item${responsiveClass}">
      <a class="site-navigation__link" href="#${item.sectionId}">
        ${item.label}
      </a>
    </li>
  `;
};

/*
 * ============================================================
 * HEADER
 * ============================================================
 *
 * Renderiza a estrutura compartilhada entre todos os breakpoints.
 */
export const renderSiteHeader = (): string => {
  const navigationMarkup = navigationItems.map(renderNavigationItem).join('');

  return `
    <header class="site-header">
      <div class="container site-header__inner">
        <a
          class="site-brand"
          href="#inicio"
          aria-label="FUP365 — voltar ao início"
        >
          <img
            class="site-brand__logo"
            src="/assets/brands/fup365-logo.png"
            alt=""
            width="2000"
            height="566"
          />
        </a>

        <button
          class="site-header__menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="primary-navigation"
          aria-label="Abrir menu"
          data-site-menu-toggle
        >
          <span class="site-header__menu-icon" aria-hidden="true">
            <span class="site-header__menu-line"></span>
            <span class="site-header__menu-line"></span>
            <span class="site-header__menu-line"></span>
          </span>
        </button>

        <nav
          id="primary-navigation"
          class="site-navigation"
          aria-label="Navegação principal"
          data-site-navigation
        >
          <ul class="site-navigation__list">
            ${navigationMarkup}
          </ul>

          <a
            class="button button--primary site-navigation__cta"
            href="${externalLinks.booking}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar demonstração
          </a>
        </nav>

        <a
          class="button button--primary site-header__cta"
          href="${externalLinks.booking}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar uma demonstração
        </a>
      </div>
    </header>
  `;
};
