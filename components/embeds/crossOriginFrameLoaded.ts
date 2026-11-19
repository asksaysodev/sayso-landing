/**
 * True once a cross-origin iframe has left its initial about:blank document.
 * Its contentDocument is readable while blank and null once the third-party
 * page has loaded, which catches a load event that fired before hydration.
 */
export function crossOriginFrameLoaded(frame: HTMLIFrameElement): boolean {
  try {
    return frame.contentDocument === null;
  } catch {
    return true;
  }
}
