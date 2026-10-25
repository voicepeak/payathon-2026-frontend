import {
  p as m,
  a as n,
  b as f,
  u as y,
  l as S,
  s as b,
  c as q,
  t as k,
  r as L,
} from "./service.DJvbNf3A.js";
let i;
async function w() {
  i?.();
  const e = document.querySelector("#payathon-dev-preview");
  if (!e) return;
  if (!m) {
    (e.remove(), document.querySelector("#payathon-preview-login")?.remove());
    return;
  }
  e.hidden = !1;
  const s = new AbortController();
  i = () => s.abort();
  const r = (t, a, u) => t.addEventListener(a, u, { signal: s.signal }),
    c = e.querySelector("[data-preview-enable]");
  ((c.checked = n),
    (e.querySelector("[data-preview-settings]").hidden = !n),
    (e.querySelector("[data-preview-mode]").textContent = n
      ? "已启用，以下设置仅作用于独立预览。关闭会重新载入页面，已保存的预览数据会保留。"
      : "开启后显示测试设置，切换模式会重新载入页面。"),
    sessionStorage.getItem("payathon:reopen-preview-panel") &&
      ((e.open = !0),
      sessionStorage.removeItem("payathon:reopen-preview-panel")),
    r(c, "change", () => {
      const t = new URL(location.href);
      (c.checked
        ? t.searchParams.set("preview", "1")
        : t.searchParams.delete("preview"),
        sessionStorage.setItem("payathon:reopen-preview-panel", "1"),
        location.assign(t.href));
    }),
    (e.querySelector("[data-preview-controls]").disabled = !n || !f()));
  const d = e.querySelector("[data-preview-login]");
  ((d.value = String(f())),
    r(d, "change", () => {
      (b(d.value === "true"),
        sessionStorage.setItem("payathon:reopen-preview-panel", "1"),
        location.reload());
    }));
  for (const t of e.querySelectorAll("[data-preview-destination]"))
    t.href = y(t.dataset.previewDestination);
  if (!n || !e.hasAttribute("data-preview-home")) return;
  const l = e.querySelector("[data-preview-scenario]"),
    p = e.querySelector("[data-preview-open]"),
    v = e.querySelector("[data-preview-review]");
  async function g() {
    const t = await S();
    if (s.signal.aborted) return;
    const a = t.registration;
    if (
      ((l.value = a.effective
        ? a.latest?.status === "reviewing"
          ? "update-reviewing"
          : a.latest?.status === "rejected"
            ? "update-rejected"
            : a.lastActivationWasUpdate
              ? "updated"
              : "effective"
        : a.latest?.status === "reviewing"
          ? "reviewing"
          : a.latest?.status === "rejected"
            ? "rejected"
            : a.draft
              ? "draft"
              : "empty"),
      (p.checked = !!t.worksOpened),
      v.replaceChildren(),
      a.latest?.status === "reviewing")
    )
      for (const [u, h] of [
        ["effective", "报名审核通过"],
        ["rejected", "报名审核未通过"],
      ]) {
        const o = document.createElement("button");
        ((o.type = "button"),
          (o.dataset.previewOutcome = u),
          (o.textContent = h),
          v.append(o));
      }
  }
  (r(l, "change", () => q(l.value)),
    r(p, "change", () => k(p.checked)),
    r(v, "click", (t) => {
      const a = t.target.closest("[data-preview-outcome]");
      a && L("registration", null, a.dataset.previewOutcome);
    }),
    r(window, "payathon-participation-change", g),
    await g());
}
w();
document.addEventListener("astro:page-load", w);
document.addEventListener("astro:before-swap", () => i?.());
window.addEventListener("pagehide", () => i?.());
window.addEventListener("pageshow", (e) => {
  e.persisted && w();
});
