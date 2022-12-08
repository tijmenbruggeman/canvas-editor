<style>
.element-text {
  overflow-wrap: break-word;
}
.element-text[contenteditable] {
  cursor: "text";
}
</style>

<script lang="ts">
export let element: DesignElement & TextElement;

let contentEdit: boolean = false;
function editContent() {
  console.log("log");
  contentEdit = true;
}
</script>

<span
  class="element-text"
  id="{element.id}"
  on:mousedown="{editContent}"
  contenteditable="{contentEdit}">{element.content}</span>
