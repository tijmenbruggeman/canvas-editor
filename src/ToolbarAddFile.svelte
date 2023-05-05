<style>
.toolbar-addfile {
  display: none;
}
</style>

<script lang="ts">
import AddPhotoAlternate from "./icons/add_photo_alternate.svg?component";
import { artboard, addElement } from "./storeEdits";

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
        artboard: $artboard.id,
        src: image.src,
        height,
        width,
      });
    };
  });
  reader.readAsDataURL(file);
}
</script>

<label class="toolbar-button" for="addfile">
  <AddPhotoAlternate width="24" height="24" />
  <span class="toolbar-button-text">Afbeelding</span>
</label>
<div class="toolbar-addfile">
  <input
    bind:this="{input}"
    id="addfile"
    on:change="{onUpload}"
    accept="image/png, image/jpeg"
    class="toolbar-addfile-input"
    type="file" />
</div>
