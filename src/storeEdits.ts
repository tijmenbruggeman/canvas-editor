import { writable } from "svelte/store";

type EditAction = {
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

let $selection: Selection = initalSelection;
selection.subscribe((e) => {
  $selection = e;
});

function commitAction(action: EditAction) {
  const [elementId] = $selection.ids;
  const elementIndex = $elements.findIndex(({ id }) => id === elementId);
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

function moveSelection({ x, y }) {
  const { width, ids, height } = $selection;
  const [elementId] = ids;
  const elementIndex = $elements.findIndex(({ id }) => id === elementId);

  elements.update((e) => {
    // Currently multi-select is not possible
    // so no no need to update all elements
    e[elementIndex].x = x;
    e[elementIndex].y = y;
    return e;
  });
  selection.set({
    x,
    y,
    ids,
    width,
    height,
  });
}

export {
  elements,
  actions,
  selection,
  commitAction,
  clearSelected,
  moveSelection,
};
