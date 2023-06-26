<style>
.guide {
  position: absolute;
  border: 1px dashed orange;
}
</style>

<script lang="ts">
import { Guide, GuideOrientation, guides } from "./storeGuides";

function generateStyle(guide: Guide) {
  let style = "";
  if (guide.orientation === GuideOrientation.horizontal) {
    style += `transform: translateY(${guide.position}px); width: 100%;`;
  } else {
    style += `transform: translateX(${guide.position}px); height: 100%;`;
  }

  if (guide.display) {
    style += `display: block;`;
  } else {
    style += `display: none;`;
  }

  return style;
}
</script>

<div class="guides">
  {#each $guides as guide}
    <div class="guide" style="{generateStyle(guide)}"></div>
  {/each}
</div>
