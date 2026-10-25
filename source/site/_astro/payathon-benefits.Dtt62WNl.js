import { a as N, b as _, s as $, g as j } from "./service.DJvbNf3A.js";
import { r as R } from "./telemetry.BUQSN-xI.js";
let P;
function W() {
  if (!N) return Promise.resolve(!1);
  if (_()) return Promise.resolve(!0);
  if (P) return P;
  const e = document.querySelector("#payathon-preview-login");
  return e
    ? ((P = new Promise((o) => {
        const l = () => {
            const t = e.returnValue === "login";
            if (t) {
              $(!0);
              const c = document.querySelector("[data-preview-login]");
              c && (c.value = "true");
              const i = document.querySelector("[data-preview-controls]");
              i && (i.disabled = !1);
            }
            (window.removeEventListener("pagehide", r),
              document.removeEventListener("astro:before-swap", r),
              (P = null),
              o(t));
          },
          r = () => {
            ((e.returnValue = "cancel"), e.close());
          };
        ((e.returnValue = ""),
          e.addEventListener("close", l, { once: !0 }),
          window.addEventListener("pagehide", r, { once: !0 }),
          document.addEventListener("astro:before-swap", r, { once: !0 }),
          e.showModal());
      })),
      P)
    : Promise.resolve(!1);
}
function X(e = {}) {
  return typeof e.nickname == "string"
    ? e.nickname
    : e.kind === "team" && typeof e.teamName == "string"
      ? e.teamName
      : "";
}
function z(e) {
  return j(e).rejected ? "重新提交" : e?.effective ? "提交修改" : "提交报名";
}
const D = Object.freeze({
  personal: "/assets/media/838cfaf9dcf4a87f4fc1.webp",
  team: "/assets/media/d96fb3cbeed03251d4da.webp",
});
function M(e, o = globalThis.document) {
  const l = e === "team" ? "team" : "personal";
  return (
    o
      ?.querySelector("[data-registration-default-avatars]")
      ?.content.querySelector(`[data-avatar-kind="${l}"]`)
      ?.getAttribute("src") || D[l]
  );
}
async function H(
  e,
  { signal: o, fetchImpl: l = globalThis.fetch, onStage: r } = {},
) {
  r?.("avatar_fetch");
  const t = M(e),
    c = await l(t, { signal: o });
  if (!c.ok) throw new Error("默认头像暂时无法读取，请重试或上传头像。");
  r?.("avatar_blob");
  const i = await c.blob();
  if (!i.size || i.type !== "image/webp")
    throw new Error("默认头像暂时无法读取，请重试或上传头像。");
  const n = e === "team" ? "avatar_group.webp" : "avatar_individual.webp";
  return (r?.("avatar_file"), new File([i], n, { type: "image/webp" }));
}
const G = (e, o = {}) => I(e, o),
  O = (e, o = {}) => I(e, { ...o, kind: "avatar" });
