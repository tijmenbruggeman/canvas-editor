<style>
.workspace {
  background-color: var(--workspace-bg-light);
  padding: 20px 0;
}
</style>

<script lang="ts">
import Artboard from "./Artboard.svelte";
import { artboards } from "./storeWorkspace";
import Toolbar from "./Toolbar.svelte";
</script>

<div class="workspace">
  {#each $artboards as artboard}
    <Artboard artboardSettings="{artboard}" />
  {/each}
  <Toolbar />
</div>
