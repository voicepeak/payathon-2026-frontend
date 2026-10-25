const i = new Set();
let p = 0,
  y = -1 / 0,
  d = 0,
  c = 0,
  w = null;
function k() {
  return !!document.querySelector(
    ".bubbleGuide[data-birth-pending],.bubbleGuide[data-birthing]",
  );
}
function v() {
  (clearTimeout(c), (c = 0), d && window.cancelIdleCallback(d), (d = 0));
}
function L() {
  i.size || (v(), w?.abort(), (w = null));
}
function S() {
  const n = [...i].filter((t) => !t.busy),
    e = n.find((t) => t.priority === "upcoming");
  return e || (n.length && !k() ? n[0] : null);
}
function o() {
  if (
    !i.size ||
    d ||
    c ||
    document.hidden ||
    document.readyState !== "complete" ||
    ![...i].some((e) => !e.busy)
  )
    return;
  const n = Math.max(0, 220 - (performance.now() - y), p - performance.now());
  if (n) {
    c = setTimeout(() => {
      ((c = 0), o());
    }, n);
    return;
  }
  if (!S()) {
    c = setTimeout(() => {
      ((c = 0), o());
    }, 50);
    return;
  }
  "requestIdleCallback" in window
    ? (d = window.requestIdleCallback(E))
    : (c = setTimeout(() => E(), 220));
}
function E(n) {
  if (((d = 0), (c = 0), document.hidden || !i.size)) return;
  if (
    performance.now() - y < 220 ||
    performance.now() < p ||
    (n && n.timeRemaining() < 8)
  ) {
    o();
    return;
  }
  const e = S();
  if (!e) {
    o();
    return;
  }
  ((e.busy = !0), i.delete(e), i.add(e), (p = performance.now() + 16));
  let t;
  try {
    t = e.jobs[e.cursor++]();
  } catch (r) {
    console.warn("[background-preparation]", r);
  }
  (Promise.resolve(t)
    .catch((r) => console.warn("[background-preparation]", r))
    .finally(() => {
      ((e.busy = !1),
        e.cursor >= e.jobs.length && i.delete(e),
        (p = Math.max(p, performance.now() + 16)),
        L(),
        o());
    }),
    o());
}
function q(n, { priority: e = "background" } = {}) {
  if (!n.length) return () => {};
  const t = { jobs: n, priority: e, cursor: 0, busy: !1 };
  if ((i.add(t), !w)) {
    w = new AbortController();
    const { signal: a } = w;
    (window.addEventListener("load", o, { once: !0, signal: a }),
      window.addEventListener(
        "scroll",
        () => {
          ((y = performance.now()), o());
        },
        { passive: !0, signal: a },
      ),
      document.addEventListener(
        "visibilitychange",
        () => {
          (v(), o());
        },
        { signal: a },
      ));
  }
  const r = () => {
    (i.delete(t), L());
  };
  return (e === "upcoming" && v(), o(), r);
}
function I(n) {
  return new Promise((e) => {
    if (n.aborted) {
      e(!1);
      return;
    }
    let t = 0,
      r = 0,
      a = !1;
    const f = () => {
        (cancelAnimationFrame(t), clearTimeout(r), (t = r = 0));
      },
      u = (m) => {
        a ||
          ((a = !0),
          f(),
          n.removeEventListener("abort", l),
          document.removeEventListener("visibilitychange", s),
          e(m));
      },
      l = () => u(!1),
      s = () => {
        (f(),
          !document.hidden &&
            (t = requestAnimationFrame(() => {
              ((t = 0),
                (r = setTimeout(() => {
                  ((r = 0), document.hidden ? s() : u(!0));
                }, 0)));
            })));
      };
    (n.addEventListener("abort", l, { once: !0 }),
      document.addEventListener("visibilitychange", s),
      s());
  });
}
function T(n, e) {
  return new Promise((t) => {
    if (e.aborted) {
      t(!1);
      return;
    }
    let r = !1,
      a = !1,
      f = () => {};
    const u = new Set(),
      l = (b) => {
        r ||
          ((r = !0),
          f(),
          g.disconnect(),
          e.removeEventListener("abort", s),
          document.removeEventListener("visibilitychange", m),
          t(b));
      },
      s = () => l(!1),
      m = () => {
        a && !document.hidden && l(!0);
      },
      g = new IntersectionObserver(
        (b) => {
          for (const h of b)
            h.isIntersecting ? u.add(h.target) : u.delete(h.target);
          ((a = u.size > 0), m());
        },
        { rootMargin: "600px" },
      );
    (n.forEach((b) => g.observe(b)),
      e.addEventListener("abort", s, { once: !0 }),
      document.addEventListener("visibilitychange", m),
      (f = q([() => l(!0)])));
  });
}
export { q as p, T as w, I as y };
