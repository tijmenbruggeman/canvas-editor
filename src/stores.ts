import { writable } from "svelte/store";
import { ToolbarType } from '../src/ToolbarType';

const elements = writable<Array<DesignElement>>([]);
const selection = writable<Array<string>>([]);
const artboards = writable<Array<ArtboardSettings>>([]);
const toolbar = writable<ToolbarType>(ToolbarType.Templates)

export {
    elements,
    selection,
    artboards,
    toolbar,
}