import { r as te } from "./telemetry.BUQSN-xI.js";
import { i as se } from "./partner-context.Bg8umaDM.js";
function oe(e) {
  const b = e.filter(
      (t, c) => !c || Math.hypot(t[0] - e[c - 1][0], t[1] - e[c - 1][1]) > 0.5,
    ),
    s = b.slice(1).map((t, c) => {
      const m = t[0] - b[c][0],
        r = t[1] - b[c][1],
        u = Math.hypot(m, r);
      return { x: r / u, y: -m / u };
    });
  return b.map(([t, c], m) => {
    const r = s[Math.max(0, m - 1)],
      u = s[Math.min(m, s.length - 1)],
      l = Math.max(0.25, 1 + r.x * u.x + r.y * u.y);
    return { x: t, y: c, nx: (r.x + u.x) / l, ny: (r.y + u.y) / l };
  });
}
function ie(e) {
  const [b, s, t] = [1, 3, 5].map((h) => parseInt(e.slice(h, h + 2), 16) / 255),
    c = Math.max(b, s, t),
    m = Math.min(b, s, t),
    r = c - m,
    u = (c + m) / 2;
  let l = 0;
  return (
    r &&
      (l =
        (c === b
          ? (s - t) / r + (s < t ? 6 : 0)
          : c === s
            ? (t - b) / r + 2
            : (b - s) / r + 4) * 60),
    { h: l, s: r ? (r / (1 - Math.abs(2 * u - 1))) * 100 : 0, l: u * 100 }
  );
}
function ce(e, b) {
  let s,
    t,
    c = 0,
    m = 0,
    r = 0,
    u = [],
    l = 0,
    h = 0,
    o = 1,
    A = !0,
    M = { h: 190, s: 80, l: 70 };
  const L = new AbortController(),
    W = () => {
      (cancelAnimationFrame(c),
        clearTimeout(m),
        (c = 0),
        (m = 0),
        s?.remove(),
        (s = null),
        (t = null));
    },
    H = () => {
      if (!s) return;
      const f = e.getBoundingClientRect(),
        n = e.querySelector(
          '.track-panel[data-expanded="true"] .track-detail-content',
        );
      if (!n) return;
      const i = n.getBoundingClientRect();
      ((l = e.clientWidth),
        (h = e.clientHeight + 320),
        (o = Math.min(devicePixelRatio || 1, 1.5)),
        (s.width = Math.round(l * o)),
        (s.height = Math.round(h * o)),
        (s.style.width = l + "px"),
        (s.style.height = h + "px"),
        (s.style.left = (e.parentElement.clientWidth - l) / 2 + "px"),
        t.setTransform(o, 0, 0, o, 0, 0));
      const g = i.left - f.left,
        d = i.right - f.left,
        w = i.top - f.top + 160,
        O = i.bottom - f.top + 160,
        E = f.height - e.querySelector(".track-toggle").clientHeight + 160,
        $ =
          (parseFloat(e.style.getPropertyValue("--runway-top-left")) / 100) * l,
        k =
          (parseFloat(e.style.getPropertyValue("--runway-top-right")) / 100) *
          l,
        z = [
          [0, h - 160],
          [$, E],
          [g, O],
          [g, w],
          [d, w],
          [d, O],
          [k, E],
          [l, h - 160],
        ];
      u = oe(z);
    },
    T = (f) => {
      if (((c = 0), !s)) return;
      const n = f - r;
      if (n >= 5e3) {
        W();
        return;
      }
      if (A && !document.hidden) {
        t.clearRect(0, 0, l, h);
        const i = Math.min(1, n / 90, (5e3 - n) / 700);
        ((t.lineJoin = "round"),
          (t.lineCap = "round"),
          (t.globalCompositeOperation = "lighter"));
        for (let g = 0; g < 5; g++) {
          const d = g * 260;
          if (n < d) continue;
          const w = ((n - d) % 1300) / 1300,
            O = w * 108,
            E = Math.pow(1 - w, 1.05),
            $ = Math.max(0, (w - 0.1) / 0.9);
          t.strokeStyle = `hsl(${M.h + $ * 210} ${M.s}% ${M.l}%)`;
          const k = u.map((y) => ({ x: y.x + y.nx * O, y: y.y + y.ny * O }));
          (t.beginPath(), t.moveTo(k[0].x, k[0].y));
          for (let y = 1; y < k.length - 1; y++) {
            const F = k[y - 1],
              a = k[y],
              p = k[y + 1],
              v = Math.hypot(a.x - F.x, a.y - F.y),
              S = Math.hypot(p.x - a.x, p.y - a.y),
              R = Math.min(16, v * 0.22, S * 0.22);
            (t.lineTo(a.x + ((F.x - a.x) * R) / v, a.y + ((F.y - a.y) * R) / v),
              t.quadraticCurveTo(
                a.x,
                a.y,
                a.x + ((p.x - a.x) * R) / S,
                a.y + ((p.y - a.y) * R) / S,
              ));
          }
          const z = k[k.length - 1];
          (t.lineTo(z.x, z.y),
            (t.globalAlpha = i * E * 0.14),
            (t.lineWidth = 36),
            t.stroke(),
            (t.globalAlpha = i * E * 0.32),
            (t.lineWidth = 18),
            t.stroke(),
            (t.globalAlpha = i * E * 0.95),
            (t.lineWidth = 8),
            t.stroke());
        }
        ((t.globalAlpha = 1), (t.globalCompositeOperation = "source-over"));
      }
      A && !document.hidden && (c = requestAnimationFrame(T));
    },
    P = () => {
      if (b.matches) return;
      if (
        (W(),
        (s = document.createElement("canvas")),
        (s.className = "runway-rainbow"),
        s.setAttribute("aria-hidden", "true"),
        e.parentElement.append(s),
        (t = s.getContext("2d")),
        !t)
      ) {
        W();
        return;
      }
      const f = getComputedStyle(e)
        .getPropertyValue("--payathon-accent")
        .trim();
      ((M = ie(/^#[0-9a-f]{6}$/i.test(f) ? f : "#86eaff")),
        H(),
        (r = performance.now()),
        (m = setTimeout(W, 5e3)),
        (c = requestAnimationFrame(T)));
    },
    C = new ResizeObserver(H);
  C.observe(e);
  const B = () => {
      (cancelAnimationFrame(c),
        (c = 0),
        s && A && !document.hidden && (c = requestAnimationFrame(T)));
    },
    q = new IntersectionObserver((f) => {
      ((A = f[0].isIntersecting), B());
    });
  return (
    q.observe(e),
    document.addEventListener(
      "visibilitychange",
      () => {
        (cancelAnimationFrame(c),
          (c = 0),
          s && A && !document.hidden && (c = requestAnimationFrame(T)));
      },
      { signal: L.signal },
    ),
    b.addEventListener(
      "change",
      () => {
        b.matches && W();
      },
      { signal: L.signal },
    ),
    {
      start: P,
      dispose() {
        (W(), C.disconnect(), q.disconnect(), L.abort());
      },
    }
  );
}
const ae = 2600,
  le = 720,
  ee = 180;
function de(e = Math.random) {
  let b = 0,
    s = 350,
    t = 0,
    c = 0,
    m = [],
    r = !1;
  const u = [];
  return {
    notes: u,
    get time() {
      return b;
    },
    get score() {
      return c;
    },
    update(l) {
      for (b += Math.max(0, l); b >= s; ) {
        if (!m.length) {
          m = [0, 1, 2, 3, 4];
          for (let h = 4; h > 0; h--) {
            const o = Math.floor(e() * (h + 1));
            [m[h], m[o]] = [m[o], m[h]];
          }
        }
        (u.push({ id: ++t, lane: m.pop(), born: s, target: s + ae }),
          (s += le));
      }
      for (let h = u.length - 1; h >= 0; h--)
        b > u[h].target + ee && u.splice(h, 1);
    },
    hit(l) {
      const h = u
        .filter((M) => M.lane === l)
        .sort((M, L) => Math.abs(M.target - b) - Math.abs(L.target - b))[0];
      if (!h || Math.abs(h.target - b) > ee) return null;
      const o = Math.abs(h.target - b) <= 95 ? "perfect" : "good";
      ((c += o === "perfect" ? 100 : 50), u.splice(u.indexOf(h), 1));
      const A = !r && c > 1e3;
      return (
        A && (r = !0),
        { grade: o, score: c, ...(A ? { celebrate: !0 } : {}) }
      );
    },
  };
}
function ue(e, b) {
  const s = e.parentElement.querySelector("[data-runway-rhythm]"),
    t = [...s.querySelectorAll("[data-rhythm-key]")],
    c = s.querySelector(".runway-beats"),
    m = [...e.querySelectorAll(".track-panel")],
    r = e.closest(".event-subsection").querySelector("[data-rhythm-score]"),
    u = de(),
    l = ce(e, b),
    h = new AbortController(),
    o = c.getContext("2d"),
    A = new Map(),
    M = new Map(),
    L = e.parentElement,
    W = () => {
      (A.forEach((a) => a.cancel()), A.clear(), M.clear(), E());
    };
  let H = 1,
    T = [],
    P = !1,
    C = 0,
    B = 0,
    q = 0,
    f = 0,
    n = 0,
    i = [];
  ((r.textContent = "score: 0"), (r.hidden = !0));
  const g = () => {
      ((q = e.clientWidth),
        (f = e.querySelector(".track-toggle").clientHeight),
        (s.style.width = `${q}px`),
        (s.style.height = `${f}px`),
        (s.style.left = `${(e.parentElement.clientWidth - q) / 2}px`),
        (n =
          f -
          parseFloat(getComputedStyle(t[0]).bottom) -
          t[0].offsetHeight / 2),
        (H = Math.min(devicePixelRatio || 1, 1.5)),
        (c.width = Math.max(1, Math.round(q * H))),
        (c.height = Math.max(1, Math.round(f * H))),
        (T = t.map((a) => {
          const p = getComputedStyle(a).color,
            S =
              "rgb(" +
              p
                .match(/[\d.]+/g)
                .slice(0, 3)
                .map(Number)
                .map((R, V) => Math.round(R * 0.65 + [16, 20, 27][V] * 0.35))
                .join(",") +
              ")";
          return { color: p, fill: S };
        })),
        (i = m.map((a, p) => {
          const v = getComputedStyle(a),
            S =
              ((parseFloat(v.getPropertyValue("--lane-top-left")) +
                parseFloat(v.getPropertyValue("--lane-top-right"))) /
                200) *
              q,
            R = ((p + 0.5) * q) / 5,
            V =
              ((parseFloat(v.getPropertyValue("--lane-top-right")) -
                parseFloat(v.getPropertyValue("--lane-top-left"))) /
                100) *
              q;
          return (
            (t[p].style.left =
              `${(parseFloat(v.getPropertyValue("--lane-label-center")) / 100) * q}px`),
            {
              top: S,
              bottom: R,
              topWidth: V,
              keyX: parseFloat(t[p].style.left),
              keyWidth: t[p].offsetWidth,
              keyHeight: t[p].offsetHeight,
            }
          );
        })));
    },
    d = new ResizeObserver(g);
  (d.observe(e),
    window.addEventListener("resize", g, { signal: h.signal }),
    g());
  const w = () => P && !document.hidden && !b.matches,
    O = (a) => {
      (B && u.update(Math.max(0, a - B)), (B = a));
    },
    E = () => {
      if (o) {
        (o.setTransform(H, 0, 0, H, 0, 0), o.clearRect(0, 0, q, f));
        for (const a of u.notes) {
          const p = Math.max(0, (u.time - a.born) / ae),
            v = (Math.pow(p, 1.2) * n) / f,
            { top: S, bottom: R, topWidth: V } = i[a.lane],
            I = q < 768 ? 8 : 10,
            x = (Y, D) => {
              const G = Y / f;
              return S + (D * V) / 2 + (R + (D * q) / 10 - S - (D * V) / 2) * G;
            },
            _ = v * f - I,
            N = v * f + I;
          ((o.globalAlpha =
            Math.min(1, p * 8) * Math.max(0, 1 - Math.max(0, p - 1) * 12)),
            (o.fillStyle = T[a.lane].fill),
            (o.strokeStyle = T[a.lane].color),
            (o.lineWidth = 1),
            o.beginPath(),
            o.moveTo(x(_, -1), _),
            o.lineTo(x(_, 1), _),
            o.lineTo(x(N, 1), N),
            o.lineTo(x(N, -1), N),
            o.closePath(),
            o.fill(),
            o.stroke());
        }
        for (const [a, p] of M) {
          const v = u.time - p.start;
          if (v > p.duration + 65) {
            M.delete(a);
            continue;
          }
          const { keyX: S, keyWidth: R, keyHeight: V } = i[a];
          o.strokeStyle = T[a].color;
          for (let I = 0; I < 2; I++) {
            const x = (v - I * 65) / p.duration;
            if (x < 0 || x >= 1) continue;
            const _ = 1 - (1 - x) ** 3,
              N = 0.8 + (p.scale + I * 0.5 - 0.8) * _;
            ((o.globalAlpha = (I ? 0.6 : 0.95) * (1 - x) ** 1.5),
              (o.lineWidth = 1.5),
              o.beginPath(),
              o.ellipse(
                S,
                n,
                (R / 2 + 5) * N,
                (V / 2 + 5) * N,
                0,
                0,
                Math.PI * 2,
              ),
              o.stroke());
          }
        }
        o.globalAlpha = 1;
      }
    },
    $ = (a) => {
      ((C = 0), w() && (O(a), E(), (C = requestAnimationFrame($))));
    },
    k = () => {
      (cancelAnimationFrame(C),
        (C = 0),
        (B = 0),
        (L.style.willChange = w() ? "transform" : ""),
        w() ? (C = requestAnimationFrame($)) : W());
    },
    z = new IntersectionObserver(
      (a) => {
        ((P = a[0].intersectionRatio >= 0.55), k());
      },
      { threshold: [0, 0.55] },
    );
  (z.observe(s),
    document.addEventListener("visibilitychange", k, { signal: h.signal }),
    b.addEventListener("change", k, { signal: h.signal }));
  const y = (a, p, v) => {
      A.get(a)?.cancel();
      const S = a.animate(p, v);
      (A.set(a, S),
        S.finished.then(
          () => {
            A.get(a) === S && A.delete(a);
          },
          () => {},
        ));
    },
    F = (a) => {
      if (!w()) return;
      O(performance.now());
      const p = t[a],
        v = u.hit(a),
        S = v?.grade === "perfect",
        R = S ? 5 : v ? 3.5 : 2,
        V = a % 2 ? -1 : 1;
      if (
        (y(
          p,
          [
            {
              transform: "translateX(-50%) translateY(3px) scale(.86)",
              backgroundColor: T[a].fill,
              offset: 0,
            },
            {
              transform: "translateX(-50%) translateY(-2px) scale(1.12)",
              backgroundColor: T[a].fill,
              offset: 0.28,
            },
            {
              transform: "translateX(-50%) translateY(0) scale(1)",
              backgroundColor: "#10141b",
              offset: 1,
            },
          ],
          { duration: 280, easing: "cubic-bezier(.2,.7,.3,1)" },
        ),
        M.set(a, {
          start: u.time,
          duration: S ? 620 : 500,
          scale: S ? 4.4 : v ? 3.7 : 3.1,
        }),
        e.dispatchEvent(new Event("runway-impact")),
        y(
          L,
          [
            { transform: `translate3d(${V * R}px,${R * 0.5}px,0)`, offset: 0 },
            {
              transform: `translate3d(${-V * R * 0.8}px,${-R * 0.45}px,0)`,
              offset: 0.2,
            },
            {
              transform: `translate3d(${V * R * 0.5}px,${R * 0.3}px,0)`,
              offset: 0.44,
            },
            {
              transform: `translate3d(${-V * R * 0.2}px,${-R * 0.15}px,0)`,
              offset: 0.7,
            },
            { transform: "translate3d(0,0,0)", offset: 1 },
          ],
          { duration: S ? 210 : 170, easing: "ease-out" },
        ),
        v)
      ) {
        (v.celebrate && l.start(),
          (r.hidden = !1),
          (r.textContent = `score: ${v.score}`));
        const I = p.querySelector(".runway-judgement");
        (I.querySelectorAll("[data-grade]").forEach((x) => {
          x.hidden = x.dataset.grade !== v.grade;
        }),
          (I.dataset.result = v.grade),
          y(
            I,
            [
              {
                opacity: 0,
                transform: `translate(-50%,12px) scale(.55) rotate(${S ? -8 : -4}deg)`,
                offset: 0,
              },
              {
                opacity: 1,
                transform: `translate(-50%,-12px) scale(${S ? 1.65 : 1.35}) rotate(${S ? 3 : 1}deg)`,
                offset: 0.13,
              },
              {
                opacity: 1,
                transform: "translate(-50%,-7px) scale(.96) rotate(-1deg)",
                offset: 0.27,
              },
              {
                opacity: 1,
                transform: "translate(-50%,-9px) scale(1.06) rotate(0deg)",
                offset: 0.4,
              },
              {
                opacity: 1,
                transform: "translate(-50%,-12px) scale(1)",
                offset: 0.7,
              },
              {
                opacity: 0,
                transform: "translate(-50%,-28px) scale(.96)",
                offset: 1,
              },
            ],
            { duration: S ? 800 : 680, easing: "cubic-bezier(.16,.7,.3,1)" },
          ));
      }
      E();
    };
  return (
    t.forEach((a, p) =>
      a.addEventListener("click", () => F(p), { signal: h.signal }),
    ),
    document.addEventListener(
      "keydown",
      (a) => {
        a.repeat ||
          a.ctrlKey ||
          a.metaKey ||
          a.altKey ||
          a.shiftKey ||
          !/^[1-5]$/.test(a.key) ||
          (a.target instanceof Element &&
            a.target.closest(
              'input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]',
            )) ||
          document.querySelector(
            'dialog[open],[aria-modal="true"]:not([hidden])',
          ) ||
          (w() && (a.preventDefault(), F(Number(a.key) - 1)));
      },
      { signal: h.signal },
    ),
    () => {
      (l.dispose(),
        cancelAnimationFrame(C),
        z.disconnect(),
        d.disconnect(),
        h.abort(),
        W(),
        L.style.removeProperty("will-change"),
        o?.clearRect(0, 0, c.width, c.height));
    }
  );
}
function he(e, b, s = 340) {
  const t = Math.max(0.2, 1 - 112 / s),
    c = (m) => `${e + (b - e) * m} ${460 * m}`;
  return Array.from({ length: 10 }, (m, r) => {
    const u = 0.04 + (t - 0.04) * Math.pow(r / 10, 1.3),
      l = 0.009 + u * 0.012;
    return `M${c(u)} L${c(Math.min(t, u + l))}`;
  }).join(" ");
}
function fe(e, b, { id: s = "runway-crt-displace", fullField: t = !1 } = {}) {
  if (
    /AppleWebKit/.test(navigator.userAgent) &&
    !/(Chrome|Chromium|Edg|OPR)\//.test(navigator.userAgent)
  )
    return () => {};
  const m = document.createElement("canvas");
  ((m.width = 64), (m.height = 128));
  const r = m.getContext("webgl", {
    alpha: !1,
    antialias: !1,
    preserveDrawingBuffer: !0,
  });
  if (!r) return () => {};
  const u = [];
  let l,
    h,
    o,
    A,
    M,
    L = 0,
    W = 0;
  const H = new AbortController(),
    T = () => {
      (clearTimeout(W),
        cancelAnimationFrame(L),
        A?.disconnect(),
        M?.disconnect(),
        H.abort(),
        delete e.dataset.crtRunning,
        o?.remove(),
        h && r.deleteBuffer(h),
        l && r.deleteProgram(l),
        u.forEach((P) => r.deleteShader(P)),
        r.getExtension("WEBGL_lose_context")?.loseContext());
    };
  try {
    const P = (x, _) => {
      const N = r.createShader(x);
      if (
        (u.push(N),
        r.shaderSource(N, _),
        r.compileShader(N),
        !r.getShaderParameter(N, r.COMPILE_STATUS))
      )
        throw new Error("CRT shader compile failed");
      return N;
    };
    if (
      ((l = r.createProgram()),
      r.attachShader(
        l,
        P(
          r.VERTEX_SHADER,
          `attribute vec2 position;
      varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`,
        ),
      ),
      r.attachShader(
        l,
        P(
          r.FRAGMENT_SHADER,
          `precision mediump float;
      varying vec2 uv;
      void main(){
        float y=uv.y;
        // Horizontal signal blocks tear in opposite directions, with clean
        // gaps between them. Abrupt boundaries emulate loss of line sync.
        float envelope=smoothstep(0.,.08,y)*(1.-smoothstep(.92,1.,y));
        float row=floor(y*19.);
        float noise=fract(sin(row*127.1+19.7)*43758.5453);
        float tear=(noise-.5)*.72*step(.36,noise);
        float fine=sin(y*380.)*.025;
        gl_FragColor=vec4(.5+(tear+fine)*envelope,.5,0.,1.);
      }`,
        ),
      ),
      r.linkProgram(l),
      !r.getProgramParameter(l, r.LINK_STATUS))
    )
      throw new Error("CRT shader link failed");
    (r.useProgram(l),
      (h = r.createBuffer()),
      r.bindBuffer(r.ARRAY_BUFFER, h),
      r.bufferData(
        r.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        r.STATIC_DRAW,
      ));
    const C = r.getAttribLocation(l, "position");
    (r.enableVertexAttribArray(C),
      r.vertexAttribPointer(C, 2, r.FLOAT, !1, 0, 0),
      r.viewport(0, 0, 64, 128),
      r.drawArrays(r.TRIANGLES, 0, 6));
    const B = m.toDataURL(),
      q = "http://www.w3.org/2000/svg",
      f = (x, _ = {}) => {
        const N = document.createElementNS(q, x);
        return (
          Object.entries(_).forEach(([Y, D]) => N.setAttribute(Y, String(D))),
          N
        );
      };
    o = f("svg", {
      class: "runway-crt-filter",
      "aria-hidden": "true",
      width: 0,
      height: 0,
    });
    const n = f("defs"),
      i = 128,
      g = f("filter", {
        id: s,
        filterUnits: "userSpaceOnUse",
        x: -i,
        y: -i,
        "color-interpolation-filters": "sRGB",
      }),
      d = f("feFlood", { "flood-color": "rgb(128,128,0)", result: "neutral" }),
      w = f("feImage", {
        href: B,
        x: 0,
        y: -80,
        height: 80,
        preserveAspectRatio: "none",
        result: "scan",
      }),
      O = f("feMerge", { result: "field" });
    O.append(
      f("feMergeNode", { in: "neutral" }),
      f("feMergeNode", { in: "scan" }),
    );
    const E = f("feDisplacementMap", {
      in: "SourceGraphic",
      in2: "field",
      scale: 0,
      xChannelSelector: "R",
      yChannelSelector: "G",
    });
    E.setAttribute("result", "glitched");
    const $ = f("feFlood", {
        "flood-color": "rgb(191,128,0)",
        x: 0,
        y: -5,
        height: 5,
        result: "line",
      }),
      k = f("feMerge", { result: "lineField" });
    k.append(
      f("feMergeNode", { in: "neutral" }),
      f("feMergeNode", { in: "line" }),
    );
    const z = f("feDisplacementMap", {
      in: "glitched",
      in2: "lineField",
      scale: t ? 0 : 16,
      xChannelSelector: "R",
      yChannelSelector: "G",
    });
    (g.append(d, w, O, E, $, k, z),
      n.append(g),
      o.append(n),
      e.parentElement.append(o));
    let y = 0,
      F = !1,
      a = !1,
      p = 0,
      v = 0,
      S = 0,
      R = !1;
    const V = (x) => {
        if (a) {
          if ((p && (v += Math.min(x - p, 100)), (p = x), x - S >= 1e3 / 30)) {
            S = x;
            const _ = (v % 7200) / 5700;
            ($.setAttribute("y", String(-5 + ((v % 6200) / 6200) * (y + 10))),
              w.setAttribute("y", String(-96 + Math.min(_, 1) * (y + 192))));
            const N = Math.floor(v / 85),
              Y = (U) => {
                const Z = Math.sin(U * 127.1 + 311.7) * 43758.5453;
                return Z - Math.floor(Z);
              },
              D = Math.floor(v / 7200),
              G = v % 7200,
              J = 1e3 + Y(D + 71) * 900,
              Q = 3500 + Y(D + 97) * 700,
              X =
                (G >= J && G < J + 255) ||
                (Y(D + 113) > 0.55 && G >= Q && G < Q + 170),
              re = X ? (Y(N + 5) > 0.5 ? 1 : -1) * (20 + Y(N + 17) * 20) : 0;
            if (
              (E.setAttribute("scale", String(re)),
              w.setAttribute(
                "height",
                String(X ? 44 + Math.floor(Y(N + 31) * 5) * 13 : 72),
              ),
              t &&
                (w.setAttribute("y", "0"), w.setAttribute("height", String(y))),
              X && !t)
            ) {
              const U = (Y(N + 43) - 0.5) * 22;
              w.setAttribute("y", String(-96 + Math.min(_, 1) * (y + 192) + U));
            }
          }
          L = requestAnimationFrame(V);
        }
      },
      I = () => {
        const x = F && !document.hidden && !b.matches;
        e.dataset.crtRunning = String(x);
        const _ = x && !R;
        _ !== a &&
          ((a = _),
          (p = 0),
          _ ? (L = requestAnimationFrame(V)) : cancelAnimationFrame(L));
      };
    (e.addEventListener(
      "runway-impact",
      () => {
        ((R = !0),
          clearTimeout(W),
          I(),
          (W = setTimeout(() => {
            ((R = !1), I());
          }, 900)));
      },
      { signal: H.signal },
    ),
      (M = new ResizeObserver(() => {
        const x = e.getBoundingClientRect();
        ((y = x.height),
          g.setAttribute("width", String(x.width + i * 2)),
          g.setAttribute("height", String(y + i * 2)),
          w.setAttribute("x", String(-i)),
          w.setAttribute("width", String(x.width + i * 2)),
          $.setAttribute("x", String(-i)),
          $.setAttribute("width", String(x.width + i * 2)));
      })),
      M.observe(e),
      (A = new IntersectionObserver((x) => {
        ((F = x[0].isIntersecting), I());
      })),
      A.observe(e),
      b.addEventListener("change", I, { signal: H.signal }),
      document.addEventListener("visibilitychange", I, { signal: H.signal }));
  } catch (P) {
    return (
      te("runway_crt_error", P),
      T(),
      console.warn("Runway CRT unavailable:", P),
      () => {}
    );
  }
  return T;
}
function me(e) {
  if (!se()) return () => {};
  const b = document.querySelector("[data-watcha-assets]")?.content,
    s = b?.querySelector("[data-watcha-logo]"),
    t = [...(b?.querySelectorAll("[data-watcha-frame]") || [])],
    c = e.querySelector("#track-detail-0 .track-detail-title");
  if (!s || t.length !== 6 || !c) return () => {};
  const m = document.createElement("div");
  ((m.className = "watcha-track-brand"), m.append(s.cloneNode(!0)));
  const r = document.createElement("span");
  ((r.textContent = "爱猹收"), m.append(r));
  const u = document.createElement("div");
  ((u.className = "watcha-sign-slot"),
    u.append(m),
    c.closest(".track-detail").prepend(u));
  const l = document.createElement("div");
  ((l.className = "watcha-runner-layer"),
    l.setAttribute("aria-hidden", "true"));
  const h = document.createElement("div");
  h.className = "watcha-runner";
  const o = t.map((d) => d.cloneNode(!0));
  (h.append(...o), l.append(h), e.parentElement.append(l));
  const A = () => {
      ((l.style.width = `${e.clientWidth}px`),
        (l.style.height = `${e.querySelector(".track-toggle").clientHeight}px`));
      for (const d of ["--watcha-far-x", "--watcha-near-x"])
        l.style.setProperty(d, e.style.getPropertyValue(d));
    },
    M = new ResizeObserver(A);
  M.observe(e);
  const L = new MutationObserver(A);
  (L.observe(e, { attributes: !0, attributeFilter: ["style"] }),
    A(),
    (e.dataset.partner = "watcha"));
  let W = !1,
    H = !1,
    T = !1,
    P = null,
    C = 0;
  const B = matchMedia("(max-width:767px), (prefers-reduced-motion:reduce)"),
    q = (d) => o.forEach((w, O) => w.classList.toggle("is-current", O === d)),
    f = () => {
      ((P = null),
        !(W || !l.hasAttribute("data-playing")) &&
          ((C = (C + 1) % o.length), q(C), (P = setTimeout(f, 100))));
    },
    n = () => {
      const d =
        H && T && !document.hidden && e.dataset.active === "0" && !B.matches;
      (l.toggleAttribute("data-playing", d),
        d
          ? P === null && (P = setTimeout(f, 100))
          : (clearTimeout(P), (P = null)),
        B.matches && ((C = 0), q(0)));
    },
    i = new IntersectionObserver(([d]) => {
      ((T = d.isIntersecting), n());
    });
  i.observe(e);
  const g = new MutationObserver(n);
  return (
    g.observe(e, { attributes: !0, attributeFilter: ["data-active"] }),
    document.addEventListener("visibilitychange", n),
    B.addEventListener("change", n),
    Promise.all(o.map((d) => d.decode()))
      .then(() => {
        W || ((H = !0), q(0), l.setAttribute("data-ready", ""), n());
      })
      .catch((d) => {
        te("watcha_runway_error", d);
      }),
    () => {
      ((W = !0),
        clearTimeout(P),
        i.disconnect(),
        g.disconnect(),
        M.disconnect(),
        L.disconnect(),
        document.removeEventListener("visibilitychange", n),
        B.removeEventListener("change", n),
        u.remove(),
        l.remove(),
        delete e.dataset.partner);
    }
  );
}
let j;
function K() {
  j?.();
  const e = document.querySelector("[data-track-accordion]");
  if (!e) return;
  const b = me(e);
  document.querySelectorAll(".reward-track-link").forEach((n, i) => {
    const g = i % 2 === 0 ? -8 + Math.random() * 5 : 3 + Math.random() * 6;
    n.style.setProperty("--sign-angle", `${g.toFixed(2)}deg`);
  });
  const s = [...e.querySelectorAll(".track-panel")],
    t = s.map((n) => n.querySelector(".track-toggle")),
    c = new AbortController(),
    m = matchMedia("(prefers-reduced-motion:reduce)"),
    r = () => {
      const n = document.documentElement.clientWidth,
        i = e.parentElement.clientWidth;
      (e.style.setProperty("--runway-width", n + "px"),
        e.style.setProperty("--runway-content-width", i + "px"));
      const g = ((n - i * 0.7) / 2 / n) * 1e3,
        d = (((i * 0.7) / n) * 1e3) / 5;
      (e.style.setProperty("--runway-top-left", g / 10 + "%"),
        e.style.setProperty("--runway-top-right", (1e3 - g) / 10 + "%"));
      const w = (g + d / 2) / 10;
      (e.style.setProperty("--watcha-far-x", `${w + (10 - w) * 0.18}%`),
        e.style.setProperty("--watcha-near-x", `${w + (10 - w) * 0.54}%`),
        s.forEach((O, E) => {
          const $ = g + E * d,
            k = $ + d,
            z = ($ + k) / 2;
          (O.style.setProperty("--lane-top-left", $ / 10 + "%"),
            O.style.setProperty("--lane-top-right", k / 10 + "%"));
          const y = t[E].clientHeight,
            F = t[E].querySelector("span:first-child"),
            a =
              1 -
              (parseFloat(getComputedStyle(F).bottom) + F.clientHeight / 2) / y;
          O.style.setProperty(
            "--lane-label-center",
            (z + (100 + E * 200 - z) * a) / 10 + "%",
          );
          const p = e.querySelector('.runway-surface [data-lane="' + E + '"]');
          (p
            .querySelector(".runway-lane")
            .setAttribute(
              "d",
              "M" +
                E * 200 +
                " 460 L" +
                $ +
                " 0 H" +
                k +
                " L" +
                (E + 1) * 200 +
                " 460",
            ),
            p
              .querySelector(".runway-dashes")
              .setAttribute("d", he(z, 100 + E * 200, t[E].clientHeight)));
        }));
    };
  r();
  const u = new ResizeObserver(r);
  (u.observe(e.parentElement),
    window.addEventListener("resize", r, { signal: c.signal }));
  const l = fe(e, m),
    h = ue(e, m);
  let o = [],
    A = 0,
    M = -1;
  const L = s.map((n) => n.querySelector(".track-detail")),
    W = L.map((n) => n.querySelector(".track-detail-content")),
    H = W.map((n) => {
      const i = document.createElement("span");
      return (
        (i.className = "track-card-scan"),
        i.setAttribute("aria-hidden", "true"),
        n.append(i),
        i
      );
    }),
    T = () => {
      (o.forEach((n) => n.cancel()),
        (o = []),
        s.forEach((n) => delete n.dataset.entering));
    },
    P = (n) => {
      ((M = n),
        s.forEach((i, g) => {
          const d = g === n,
            w = i.querySelector(".track-detail");
          ((i.dataset.expanded = String(d)),
            t[g].setAttribute("aria-expanded", String(d)),
            (w.inert = !d),
            w.setAttribute("aria-hidden", String(!d)));
        }));
    },
    C = async (n, i = !1) => {
      if (!i && Number(e.dataset.active) === n) return !1;
      const g = ++A,
        d =
          M < 0
            ? []
            : [
                ...L[M].querySelectorAll(
                  ".track-road-sign,.watcha-track-brand",
                ),
              ].map((y) => {
                const F = getComputedStyle(y);
                return { sign: y, transform: F.transform, opacity: F.opacity };
              });
      if (
        (T(),
        (e.dataset.active = String(n)),
        i || n === M || m.matches || document.hidden)
      )
        return (P(n), !0);
      const w = t[n].querySelector(".runway-scan"),
        O = t[n].clientHeight,
        E = W[n];
      s[n].dataset.entering = "true";
      const $ = 440,
        k = 520;
      ((o = [
        w.animate(
          [
            { transform: "translateY(0)", opacity: 0, offset: 0 },
            {
              transform: `translateY(${-O * 0.12}px)`,
              opacity: 1,
              offset: 0.12,
            },
            { transform: `translateY(${-O}px)`, opacity: 1, offset: $ / 580 },
            { transform: `translateY(${-O * 1.32}px)`, opacity: 0, offset: 1 },
          ],
          { duration: 580, easing: "linear", fill: "both" },
        ),
        E.animate(
          [{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)" }],
          {
            delay: $,
            duration: k,
            easing: "cubic-bezier(.2,.35,.3,1)",
            fill: "both",
          },
        ),
        H[n].animate(
          [
            { transform: "translateY(0)", opacity: 0.85, offset: 0 },
            { opacity: 0.65, offset: 0.75 },
            {
              transform: `translateY(${-E.clientHeight}px)`,
              opacity: 0,
              offset: 1,
            },
          ],
          {
            delay: $,
            duration: k,
            easing: "cubic-bezier(.2,.35,.3,1)",
            fill: "both",
          },
        ),
      ]),
        d.forEach(({ sign: y, transform: F, opacity: a }) => {
          if (y.classList.contains("watcha-track-brand")) {
            o.push(
              y.animate(
                [
                  { transform: F, opacity: a },
                  {
                    transform: `translate(-50%,${y.offsetHeight}px)`,
                    opacity: 0,
                  },
                ],
                {
                  duration: 280,
                  easing: "cubic-bezier(.4,0,.8,.3)",
                  fill: "both",
                },
              ),
            );
            return;
          }
          const p = y.classList.contains("track-road-sign--left");
          o.push(
            y.animate(
              [
                { transform: F, opacity: a },
                {
                  transform: `translateX(${p ? -70 : 70}px) rotate(${p ? -19 : 19}deg)`,
                  opacity: 0,
                },
              ],
              {
                duration: 280,
                easing: "cubic-bezier(.4,0,.8,.3)",
                fill: "both",
              },
            ),
          );
        }),
        L[n].querySelectorAll(".track-road-sign").forEach((y) => {
          const F = y.classList.contains("track-road-sign--left"),
            a = getComputedStyle(y).getPropertyValue("--sign-tilt").trim();
          o.push(
            y.animate(
              [
                {
                  transform: `translateX(${F ? -70 : 70}px) rotate(${F ? -19 : 19}deg)`,
                  opacity: 0,
                },
                { transform: `translateX(0) rotate(${a})`, opacity: 1 },
              ],
              {
                delay: $,
                duration: k,
                easing: "cubic-bezier(.18,.75,.25,1)",
                fill: "both",
              },
            ),
          );
        }));
      const z = L[n].querySelector(".watcha-track-brand");
      z &&
        o.push(
          z.animate(
            [
              { transform: `translate(-50%,${z.offsetHeight}px)`, opacity: 0 },
              { transform: "translate(-50%,0)", opacity: 1 },
            ],
            {
              delay: $ + k - 280,
              duration: 280,
              easing: "cubic-bezier(.18,.75,.25,1)",
              fill: "both",
            },
          ),
        );
      try {
        await Promise.all(o.map((y) => y.finished));
      } catch {
        return !1;
      }
      return g !== A ? !1 : (P(n), T(), !0);
    },
    B = new URLSearchParams(location.search).get("track"),
    q = s.findIndex((n) => n.dataset.track === B);
  C(q >= 0 ? q : Number(e.dataset.active) || 0, !0);
  const f = () => C(Number(e.dataset.active) || 0, !0);
  (m.addEventListener("change", f, { signal: c.signal }),
    document.addEventListener(
      "visibilitychange",
      () => {
        document.hidden && f();
      },
      { signal: c.signal },
    ),
    t.forEach((n, i) => {
      (n.addEventListener("click", () => C(i), { signal: c.signal }),
        n.addEventListener(
          "keydown",
          (g) => {
            let d = i;
            if (g.key === "ArrowRight") d = (i + 1) % t.length;
            else if (g.key === "ArrowLeft") d = (i + t.length - 1) % t.length;
            else if (g.key === "Home") d = 0;
            else if (g.key === "End") d = t.length - 1;
            else return;
            (g.preventDefault(), t[d].focus({ preventScroll: !0 }), C(d));
          },
          { signal: c.signal },
        ));
    }),
    document.querySelectorAll("[data-track-jump]").forEach((n) => {
      n.addEventListener(
        "click",
        async () => {
          const i = s.findIndex((w) => w.dataset.track === n.dataset.trackJump);
          if (i < 0) return;
          const g = C(i);
          if (
            (e
              .closest(".event-subsection")
              .scrollIntoView({
                block: "start",
                behavior: m.matches ? "instant" : "smooth",
              }),
            await g,
            Number(e.dataset.active) !== i || s[i].dataset.expanded !== "true")
          )
            return;
          const d = s[i].querySelector(".track-detail-title");
          ((d.tabIndex = -1), d.focus({ preventScroll: !0 }));
        },
        { signal: c.signal },
      );
    }),
    (j = () => {
      (b(),
        h(),
        u.disconnect(),
        l(),
        ++A,
        T(),
        H.forEach((n) => n.remove()),
        c.abort());
    }));
}
const ne = () => j?.(),
  pe = (e) => {
    e.persisted && K();
  };
K();
document.addEventListener("astro:page-load", K);
document.addEventListener("astro:before-swap", ne);
window.addEventListener("pagehide", ne);
window.addEventListener("pageshow", pe);
