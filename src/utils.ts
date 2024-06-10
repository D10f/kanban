
export function debounce(fn: any, timeInMs: any) {
  let timeFrame: any;
  return function () {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}

export function createSvgIcon(iconName: string) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `/images/sprite.svg#icon-${iconName}`
  );

  svg.style.pointerEvents = 'none';

  svg.appendChild(use);

  return svg;
}
