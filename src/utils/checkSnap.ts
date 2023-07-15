// import type { Guide } from "../storeGuides";

import { Guide, GuideOrientation } from "../storeGuides";

type CheckSnapParams = {
  currentPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  moveX: number;
  moveY: number;
  transWidth: number;
  transHeight: number;
  guides: Array<Guide>;
};
type CheckSnapReturn = {
  x: number;
  y: number;
  width: number;
  height: number;
  activeGuides: Array<Guide>;
};

const proximity = 50;
export function checkSnap({
  currentPosition,
  moveX,
  moveY,
  transWidth,
  transHeight,
  guides,
}: CheckSnapParams): CheckSnapReturn {
  const activeGuides: Guide[] = [];
  const { x, y, width, height } = currentPosition;
  let snappedX = x + moveX;
  let snappedY = y + moveY;
  const elementHCenter = width / 2;
  const elementVCenter = height / 2;

  const hcenter = snappedX + elementHCenter;
  const hleft = snappedX;
  const hright = snappedX + width;
  const vcenter = snappedY + elementVCenter;
  const vtop = snappedY;
  const vbottom = snappedY + height;
  for (const guide of guides) {
    if (guide.orientation === GuideOrientation.vertical) {
      // check if hcenter left or right is in proximity
      if (Math.abs(guide.position - hcenter) < proximity) {
        snappedX = guide.position - elementHCenter;
        activeGuides.push(guide);
      }
      if (Math.abs(guide.position - hleft) < proximity) {
        snappedX = guide.position;
        activeGuides.push(guide);
      }
      if (Math.abs(guide.position - hright) < proximity) {
        snappedX = guide.position - width;
        activeGuides.push(guide);
      }
    } else {
      // check if vcenter top or bottom is in proximity
      if (Math.abs(guide.position - vcenter) < proximity) {
        snappedY = guide.position - elementVCenter;
        activeGuides.push(guide);
      }
      if (Math.abs(guide.position - vtop) < proximity) {
        snappedY = guide.position;
        activeGuides.push(guide);
      }
      if (Math.abs(guide.position - vbottom) < proximity) {
        snappedY = guide.position - height;
        activeGuides.push(guide);
      }
    }
  }
  return {
    x: snappedX,
    y: snappedY,
    width: width + transWidth,
    height: height + transHeight,
    activeGuides,
  };
}
