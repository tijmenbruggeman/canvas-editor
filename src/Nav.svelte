<script>
    import { ToolbarType } from '../src/ToolbarType';
import { toolbar } from './stores';
    function setToolbar(toolbarType) {
        toolbar.set(toolbarType);
    }
</script>
<nav class="nav">
    <button on:click={() => setToolbar(ToolbarType.Templates)}>Templates</button>
    <button on:click={() => setToolbar(ToolbarType.Files)}>Files</button>
    <button on:click={() => setToolbar(ToolbarType.Edit)}>Edit</button>
</nav>
<style>
    
  .nav {
      grid-area: nav;
      display: flex;
      flex-direction: column;
  }
  .nav button {
      width: 100%;
      display: block;
      height: 50px;
      border: none;
      cursor: pointer;
      min-width: 118px;
  }
  .nav button:hover {
      background-color: var(--color-bg-0);
  }
</style>