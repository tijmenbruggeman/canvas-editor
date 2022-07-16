import App from './App.svelte';

// When should we initiate the editor?
// https://philkurth.com.au/articles/pass-data-php-javascript-wordpress/ see alternative approach
// get element #id, if exists then start editor add supply template/options

const element = document.getElementById('js-canvas-editor');
let app: App | undefined = undefined;
if (element) {
  app = new App({
    target: element,
    props: {
      options: {},
      template: PRODUCT_VISUAL_EDITOR_TEMPLATE,
    }
  });
}

export default app;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    if (!app) return;
    app.$destroy();
  });
}
