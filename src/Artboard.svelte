<script lang="ts">
  import { elements } from './storeEdits';
  import ElementBase from './ElementBase.svelte';
  import SelectedFrame from './SelectedFrame.svelte';
  import { selection } from "./storeWorkspace";
  export let artboardSettings: ArtboardSettings;

  function onUp(e) {
    const hasClickedArtboard = this === e.target;
    if (hasClickedArtboard) {
      selection.set([]);
    }
  }
</script>

<div class="artboard" style="width: {artboardSettings.width}px; height: {artboardSettings.height}px;" on:mouseup={onUp}>
  <SelectedFrame />
  {#each $elements as element}
    <ElementBase element="{element}" />
  {/each}
</div>

<style>

  .artboard {
      box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
      background-color: var(--color-artboard);
      margin: auto;
  }
</style>
