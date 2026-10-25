import { b as g } from "./openbridge-env.DInZk9-t.js";
import { g as A } from "./request-ext-info.7n4Ku7xW.js";
const x = "aipay-account-refresh",
  y = "006",
  I = [{ pathname: "/login/check.json?_output_charset=utf-8", method: "POST" }],
  m = 500;
let a = null,
  s = !1,
  u = null,
  l = 0,
  p = 0;
const f = (n) => !!(n && typeof n == "object" && !Array.isArray(n));
function h() {
  if (typeof window > "u") return {};
  const n = window.OpenBridge?.userInfo;
  return f(n) ? n : {};
}
function d(n) {
  return !!(
    n?.uid ||
    n?.userId ||
    n?.customerId ||
    n?.userName ||
    n?.logonName ||
    n?.nickName ||
    n?.name
  );
}
function b(n) {
  return (
    String(
      n?.userName ||
        n?.logonName ||
        n?.nickName ||
        n?.name ||
        n?.customerId ||
        n?.userId ||
        "开发者",
    ).trim() || "开发者"
  );
}
function v(n) {
  return n?.avatarUrl || n?.avatar || n?.headImg || n?.headImgUrl || "";
}
function T(n) {
  const o =
    String(n || "")
      .replace(/\s+/g, "")
      .charAt(0) || "开";
  return /[a-z]/i.test(o) ? o.toUpperCase() : o;
}
function U(n) {
  return String(
    n?.uid ||
      n?.customerId ||
      n?.userId ||
      n?.logonUserId ||
      n?.accountId ||
      "",
  ).trim();
}
function w() {
  return typeof window > "u"
    ? !1
    : ["localhost", "127.0.0.1", "local.dev.alipay.net"].includes(
        window.location.hostname,
      );
}
function E(n) {
  return !n || typeof n != "object" || String(n.errorCode ?? "") !== y
    ? !1
    : n.success === !1 || n.isSuccess === !1;
}
function C(n) {
  const e = f(n?.data) ? n.data : {},
    o = f(e.userInfo) ? e.userInfo : e,
    r = E(n),
    c =
      typeof e.loggedIn == "boolean"
        ? e.loggedIn
        : typeof n?.loggedIn == "boolean"
          ? n.loggedIn
          : void 0,
    i =
      n?.success === !0 ||
      n?.isSuccess === !0 ||
      n?.code === "10000" ||
      c === !0;
  return {
    isLoggedIn: r ? !1 : typeof c == "boolean" ? c : !!(i && d(o)),
    isLoginExpired: r,
    userInfo: o,
    raw: n,
  };
}
async function N({ pathname: n, method: e }) {
  const o = {
      ...A(),
      isMobile:
        /Android|iPhone|iPad|iPod|HarmonyOS|OpenHarmony/i.test(
          navigator.userAgent,
        ) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    },
    { url: r, headers: c } = g(n, {
      ...window.AIPayApiConfig,
      headers: {
        Accept: "application/json",
        ...(o ? { "Content-Type": "application/json" } : {}),
      },
    }),
    i = await window.fetch(r, {
      method: e,
      credentials: "include",
      headers: c,
      cache: "no-store",
      ...(o ? { body: JSON.stringify({ extInfo: o }) } : {}),
    });
  if (!i.ok) throw new Error(`请求失败: ${i.status}`);
  return C(await i.json());
}
async function _() {
  let n = null;
  for (const e of I)
    try {
      return { ...(await N(e)), source: e.pathname };
    } catch (o) {
      n = o;
    }
  throw n || new Error("账号信息获取失败");
}
function L({ force: n = !1 } = {}) {
  if (!n && u && Date.now() - l < m) return Promise.resolve(u);
  if (a && (!n || s)) return a;
  s = n;
  const e = p,
    o = _()
      .then(
        (r) => (
          e === p &&
            (window.__aipayMonitorContext.setAccountInfo(r),
            (u = r),
            (l = Date.now())),
          r
        ),
      )
      .finally(() => {
        a === o && ((a = null), (s = !1));
      });
  return ((a = o), (window.__aipayMonitorContext.accountReady = o), o);
}
function P() {
  ((p += 1), (a = null), (s = !1), (u = null), (l = 0));
}
async function B({
  localLoggedIn: n = !1,
  fallbackUserInfo: e = {},
  preserveLocalLoginOnLocalHost: o = !0,
  force: r = !1,
} = {}) {
  const c = h(),
    i = {
      isLoggedIn: !!(n || d(c) || d(e)),
      userInfo: { ...e, ...c },
      source: "fallback",
    };
  try {
    const t = await L({ force: r });
    return {
      isLoggedIn:
        !t.isLoginExpired && !t.isLoggedIn && o && w() ? !!n : t.isLoggedIn,
      isLoginExpired: t.isLoginExpired,
      userInfo: {
        ...e,
        ...c,
        ...t.userInfo,
        loginCorporateAccount: t.userInfo?.loginCorporateAccount,
      },
      raw: t.raw,
      source: t.source,
    };
  } catch (t) {
    return { ...i, isLoginExpired: !1, error: t };
  }
}
export { x as A, T as a, v as b, P as c, U as d, B as f, b as r };
