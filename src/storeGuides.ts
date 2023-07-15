import { get, writable } from "svelte/store";
import type { ArtboardSettings, DesignElement } from "../types/visualeditor";
import type { SelectionSettings } from "./storeEdits";

const guides = writable<Array<Guide>>([]);

export enum GuideType {
  artboard = "artboard",
  element = "element",
  selection = "selection",
}
export enum GuideOrientation {
  horizontal = "horizontal",
  vertical = "vertical",
}
export type Guide = {
  id: string;
  display?: boolean;
  type: GuideType;
  orientation: GuideOrientation;
  position: number;
};
/**
 * @param  {} {height
 * @param  {} width
 * @param  {} offsetX
 * @param  {} offsetY
 * @param  {} scale
 * @param  {ArtboardSettings} }
 * @returns Array
 */
function generateArtboardGuides({
  height,
  width,
}: ArtboardSettings): Array<Guide> {
  // 4 guides for corners
  const guideLeft = {
    id: "artboard_vl",
    type: GuideType.artboard,
    orientation: GuideOrientation.vertical,
    position: 0,
  };

  const guideRight = {
    id: "artboard_vr",
    type: GuideType.artboard,
    orientation: GuideOrientation.vertical,
    position: width,
  };

  const guideTop = {
    id: "artboard_ht",
    type: GuideType.artboard,
    orientation: GuideOrientation.horizontal,
    position: 0,
  };

  const guideBottom = {
    id: "artboard_hb",
    type: GuideType.artboard,
    orientation: GuideOrientation.horizontal,
    position: height,
  };

  // 2 center guides
  const guideCenterX = {
    id: "artboard_hc",
    type: GuideType.artboard,
    orientation: GuideOrientation.horizontal,
    position: height / 2,
    display: true,
  };

  const guideCenterY = {
    id: "artboard_vc",
    type: GuideType.artboard,
    orientation: GuideOrientation.vertical,
    position: width / 2,
  };

  return [
    guideCenterX,
    guideCenterY,
    guideLeft,
    guideRight,
    guideTop,
    guideBottom,
  ];
}
interface ElementGuideInput {
  width: number;
  height: number;
  x: number;
  y: number;
  id: string;
}
function generateElementGuides({
  width,
  height,
  x,
  y,
  id,
}: ElementGuideInput): Array<Guide> {
  const guideLeft = {
    type: GuideType.element,
    orientation: GuideOrientation.vertical,
    position: x,
    id,
  };
  const guideRight = {
    orientation: GuideOrientation.vertical,
    position: x + width,
    type: GuideType.element,
    id,
  };
  const guideTop = {
    orientation: GuideOrientation.horizontal,
    position: y,
    type: GuideType.element,
    id,
  };
  const guideBottom = {
    orientation: GuideOrientation.horizontal,
    position: y + height,
    type: GuideType.element,
    id,
  };
  const guideCenterX = {
    orientation: GuideOrientation.horizontal,
    position: y + height / 2,
    type: GuideType.element,
    id,
  };
  const guideCenterY = {
    orientation: GuideOrientation.vertical,
    position: x + width / 2,
    type: GuideType.element,
    id,
  };
  return [
    guideCenterX,
    guideCenterY,
    guideLeft,
    guideRight,
    guideTop,
    guideBottom,
  ];
}

function generateSelectionGuides(input: SelectionSettings): Array<Guide> {
  const elementGuides = generateElementGuides(input);
  return elementGuides.map((guide) => ({
    ...guide,
    type: GuideType.selection,
  }));
}

const guideFactory: { [index: string]: (input: any) => Array<Guide> } = {
  [GuideType.artboard]: generateArtboardGuides,
  [GuideType.element]: generateElementGuides,
  [GuideType.selection]: generateSelectionGuides,
};

/**
 * @param  {GuideType} guideType The type of guides
 * @returns void
 */
function setGuides(guideType: GuideType, guideInput: any): void {
  const newGuides = guideFactory[guideType](guideInput);
  const guidesWithoutType = get(guides).filter(
    ({ id }) => id !== guideInput.id
  );
  guides.set([...guidesWithoutType, ...newGuides]);
}

function clearGuides(type: GuideType) {
  const guidesWithoutType = get(guides).filter((guide) => guide.type !== type);
  guides.set(guidesWithoutType);
}

function getGuides(excludeId: string): Array<Guide> {
  return get(guides).filter(({ id }) => id !== excludeId && id !== "selection");
}

function setActiveGuides(activeGuides: Array<Guide>) {
  const activeIds = activeGuides.map(({ id }) => id);
  guides.update((guides) => {
    return guides.map((guide) => {
      if (activeIds.includes(guide.id)) {
        return { ...guide, display: true };
      }
      return { ...guide, display: false };
    });
  });
}

export { guides, setGuides, clearGuides, getGuides, setActiveGuides };
