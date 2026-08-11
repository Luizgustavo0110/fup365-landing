import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';

import { renderApp } from './app';
import { initSiteNavigation } from './scripts/navigation';

import './styles/index.css';

const applicationRoot = document.querySelector<HTMLElement>('#app');

if (!applicationRoot) {
  throw new Error('Application root element "#app" was not found.');
}

applicationRoot.innerHTML = renderApp();

initSiteNavigation();
