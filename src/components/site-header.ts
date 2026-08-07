import { externalLinks } from '../config/links';
import { navigationItems } from '../data/navigation';
import type { NavigationItem } from '../types/navigation';

const renderNavigationItem = (item: NavigationItem): string => {
  return `
    <li class="site-navigation__item">
      <a class="site-navigation__link" href="#${item.sectionId}">
        ${item.label}
      </a>
    </li>
  `;
};

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
          FUP365
        </a>

        <nav
          class="site-navigation"
          aria-label="Navegação principal"
        >
          <ul class="site-navigation__list">
            ${navigationMarkup}
          </ul>
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
