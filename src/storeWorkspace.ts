import { writable } from "svelte/store";

const artboards = writable<Array<ArtboardSettings>>([]);

export {
    artboards,
}