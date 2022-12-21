<style>
.toolbar-wrapper {
  display: flex;
  justify-content: center;
}
.toolbar {
  display: flex;
  transform: translateY(-100px);
  padding: 5px 10px;
  background-color: var(--toolbar-bg);
  box-shadow: var(--toolbar-shadow);
  border-radius: 35px;
}
.toolbar-button {
  width: 55px;
  height: 55px;
  margin: 4px;
  display: block;
  border-radius: 55px;
  fill: var(--button-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--button-sec-bg-light);
  border: none;
}
.toolbar-addfile-input {
  display: none;
}
</style>

<script lang="ts">
import ImagePolaroidRegular from "./icons/image-polaroid-regular.svg?component";
import TextRegular from "./icons/text-regular.svg?component";
import ShapesRegular from "./icons/shapes-regular.svg?component";
import { addElement } from "./storeEdits";
import { artboards, downloadFile } from "./storeWorkspace";
import { templateToPDF } from "./utils/templateToPDF";

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
        type: "img",
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

<div class="toolbar-wrapper">
  <div class="toolbar">
    <label class="toolbar-button" for="addfile">
      <ImagePolaroidRegular />
    </label>
    <button class="toolbar-button" for="addtext">
      <TextRegular />
    </button>
    <button class="toolbar-button" for="addtext">
      <ShapesRegular />
    </button>
    <button class="toolbar-button" on:click="{downloadFile}"> download </button>

    <div class="toolbar-addfile">
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
