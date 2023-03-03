export type Template = {
  elements: Array<DesignElement>;
  artboards: Array<ArtboardSettings>;
  scale: number;
};

export declare const PRODUCT_VISUAL_EDITOR_TEMPLATE: Template | undefined;

export type DesignElement = {
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

export type TextElement = {
  content: string;
  align: "center";
  left;
  right;
};
export type ImgElement = {
  src: string;
};

export type ImgDesignElement = DesignElement & ImgElement;
export type TextDesignElement = DesignElement & TextElement;

export type AnyDesignElement = Partial<ImgDesignElement & TextDesignElement>;

export type SelectedElement = {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
  id: string;
};

export type ArtboardSettings = {
  width: number;
  height: number;
  id: string;
  editAreas: Array<EditArea>;
  dragX: number;
  dragY: number;
};

export type EditArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type EditorSettings = {
  scale: 1;
};

export const ToolbarTypes = {
  files: "files",
  templates: "templates",
  edit: "edit",
  text: "text",
  alignment: "alignment",
  spacing: "spacing",
  color: "color",
  font: "font",
  textsize: "textsize",
} as const;
export type ToolbarType = (typeof ToolbarTypes)[keyof typeof ToolbarTypes];

export const ElementTypes = {
  img: "img",
  text: "text",
} as const;
export type ElementType = (typeof ElementTypes)[keyof typeof ElementTypes];
