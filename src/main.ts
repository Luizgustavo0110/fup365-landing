import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';

import { renderApp } from './app';
import { initHowItWorks } from './scripts/how-it-works';
import { initSiteNavigation } from './scripts/navigation';
import { initProblemSolution } from './scripts/problem-solution';
import { initSocialProof } from './scripts/social-proof';

import './styles/index.css';

const applicationRoot = document.querySelector<HTMLElement>('#app');

if (!applicationRoot) {
  throw new Error('Application root element "#app" was not found.');
}

/*
 * Durante o desenvolvimento, o Vite utiliza o root vazio e a
 * aplicação é renderizada normalmente no navegador.
 *
 * No build de produção, o HTML já contém a landing pré-renderizada,
 * evitando substituir conteúdo estático que já veio do servidor.
 */
if (applicationRoot.childElementCount === 0) {
  applicationRoot.innerHTML = renderApp();
}

initSiteNavigation();
initProblemSolution();
initHowItWorks();
initSocialProof();
