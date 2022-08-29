<script>
    import { selection, elements } from "./stores";
    import { objectToStyle } from "./utils/objectToStyle";
    
    $: selectedElements = $selection.map((id) => {
        const element = $elements.find(e => e.id === id);
        const styles = {
            transform: `translate(${element.x}px, ${element.y}px)`,
            width: `${element.width}px`,
            height: `${element.height}px`,
        }
        const style = objectToStyle(styles);
        return {
            style,
            element,
        }
    });
</script>

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
            top: -6px;
            right: -6px;
        }
        .handle-tl {
            top: -6px;
            left: -6px;
        }
        .handle-br {
            bottom: -6px;
            right: -6px;
        }
        .handle-bl {
            bottom: -6px;
            left: -6px;
        }
</style>
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