import { get, writable } from "svelte/store";
import {
  ArtboardSettings,
  ElementType,
  ElementTypes,
  Template,
  ToolbarType,
  ToolbarTypes,
} from "../types/visualeditor";
import { elements } from "./storeEdits";
import { downloadByteArray } from "./utils/downloadByteArray";
import { templateToPDF } from "./utils/templateToPDF";

const defaultArtboard: ArtboardSettings = {
  width: 800,
  height: 600,
  scale: 1,
  id: "default",
};
const artboard = writable<ArtboardSettings>(defaultArtboard);
const toolbarType = writable<ToolbarType | undefined>(undefined);

function setToolbarType(type?: ToolbarType): void {
  toolbarType.set(type);
}
function setToolbarByElement(elType: ElementType): void {
  if (elType === ElementTypes.text) {
    setToolbarType(ToolbarTypes.text);
    return;
  }
  setToolbarType();
}

export async function downloadFile() {
  const template: Template = {
    elements: get(elements),
    artboard: get(artboard),
  };
  const pdfBytes = await templateToPDF(template);
  downloadByteArray(pdfBytes, "test.pdf");
}
export { artboard, toolbarType, setToolbarType, setToolbarByElement };
