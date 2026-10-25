let t = 0,
  n = 0,
  o = 0,
  e = 0;
const h = {
  amount: 0,
  moving: !1,
  sample(s, m = !1) {
    t = s ? 1 : 0;
    const a = performance.now();
    if (m) {
      this.reset(t);
      return;
    }
    if (this.moving) {
      const i = Math.min(1, (a - e) / 240),
        r = i * i * (3 - 2 * i);
      ((this.amount = o + (n - o) * r),
        i === 1 && ((this.amount = n), (this.moving = !1)));
    }
    !this.moving &&
      this.amount !== t &&
      ((o = this.amount), (n = t), (e = a), (this.moving = !0));
  },
  reset(s = 0) {
    ((this.amount = s), (t = n = o = s), (this.moving = !1), (e = 0));
  },
};
export { h as r };
