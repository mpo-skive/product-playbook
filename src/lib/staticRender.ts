/**
 * Marks the build-time prerender pass (see scripts/prerender.mjs).
 *
 * Collapsed disclosures and inactive tabs render nothing, so a crawler reading
 * the prerendered HTML would miss the detail behind them. Components check this
 * flag and lay their content out flat instead. It is never set in the browser.
 */
let staticRender = false;

export function setStaticRender(on: boolean) {
  staticRender = on;
}

export function isStaticRender() {
  return staticRender;
}
