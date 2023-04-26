<style>
.artboard {
  box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
  background-color: var(--artboard-bg-light);
  margin: 0 auto;
}
</style>

<script lang="ts">
import { elements, clearSelected, startMove } from "./storeEdits";
import ElementBase from "./ElementBase.svelte";
import SelectedFrame from "./SelectedFrame.svelte";
export let artboardSettings: ArtboardSettings;

function onDragStart(e) {
  console.log(e.offsetTop, e.offsetLeft);
  const hasClickedArtboard = this === e.target;
  const startX = e.pageX;
  const startY = e.pageY;
  let moveX = 0;
  let moveY = 0;
  if (hasClickedArtboard) {
    clearSelected();
    return;
  }

  const { commitMove, moveSelection } = startMove();

  function handleMouseMove(moveE) {
    moveX = moveE.pageX - startX;
    moveY = moveE.pageY - startY;
    moveSelection({
      moveX,
      moveY,
    });
  }
  function handleMouseUp(e) {
    const movedX = e.pageX - startX;
    commitMove({
      moveX: movedX,
      moveY,
    });
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("mouseup", handleMouseUp);
  }

  addEventListener("mousemove", handleMouseMove);
  addEventListener("mouseup", handleMouseUp);
}
</script>

<div
  class="artboard"
  style="width: {artboardSettings.width}px; height: {artboardSettings.height}px;"
  on:mousedown="{onDragStart}">
  {#each $elements as element}
    <ElementBase element="{element}" />
  {/each}
  <SelectedFrame />
</div>
