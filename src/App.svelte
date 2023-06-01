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
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

<script lang="ts">
import { v4 } from "uuid";
import { artboard, elements } from "./storeEdits";

import Workspace from "./Workspace.svelte";
import type { Template } from "../types/visualeditor";

let editor: HTMLDivElement;

function calculateScale({ artboard }: Template) {
  const { width: templateWidth } = artboard;
  const { width } = editor.getBoundingClientRect();

  // template should fit 90% of editor
  const editorWidth = width * 0.9;
  const scale = Math.min(editorWidth / templateWidth);
  return scale;
}

function loadTemplate(event: CustomEvent<{ template: string }>) {
  const template = event.detail.template;
  if (!template) return;
  const decodedTemplate = JSON.parse(window.atob(template)) as Template;
  const scale = calculateScale(decodedTemplate);
  decodedTemplate.artboard.scale = scale;
  artboard.set(decodedTemplate.artboard);
  const initialElements = decodedTemplate.elements.map((e) => ({
    ...e,
    id: v4(),
  }));
  elements.set(initialElements);
}
window.addEventListener("pdc-loadtemplate", loadTemplate);
</script>

<div class="editor" bind:this="{editor}">
  <Workspace />
</div>
