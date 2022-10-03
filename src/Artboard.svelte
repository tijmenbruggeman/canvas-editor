<script lang="ts">
  import { selection } from './storeWorkspace';
  import { elements } from './storeEdits';
  import ElementBase from './ElementBase.svelte';
  import SelectedFrame from './SelectedFrame.svelte';
  export let artboardSettings: ArtboardSettings;

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  function onDragStart(e) {
    if ($selection.length === 0) return;
    dragStartX = e.pageX;
    dragStartY = e.pageY
    isDragging = true;
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const moveX = dragStartX - e.pageX;
    const moveY = dragStartY - e.pageY;
    
  }

  function onDragEnd(e) {
    isDragging = false;
    dragStartY = 0;
    dragStartX = 0;
  }

</script>

<div class="artboard" on:mousedown={onDragStart} on:mouseup={onDragEnd} on:mouseleave={onDragEnd} on:mousemove={onMouseMove} style="width: {artboardSettings.width}px; height: {artboardSettings.height}px;">
  <SelectedFrame />
  {#each $elements as element}
    <ElementBase element="{element}" />
  {/each}
</div>

<style>

  .artboard {
      box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
      background-color: var(--color-artboard);
      margin: 20px auto;
  }
</style>
