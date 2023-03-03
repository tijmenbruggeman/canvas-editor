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

const artboards = writable<Array<ArtboardSettings>>([]);
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
    artboards: get(artboards),
    scale: 1,
  };
  const pdfBytes = await templateToPDF(template);
  downloadByteArray(pdfBytes, "test.pdf");
}
export { artboards, toolbarType, setToolbarType, setToolbarByElement };
