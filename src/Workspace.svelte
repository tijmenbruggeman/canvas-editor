<script lang="ts">
import Artboard from "./Artboard.svelte";
import Toolbar from "./Toolbar.svelte";
import Nav from "./Nav.svelte";
import { artboards } from './storeWorkspace';
let artboards_value: Array<ArtboardSettings> = undefined;

artboards.subscribe((value) => {
  artboards_value = value;
});

</script>
<div class="workspace">
    <Nav />
    {#each artboards_value as artboard}
        <Artboard artboardSettings={artboard} />
    {/each}
    <Toolbar />
</div>
<style>
  .workspace {
      background-color: var(--color-workspace);
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-areas: 
        'nav topactions'
        'nav artboard'
        'nav bottomactions';
  }
</style>