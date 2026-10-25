import { w as a } from "./navigation-query.CcCHnnwN.js";
const u = new WeakMap(),
  i = (t, n) => {
    const e = u.get(t);
    return !e || e.renderedHref !== n ? n : e.sourceHref;
  },
  c = (t) => {
    const e = (t.target instanceof Element ? t.target : null)?.closest(
      "a[href]",
    );
    if (!(e instanceof HTMLAnchorElement) || e.hasAttribute("download")) return;
    const s = e.getAttribute("href") || "",
      r = i(e, s);
    if (!r || r.startsWith("#")) return;
    const o = a(r);
    o !== s &&
      (e.setAttribute("href", o), u.set(e, { sourceHref: r, renderedHref: o }));
  };
document.addEventListener("click", c, !0);
document.addEventListener("auxclick", c, !0);
document.addEventListener("contextmenu", c, !0);
