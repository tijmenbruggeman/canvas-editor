<script lang="ts">
import { v4 } from 'uuid';
import { artboards, elements } from "./stores";

import EditorMenu from "./EditorMenu.svelte";
import Workspace from "./Workspace.svelte";

export let template: Template;

if (template) {
  artboards.set(template.artboards);
  const elementWithIds = template.elements.map((el) => ({
    ...el,
    id: v4(),
  }));
  elements.set(elementWithIds);
}

</script>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  :root {
    --color-artboard: #ffffff;
    --color-workspace: #edf0f2;
    --color-handle-bg: #ffffff;
    --color-handle-border: #edf0f2;

    --color-bg-0: #f6f9fc;
    --color-bg-1: #edf0f2;
  }
  .editor {
    height: 100%;
  }
</style>

<div class="editor">
  <EditorMenu />
  <Workspace />
</div>
