/*
 * ============================================================
 * NAVEGAÇÃO COMPACTA
 * ============================================================
 *
 * Controla abertura, fechamento e acessibilidade do menu usado
 * nos breakpoints Tablet Compact e Mobile.
 */

export const initSiteNavigation = (): void => {
  const menuToggle = document.querySelector<HTMLButtonElement>('[data-site-menu-toggle]');

  const navigation = document.querySelector<HTMLElement>('[data-site-navigation]');

  if (!menuToggle || !navigation) {
    return;
  }

  const compactMediaQuery = window.matchMedia('(max-width: 959px)');

  const setMenuState = (isOpen: boolean, restoreFocus = false): void => {
    navigation.classList.toggle('is-open', isOpen);

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

    if (isOpen) {
      navigation.querySelector<HTMLAnchorElement>('a')?.focus();
      return;
    }

    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    setMenuState(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    if (event.key === 'Escape' && isOpen) {
      setMenuState(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const target = event.target;

    if (
      !compactMediaQuery.matches ||
      !isOpen ||
      !(target instanceof Node) ||
      menuToggle.contains(target) ||
      navigation.contains(target)
    ) {
      return;
    }

    setMenuState(false);
  });

  compactMediaQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      setMenuState(false);
    }
  });
};
