<style>
.selected-frame {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 50;
}

.selected-handle {
  position: absolute;
}
.handle-t,
.handle-b {
  height: 2px;
  cursor: ns-resize;
  width: 100%;
  background: var(--color-handle-side-bg);
}
.handle-l,
.handle-r {
  width: 2px;
  height: 100%;
  cursor: ew-resize;
  background: var(--color-handle-side-bg);
}
.handle-r {
  right: -3px;
}
.handle-b {
  bottom: -3px;
}
.handle-corner {
  background-color: var(--color-handle-bg);
  border: 1px solid var(--color-handle-border);
  height: 12px;
  width: 12px;
  border-radius: 50%;
  z-index: 10;
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

type TransformDirectionParams = {
  pageX: number;
  pageY: number;
};
type TransformOrigins = "tr" | "br" | "bl" | "tl" | "t" | "b" | "l" | "r";
function onResizeStart(e, origin: TransformOrigins) {
  const startX = e.pageX;
  const startY = e.pageY;

  const { commitTransform, transformSelection } = startTransform();

  function transformDirection({ pageX, pageY }: TransformDirectionParams) {
    const change = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    switch (origin) {
      case "tr":
        const trMovementX = pageX - startX;
        const trMovementY = startY - pageY;
        if (trMovementY < trMovementX) {
          change.height = startY - pageY;
          change.y = pageY - startY;
          change.width = (startY - pageY) * aspectRatio;
        } else {
          change.width = pageX - startX;
          change.height = (pageX - startX) / aspectRatio;
          change.y = (startX - pageX) / aspectRatio;
        }
        break;
      case "tl":
        const tlMovementX = pageX - startX;
        const tlMovementY = pageY - startY;
        if (tlMovementY > tlMovementX) {
          change.height = startY - pageY;
          change.y = pageY - startY;
          change.width = (startY - pageY) * aspectRatio;
          change.x = (pageY - startY) * aspectRatio;
        } else {
          change.width = startX - pageX;
          change.x = pageX - startX;
          change.height = (startX - pageX) / aspectRatio;
          change.y = (pageX - startX) / aspectRatio;
        }
        break;
      case "br":
        const brMovementY = pageY - startY;
        const brMovementX = pageX - startX;
        if (brMovementY > brMovementX) {
          change.height = brMovementY;
          change.width = brMovementY * aspectRatio;
        } else {
          change.height = brMovementX / aspectRatio;
          change.width = brMovementX;
        }
        break;
      case "bl":
        const blMovementY = Math.abs(startY - pageY);
        const blMovementX = Math.abs(startX - pageX);
        if (blMovementY > blMovementX) {
          change.height = pageY - startY;
          change.width = (pageY - startY) * aspectRatio;
          change.x = (startY - pageY) * aspectRatio;
        } else {
          change.height = (startX - pageX) / aspectRatio;
          change.width = startX - pageX;
          change.x = pageX - startX;
        }
        break;
      case "b":
        change.height = pageY - startY;
        break;
      case "t":
        change.height = startY - pageY;
        change.y = pageY - startY;
        break;
      case "r":
        change.width = pageX - startX;
        break;
      case "l":
        change.width = startX - pageX;
        change.x = pageX - startX;
        break;
      default:
        throw new Error("undefined direction");
    }
    return change;
  }
  function handleMouseMove(e) {
    const change = transformDirection(e);
    transformSelection(change);
  }
  function handleMouseUp(e) {
    const change = transformDirection(e);
    commitTransform(change);
    removeEventListener("mousemove", handleMouseMove);
    removeEventListener("mouseup", handleMouseUp);
  }
  addEventListener("mousemove", handleMouseMove);
  addEventListener("mouseup", handleMouseUp);
}
let aspectRatio = 0;
const unsubscribe = selection.subscribe(({ x, y, width, height }) => {
  aspectRatio = width / height;
  if (width === 0 && height === 0) {
    cssStyle = objectToStyle({
      display: "none",
    });
    return;
  }
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
    <div
      class="selected-handle handle-corner handle-tl"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'tl')}">
    </div>
    <div
      class="selected-handle handle-corner handle-br"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'br')}">
    </div>
    <div
      class="selected-handle handle-corner handle-bl"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'bl')}">
    </div>
    <div
      class="selected-handle handle-side handle-t"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 't')}">
    </div>
    <div
      class="selected-handle handle-side handle-l"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'l')}">
    </div>
    <div
      class="selected-handle handle-side handle-r"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'r')}">
    </div>
    <div
      class="selected-handle handle-side handle-b"
      on:mousedown|stopPropagation="{(e) => onResizeStart(e, 'b')}">
    </div>
  </div>
</div>
