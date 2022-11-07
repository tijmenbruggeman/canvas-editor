import { writable } from "svelte/store";

type EditAction = {
  id: string;
  type: string;
  attr: any;
};

type Selection = {
  ids: Array<string>;
  x: number;
  y: number;
  width: number;
  height: number;
};

const initalSelection = {
  ids: [],
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const actions = writable<Array<EditAction>>([]);
const elements = writable<Array<DesignElement>>([]);
const selection = writable<Selection>(initalSelection);

let $elements: Array<DesignElement> = [];
elements.subscribe((e) => {
  $elements = e;
});

function commitAction(action: EditAction) {
  const elementIndex = $elements.findIndex(({ id }) => id === action.id);
  if (action.type === "move") {
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

function clearSelected() {
  selection.set(initalSelection);
}

export { elements, actions, commitAction, selection, clearSelected };
