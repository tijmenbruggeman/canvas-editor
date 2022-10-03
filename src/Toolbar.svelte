<script>
import { toolbar } from "./storeWorkspace";

import ToolbarEdit from "./ToolbarEdit.svelte";
import ToolbarFiles from "./ToolbarFiles.svelte";
import ToolbarTemplates from "./ToolbarTemplates.svelte";
import { ToolbarType } from "./ToolbarType";

    let selectedToolbar = ToolbarType.Templates
    toolbar.subscribe((value) => {
        selectedToolbar = value;
    });
    // If has selected, check applicable toolbar
    // ie; image has rotation, cropping, resizing, placing
    // square: rotation, resizing
    // circle: resizing
    // path: rotation, resizing
    // 
    const toolbarTypes = {
        templates: ToolbarTemplates,
        files: ToolbarFiles,
        edit: ToolbarEdit
    }

    $: activeToolbar = toolbarTypes[selectedToolbar];
</script>

<svelte:component this={activeToolbar} />