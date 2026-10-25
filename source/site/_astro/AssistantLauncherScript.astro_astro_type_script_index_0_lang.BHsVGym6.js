import { f as U } from "./account-info.CNV-BU5E.js";
import { w as ot } from "./navigation-query.CcCHnnwN.js";
const G = "https://linksprod.alipay.com/app/room/6a6993fd8d8c91049e2842b4/",
  W = new URL(G).origin,
  z = "aipay-assistant-panel",
  T = "aipay_open_assistant",
  at = "aipay_return_to",
  st = "/assets/media/83d584838434fbe13c51.webp",
  w = 60,
  $ = 16,
  Y = 30,
  j = "aipay:assistant-launcher-position",
  V = "aipay:assistant-launcher-hint",
  k = "接入遇到问题？智能客服和人工客服为你解答",
  rt = 120 * 1e3,
  ct = 10080 * 60 * 1e3,
  lt = 300,
  dt = 80,
  ut = 1004,
  X = "assistant_launcher_click",
  pt = "assistant_panel_render";
let B = null,
  I = null;
const mt = async (e) => {
    (N(), (I = e || null), H(X), await B?.());
  },
  _ = (e, n, f) => Math.min(Math.max(e, n), f),
  wt = () => {
    try {
      const e = JSON.parse(window.localStorage.getItem(j) || "null");
      return Number.isFinite(e?.left) && Number.isFinite(e?.top) ? e : null;
    } catch {
      return null;
    }
  },
  ft = () => {
    const e = window.localStorage.getItem(V);
    if (e === "never") return !1;
    const n = Number(e);
    return !e || !Number.isFinite(n) || Date.now() >= n;
  },
  C = (e = new URL(window.location.href)) =>
    `${e.pathname || "/"}${e.search || ""}${e.hash || ""}`,
  H = (e) => {
    !window.yuyanMonitor ||
      typeof window.yuyanMonitor.log != "function" ||
      window.yuyanMonitor.log({
        code: ut,
        msg: e,
        d1: window.location.pathname || "/",
        d2: document.title || "",
        d3: e,
      });
  },
  q = () => {
    const e = new URL(window.location.href);
    e.searchParams.has(T) &&
      (e.searchParams.delete(T),
      window.history.replaceState(
        window.history.state,
        document.title,
        e.toString(),
      ));
  },
  At = () => {
    const e = new URL(window.location.href);
    e.searchParams.set(T, "1");
    const n = new URL("/", window.location.origin);
    return (
      n.searchParams.set("aipay_login", "1"),
      n.searchParams.set(at, C(e)),
      ot(C(n))
    );
  },
  St = (e) => {
    if (typeof e != "string") return e;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  },
  ht = () => {
    const e = document.createElement("div");
    ((e.className = "aipayAssistantLauncherRoot"),
      (e.dataset.aipayAssistantLauncher = ""));
    const n = document.createElement("button");
    ((n.className = "aipayAssistantLauncher"),
      (n.type = "button"),
      n.setAttribute("aria-label", "打开答疑助手"),
      n.setAttribute("aria-controls", z),
      n.setAttribute("aria-expanded", "false"));
    const f = document.createElement("img");
    ((f.src = st), (f.alt = ""), (f.width = w), (f.height = w), n.append(f));
    const d = document.createElement("button");
    ((d.className = "aipayAssistantMinimize"),
      (d.type = "button"),
      d.setAttribute("aria-label", "最小化答疑助手"),
      d.append(document.createElement("span")));
    const s =
      !document.querySelector(".heroTypewriter") && ft()
        ? document.createElement("aside")
        : null;
    let u = null,
      y = 0,
      b = 0,
      L = null,
      F = !1,
      P = "";
    if (s) {
      ((s.className = "aipayAssistantHint"),
        s.setAttribute("aria-label", k),
        (u = document.createElement("p")));
      const t = document.createElement("div");
      t.className = "aipayAssistantHintActions";
      const i = document.createElement("button");
      ((i.type = "button"), (i.textContent = "我知道了"));
      const a = document.createElement("button");
      ((a.type = "button"),
        (a.textContent = "不再提醒"),
        t.append(i, a),
        s.append(u, t));
      const S = (it) => {
        (window.clearTimeout(y),
          window.clearTimeout(b),
          L?.disconnect(),
          window.localStorage.setItem(V, it),
          s.remove());
      };
      (i.addEventListener("click", () => {
        S(String(Date.now() + ct));
      }),
        a.addEventListener("click", () => S("never")));
    }
    const o = document.createElement("section");
    ((o.id = z),
      (o.className = "aipayAssistantPanel"),
      o.setAttribute("role", "dialog"),
      o.setAttribute("aria-label", "答疑助手"),
      (o.hidden = !0));
    const E = document.createElement("div");
    ((E.className = "aipayAssistantPanelLoading"),
      E.setAttribute("aria-live", "polite"));
    const O = document.createElement("span");
    ((O.className = "aipayAssistantPanelSpinner"),
      O.setAttribute("aria-hidden", "true"),
      E.append(O));
    const p = document.createElement("button");
    ((p.className = "aipayAssistantPanelClose"),
      (p.type = "button"),
      p.setAttribute("aria-label", "关闭答疑助手"),
      (p.textContent = "×"),
      o.append(E, p),
      e.append(n, d),
      s && e.append(s),
      document.body.append(e, o));
    let l = wt(),
      r = null,
      h = !1,
      A = 0,
      m = null,
      R = 0,
      c = null;
    const g = (t, i) => {
        ((l = {
          left: _(t, 0, window.innerWidth - w),
          top: _(i, 0, window.innerHeight - w),
        }),
          (e.style.left = `${l.left}px`),
          (e.style.top = `${l.top}px`),
          (e.style.right = "auto"),
          (e.style.bottom = "auto"));
      },
      J = () => {
        (window.clearTimeout(R),
          (R = window.setTimeout(() => {
            window.localStorage.setItem(j, JSON.stringify(l));
          }, lt)));
      },
      K = () => {
        (e.classList.remove("isMinimized"),
          n.setAttribute("aria-label", "打开答疑助手"),
          (d.hidden = !1));
        const t = l || {
          left: window.innerWidth - w - $,
          top: window.innerHeight - w - $,
        };
        g(t.left, t.top);
      },
      Q = () => {
        const t = e.getBoundingClientRect();
        ((l = { left: t.left, top: t.top }),
          e.classList.add("isMinimized"),
          n.setAttribute("aria-label", "展开答疑助手"),
          (d.hidden = !0),
          (e.style.left = `${window.innerWidth - Y}px`),
          (e.style.top = `${_(t.top, 0, window.innerHeight - w)}px`));
      },
      Z = () => {
        c ||
          ((c = document.createElement("iframe")),
          (c.className = "aipayAssistantPanelIframe"),
          (c.title = "支付宝 AI 付答疑助手"),
          c.addEventListener(
            "load",
            () => {
              (o.classList.add("isLoaded"), H(pt));
            },
            { once: !0 },
          ),
          o.insertBefore(c, p),
          (c.src = G));
      },
      M = () => {
        (Z(),
          (o.hidden = !1),
          (e.hidden = !0),
          n.setAttribute("aria-expanded", "true"),
          p.focus({ preventScroll: !0 }));
      },
      v = () => {
        if (o.hidden) return;
        ((o.hidden = !0),
          (e.hidden = !1),
          n.setAttribute("aria-expanded", "false"),
          (I?.isConnected
            ? I
            : document.querySelector(".bubbleMenuTrigger") || n
          ).focus({ preventScroll: !0 }),
          (I = null));
      },
      D = async () => {
        if ((await U()).isLoggedIn) {
          M();
          return;
        }
        if (typeof window.AIPayOnboarding?.openLogin != "function") {
          window.location.assign(At());
          return;
        }
        const i = new URL(window.location.href);
        (i.searchParams.set(T, "1"),
          (await window.AIPayOnboarding.openLogin({ returnPath: C(i) })) && M(),
          q());
      },
      tt = async () => {
        if (new URL(window.location.href).searchParams.get(T) !== "1") return;
        let i = !1;
        const a = () => {
          (i || ((i = !0), M()), q());
        };
        (window.addEventListener("aipay-onboarding-login-success", a, {
          once: !0,
        }),
          (await U({ force: !0 })).isLoggedIn && a());
      };
    B = D;
    const et = (t) => {
        if (!s?.isConnected || !(u instanceof HTMLElement) || P === t) return;
        if (
          ((P = t),
          window.clearTimeout(y),
          s.setAttribute("aria-label", t),
          (u.textContent = ""),
          window.requestAnimationFrame(() => s.classList.add("isVisible")),
          window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        ) {
          u.textContent = t;
          return;
        }
        const i = Array.from(t);
        let a = 0;
        const S = () => {
          ((u.textContent = i.slice(0, ++a).join("")),
            a < i.length && (y = window.setTimeout(S, dt)));
        };
        S();
      },
      nt = () => {
        (window.clearTimeout(y),
          (P = ""),
          s?.classList.remove("isVisible"),
          u instanceof HTMLElement && (u.textContent = ""));
      },
      x = () => {
        const t = /^\/open-flow(?:\/|$)/u.test(window.location.pathname);
        if (t !== F) {
          if (((F = t), window.clearTimeout(b), !t)) {
            nt();
            return;
          }
          b = window.setTimeout(() => {
            et(k);
          }, rt);
        }
      };
    if ((l && g(l.left, l.top), s)) {
      const t = document.querySelector("[data-onboarding-root]");
      t instanceof HTMLElement &&
        ((L = new MutationObserver(x)),
        L.observe(t, {
          attributes: !0,
          subtree: !0,
          attributeFilter: ["hidden"],
        }),
        x());
    }
    (n.addEventListener("pointerdown", (t) => {
      if (
        (t.stopPropagation(),
        e.classList.contains("isMinimized") || t.button !== 0)
      )
        return;
      window.clearTimeout(R);
      const i = e.getBoundingClientRect();
      ((r = {
        pointerId: t.pointerId,
        pointerX: t.clientX,
        pointerY: t.clientY,
        left: i.left,
        top: i.top,
      }),
        (h = !1),
        n.setPointerCapture(t.pointerId),
        e.classList.add("isDragging"));
    }),
      n.addEventListener("pointermove", (t) => {
        if (!r || r.pointerId !== t.pointerId) return;
        const i = t.clientX - r.pointerX,
          a = t.clientY - r.pointerY;
        (Math.hypot(i, a) > 3 && (h = !0),
          (m = { left: r.left + i, top: r.top + a }),
          !A &&
            (A = window.requestAnimationFrame(() => {
              ((A = 0), m && g(m.left, m.top));
            })));
      }),
      n.addEventListener("pointerup", (t) => {
        !r ||
          r.pointerId !== t.pointerId ||
          (A &&
            (window.cancelAnimationFrame(A), (A = 0), m && g(m.left, m.top)),
          (r = null),
          (m = null),
          n.releasePointerCapture(t.pointerId),
          e.classList.remove("isDragging"),
          h && J());
      }),
      n.addEventListener("click", (t) => {
        if ((t.preventDefault(), t.stopPropagation(), h)) {
          h = !1;
          return;
        }
        if (e.classList.contains("isMinimized")) {
          K();
          return;
        }
        (D(), H(X));
      }),
      d.addEventListener("click", (t) => {
        (t.preventDefault(), t.stopPropagation(), Q());
      }),
      p.addEventListener("click", v),
      document.addEventListener("pointerdown", (t) => {
        !o.hidden && !o.contains(t.target) && v();
      }),
      document.addEventListener("keydown", (t) => {
        t.key === "Escape" && !o.hidden && v();
      }),
      window.addEventListener("message", (t) => {
        !c ||
          t.source !== c.contentWindow ||
          t.origin !== W ||
          St(t.data)?.type !== "REQUEST_PARENT_WINDOW_INFO" ||
          c.contentWindow?.postMessage(
            JSON.stringify({
              type: "UPDATE_PARENT_WINDOW_INFO",
              payload: { url: window.location.href, title: document.title },
            }),
            W,
          );
      }),
      window.addEventListener("resize", () => {
        if (!o.hidden) return;
        if (e.classList.contains("isMinimized")) {
          ((e.style.left = `${window.innerWidth - Y}px`),
            (e.style.top = `${_(Number.parseFloat(e.style.top), 0, window.innerHeight - w)}px`));
          return;
        }
        const t = e.getBoundingClientRect();
        g(t.left, t.top);
      }),
      tt());
  },
  N = () => {
    /^\/community\/events\/payathon-2026(?:\/|$)/.test(
      window.location.pathname,
    ) ||
      document.querySelector("[data-aipay-assistant-launcher]") ||
      ht();
  };
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", N, { once: !0 })
  : N();
const yt = Object.freeze(
  Object.defineProperty(
    { __proto__: null, initializeAssistantLauncher: N, openSiteAssistant: mt },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
export { yt as a, mt as o };
