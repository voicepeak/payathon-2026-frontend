import { o as T } from "./payathon-activity.D_OqE3WT.js";
let v;
function E() {
  v?.();
  const s = document.querySelector("[data-hero-terminal]");
  if (!s) return;
  const h = s.closest(".payathon-hero"),
    c = s.querySelector("[data-terminal-output]"),
    i = [...s.querySelector("template").content.children],
    g = matchMedia("(prefers-reduced-motion: reduce)"),
    w = i.map((e) => {
      const t = e.textContent.replace(/\u00a0/g, "");
      return /^\s*(?:\/\*|\*|\/\/)/.test(t)
        ? [{ text: t, kind: "comment" }]
        : [
            ...t.matchAll(
              /"[^"\n]*"|\bconst\b|\b[a-zA-Z_][\w-]*(?=\s*:)|\$|\bnpx\b|create-payathon|[^"$]+?(?="|\$|\bconst\b|\bnpx\b|create-payathon|\b[a-zA-Z_][\w-]*(?=\s*:)|$)/g,
            ),
          ].map((u) => {
            const n = u[0];
            return {
              text: n,
              kind: n.startsWith('"')
                ? "string"
                : n === "const"
                  ? "keyword"
                  : n === "$" || n === "npx" || n === "create-payathon"
                    ? "command"
                    : /^[a-zA-Z_][\w-]*$/.test(n)
                      ? "property"
                      : "plain",
            };
          });
    }),
    M = w.map((e) =>
      e.flatMap((t) => Array.from(t.text, (u) => ({ char: u, kind: t.kind }))),
    );
  let x = !1,
    l = 0,
    a = 0,
    d = 0,
    o = null,
    m = null,
    f = "",
    p = 0;
  const r = document.createElement("span");
  ((r.className = "terminal-cursor"),
    (r.textContent = "█"),
    r.setAttribute("aria-hidden", "true"),
    c.replaceChildren());
  const $ = 3,
    b = (e, t = !1) => {
      l = setTimeout(L, t ? e : e / $);
    },
    A = (e) => {
      const t = i[e].cloneNode(!1);
      for (
        t.classList.remove("terminal-accent"), c.append(t);
        c.children.length > 7;

      )
        c.firstElementChild.remove();
      return t;
    },
    L = () => {
      if (((l = 0), !x || !h.hasAttribute("data-intro-complete"))) return;
      if (
        (o ||
          (a === i.length && ((a = 0), c.replaceChildren()),
          (o = A(a)),
          o.append(r),
          (d = 0),
          (m = null),
          (f = ""),
          (p = 3)),
        p > 0)
      ) {
        ((r.style.opacity = p % 2 ? "1" : "0"),
          p--,
          b(35 + Math.random() * 30));
        return;
      }
      r.style.opacity = "1";
      const e = M[a][d];
      if (!e) {
        (r.remove(),
          d || (o.textContent = " "),
          (o = null),
          a++,
          b(
            a === i.length ? 4200 : a === 1 ? 850 : 160 + Math.random() * 260,
            a === i.length,
          ));
        return;
      }
      if (!m || f !== e.kind) {
        f = e.kind;
        const t = document.createElement("span");
        ((t.className = `terminal-token-${f}`),
          (m = document.createTextNode("")),
          t.append(m),
          o.insertBefore(t, r));
      }
      (m.appendData(e.char),
        d++,
        d % 7 === 0 && Math.random() > 0.35 && (p = 3),
        b(
          /[,:;{}]/.test(e.char)
            ? 85 + Math.random() * 100
            : 18 + Math.random() * 36,
        ));
    },
    y = () => {
      if (
        (clearTimeout(l),
        (l = 0),
        !(!x || !h.hasAttribute("data-intro-complete")))
      ) {
        if (g.matches) {
          (c.replaceChildren(),
            (o = null),
            (a = 0),
            w.slice(-7).forEach((e, t) => {
              const u = A(w.length - 7 + t);
              for (const n of e) {
                const k = document.createElement("span");
                ((k.className = `terminal-token-${n.kind}`),
                  (k.textContent = n.text || " "),
                  u.append(k));
              }
            }));
          return;
        }
        b(180);
      }
    },
    C = new MutationObserver(y);
  C.observe(h, { attributes: !0, attributeFilter: ["data-intro-complete"] });
  const N = T(h, (e) => {
    ((x = e), y());
  });
  (g.addEventListener("change", y),
    (v = () => {
      (clearTimeout(l),
        C.disconnect(),
        N(),
        g.removeEventListener("change", y));
    }));
}
E();
document.addEventListener("astro:page-load", E);
document.addEventListener("astro:before-swap", () => v?.());
window.addEventListener("pagehide", () => v?.());
window.addEventListener("pageshow", (s) => {
  s.persisted && E();
});
