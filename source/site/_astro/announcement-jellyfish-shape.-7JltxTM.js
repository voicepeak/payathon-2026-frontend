function W(
  c,
  u,
  M,
  t,
  s = 0,
  l = { left: 180, right: 740, top: 65, bottom: 545, cx: 460 },
) {
  const e = F(c, t),
    r = t.objectScale / 100,
    p = t.fontSize * 0.8,
    d = t.fontSize * 1.1,
    h = l.cx + Math.sin(c * 0.45) * t.sway * 16 + u * t.follow * 16,
    x = l.top + 9,
    m = (l.lip ?? x + (8 - e.lift) * 22) + M * t.follow * 22,
    S =
      Math.max(3, t.bellWidth - ((e.squeeze * t.contraction) / 100) * 4) *
      r *
      16,
    H = Math.max(0, (e.fan - 0.25) / 0.75),
    z =
      Math.max(2, t.bellHeight - ((e.squeeze * t.contraction) / 100) * 2) *
      (1 - (H * t.chargeFlatten) / 100) *
      r *
      22,
    T = [],
    q = l.tilt ?? 0,
    v = Math.cos(q),
    E = Math.sin(q),
    f = (a, n, g, i = "#308cff", b = 1, o) => {
      const P = a - h,
        y = n - m;
      ((a = h + P * v - y * E),
        (n = m + P * E + y * v),
        (a += (l.cx + Math.round((a - l.cx) / p) * p - a) * s),
        (n += (x + Math.round((n - x) / d) * d - n) * s));
      const w = n;
      w < l.top ||
        w > l.bottom ||
        a < l.left ||
        a > l.right ||
        T.some(
          (j) =>
            Math.abs(a - j.x) < t.fontSize * 0.65 &&
            Math.abs(w - j.y) < t.fontSize * 0.85,
        ) ||
        T.push({
          x: a,
          y: w,
          char: g,
          color: i,
          alpha: b,
          size: t.fontSize,
          line: o ? { ...o, angle: o.angle + q } : void 0,
        });
    },
    I = Math.max(2, Math.ceil((t.bellHeight * r * 22) / d));
  for (let a = 0; a < I; a++) {
    const n = a / I,
      g = S * Math.sqrt(1 - (1 - n) * (1 - n)),
      i = m - z + n * z;
    if (a === 0) (f(h - p, i, "_"), f(h, i, "."), f(h + p, i, "_"));
    else if (a === I - 1) (f(h - g, i, "("), f(h + g, i, ")"));
    else {
      const b = (S * (1 - n)) / Math.sqrt(1 - (1 - n) * (1 - n)),
        o = t.fontSize * 0.9;
      (f(h - g, i, "/", "#308cff", 1, { angle: Math.atan2(z, -b), length: o }),
        f(h + g, i, "\\", "#308cff", 1, {
          angle: Math.atan2(z, b),
          length: o,
        }));
    }
    a > 0 &&
      a < I - 1 &&
      (f(h - S * 0.25, i, ":", "#308cff", 0.5),
      f(h + S * 0.25, i, ":", "#308cff", 0.5));
  }
  const _ = Math.max(4, Math.round((t.bellWidth * r * 32) / p));
  for (let a = 0; a <= _; a++) f(h - S + (a / _) * S * 2, m, a % 2 ? "_" : "~");
  for (let a = -1; a <= 1; a++)
    f(
      h + a * p * 1.5,
      m - Math.max(d, z * 0.2),
      a === 0 ? "*" : "+",
      "#ff8300",
    );
  for (let a = 0; a < t.tentacles; a++) {
    const n = (a / (t.tentacles - 1)) * 2 - 1,
      g =
        r *
        22 *
        (t.length * (0.8 + 0.2 * (1 - Math.abs(n))) +
          e.jet * t.stretch -
          e.fan * 2),
      i = Math.max(3, Math.ceil((r * 22 * (t.length + t.stretch)) / d));
    for (let b = 0; b < i; b++) {
      const o = (b + 1) / i,
        P =
          Math.sin(o * Math.PI * 0.85) * t.spread +
          Math.sin(o * Math.PI * 2) * t.curl * 0.45,
        y = Math.sin(c * 2 - o * 4 + a) * o * r * 5 * (1 - e.jet),
        w = h + n * (S - 16 * r) + n * e.fan * P * r * 16 + y,
        j =
          n *
            e.fan *
            r *
            16 *
            (Math.cos(o * Math.PI * 0.85) * Math.PI * 0.85 * t.spread +
              Math.cos(o * Math.PI * 2) * Math.PI * 2 * t.curl * 0.45) +
          (Math.sin(c * 2 - o * 4 + a) - 4 * o * Math.cos(c * 2 - o * 4 + a)) *
            r *
            5 *
            (1 - e.jet);
      f(w, m + d * 0.6 + o * g, "|", "#46c933", 1 - o * 0.18, {
        angle: Math.atan2(g, j),
        length: Math.min(t.fontSize * 0.9, (Math.hypot(g, j) / i) * 0.8),
      });
    }
  }
  return T;
}
var R = {
  settings: {
    smoothMotion: 0,
    oceanEnabled: 1,
    oceanSpacing: 18,
    oceanSpeed: 1,
    oceanOpacity: 22,
    bubbleCount: 10,
    bubbleSize: 20,
    bubbleSpeed: 18,
    wakeStrength: 60,
    wakeRadius: 90,
    wakeLife: 2.5,
    objectScale: 50,
    speed: 1,
    fps: 24,
    charge: 48,
    travel: 12,
    sway: 1,
    follow: 0,
    bellWidth: 9,
    bellHeight: 5,
    contraction: 100,
    chargeFlatten: 80,
    tentacles: 5,
    length: 12,
    stretch: 1,
    spread: 4,
    curl: 4,
    fontSize: 16,
    barHeight: 14,
    barRadius: 3.5,
    guides: 1,
    refillSpeed: 1.4,
    mouseRadius: 60,
    tintRadius: 45,
    tintStrength: 90,
    darkBackground: 0,
    paletteIndex: 0,
    randomPalette: 1,
    jellyCount: 1,
    swimTilt: 14,
    seekMouse: 1,
    aimTurn: 12,
    titleEnabled: 1,
  },
};
const D = R.settings;
var k = (c) => ((c = Math.max(0, Math.min(1, c))), c * c * (3 - 2 * c));
function F(c, u = D) {
  const M = Math.floor(c / 3.2),
    t = (c - M * 3.2) / 3.2,
    s = u.charge / 100,
    l = 0.05,
    e = s + l,
    r = 1 - Math.pow(1 - Math.max(0, Math.min(1, (t - s) / l)), 3),
    p = t < s ? 0 : t < e ? r : 1 - k((t - e) / (1 - e)),
    d =
      t < s
        ? 0.25 + 0.75 * k(t / s)
        : t < e
          ? 1 - r
          : 0.25 * k((t - e) / (1 - e)),
    h = Math.max(0, (t - s) / (1 - s)),
    x = 1 - Math.pow(1 - h, 3);
  return { squeeze: p, fan: d, jet: p, lift: (M + x) * u.travel };
}
function C(c, u, M) {
  const t = Math.floor(c * u),
    s = c * u - t;
  if (M <= 0) return t / u;
  const l = Math.max(0, (s - (1 - M)) / M),
    e = l * M + k(l) * (1 - M);
  return (t + e) / u;
}
export { D, F as a, C as m, W as s };
