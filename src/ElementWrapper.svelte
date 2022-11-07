<script lang="ts">
    import { objectToStyle } from "./utils/objectToStyle";
    import { commitAction, selection } from "./storeEdits";
    
    export let element: DesignElement;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let moveX = 0;
    let moveY = 0;
    

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
    }

    function deselectElement() {
        const elementIndex = $selection.ids.findIndex((id) => id === element.id);
        if (elementIndex < 0) return;
        const currentSelection = $selection;
        currentSelection.ids.splice(elementIndex, 1);
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

    function onMove(e) {
        onDrag(e);
    }
    function onDrag(e) {
        if (!isDragging) return;
        moveX = e.pageX - dragStartX;
        moveY = e.pageY - dragStartY;
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
            border: 1px solid transparent;
        }
        .element-wrapper:hover {
            border-color: blue;
        }
    </style>
<div class="element-wrapper" style={cssStyle} 
    on:mousemove={onMove}
    on:mousedown={onDown} 
    on:mouseup={onDragEnd}>
    <slot></slot>
</div>