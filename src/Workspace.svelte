<script lang="ts">
import Artboard from "./Artboard.svelte";
import { artboards } from './storeWorkspace';
let artboards_value: Array<ArtboardSettings> = undefined;

artboards.subscribe((value) => {
  artboards_value = value;
});

</script>
{#each artboards_value as artboard}
    <Artboard artboardSettings={artboard} />
{/each}