<style>
:global(body) {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
:root {
  --light-bg: #fff;
  --light-text: #000;
  --highlight: #ff6700;

  --artboard-bg-light: #ffffff;
  --workspace-bg-light: #e9e9e9;
  --color-handle-bg: #ffffff;
  --color-handle-border: #edf0f2;
  --color-handle-side-bg: var(--highlight);

  --color-bg-0: #f6f9fc;
  --color-bg-1: #edf0f2;

  --toolbar-shadow: 0 0 0 1px rgba(64, 87, 109, 0.07),
    0 2px 12px rgba(53, 71, 90, 0.2);

  --toolbar-bg: var(--light-bg);
  --button-color: var(--light-text);
  --button-sec-bg-light: var(--workspace-bg-light);
}
.editor {
  height: 100%;
}
</style>

<script lang="ts">
import { v4 } from "uuid";
import { artboards } from "./storeWorkspace";
import { elements } from "./storeEdits";

import Workspace from "./Workspace.svelte";

export let template: Template;

if (template) {
  artboards.set(template.artboards);
  const initialElements = template.elements.map((e) => ({
    ...e,
    id: v4(),
  }));
  elements.set(initialElements);
}
</script>

<div class="editor">
  <Workspace />
</div>
