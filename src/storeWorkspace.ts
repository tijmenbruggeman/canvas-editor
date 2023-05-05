import { writable } from "svelte/store";
import {
  ElementType,
  ElementTypes,
  ToolbarType,
  ToolbarTypes,
} from "../types/visualeditor";

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

export { toolbarType, setToolbarType, setToolbarByElement };
