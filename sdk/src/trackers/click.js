export function trackClicks(sdk) {
  document.addEventListener("click", (e) => {
    const el = e.target;
    sdk.track("click", {
      tag: el.tagName,
      id: el.id || null,
      class: el.className || null,
      text: el.innerText?.slice(0, 50)
    });
  });
}
