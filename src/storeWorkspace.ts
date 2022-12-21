import { get, writable } from "svelte/store";
import type { ElementType } from "./ElementType";
import { elements } from "./storeEdits";
import { downloadByteArray } from "./utils/downloadByteArray";
import { templateToPDF } from "./utils/templateToPDF";

const artboards = writable<Array<ArtboardSettings>>([]);
const toolbarType = writable<ElementType | undefined>(undefined);

function setToolbarType(type?: ElementType) {
  toolbarType.set(type);
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
export { artboards, toolbarType, setToolbarType };
