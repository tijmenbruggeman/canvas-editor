import { get } from "svelte/store";
import { templateToPDF } from "../utils/templateToPDF";
import { downloadByteArray } from "../utils/downloadByteArray";
import type { Template } from "../../types/visualeditor";
import { artboard, elements } from "../storeEdits";

export async function downloadFile() {
  const template: Template = {
    elements: get(elements),
    artboard: get(artboard),
  };
  const pdfBytes = await templateToPDF(template);
  downloadByteArray(pdfBytes, "test.pdf");
}
