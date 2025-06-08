export function delay(seconds: number, fn: () => void) {
  setTimeout(fn, seconds * 1000);
}
