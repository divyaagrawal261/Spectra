let lastTarget = null;

export function trackHover(sdk) {
  document.addEventListener("mouseover", (e) => {
    if (e.target === lastTarget) return;
    lastTarget = e.target;

    sdk.track("hover", {
      tag: e.target.tagName,
      id: e.target.id || null,
      class: e.target.className || null
    });
  });
}
