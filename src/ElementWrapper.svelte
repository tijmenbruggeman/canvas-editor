<style>
.element-wrapper {
  position: absolute;
  outline: none;
  user-select: none;
  border: 1px solid transparent;
}
.element-wrapper:hover {
  border-color: var(--highlight);
}
</style>

<script lang="ts">
import type { DesignElement } from "../types/visualeditor";
import { setSelected } from "./storeEdits";
import { setToolbarByElement } from "./storeWorkspace";
import { objectToStyle } from "./utils/objectToStyle";

export let element: DesignElement;

function selectElement() {
  setToolbarByElement(element.type);
  setSelected({
    ...element,
    ids: [element.id],
  });
}

$: styles = {
  transform: `translate(${element.x}px, ${element.y}px)`,
  width: `${element.width}px`,
  height: `${element.height}px`,
};

$: cssStyle = objectToStyle(styles);
</script>

<div class="element-wrapper" style="{cssStyle}" on:mousedown="{selectElement}">
  <slot />
</div>
