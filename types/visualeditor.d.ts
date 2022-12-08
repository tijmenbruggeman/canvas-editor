type Template = {
  elements: Array<DesignElement>;
  artboards: Array<ArtboardSettings>;
  scale: number;
};

declare const PRODUCT_VISUAL_EDITOR_TEMPLATE: Template | undefined;

type DesignElement = {
  id: string;
  type: ElementType;
  width: number;
  height: number;
  x: number;
  y: number;
  zoom: number;
  index: number;
  artboard: string;
  mode?: string;
};

type TextElement = {
  content: string;
};
type ImgElement = {
  src: string;
};

type ImgDesignElement = DesignElement & ImgElement;
type TextDesignElement = DesignElement & TextElement;

type AnyDesignElement = Partial<ImgDesignElement & TextDesignElement>;

type SelectedElement = {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
  id: string;
};

type ArtboardSettings = {
  width: number;
  height: number;
  id: string;
  editAreas: Array<EditArea>;
  dragX: number;
  dragY: number;
};

type EditArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type EditorSettings = {
  scale: 1;
};
