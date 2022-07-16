type Template = {
  elements: Array<DesignElement>;
  artboards: Array<Artboard>;
  scale: number;
};

declare const PRODUCT_VISUAL_EDITOR_TEMPLATE: Template | undefined;

type DesignElement = {
  type: ElementType;
  width: number;
  height: number;
  x: number;
  y: number;
  zoom: number;
  index: number;
  artboard: 0;
};

type TextElement = {
  content: string;
};
type ImgElement = {
  src: string;
};

type ArtboardSettings = {
  width: number;
  height: number;
  id: string;
};

type EditorSettings = {
  scale: 1;
};