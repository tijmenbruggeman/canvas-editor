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

function startMove() {
  const { width, ids, height, x, y } = $selection;
  const [elementId] = ids;
  const elementIndex = $elements.findIndex(({ id }) => id === elementId);
  const { x: elementX, y: elementY } = $elements[elementIndex];
  return {
    moveSelection: function moveSelection({ moveX, moveY }) {
      elements.update((e) => {
        // Currently multi-select is not possible
        // so no no need to update all elements
        e[elementIndex].x = elementX + moveX;
        e[elementIndex].y = elementY + moveY;
        return e;
      });
      selection.set({
        x: x + moveX,
        y: y + moveY,
        ids,
        width,
        height,
      });
    },
    commitMove: function commitMove({ moveX, moveY }) {
      commitAction({
        attr: {
          x: elementX + moveX,
          y: elementY + moveY,
        },
        type: "move",
      });
    },
  };
}

export { elements, actions, selection, commitAction, clearSelected, startMove };
