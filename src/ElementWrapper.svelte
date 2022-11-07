<script lang="ts">
    import { objectToStyle } from "./utils/objectToStyle";
    import { commitAction, selection } from "./storeEdits";
    
    export let element: DesignElement;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let moveX = 0;
    let moveY = 0;
    
    $: showSelectionFrame = false;

    function showSelectFrame() {
        showSelectionFrame = true;
        
    }
    function hideSelectFrame() {
        showSelectionFrame = false;
    }
    function selectElement(event, element: DesignElement): void {
        const currentSelection = $selection;
        const isSelected = currentSelection.ids.some((id) => id === element.id);
        if (isSelected) return;
        
        const { x, y, width, height } = event.target.getBoundingClientRect();
        selection.set({
            ids: [element.id],
            x: x,
            y: y,
            width,
            height,
        });
        return;
    }

    function deselectElement() {
        const elementIndex = $selection.ids.findIndex((id) => id === element.id);
        if (elementIndex < 0) return;
        const currentSelection = $selection;
        currentSelection.ids.splice(elementIndex, 1);
        console.log('currentSelection:', currentSelection)
        selection.set(currentSelection);
    }

    function onDragStart(e) {
        deselectElement();
        isDragging = true;
        dragStartX = e.pageX;
        dragStartY = e.pageY
    }

    function onDown(e) {
        onDragStart(e);
    }

    function onUp(e) {
        onDragEnd(e);
    }

    function onLeave() {
        hideSelectFrame();
    }

    function onMove(e) {
        onDrag(e);
    }
    function onDrag(e) {
        if (!isDragging) return;
        moveX = e.pageX - dragStartX;
        moveY = e.pageY - dragStartY;
    }

    function onEnter() {
        showSelectFrame()
    }

    function onDragEnd(e) {
        selectElement(e, element);
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
            user-select: none;
        }
        .selection-frame {
            border: 2px solid blue;
            height: 100%;
            width: 100%;
            position: absolute;
            transform: translate(-2px, -2px);
        }
    </style>
<div class="element-wrapper" style={cssStyle} 
    on:mousemove={onMove}
    on:mouseenter={onEnter}
    on:mouseleave={onLeave}
    on:mousedown={onDown} 
    on:mouseup={onDragEnd}>
    {#if showSelectionFrame} <div class="selection-frame"></div> {/if}
    <slot></slot>
</div>