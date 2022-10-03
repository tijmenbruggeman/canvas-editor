<script lang="ts">
    import { objectToStyle } from "./utils/objectToStyle";
    import { selection } from "./storeWorkspace";
  import { commitAction } from "./storeEdits";
    
    export let element: DesignElement;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let moveX = 0;
    let moveY = 0;
    
    $: showSelectionFrame = true;

    function showSelectFrame() {
        showSelectionFrame = true;
        
    }
    function hideSelectFrame() {
        showSelectionFrame = false;
    }
    function selectElement(event, element: DesignElement): void {
        const currentSelection = $selection;
        const elementIndex = currentSelection.findIndex(({ id }) => id === element.id);
        if (elementIndex >= 0) {
            currentSelection.splice(elementIndex, 1);
            selection.set(currentSelection);
            return;
        }
        
        const { x, y, width, height } = event.target.getBoundingClientRect();
        selection.set([{
            id: element.id,
            pageX: x,
            pageY: y,
            width,
            height,
        }]);
        return;
    }

    function onDragStart(e) {
        isDragging = true;
        dragStartX = e.pageX;
        dragStartY = e.pageY
    }

    function onDrag(e) {
        if (!isDragging) return;
        moveX = e.pageX - dragStartX;
        moveY = e.pageY - dragStartY;
    }

    function onDragEnd(e) {
        isDragging = false;
        commitAction({
            type: 'move',
            id: element.id,
            attr: {
                x: element.x + moveX,
                y: element.y + moveY,
            }
        });
        dragStartY = 0;
        dragStartX = 0;
        moveX = 0;
        moveY = 0;
    }

    
    
    $: styles = {
        transform: `translate(${element.x + moveX}px, ${element.y + moveY}px)`,
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
            transform: translate(-2px, -2px);
        }
    </style>
<div class="element-wrapper" style={cssStyle} on:mousemove={onDrag}  on:mouseenter={showSelectFrame} on:mouseleave={(e) => {
    hideSelectFrame();
    onDrag(e);
}} on:mousedown={(e) => {
    onDragStart(e);
}} on:mouseup={onDragEnd}>
    {#if showSelectionFrame} <div class="selection-frame"></div> {/if}
    <slot></slot>
</div>