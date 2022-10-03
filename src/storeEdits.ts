import { writable } from "svelte/store";

type EditAction = {
    id: string,
    type: string,
    attr: any,
};

const actions = writable<Array<EditAction>>([]);
const elements = writable<Array<DesignElement>>([]);

let $elements: Array<DesignElement> = [];
elements.subscribe((e) => {
    $elements = e;
})
function commitAction(action: EditAction) {
    const elementIndex = $elements.findIndex(({ id }) => id === action.id);
    if (action.type === 'move') {
        return elements.update((e) => {
            e[elementIndex].x = action.attr.x;
            e[elementIndex].y = action.attr.y;
            return e;
        });
    }
    actions.update((a) => {
        a.push(action);
        return a;
    });
}


export {
    elements,
    actions,
    commitAction,
}