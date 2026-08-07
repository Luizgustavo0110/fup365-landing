export const renderSiteFooter = (): string => {
  return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <a
          class="site-footer__brand"
          href="#inicio"
          aria-label="FUP365 — voltar ao início"
        >
          FUP365
        </a>

        <p class="site-footer__description">
          Gestão de pedidos e follow-up.
        </p>
      </div>
    </footer>
  `;
};
