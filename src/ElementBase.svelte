<script lang="ts">
import ElementImg from './ElementImg.svelte';
import ElementText from './ElementText.svelte';
import ElementWrapper from './ElementWrapper.svelte';
export let element: DesignElement;

const elements = {
    img: ElementImg,
    text: ElementText,
}

const selectedElement = elements[element.type];
</script>
<ElementWrapper element={element}>
    <svelte:component this={selectedElement} element={element} />
</ElementWrapper>