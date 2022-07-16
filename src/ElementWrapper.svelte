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
    
    const styles = {
        transform: `translate(${element.x}px, ${element.y}px)`,
        width: `${element.width}px`,
        height: `${element.height}px`,
    }
    
    $: cssStyle = objectToStyle(styles);

    function selectElement(element: DesignElement) {
        selection.set([element]);

    }
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