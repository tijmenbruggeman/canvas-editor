<style>
.toolbar-wrapper {
  display: flex;
  justify-content: center;
}
.toolbar {
  transform: translateY(-100px);
}
.toolbar-add {
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 25px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.toolbar-addfile-input {
  display: none;
}
</style>

<script lang="ts">
import Artboard from "./Artboard.svelte";
import { ElementType } from "./ElementType";
import { addElement } from "./storeEdits";
import { artboards } from "./storeWorkspace";
let input;

function onUpload() {
  const file = input.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const image: any = new Image();
    image.src = reader.result;
    image.onload = function () {
      const { width, height } = this;
      addElement({
        type: ElementType.Img,
        artboard: $artboards[0].id,
        src: image.src,
        height,
        width,
      });
    };
  });
  reader.readAsDataURL(file);
}
</script>

<div class="workspace">
  {#each $artboards as artboard}
    <Artboard artboardSettings="{artboard}" />
  {/each}
  <div class="toolbar-wrapper">
    <div class="toolbar">
      <div class="toolbar-addfile">
        <label class="toolbar-add" for="addfile">Add</label>
        <input
          bind:this="{input}"
          id="addfile"
          on:change="{onUpload}"
          accept="image/png, image/jpeg"
          class="toolbar-addfile-input"
          type="file" />
      </div>
    </div>
  </div>
</div>
