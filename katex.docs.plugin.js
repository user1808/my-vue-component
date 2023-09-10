import { JSX } from 'typedoc';

export function load(app) {
  app.renderer.hooks.on('head.end', () => {
    return JSX.createElement(
      JSX.Fragment,
      null,
      JSX.createElement(
        'link',
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
          integrity:
            'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn',
          crossorigin: 'anonymous',
        },
        JSX.createElement('script', {
          defer: true,
          src: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js',
          integrity:
            'sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx',
          crossorigin: 'anonymous',
        }),
        JSX.createElement('script', {
          defer: true,
          src: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js',
          integrity:
            'sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05',
          crossorigin: 'anonymous',
          onload: 'renderMathInElement(document.body);',
        }),
      ),
    );
  });
}
