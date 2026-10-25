import { o as w } from "./payathon-activity.D_OqE3WT.js";
const g = Date.parse("2026-12-01T23:59:00+08:00");
let a;
function i() {
  a?.();
  const e = document.querySelector("[data-countdown]");
  if (!e) return;
  const h = [...e.querySelectorAll("[data-countdown-digit]")],
    c = e.closest(".overview-status");
  let n = 0,
    d = !1;
  const u = () => {
      if ((clearTimeout(n), !d || document.hidden)) return;
      const t = Math.max(0, Math.ceil((g - Date.now()) / 1e3)),
        l = Math.floor(t / 86400),
        m = Math.floor((t % 86400) / 3600),
        p = Math.floor((t % 3600) / 60),
        f = t % 60,
        r =
          String(l).padStart(3, "0") +
          [m, p, f].map((o) => String(o).padStart(2, "0")).join("");
      if (
        (h.forEach((o, s) => {
          o.dataset.value !== r[s] &&
            ((o.dataset.value = r[s]),
            o
              .querySelector("use")
              .setAttribute("href", `#payathon-digit-${r[s]}`));
        }),
        e.setAttribute(
          "aria-label",
          t ? `距报名截止还有${l}天${m}小时${p}分${f}秒` : "报名已截止",
        ),
        !t)
      ) {
        ((c.querySelector(".registration-state").textContent = "已截止"),
          (c.querySelector(".deadline-label").textContent = "报名已截止"));
        return;
      }
      n = setTimeout(u, 1e3 - (Date.now() % 1e3) + 10);
    },
    v = w(e.closest(".payathon-hero"), (t) => {
      ((d = t), u());
    });
  a = () => {
    (clearTimeout(n), v());
  };
}
i();
document.addEventListener("astro:page-load", i);
document.addEventListener("astro:before-swap", () => a?.());
window.addEventListener("pagehide", () => a?.());
window.addEventListener("pageshow", (e) => {
  e.persisted && i();
});
