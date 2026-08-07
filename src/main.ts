import { renderApp } from './app';
import './styles/index.css';

const applicationRoot = document.querySelector<HTMLElement>('#app');

if (!applicationRoot) {
  throw new Error('Application root element "#app" was not found.');
}

applicationRoot.innerHTML = renderApp();
