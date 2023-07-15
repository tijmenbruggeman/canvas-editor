import { v4 } from "uuid";
import { get, writable } from "svelte/store";
import { setToolbarType } from "./storeWorkspace";
import type {
  AnyDesignElement,
  ArtboardSettings,
  DesignElement,
} from "../types/visualeditor";
import {
  GuideType,
  clearGuides,
  getGuides,
  setActiveGuides,
  setGuides,
} from "./storeGuides";
import { checkSnap } from "./utils/checkSnap";

type EditAction = {
  type: string;
  attr: any;
};

export type SelectionSettings = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

const initalSelection = {
  id: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const defaultArtboard: ArtboardSettings = {
  width: 800,
  height: 600,
  scale: 1,
  id: "default",
  offsetX: 0,
  offsetY: 0,
};

const artboard = writable<ArtboardSettings>(defaultArtboard);
const actions = writable<Array<EditAction>>([]);
const elements = writable<Array<DesignElement>>([]);
const selection = writable<SelectionSettings>(initalSelection);

let $elements: Array<DesignElement> = [];
elements.subscribe((e) => {
  $elements = e;
});

let $selection: SelectionSettings = initalSelection;
selection.subscribe((e) => {
  $selection = e;
});

let $artboard: ArtboardSettings = defaultArtboard;
artboard.subscribe((newArtboard) => {
  $artboard = newArtboard;
  clearGuides(GuideType.artboard);
  setGuides(GuideType.artboard, newArtboard);
});

function commitAction(action: EditAction) {
  const elementId = $selection.id;
  const elementIndex = $elements.findIndex(({ id }) => id === elementId);
  if (action.type === "move") {
    elements.update((e) => {
      e[elementIndex].x = action.attr.x;
      e[elementIndex].y = action.attr.y;
      return e;
    });
  }
  if (action.type === "transform") {
    elements.update((e) => {
      e[elementIndex].x = action.attr.x;
      e[elementIndex].y = action.attr.y;
      e[elementIndex].width = action.attr.width;
      e[elementIndex].height = action.attr.height;
      return e;
    });
  }
  if (action.type === "add") {
    const existingElemnents = $elements;
    existingElemnents.push(action.attr);
    elements.set(existingElemnents);
  }
  actions.update((a) => {
    a.push(action);
    return a;
  });
  $elements.map((element) => setGuides(GuideType.element, element));
}

function clearSelected() {
  setToolbarType();
  setSelected(initalSelection);
}

function editSelected() {
  const elementId = $selection.id;
  const elementIndex = $elements.findIndex(({ id }) => id === elementId);
  return elements.update((e) => {
    e[elementIndex].mode = "edit";
    document.getElementById(elementId).focus();
    return e;
  });
}

interface TransformParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
function scaleMovement({ x, y, width, height }: TransformParams) {
  return {
    moveX: scaleValue(x, $artboard.scale),
    moveY: scaleValue(y, $artboard.scale),
    width: scaleValue(width, $artboard.scale),
    height: scaleValue(height, $artboard.scale),
  };
}

function scaleValue(val: number, scale: number) {
  return val ? val / scale : 0;
}

function startTransform() {
  const currentSelection = { ...$selection };
  const elementIndex = $elements.findIndex(
    ({ id }) => id === currentSelection.id
  );
  const guides = getGuides(currentSelection.id);
  const currentElement = { ...$elements[elementIndex] };
  return {
    transformSelection(params: TransformParams) {
      const {
        moveX,
        moveY,
        height: transHeight,
        width: transWidth,
      } = scaleMovement(params);
      const { x, y, width, height, activeGuides } = checkSnap({
        currentPosition: {
          x: currentElement.x,
          y: currentElement.y,
          width: currentElement.width,
          height: currentElement.height,
        },
        transHeight,
        transWidth,
        moveX,
        moveY,
        guides,
      });
      setActiveGuides(activeGuides);
      elements.update((e) => {
        // Currently multi-select is not possible
        // so no no need to update all elements
        e[elementIndex].x = x;
        e[elementIndex].y = y;
        e[elementIndex].width = width;
        e[elementIndex].height = height;
        return e;
      });
      setSelected({
        x,
        y,
        id: currentSelection.id,
        width,
        height,
      });
    },
    commitTransform() {
      const { height, x, y, width } = get(selection);
      setActiveGuides([]);
      commitAction({
        attr: {
          x,
          y,
          width,
          height,
        },
        type: "transform",
      });
    },
  };
}

type AddElementParams = Partial<AnyDesignElement>;

function addElement({ width, type, height, src, artboard }: AddElementParams) {
  const newElement: AnyDesignElement = {
    id: v4(),
    x: 0,
    y: 0,
    zoom: 0,
    type,
    width,
    height,
    src,
    artboard,
  };

  commitAction({
    type: "add",
    attr: newElement,
  });
}

interface SetSelectedParams {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}
function setSelected(selectedInput: SetSelectedParams) {
  selection.set({
    height: selectedInput.height,
    width: selectedInput.width,
    x: selectedInput.x,
    y: selectedInput.y,
    id: selectedInput.id,
  });
  setGuides(GuideType.selection, { ...selectedInput, id: "selection" });
}

export {
  elements,
  actions,
  selection,
  artboard,
  commitAction,
  clearSelected,
  setSelected,
  editSelected,
  startTransform,
  addElement,
};
