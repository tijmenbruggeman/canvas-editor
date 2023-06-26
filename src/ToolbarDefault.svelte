<script lang="ts">
import Download from "./icons/download.svg?component";
import Text from "./icons/text.svg?component";
import { downloadFile } from "./modules/downloadFile";
import ToolbarAddFile from "./ToolbarAddFile.svelte";
</script>

<ToolbarAddFile />
<button class="toolbar-button">
  <Text width="24" height="24" />
  <span class="toolbar-button-text">Text</span>
</button>
<button class="toolbar-button" on:click="{downloadFile}">
  <Download width="24" height="24" />
  <span class="toolbar-button-text">Download</span>
</button>
