<style>
.color-icon {
  height: 24px;
  width: 24px;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 4px;
  background: black;
}
</style>

<script lang="ts">
import Font from "./icons/font.svg?component";
import FontSize from "./icons/font-size.svg?component";
import TextLined from "./icons/text-lined.svg?component";
import TextAlignLeft from "./icons/text-align-left.svg?component";
import { setToolbarType } from "./storeWorkspace";
import { ToolbarTypes } from "../types/visualeditor";
</script>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.font)}">
  <Font width="24" height="24" />
  <span class="toolbar-button-text">Lettertype</span>
</button>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.textsize)}">
  <FontSize width="24" height="24" />
  <span class="toolbar-button-text">Grootte</span>
</button>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.color)}">
  <div class="color-icon"></div>
  <span class="toolbar-button-text">Achtergrond</span>
</button>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.color)}">
  <div class="color-icon"></div>
  <span class="toolbar-button-text">Text</span>
</button>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.alignment)}">
  <TextAlignLeft width="24" height="24" />
  <span class="toolbar-button-text">Indeling</span>
</button>

<button
  class="toolbar-button"
  on:click="{() => setToolbarType(ToolbarTypes.spacing)}">
  <TextLined width="24" height="24" />
  <span class="toolbar-button-text">Afstand</span>
</button>
