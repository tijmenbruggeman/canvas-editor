<style>
.artboard {
  box-shadow: 0 2px 8px rgb(14 19 24 / 7%);
  background-color: var(--color-artboard);
  margin: auto;
}
</style>

<script lang="ts">
import {
  elements,
  clearSelected,
  moveSelection,
  commitAction,
} from "./storeEdits";
import ElementBase from "./ElementBase.svelte";
import SelectedFrame from "./SelectedFrame.svelte";
export let artboardSettings: ArtboardSettings;

function onDragStart(e) {
  const hasClickedArtboard = this === e.target;
  let startX = e.pageX;
  let startY = e.pageY;
  let moveX = e.pageX;
  let moveY = e.pageY;
  if (hasClickedArtboard) {
    clearSelected();
  }
  document.onmousemove = function (e) {
    moveX = e.pageX - startX;
    moveY = e.pageY - startY;
    moveSelection({
      x: moveX,
      y: moveY,
    });

    document.onmouseup = function () {
      commitAction({
        attr: {
          x: moveX,
          y: moveY,
        },
        type: "move",
      });
      document.onmousemove = null;
    };
  };
}
</script>

<div
  class="artboard"
  style="width: {artboardSettings.width}px; height: {artboardSettings.height}px;"
  on:mousedown="{onDragStart}">
  <SelectedFrame />
  {#each $elements as element}
    <ElementBase element="{element}" />
  {/each}
</div>
