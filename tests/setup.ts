import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement the Pointer Capture APIs that Radix's Toast,
// Dialog, Dropdown Menu, and other overlay primitives call into during
// interaction (drag/swipe/pointer-based dismissal). Stub them so those
// components can be exercised under jsdom without throwing.
if (typeof Element !== 'undefined') {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {};
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
}

// jsdom also doesn't implement scrollIntoView, which Radix's menu/select
// primitives (and cmdk) call when keyboard-navigating to an item.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// jsdom doesn't implement ResizeObserver, which recharts' ResponsiveContainer
// and cmdk's Command Menu both use.
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}
