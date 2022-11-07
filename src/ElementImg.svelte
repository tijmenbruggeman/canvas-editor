<script lang="ts">
export let element: DesignElement & ImgElement;
</script>

<img
  draggable="false"
  width="{element.width}"
  height="{element.height}"
  src="{element.src}"
  alt="" />
