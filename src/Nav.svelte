<script>
    import { ToolbarType } from '../src/ToolbarType';
import { toolbar } from './stores';
    function setToolbar(toolbarType) {
        toolbar.set(toolbarType);
    }
</script>
<nav class="nav">
    <ul>
        <li>
            <button on:click={() => setToolbar(ToolbarType.Templates)}>Templates</button>
            <button on:click={() => setToolbar(ToolbarType.Files)}>Files</button>
            <button on:click={() => setToolbar(ToolbarType.Edit)}>Edit</button>
        </li>
    </ul>
</nav>
<style>
    
  .nav {
      grid-area: nav;
  }
</style>