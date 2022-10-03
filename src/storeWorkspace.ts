import { writable } from "svelte/store";
import { ToolbarType } from './ToolbarType';

const selection = writable<Array<SelectedElement>>([]);
const artboards = writable<Array<ArtboardSettings>>([]);
const toolbar = writable<ToolbarType>(ToolbarType.Templates);

export {
    selection,
    artboards,
    toolbar,
}