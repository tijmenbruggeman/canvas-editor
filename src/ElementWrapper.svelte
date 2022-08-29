<script lang="ts">
    import { objectToStyle } from "./utils/objectToStyle";
    import { selection } from "./stores";
    
    export let element: DesignElement;
    
    $: showSelectionFrame = true;

    function showSelectFrame() {
        showSelectionFrame = true;
        
    }
    function hideSelectFrame() {
        showSelectionFrame = false;
    }
    function selectElement(element: DesignElement): void {
        const currentSelection = $selection;
        const elementIndex = currentSelection.indexOf(element.id);
        if (elementIndex >= 0) {
            currentSelection.splice(elementIndex, 1);
            selection.set(currentSelection);
            return;
        }

        selection.set([element.id]);
        return;
    }
    
    const styles = {
        transform: `translate(${element.x}px, ${element.y}px)`,
        width: `${element.width}px`,
        height: `${element.height}px`,
    }
    
    $: cssStyle = objectToStyle(styles);
    </script>
    <style>
        .element-wrapper {
            position: absolute;
            outline: none;
        }
        .selection-frame {
            border: 2px solid blue;
            height: 100%;
            width: 100%;
            position: absolute;
        }
    </style>
<div class="element-wrapper" style={cssStyle} on:mouseenter={showSelectFrame} on:mouseleave={hideSelectFrame} on:click={() => selectElement(element)}>
    {#if showSelectionFrame} <div class="selection-frame"></div> {/if}
    <slot></slot>
</div>