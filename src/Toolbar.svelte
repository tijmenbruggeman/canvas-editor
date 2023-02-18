<style>
.toolbar-wrapper {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  bottom: 12px;
}
.toolbar {
  display: flex;
  padding: 4px 16px;
  background-color: var(--toolbar-bg);
  box-shadow: 2.1px 2.1px 5.1px -12px rgba(0, 0, 0, 0.024),
    5.8px 5.8px 14.1px -12px rgba(0, 0, 0, 0.035),
    13.9px 13.9px 34.1px -12px rgba(0, 0, 0, 0.046),
    46px 46px 113px -12px rgba(0, 0, 0, 0.07);
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,.05);
}
.toolbar-button {
  width: 48px;
  height: 48px;
  margin: 4px;
  display: block;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: none;
}
.toolbar-button-text {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
}
.toolbar-addfile-input {
  display: none;
}
</style>

<script lang="ts">
import AddPhotoAlternate from "./icons/add_photo_alternate.svg?component";
import Download from "./icons/download.svg?component";
import Shapes from "./icons/shapes.svg?component";
import Text from "./icons/text.svg?component";
import { addElement } from "./storeEdits";
import { artboards, downloadFile } from "./storeWorkspace";

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
      <AddPhotoAlternate width="24" height="24" />
      <span class="toolbar-button-text">Afbeelding</span>
    </label>
    <button class="toolbar-button" for="addtext">
      <Text width="24" height="24" />
      <span class="toolbar-button-text">Text</span>
    </button>
    <button class="toolbar-button" for="addshape">
      <Shapes width="24" height="24" />
      <span class="toolbar-button-text">Vormen</span>
    </button>
    <button class="toolbar-button" on:click="{downloadFile}">
      <Download width="24" height="24" />
      <span class="toolbar-button-text">Download</span>
    </button>

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