async function I(e, { signal: o, kind: l = "icon", accent: r } = {}) {
  if (!["image/png", "image/jpeg", "image/webp"].includes(e.type))
    throw new Error("请选择 PNG、JPG 或 WebP 图片");
  const t = URL.createObjectURL(e),
    c = new Image();
  try {
    return (
      (c.src = t),
      await c.decode(),
      o?.aborted
        ? null
        : await new Promise((i) => {
            const n = document.createElement("dialog"),
              f = l === "avatar",
              v = document.activeElement;
            n.className = "icon-crop";
            const w =
              r ||
              getComputedStyle(document.documentElement).getPropertyValue(
                "--payathon-accent",
              );
            (w && n.style.setProperty("--payathon-accent", w),
              n.setAttribute("aria-labelledby", "icon-crop-heading"),
              (n.innerHTML = `<header><h2 id="icon-crop-heading">${f ? "裁剪参赛头像" : "裁剪作品图标"}</h2><button type="button" class="crop-close" aria-label="取消裁剪">×</button></header><p id="icon-crop-help">拖动图片调整位置，缩放后保留方框内的内容。</p><canvas width="512" height="512" tabindex="0" aria-label="${f ? "头像" : "图标"}裁剪区域，使用方向键移动图片" aria-describedby="icon-crop-help"></canvas><label class="crop-zoom">缩放<input type="range" min="1" max="4" step="0.01" value="1" aria-label="图片缩放"/></label><p class="crop-error" role="alert" hidden></p><footer><button type="button" class="crop-action secondary" data-crop-reset>重置</button><button type="button" class="crop-action" data-crop-confirm>${f ? "使用此头像" : "使用此图标"}</button></footer>`),
              document.body.append(n));
            const p = n.querySelector("canvas"),
              m = p.getContext("2d"),
              g = n.querySelector("input"),
              k = 512 / Math.min(c.naturalWidth, c.naturalHeight);
            let A = 1,
              y = 0,
              h = 0,
              u = null,
              E = !1;
            const L = new AbortController(),
              s = (a, d, b) => a.addEventListener(d, b, { signal: L.signal });
            function x() {
              const a = c.naturalWidth * k * A,
                d = c.naturalHeight * k * A;
              ((y = Math.max(-(a - 512) / 2, Math.min((a - 512) / 2, y))),
                (h = Math.max(-(d - 512) / 2, Math.min((d - 512) / 2, h))),
                m.clearRect(0, 0, 512, 512),
                m.drawImage(c, (512 - a) / 2 + y, (512 - d) / 2 + h, a, d));
            }
            function S(a = null) {
              E ||
                ((E = !0),
                o?.removeEventListener("abort", q),
                L.abort(),
                n.close(),
                n.remove(),
                v?.isConnected && v.focus({ preventScroll: !0 }),
                i(a));
            }
            const q = () => S();
            (o?.addEventListener("abort", q, { once: !0 }),
              s(n, "cancel", (a) => {
                (a.preventDefault(), S());
              }),
              s(n.querySelector(".crop-close"), "click", q),
              s(g, "input", () => {
                ((A = Number(g.value)), x());
              }),
              s(n.querySelector("[data-crop-reset]"), "click", () => {
                ((A = 1), (y = 0), (h = 0), (g.value = "1"), x());
              }),
              s(p, "pointerdown", (a) => {
                ((u = { id: a.pointerId, x: a.clientX, y: a.clientY }),
                  p.setPointerCapture(a.pointerId));
              }),
              s(p, "pointermove", (a) => {
                if (u?.id !== a.pointerId) return;
                const d = 512 / p.getBoundingClientRect().width;
                ((y += (a.clientX - u.x) * d),
                  (h += (a.clientY - u.y) * d),
                  (u.x = a.clientX),
                  (u.y = a.clientY),
                  x());
              }),
              s(p, "pointerup", () => {
                u = null;
              }),
              s(p, "pointercancel", () => {
                u = null;
              }),
              s(p, "keydown", (a) => {
                const b = {
                  ArrowLeft: [-1, 0],
                  ArrowRight: [1, 0],
                  ArrowUp: [0, -1],
                  ArrowDown: [0, 1],
                }[a.key];
                b &&
                  (a.preventDefault(),
                  (y += b[0] * (a.shiftKey ? 32 : 8)),
                  (h += b[1] * (a.shiftKey ? 32 : 8)),
                  x());
              }),
              s(n.querySelector("[data-crop-confirm]"), "click", async (a) => {
                a.currentTarget.disabled = !0;
                try {
                  const d = await new Promise((b) => p.toBlob(b, "image/png"));
                  if (!d) throw new Error();
                  S(
                    new File(
                      [d],
                      e.name.replace(/\.[^.]+$/, "") + "-cropped.png",
                      { type: "image/png" },
                    ),
                  );
                } catch (d) {
                  R("image_crop_error", d, { stage: `${l}_export` });
                  const b = n.querySelector(".crop-error");
                  ((b.hidden = !1),
                    (b.textContent = "裁剪失败，请重试。"),
                    (n.querySelector("[data-crop-confirm]").disabled = !1));
                }
              }),
              x(),
              n.showModal(),
              p.focus());
          })
    );
  } catch (i) {
    throw new Error("图片无法读取，请选择其他图片", { cause: i });
  } finally {
    URL.revokeObjectURL(t);
  }
}
let C = null,
  F = 0;
