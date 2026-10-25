const c = new WeakMap();
function g(t, o) {
  let e = c.get(t);
  if (!e) {
    const a = new Set();
    let d = !1,
      n = !1;
    const r = document.querySelector("#payathon-registration"),
      i = () => {
        const s = d && !document.hidden && !r?.open;
        if (n !== s) {
          ((n = s), t.toggleAttribute("data-motion-running", n));
          for (const l of a) l(n);
        }
      },
      u = new IntersectionObserver(([s]) => {
        ((d = s.isIntersecting), i());
      });
    u.observe(t);
    const v = new MutationObserver(i);
    (r && v.observe(r, { attributes: !0, attributeFilter: ["open"] }),
      document.addEventListener("visibilitychange", i),
      (e = {
        listeners: a,
        get active() {
          return n;
        },
        destroy() {
          (u.disconnect(),
            v.disconnect(),
            document.removeEventListener("visibilitychange", i),
            t.removeAttribute("data-motion-running"),
            c.delete(t));
        },
      }),
      c.set(t, e));
  }
  return (
    e.listeners.add(o),
    o(e.active),
    () => {
      (e.listeners.delete(o), e.listeners.size || e.destroy());
    }
  );
}
export { g as o };
