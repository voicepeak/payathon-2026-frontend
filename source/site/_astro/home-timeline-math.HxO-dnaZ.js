const u = (t) => Math.max(0, Math.min(1, t)),
  c = (t) => {
    const a = u(t);
    return a * a * (3 - 2 * a);
  };
function o(t, a, n, l) {
  return f(a, n).top - Math.max(0, (t - 0.55) * l);
}
function h() {
  let t = 0,
    a = !1;
  return (n, l, e, i) => {
    const s = Math.max(0, (n - 0.55) * i);
    return (
      (l.releasing || a) && (t = s),
      (t = Math.min(t, s)),
      (a = !!l.releasing),
      { top: o(n, l.progress, e, i) + t, carry: t }
    );
  };
}
function M() {
  let t = null,
    a = 0,
    n = !1,
    l = !1;
  return (e, i, s = !1) => {
    const m = Math.min(32, Math.max(0, i));
    if (s || t === null || e < 0 || e > 1)
      return ((t = a = e), (n = l = !1), { progress: a, moving: !1 });
    if (
      (e < t - 1e-4
        ? ((n = !1), (l = Math.abs(a - e) > 1e-4))
        : e > t + 1e-4 && e >= 0.55 && ((l = !1), (n = !0)),
      (t = e),
      l)
    ) {
      const r = e - a;
      ((a += Math.sign(r) * Math.min(Math.abs(r), m / 650)),
        (l = Math.abs(a - e) > 1e-4));
    } else n ? (a = Math.max(e, Math.min(0.9, a + (0.35 * m) / 620))) : (a = e);
    return {
      progress: a,
      moving: l || (n && a < 0.9),
      releasing: n && a < 0.9,
    };
  };
}
function f(t, a) {
  const n = u(t),
    l = c(n / 0.25),
    e = c((n - 0.25) / 0.3),
    i = u((n - 0.55) / 0.35),
    s = (1 - (1 + 8 * i) * Math.exp(-8 * i)) / (1 - 9 * Math.exp(-8));
  return {
    arrival: l,
    tension: e,
    release: i,
    top: (a + 2) * (1 - s),
    lift: (a / 3) * e * (1 - c((i - 0.25) / 0.75)),
    departure: c((n - 0.59) / 0.31),
    phase:
      n < 0.25 ? "arrival" : n < 0.55 ? "pull" : n < 0.9 ? "release" : "done",
  };
}
export { c as a, h as b, M as c, f as s };
