<style>
    .selected-frame {
            border: 2px solid blue;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 50;
            top: 0;
            left: 0;
            pointer-events: none;
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
        }
        .handle-tl {
            top: -8px;
            left: -8px;
        }
        .handle-br {
            bottom: -8px;
            right: -8px;
        }
        .handle-bl {
            bottom: -8px;
            left: -8px;
        }
</style>
<script>
  import { onDestroy } from "svelte";
    import { selection } from "./storeEdits";
    import { objectToStyle } from "./utils/objectToStyle";
    let cssStyle = objectToStyle({});

	const unsubscribe = selection.subscribe(({ x, y, width, height}) => {
		cssStyle = objectToStyle({
            transform: `translate(${x - 2}px, ${y - 2}px)`,
            width: `${width}px`,
            height: `${height}px`,
        });
	});
    onDestroy(unsubscribe);
</script>

<div class="selection-frame">
    <div class="selected-frame" style={cssStyle}>
        <div class="selected-handle handle-corner handle-tr"></div>
        <div class="selected-handle handle-corner handle-tl"></div>
        <div class="selected-handle handle-corner handle-br"></div>
        <div class="selected-handle handle-corner handle-bl"></div>
        <div class="selected-handle handle-side handle-t"></div>
        <div class="selected-handle handle-side handle-l"></div>
        <div class="selected-handle handle-side handle-r"></div>
        <div class="selected-handle handle-side handle-b"></div>
    </div>
</div>