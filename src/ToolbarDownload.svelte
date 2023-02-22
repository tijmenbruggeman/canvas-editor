<button class="toolbar-button" on:click="{downloadFile}">
  <Download width="24" height="24" />
  <span class="toolbar-button-text">Download</span>
</button>
<script>
import Download from "./icons/download.svg?component";
import { downloadFile } from "./storeWorkspace";
</script>