import { defineConfig, type Plugin } from 'vite';

import { renderApp } from './src/app';

/*
 * ============================================================
 * PRÉ-RENDERIZAÇÃO DA LANDING PAGE
 * ============================================================
 *
 * Durante o build de produção, insere o conteúdo estático da
 * aplicação diretamente no HTML. O JavaScript permanece
 * responsável apenas pelo comportamento e pelas interações.
 */
const prerenderLandingPage = (): Plugin => {
  const appPlaceholder = '<div id="app"></div>';

  return {
    name: 'prerender-landing-page',
    apply: 'build',

    transformIndexHtml(html) {
      if (!html.includes(appPlaceholder)) {
        throw new Error('Prerender failed: application root placeholder was not found.');
      }

      return html.replace(appPlaceholder, `<div id="app">${renderApp()}</div>`);
    },
  };
};

export default defineConfig({
  /*
   * Caminhos relativos permitem publicar o mesmo build tanto
   * na raiz do domínio quanto em subpastas, como /site2/.
   */
  base: './',

  plugins: [prerenderLandingPage()],
});
