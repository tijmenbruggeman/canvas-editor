<style>
.toolbar-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 12px;
}
.toolbar-wrapper :global(.toolbar) {
  display: flex;
  padding: 4px 16px;
  background-color: var(--toolbar-bg);
  box-shadow: 2.1px 2.1px 5.1px -12px rgba(0, 0, 0, 0.024),
    5.8px 5.8px 14.1px -12px rgba(0, 0, 0, 0.035),
    13.9px 13.9px 34.1px -12px rgba(0, 0, 0, 0.046),
    46px 46px 113px -12px rgba(0, 0, 0, 0.07);
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.toolbar-wrapper :global(.toolbar-button) {
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
.toolbar-wrapper :global(.toolbar-button-text) {
  font-size: 11px;
  opacity: 0.5;
  margin-top: 4px;
}
</style>

<script lang="ts">
import ToolbarDefault from "./ToolbarDefault.svelte";
import ToolbarColor from "./ToolbarColor.svelte";
import { toolbarType } from "./storeWorkspace";
import ToolbarText from "./ToolbarText.svelte";
import { ToolbarTypes } from "../types/visualeditor";
</script>

<div class="toolbar-wrapper">
  <div class="toolbar">
    {#if !$toolbarType}
      <ToolbarDefault />
    {/if}
    {#if $toolbarType === ToolbarTypes.text}
      <ToolbarText />
    {/if}
    {#if $toolbarType === ToolbarTypes.color}
      <ToolbarColor />
    {/if}
  </div>
</div>
