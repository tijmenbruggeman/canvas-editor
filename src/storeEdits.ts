import { writable } from "svelte/store";

type EditAction = Array<Record<string, any>>;

const actions = writable<Array<EditAction>>([]);
const elements = writable<Array<DesignElement>>([]);

function commitAction(action: EditAction) {
    return actions.update((a) => {
        a.push(action);
        return a;
    });
}


export {
    elements,
    actions,
    commitAction,
}