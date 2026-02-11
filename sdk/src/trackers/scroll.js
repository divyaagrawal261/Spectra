let lastSent = 0;

export function trackScroll(sdk) {
  window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastSent < 2000) return;
    lastSent = now;

    const scrollDepth =
      Math.round(
        ((window.scrollY + window.innerHeight) /
          document.documentElement.scrollHeight) * 100
      );

    sdk.track("scroll", {
      scrollDepth
    });
  });
}
