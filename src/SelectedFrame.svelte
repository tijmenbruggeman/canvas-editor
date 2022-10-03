<style>
    .selected-frame {
            border: 2px solid blue;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 50;
            top: 0;
            left: 0;
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
    import { selection } from "./storeWorkspace";
    import { objectToStyle } from "./utils/objectToStyle";
    $: selectedElements = $selection.map(({ id, pageX, pageY, width, height }) => {
        const styles = {
            transform: `translate(${pageX - 2}px, ${pageY - 2}px)`,
            width: `${width}px`,
            height: `${height}px`,
        }
        const style = objectToStyle(styles);
        return {
            style,
            elementId: id,
        }
    });

</script>

<div class="selection-frame">
    {#each selectedElements as selected}
    <div class="selected-frame" style={selected.style}>
        <div class="selected-handle handle-corner handle-tr"></div>
        <div class="selected-handle handle-corner handle-tl"></div>
        <div class="selected-handle handle-corner handle-br"></div>
        <div class="selected-handle handle-corner handle-bl"></div>
            <div class="selected-handle handle-side handle-t"></div>
            <div class="selected-handle handle-side handle-l"></div>
            <div class="selected-handle handle-side handle-r"></div>
            <div class="selected-handle handle-side handle-b"></div>
        </div>
    {/each}
</div>