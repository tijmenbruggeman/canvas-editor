<script lang="ts">
import Artboard from "./Artboard.svelte";
import Toolbar from "./Toolbar.svelte";
import { artboards } from './storeWorkspace';
let artboards_value: Array<ArtboardSettings> = undefined;

artboards.subscribe((value) => {
  artboards_value = value;
});

</script>
    {#each artboards_value as artboard}
        <Artboard artboardSettings={artboard} />
    {/each}
    <Toolbar />
<style>
  .workspace {
      background-color: var(--color-workspace);
      height: 100%;
      width: 100%;
      display: grid;
  }
</style>