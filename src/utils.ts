
export function debounce(fn: any, timeInMs: any) {
  let timeFrame: any;
  return function () {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}
