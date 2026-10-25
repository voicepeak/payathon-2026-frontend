import { r as x } from "./telemetry.BUQSN-xI.js";
function S(c) {
  const a = document.createElement("canvas");
  ((a.className = "benefits-lens"),
    a.setAttribute("aria-hidden", "true"),
    c.append(a));
  const r = a.getContext("webgl", {
    alpha: !0,
    premultipliedAlpha: !0,
    preserveDrawingBuffer: !0,
    antialias: !1,
    depth: !1,
    stencil: !1,
    powerPreference: "low-power",
  });
  if (!r) return (a.remove(), null);
  let s,
    h,
    b = !1;
  const g = [],
    u = () => {
      (h && r.deleteBuffer(h),
        s && r.deleteProgram(s),
        g.splice(0).forEach((i) => r.deleteShader(i)));
    };
  function v() {
    try {
      for (const [i, f] of [
        [
          r.VERTEX_SHADER,
          "attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}",
        ],
        [
          r.FRAGMENT_SHADER,
          `precision mediump float;varying vec2 uv;
        void main(){
          vec2 p=uv*2.-1.;
          // Curved white rim makes the field recede rather than end at a crop.
          float rim=abs(p.x)+.085*p.y*p.y;
          float fade=smoothstep(.73,1.,rim);
          float bowl=.026*(1.-smoothstep(.2,.9,abs(p.x)))*smoothstep(.45,1.,abs(p.y));
          float a=max(fade,bowl);
          vec3 tint=mix(vec3(.72,.75,.79),vec3(1.),fade/max(a,.001));
          // Match compositor alpha mode: transparent pixels must carry zero RGB.
          gl_FragColor=vec4(tint*a,a);
        }`,
        ],
      ]) {
        const l = r.createShader(i);
        if (
          (g.push(l),
          r.shaderSource(l, f),
          r.compileShader(l),
          !r.getShaderParameter(l, r.COMPILE_STATUS))
        )
          throw new Error(r.getShaderInfoLog(l));
      }
      if (
        ((s = r.createProgram()),
        g.forEach((i) => r.attachShader(s, i)),
        r.linkProgram(s),
        !r.getProgramParameter(s, r.LINK_STATUS))
      )
        throw new Error(r.getProgramInfoLog(s));
      return (
        (h = r.createBuffer()),
        r.bindBuffer(r.ARRAY_BUFFER, h),
        r.bufferData(
          r.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]),
          r.STATIC_DRAW,
        ),
        !0
      );
    } catch (i) {
      return (
        x("benefits_lens_error", i),
        u(),
        console.warn("Benefits lens unavailable:", i),
        !1
      );
    }
  }
  if (!v()) return (a.remove(), null);
  let e = 0,
    o = 0;
  function t(i, f) {
    if (((e = i), (o = f), b || !i || !f)) return;
    const l = Math.min(devicePixelRatio || 1, 1.5, 1800 / i, 900 / f),
      p = Math.round(i * l),
      m = Math.round(f * l);
    ((a.width !== p || a.height !== m) && ((a.width = p), (a.height = m)),
      r.viewport(0, 0, a.width, a.height),
      r.useProgram(s),
      r.bindBuffer(r.ARRAY_BUFFER, h));
    const w = r.getAttribLocation(s, "position");
    (r.enableVertexAttribArray(w),
      r.vertexAttribPointer(w, 2, r.FLOAT, !1, 0, 0),
      r.drawArrays(r.TRIANGLES, 0, 3));
  }
  const n = (i) => {
      (i.preventDefault(), (b = !0));
    },
    d = () => {
      ((g.length = 0), (b = !v()), b || t(e, o));
    };
  return (
    a.addEventListener("webglcontextlost", n),
    a.addEventListener("webglcontextrestored", d),
    {
      resize: t,
      dispose() {
        (a.removeEventListener("webglcontextlost", n),
          a.removeEventListener("webglcontextrestored", d),
          u(),
          a.remove());
      },
    }
  );
}
let y;
function L() {
  y?.();
  const c = [
    ...document.querySelectorAll("#payathon-page [data-benefits-scroll]"),
  ].map((e) => ({
    root: e,
    stage: e.querySelector(".benefits-scroll-stage"),
    cardStage: e.querySelector(".benefits-card-stage"),
    viewport: e.querySelector(".benefits-scroll-viewport"),
    grid: e.querySelector(".partner-benefits-grid"),
    distance: 0,
    top: 0,
    start: 0,
    cycle: 0,
    initialized: !1,
    originals: [
      ...e.querySelectorAll(
        ".partner-benefit-card:not([data-benefit-loop-copy])",
      ),
    ],
    cards: [...e.querySelectorAll(".partner-benefit-card")],
    lens: null,
    geometry: [],
  }));
  if (!c.length) return;
  const a = new AbortController(),
    r = matchMedia("(prefers-reduced-motion:reduce)");
  let s = 0,
    h = !0;
  function b() {
    if (((s = 0), document.hidden)) return;
    if (h) {
      const o = c.map((t) => {
        const n = t.stage.offsetHeight,
          d =
            (parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--event-header-height",
              ),
            ) || 60) + 16,
          i = t.cardStage.offsetTop + t.cardStage.offsetHeight / 2,
          f = innerHeight / 2 - i,
          l = Math.max(d, Math.min(f, innerHeight - n - 16)),
          p = t.originals[0],
          m = t.originals[t.originals.length - 1],
          w = p.offsetLeft - (t.viewport.clientWidth - p.offsetWidth) / 2,
          E =
            t.originals.length > 1
              ? t.originals[1].offsetLeft - p.offsetLeft
              : p.offsetWidth;
        return {
          scene: t,
          height: n,
          top: l,
          start: w,
          cycle: E * t.originals.length,
          distance: m.offsetLeft - p.offsetLeft,
        };
      });
      for (const {
        scene: t,
        height: n,
        top: d,
        start: i,
        cycle: f,
        distance: l,
      } of o) {
        ((t.distance = l),
          (t.top = d),
          (t.start = i),
          (t.cycle = f),
          t.initialized || ((t.viewport.scrollLeft = i), (t.initialized = !0)),
          (t.geometry = t.cards.map((m) => ({
            card: m,
            center: m.offsetLeft + m.offsetWidth / 2,
          }))),
          !r.matches && !t.lens && (t.lens = S(t.cardStage)),
          t.lens?.resize(t.cardStage.clientWidth, t.cardStage.offsetHeight));
        const p = !r.matches && l > 0 && n + d + 16 < innerHeight;
        (t.root.toggleAttribute("data-pinned", p),
          (t.stage.style.top = p ? `${d}px` : "0px"),
          (t.root.style.height = p ? `${n + l}px` : ""));
      }
      h = !1;
    }
    const e = c
      .filter((o) => o.root.hasAttribute("data-pinned"))
      .map((o) => ({
        scene: o,
        x:
          o.start +
          Math.max(
            0,
            Math.min(o.distance, o.top - o.root.getBoundingClientRect().top),
          ),
      }));
    for (const { scene: o, x: t } of e)
      Math.abs(o.viewport.scrollLeft - t) > 0.5 && (o.viewport.scrollLeft = t);
    for (const o of c) {
      const t = o.viewport.clientWidth / 2;
      for (const { card: n, center: d } of o.geometry) {
        const i = Math.max(
            -1.4,
            Math.min(1.4, (d - o.viewport.scrollLeft - t) / t),
          ),
          f = -64 * Math.max(0, 1 - i * i);
        (n.style.setProperty(
          "--benefit-depth",
          r.matches ? "0px" : `${f.toFixed(1)}px`,
        ),
          n.style.setProperty(
            "--benefit-turn",
            r.matches ? "0deg" : `${(-i * 18).toFixed(2)}deg`,
          ));
      }
    }
  }
  function g() {
    !s && !document.hidden && (s = requestAnimationFrame(b));
  }
  const u = () => {
      ((h = !0), g());
    },
    v = new ResizeObserver(u);
  c.forEach((e) => {
    (v.observe(e.stage),
      v.observe(e.viewport),
      v.observe(e.grid),
      e.viewport.addEventListener(
        "scroll",
        () => {
          if (!e.root.hasAttribute("data-pinned") && e.cycle > 0) {
            const o = e.cycle / e.originals.length / 2;
            e.viewport.scrollLeft < e.start - o
              ? (e.viewport.scrollLeft += e.cycle)
              : e.viewport.scrollLeft >= e.start + e.cycle - o &&
                (e.viewport.scrollLeft -= e.cycle);
          }
          g();
        },
        { passive: !0, signal: a.signal },
      ));
  });
  for (const e of c)
    e.viewport.addEventListener(
      "wheel",
      (o) => {
        if (
          !e.root.hasAttribute("data-pinned") ||
          r.matches ||
          o.ctrlKey ||
          o.defaultPrevented ||
          !o.cancelable
        )
          return;
        const t = o.shiftKey && o.deltaX === 0 ? o.deltaY : o.deltaX;
        if (!t || (!o.shiftKey && Math.abs(t) <= Math.abs(o.deltaY))) return;
        const n = o.deltaMode === 1 ? 16 : o.deltaMode === 2 ? innerHeight : 1;
        (o.preventDefault(),
          window.scrollBy({ top: t * n, behavior: "instant" }));
      },
      { passive: !1, signal: a.signal },
    );
  (window.addEventListener("scroll", g, { passive: !0, signal: a.signal }),
    window.addEventListener("resize", u, { signal: a.signal }),
    document.addEventListener("visibilitychange", u, { signal: a.signal }),
    r.addEventListener("change", u, { signal: a.signal }));
  for (const e of c)
    e.viewport.addEventListener(
      "focusin",
      (o) => {
        const t = o.target.closest(".partner-benefit-card");
        if (!t || !e.root.hasAttribute("data-pinned")) return;
        const n = t.offsetLeft - (e.viewport.clientWidth - t.offsetWidth) / 2,
          d = Math.max(0, Math.min(e.distance, n - e.start));
        window.scrollTo({
          top: scrollY + e.root.getBoundingClientRect().top - e.top + d,
          behavior: "instant",
        });
      },
      { signal: a.signal },
    );
  (u(),
    (y = () => {
      (cancelAnimationFrame(s), v.disconnect(), a.abort());
      for (const e of c) {
        (e.root.removeAttribute("data-pinned"),
          (e.root.style.height = ""),
          (e.stage.style.top = ""),
          e.lens?.dispose());
        for (const o of e.cards)
          (o.style.removeProperty("--benefit-depth"),
            o.style.removeProperty("--benefit-turn"));
      }
    }));
}
L();
document.addEventListener("astro:page-load", L);
const A = () => y?.(),
  M = (c) => {
    c.persisted && L();
  };
document.addEventListener("astro:before-swap", A);
window.addEventListener("pagehide", A);
window.addEventListener("pageshow", M);
