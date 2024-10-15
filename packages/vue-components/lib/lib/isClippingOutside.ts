export function isClippingOutside(el: HTMLElement, container: HTMLElement|null = null, options: ClippingStatusOptions = {
  offsetX: 0,
  offsetY: 0
}): ClippingStatus {
  const rect = el.getBoundingClientRect();
  const { offsetX, offsetY } = options;
  let leftSideValue;
  let topSideValue;
  let rightSideValue;
  let bottomSideValue;

  if(container) {
    const containerRect = container.getBoundingClientRect();
    leftSideValue = Math.round(rect.left - (containerRect.left + offsetX));
    topSideValue = Math.round(rect.top - (containerRect.top + offsetY));
    rightSideValue = Math.round(rect.right - (containerRect.right + offsetX));
    bottomSideValue = Math.round(rect.bottom - (containerRect.bottom + offsetY));
  } else {
    const { innerWidth, innerHeight } = window;
    leftSideValue = Math.round(rect.left - (0 + offsetX));
    topSideValue = Math.round(rect.top - (0 + offsetY));
    rightSideValue = Math.round(rect.right - (innerWidth + offsetX));
    bottomSideValue = Math.round(rect.bottom - (innerHeight + offsetY));
  }

  const isClippingOutsideLeft = leftSideValue < 0;
  const isClippingOutsideTop = topSideValue < 0;
  const isClippingOutsideRight = rightSideValue > 0;
  const isClippingOutsideBottom = bottomSideValue > 0;

  return {
    isOutside:
      isClippingOutsideLeft ||
      isClippingOutsideTop ||
      isClippingOutsideRight ||
      isClippingOutsideBottom,
    isClippingLeft: isClippingOutsideLeft,
    isClippingTop: isClippingOutsideTop,
    isClippingRight: isClippingOutsideRight,
    isClippingBottom: isClippingOutsideBottom,
    sides: {
      top: topSideValue,
      left: leftSideValue,
      right: rightSideValue,
      bottom: bottomSideValue
    }
  };
}

interface ClippingStatus {
  isOutside: boolean;
  isClippingLeft: boolean;
  isClippingTop: boolean;
  isClippingRight: boolean;
  isClippingBottom: boolean;
  sides: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
}

interface ClippingStatusOptions {
  offsetY: number;
  offsetX: number;
}
