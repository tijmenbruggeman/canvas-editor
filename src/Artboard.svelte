<style>
.artboard {
  box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
  background-color: var(--artboard-bg-light);
}
</style>

<script lang="ts">
import { elements, clearSelected, startTransform } from "./storeEdits";
import ElementBase from "./ElementBase.svelte";
import SelectedFrame from "./SelectedFrame.svelte";
import type { ArtboardSettings } from "../types/visualeditor";
import Guides from "./Guides.svelte";
export let artboardSettings: ArtboardSettings;

function onDragStart(e) {
  const hasClickedArtboard = this === e.target;
  const startX = e.pageX;
  const startY = e.pageY;
  let moveX = 0;
  let moveY = 0;
  if (hasClickedArtboard) {
    clearSelected();
    return;
  }

  const { commitTransform, transformSelection } = startTransform();

  function handleMouseMove(moveE) {
    moveX = moveE.pageX - startX;
    moveY = moveE.pageY - startY;
    transformSelection({
      x: moveX,
      y: moveY,
    });
  }
  function handleMouseUp() {
    commitTransform();
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("mouseup", handleMouseUp);
  }

  addEventListener("mousemove", handleMouseMove);
  addEventListener("mouseup", handleMouseUp);
}
</script>

<div
  class="artboard"
  style="width: {artboardSettings.width}px; height: {artboardSettings.height}px; transform: translateX({-artboardSettings.offsetX}px) scale({artboardSettings.scale});"
  on:mousedown="{onDragStart}">
  {#each $elements as element}
    <ElementBase element="{element}" />
  {/each}
  <SelectedFrame />
  <Guides />
</div>
