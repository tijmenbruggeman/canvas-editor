<style>
.workspace {
  background-color: var(--workspace-bg-light);
  padding: 20px 0;
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Artboard from "./Artboard.svelte";
import { artboard } from "./storeEdits";
import Toolbar from "./Toolbar.svelte";
</script>

<div class="workspace">
  <Artboard artboardSettings="{$artboard}" />
  <Toolbar />
</div>
