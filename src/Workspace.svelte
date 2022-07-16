<script lang="ts">
import Artboard from "./Artboard.svelte";
import Toolbar from "./Toolbar.svelte";
import Nav from "./Nav.svelte";
import { artboards } from './stores';
let artboards_value: Array<ArtboardSettings> = undefined;

artboards.subscribe((value) => {
  artboards_value = value;
});

</script>
<div class="workspace">
    <Nav />
    {#each artboards_value as artboard}
        <Artboard artboard_settings={artboard} />
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