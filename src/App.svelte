<script lang="ts">
import { artboards, elements } from "./stores";

import EditorMenu from "./EditorMenu.svelte";
import Workspace from "./Workspace.svelte";

export let template: Template;

if (template) {
  artboards.set(template.artboards);
  elements.set(template.elements);
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
  }
  .editor {
    height: 100%;
  }
</style>

<div class="editor">
  <EditorMenu />
  <Workspace />
</div>
