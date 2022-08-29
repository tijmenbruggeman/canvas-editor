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
    import { selection, elements } from "./stores";
    import { objectToStyle } from "./utils/objectToStyle";
    
    $: selectedElements = $selection.map((id) => {
        const element = $elements.find(e => e.id === id);
        const styles = {
            transform: `translate(${element.x - 2}px, ${element.y - 2}px)`,
            width: `${element.width}px`,
            height: `${element.height}px`,
        }
        const style = objectToStyle(styles);
        return {
            style,
            element,
        }
    });

    function handleDragStart(e) {
        console.log('handleDragStart');
    }
    function handleTouchStart(e) {
        console.log('offsetleft', e.target.offsetLeft);        
        console.log('offsetTop', e.target.offsetTop);
    }
    function handleTouchEnd(e) {
        console.log('handleTouchEnd');

    }
    function detectTouchEnd(e) {
        console.log('detectTouchEnd');
    }
    function handleTouchMove(e) {
        console.log('handleTouchMove');
        const [touchLocation] = e.targetTouches;
        console.log('touchLocation.pageX', touchLocation.pageX);
        console.log('touchLocation.pageY', touchLocation.pageY);
    }
    function handleDragEnd(e) {
        console.log('handleDragEnd');
    }
    function handleDrag(e) {
        console.log('handleDrag');
    }
</script>

{#each selectedElements as selected}
    <div class="selected-frame" style={selected.style}
		on:dragstart={handleDragStart}
        on:drag={handleDrag}
		on:dragend={handleDragEnd}
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={handleTouchEnd}
        draggable="true">
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