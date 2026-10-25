function r(t) {
  const e = document.querySelector("[data-payathon-header]");
  e &&
    ((e.dataset[`${t}Ready`] = "true"),
    e.dataset.titleReady &&
      e.dataset.sceneReady &&
      ((e.dataset.ready = "true"),
      (e.inert = !1),
      e.removeAttribute("aria-hidden")));
}
function a(t = !1) {
  if (t) return !0;
  const e = performance.getEntriesByType("navigation")[0];
  if (e?.type === "reload") return !1;
  if (e?.type === "back_forward") return !0;
  try {
    return (
      !!document.referrer &&
      new URL(document.referrer).origin === location.origin
    );
  } catch {
    return !1;
  }
}
export { r as m, a as s };
