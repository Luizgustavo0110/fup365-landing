import { externalLinks } from '../config/links';
import { footerContent, footerNavigationItems } from '../data/footer';

const renderFooterNavigationItem = (item: (typeof footerNavigationItems)[number]): string => {
  return `
    <li class="site-footer__list-item">
      <a
        class="site-footer__link"
        href="#${item.sectionId}"
      >
        ${item.label}
      </a>
    </li>
  `;
};

export const renderSiteFooter = (): string => {
  const navigationMarkup = footerNavigationItems.map(renderFooterNavigationItem).join('');

  return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__main">
          <div class="site-footer__brand">
            <a
              class="site-footer__brand-link"
              href="#inicio"
              aria-label="FUP365 — voltar ao início"
            >
              ${footerContent.brand}
            </a>

            <p class="site-footer__description">
              ${footerContent.description}
            </p>
          </div>

          <nav
            class="site-footer__navigation"
            aria-label="Navegação do rodapé"
          >
            <p class="site-footer__group-title">
              ${footerContent.navigationTitle}
            </p>

            <ul class="site-footer__list">
              ${navigationMarkup}
            </ul>
          </nav>

          <div class="site-footer__contact">
            <p class="site-footer__group-title">
              ${footerContent.contactTitle}
            </p>

            <ul class="site-footer__list">
              <li class="site-footer__list-item">
                <a
                  class="site-footer__link"
                  href="${externalLinks.whatsapp}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar pelo WhatsApp
                </a>
              </li>

              <li class="site-footer__list-item">
                <a
                  class="site-footer__link"
                  href="${externalLinks.booking}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar uma demonstração
                </a>
              </li>

              <li class="site-footer__list-item">
                <a
                  class="site-footer__link"
                  href="${externalLinks.email}"
                >
                  E-mail
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="site-footer__divider"
          aria-hidden="true"
        ></div>

        <div class="site-footer__bottom">
          <p class="site-footer__copyright">
            ${footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  `;
};
