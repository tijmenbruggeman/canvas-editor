import type { Template } from "../types/visualeditor";
import App from "./App.svelte";

const element = document.getElementById("pdc-js-editor");
let app: App | undefined = undefined;
if (element) {
  app = new App({
    target: element,
  });
}

export default app;
