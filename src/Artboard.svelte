<script lang="ts">
  import { elements } from './stores';
  import ElementBase from './ElementBase.svelte';
  export let artboard_settings: ArtboardSettings;

  let design_elements: Array<DesignElement> = [];

  elements.subscribe((value) => {
    design_elements = value;
  });
</script>

<div class="artboard" style="width: {artboard_settings.width}px; height: {artboard_settings.height}px;">
  {#each design_elements as design_element}
    <ElementBase element="{design_element}" />
  {/each}
</div>

<style>

  .artboard {
      box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
      background-color: var(--color-artboard);
      margin: 20px auto;
  }
</style>
