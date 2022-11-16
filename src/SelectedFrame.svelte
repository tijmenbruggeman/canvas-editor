<style>
.selected-frame {
  border: 2px solid blue;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
}
.selected-handle {
  position: absolute;
}
.handle-corner {
  background-color: var(--color-handle-bg);
  border: 1px solid var(--color-handle-border);
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
.handle-tr {
  top: -8px;
  right: -8px;
  cursor: ne-resize;
}
.handle-tl {
  top: -8px;
  left: -8px;
  cursor: nw-resize;
}
.handle-br {
  bottom: -8px;
  right: -8px;
  cursor: se-resize;
}
.handle-bl {
  bottom: -8px;
  left: -8px;
  cursor: sw-resize;
}
</style>

<script lang="ts">
import { onDestroy } from "svelte";
import { selection, startTransform } from "./storeEdits";
import { objectToStyle } from "./utils/objectToStyle";
let cssStyle = objectToStyle({});

function onResizeStart(e, origin: "tr" | "br" | "bl" | "tl") {
  const startX = e.pageX;
  const startY = e.pageY;
  let moveX = 0;
  let moveY = 0;

  const { commitTransform, transformSelection } = startTransform();

  function handleMouseMove({ pageX, pageY }) {
    transformSelection({
      height: 0,
    });
  }
  function handleMouseUp(e) {
    commitTransform({ moveX: 0, moveY: 0, width: 0, height: 0 });
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("mouseup", handleMouseUp);
  }
  addEventListener("mousemove", handleMouseMove);
  addEventListener("mouseup", handleMouseUp);
}

const unsubscribe = selection.subscribe(({ x, y, width, height }) => {
  cssStyle = objectToStyle({
    transform: `translate(${x - 1}px, ${y - 1}px)`,
    width: `${width}px`,
    height: `${height}px`,
  });
});

onDestroy(unsubscribe);
</script>

<div class="selection-frame" data-target="frame">
  <div class="selected-frame" style="{cssStyle}">
    <div
      data-target="handle"
      class="selected-handle handle-corner handle-tr"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'tr')}">
    </div>
    <div class="selected-handle handle-corner handle-tl"></div>
    <div class="selected-handle handle-corner handle-br"></div>
    <div class="selected-handle handle-corner handle-bl"></div>
    <div class="selected-handle handle-side handle-t"></div>
    <div class="selected-handle handle-side handle-l"></div>
    <div class="selected-handle handle-side handle-r"></div>
    <div class="selected-handle handle-side handle-b"></div>
  </div>
</div>
