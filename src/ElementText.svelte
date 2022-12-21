<style>
.element-text {
  display: flex;
  width: 100%;
  height: 100%;
}
.element-text-editor {
  overflow-wrap: break-word;
  display: inline;
  width: 100%;
}
.element-text[contenteditable] {
  cursor: text;
  outline: none;
}
</style>

<script lang="ts">
export let element: DesignElement & TextElement;

let contentEdit: boolean = false;
function editContent() {
  contentEdit = true;
}
</script>

<div class="element-text">
  <span
    class="element-text-editor"
    on:mousedown="{editContent}"
    contenteditable="{contentEdit}">{element.content}</span>
</div>