function Q({
  message: e,
  title: o = "确认离开？",
  confirmLabel: l = "确认离开",
  cancelLabel: r = "继续编辑",
  signal: t,
  accent: c,
} = {}) {
  if (t?.aborted) return Promise.resolve(!1);
  if (C)
    return (C.cancelButton.focus({ preventScroll: !0 }), Promise.resolve(!1));
  const i = document.activeElement,
    n = document.createElement("dialog"),
    f = `payathon-confirm-${++F}`;
  ((n.className = "payathon-confirm"),
    n.setAttribute("aria-labelledby", `${f}-heading`),
    n.setAttribute("aria-describedby", `${f}-message`),
    c && n.style.setProperty("--confirm-accent", c));
  const v = document.createElement("h2");
  ((v.id = `${f}-heading`),
    (v.className = "payathon-confirm-heading"),
    (v.textContent = o));
  const w = document.createElement("p");
  ((w.id = `${f}-message`),
    (w.className = "payathon-confirm-message"),
    (w.textContent = e || ""));
  const p = document.createElement("div");
  p.className = "payathon-confirm-actions";
  const m = document.createElement("button");
  ((m.type = "button"),
    (m.className = "payathon-confirm-button secondary"),
    (m.textContent = r));
  const g = document.createElement("button");
  return (
    (g.type = "button"),
    (g.className = "payathon-confirm-button"),
    (g.textContent = l),
    p.append(m, g),
    n.append(v, w, p),
    new Promise((k) => {
      let A = !1;
      const y = new AbortController(),
        h = { dialog: n, cancelButton: m };
      C = h;
      const u = () => L(!1),
        E = (s, x, S) => s.addEventListener(x, S, { signal: y.signal });
      function L(s) {
        A ||
          ((A = !0),
          t?.removeEventListener("abort", u),
          y.abort(),
          n.open && n.close(),
          n.remove(),
          C === h && (C = null),
          i?.isConnected &&
            typeof i.focus == "function" &&
            i.focus({ preventScroll: !0 }),
          k(s));
      }
      if (
        (E(m, "click", u),
        E(g, "click", () => L(!0)),
        E(n, "cancel", (s) => {
          (s.preventDefault(), u());
        }),
        E(n, "close", u),
        t?.addEventListener("abort", u, { once: !0 }),
        t?.aborted)
      )
        return u();
      document.body.append(n);
      try {
        (n.showModal(), m.focus({ preventScroll: !0 }));
      } catch (s) {
        (R("confirmation_error", s, { stage: "dialog_open" }), u());
      }
    })
  );
}
function T(
  e,
  { authenticated: o = null, failed: l = !1, enabled: r = !0 } = {},
) {
  const t = (i, n, f, v = "none") => ({
    state: i,
    message: n,
    label: f,
    action: v,
    canClaim: !1,
  });
  if (!r) return t("disabled", "", "");
  if (o === !1)
    return t(
      "guest",
      "报名审核通过后可查看领取入口。",
      "登录并报名",
      "register",
    );
  if (l)
    return t(
      "unavailable",
      "暂时无法确认报名状态，请稍后刷新重试。",
      "状态暂不可用",
    );
  if (o !== !0 || !e)
    return t("loading", "正在确认报名状态…", "正在确认报名状态");
  if (e.effective?.status === "effective")
    return {
      state: "eligible",
      canClaim: !0,
      action: "none",
      label: "",
      message: "报名已生效，可前往合作伙伴页面查看领取方式。",
    };
  const c = e.server?.status;
  if (c === "PENDING_REVIEW" || e.latest?.status === "reviewing")
    return t("reviewing", "报名审核中，通过后可查看领取入口。", "报名审核中");
  if (c === "REVIEW_FAILED" || e.latest?.status === "rejected") {
    const i =
      !e.server || (e.server.canEdit === !0 && e.server.canSubmit === !0);
    return t(
      "rejected",
      "报名尚未通过审核，修改并通过后可查看领取入口。",
      i ? "修改报名资料" : "报名未通过审核",
      i ? "edit" : "none",
    );
  }
  return c === "EXPIRED" || e.latest?.status === "expired"
    ? t("expired", "报名已失效，暂不可查看领取入口。", "报名已失效")
    : e.server?.canSubmit === !1
      ? t(
          "closed",
          e.server.blockedReason?.message ||
            "当前暂不可报名，报名生效后可查看领取入口。",
          "暂不可报名",
        )
      : t(
          "unregistered",
          "报名审核通过后可查看领取入口。",
          "报名参赛",
          "register",
        );
}
function B(e, o, l = {}) {
  if (!e) return;
  const r = T(o, l);
  ((e.hidden = r.state === "disabled"), (e.dataset.benefitsState = r.state));
  for (const t of e.querySelectorAll("[data-benefits-status]"))
    t.textContent = r.message;
  for (const t of e.querySelectorAll("[data-benefit-claim]"))
    t.hidden = !r.canClaim;
  for (const t of e.querySelectorAll("[data-benefit-access]"))
    ((t.hidden = r.canClaim || r.action === "none"),
      (t.disabled = r.action === "none"),
      (t.textContent = r.label),
      t.removeAttribute("data-registration-edit"),
      t.removeAttribute("data-registration-open"),
      t.removeAttribute("aria-haspopup"),
      t.removeAttribute("aria-controls"),
      r.action !== "none" &&
        (t.setAttribute("data-registration-open", ""),
        r.action === "edit" && t.setAttribute("data-registration-edit", ""),
        t.setAttribute("aria-haspopup", "dialog"),
        t.setAttribute("aria-controls", "payathon-registration")));
  return r;
}
function Y(e, o = {}, l = document) {
  for (const r of l.querySelectorAll(
    '[data-partner-benefits][data-benefits-placement="landing"]',
  ))
    B(r, e, o);
}
export {
  W as a,
  z as b,
  Q as c,
  M as d,
  O as e,
  H as f,
  X as g,
  B as h,
  G as i,
  Y as r,
};
