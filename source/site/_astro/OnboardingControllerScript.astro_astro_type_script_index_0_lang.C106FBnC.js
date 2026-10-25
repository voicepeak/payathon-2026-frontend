import {
  k as xd,
  n as en,
  o as Dd,
  q as be,
  r as H,
  t as Ce,
  u as _e,
  v as It,
  w as Tr,
  x as Ud,
  h as Bd,
  y as de,
  z as Fd,
  A as Fe,
  S as Vd,
  B as hr,
  C as qd,
  D as je,
  E as Ve,
} from "./subscription-onboarding.ClBQLCSk.js";
import {
  r as kd,
  c as Hd,
  a as Ot,
  P as gt,
  S as Aa,
  D as wr,
} from "./spm.DrxzIIAi.js";
import { b as es, g as zd, O as vr } from "./openbridge-env.DInZk9-t.js";
import { g as jd } from "./request-ext-info.7n4Ku7xW.js";
import { i as Kd } from "./init-call-app.DLZ2Kh5o.js";
import {
  a as Gd,
  c as $d,
  d as Yd,
  b as Pa,
  p as Wt,
  m as Wd,
} from "./authcenter-login.px1IcvnX.js";
import {
  A as Rn,
  c as Ta,
  d as Cr,
  r as va,
  a as Qd,
  b as Jd,
  f as Hi,
} from "./account-info.CNV-BU5E.js";
import { n as ts, r as ns, S as Xd } from "./spm.config.DZtOwygg.js";
import { w as we } from "./navigation-query.CcCHnnwN.js";
import { Q as Zd } from "./browser.Chj5bWFs.js";
function el() {
  const e = new Map();
  return async ({
    context: i,
    isCurrent: o,
    query: c,
    form: l,
    save: p,
    detail: f,
    onProducts: g,
  }) => {
    const I = () => {
      if (!o()) throw new Error("页面已切换，请重新操作");
    };
    I();
    const y = await c();
    (I(), xd(y), g?.(y));
    const E = await l();
    I();
    const C = en(y, E.nodeStatus),
      w = Dd(y),
      A = String(E.formData?.subscription_product_open_app_types || "").split(
        ",",
      ),
      L = JSON.stringify([i.instanceId, i.subjectKey, i.nodeId]);
    (C.kind !== "opened" && e.delete(L),
      C.kind === "opened" &&
        w &&
        !w.split(",").every((x) => A.includes(x)) &&
        e.get(L) !== w &&
        (await p(w), I(), e.set(L, w)));
    const N = await f();
    I();
    const D = N?.renderGraph?.nodes?.find((x) => x.nodeId === i.nodeId),
      k =
        N?.currentForm?.nodeId === i.nodeId
          ? N.currentForm
          : {
              ...E,
              nodeStatus: D?.nodeStatus || E.nodeStatus,
              viewState: D?.viewState || E.viewState,
              flowStatus: D?.flowStatus || E.flowStatus,
            };
    return {
      products: y,
      form: k,
      opening: en(y, k.nodeStatus),
      appTypes: w,
      view: N,
    };
  };
}
const Mt = Object.freeze({
    CONSUME_IDENTITY_DECISION: "CONSUME_IDENTITY_DECISION",
    CONTINUE: "CONTINUE",
    QUERY: "QUERY",
    REUSE_PENDING_QUERY: "REUSE_PENDING_QUERY",
  }),
  tl = "CORPORATE_ACCOUNT";
function nl({
  decision: e,
  accountKey: i,
  now: o = Date.now(),
  maxAgeMs: c,
} = {}) {
  const l = Number(e?.createdAt || 0),
    p = [e?.accountKey, e?.selectedAccountKey]
      .map((f) => String(f || "").trim())
      .filter(Boolean);
  return !!(
    i &&
    p.includes(i) &&
    e?.selectedSubjectId &&
    ["USER", "MERCHANT"].includes(e?.selectedSubjectType) &&
    Number.isFinite(l) &&
    Number.isFinite(c) &&
    o - l <= c
  );
}
function _a(e) {
  return String(e || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
}
function rl(e = {}) {
  return String(
    e?.uid ||
      e?.userId ||
      e?.customerId ||
      e?.logonUserId ||
      e?.accountId ||
      "",
  ).trim();
}
function il(e = {}) {
  const i = e?.raw && typeof e.raw == "object" ? e.raw : {};
  return [
    e?.uid,
    e?.userId,
    e?.customerId,
    e?.logonUserId,
    e?.accountId,
    e?.personalUid,
    e?.logonUid,
    e?.loginUid,
    i.uid,
    i.logonUid,
    i.loginUid,
    i.userId,
    i.customerId,
    i.logonUserId,
    i.accountId,
  ]
    .map((o) => String(o || "").trim())
    .filter(Boolean);
}
function ol(e = {}) {
  const i = e?.raw && typeof e.raw == "object" ? e.raw : {};
  return [
    e?.principalId,
    e?.personalUid,
    i.principalId,
    i.merchantPid,
    i.masterPid,
    i.identityId,
  ]
    .map((o) => String(o || "").trim())
    .filter(Boolean);
}
function al(e = {}, i = {}) {
  const o = rl(e);
  if (!o) return "";
  const c = Array.isArray(i?.operators) ? i.operators : [],
    l = c.find((I) => il(I).includes(o)) || c.find((I) => ol(I).includes(o));
  if (l)
    return _a(
      l?.identityType ||
        l?.accountType ||
        l?.relationType ||
        l?.raw?.accountType ||
        l?.raw?.identityType,
    );
  const p = i?.raw && typeof i.raw == "object" ? i.raw : {},
    f =
      p.data && typeof p.data == "object" && !Array.isArray(p.data)
        ? p.data
        : p;
  return [
    i?.personalUid,
    i?.userId,
    i?.accountId,
    f.uid,
    f.logonUid,
    f.loginUid,
    f.userId,
    f.customerId,
    f.logonUserId,
    f.accountId,
  ]
    .map((I) => String(I || "").trim())
    .filter(Boolean)
    .includes(o)
    ? _a(
        i?.accountType ||
          f.accountType ||
          f.identityType ||
          p.accountType ||
          p.identityType,
      )
    : "";
}
function sl(e = {}, i = {}) {
  return al(e, i) !== tl;
}
function cl({
  enterpriseRegistrationRequested: e = !1,
  forceIdentitySelection: i = !1,
  hasPendingQuery: o = !1,
} = {}) {
  return !i && e
    ? Mt.CONTINUE
    : o
      ? Mt.REUSE_PENDING_QUERY
      : i
        ? Mt.QUERY
        : Mt.CONSUME_IDENTITY_DECISION;
}
function dl(e) {
  const i = new URL(e),
    o = String(
      i.searchParams.get("enterpriseRegistration") || "",
    ).toLowerCase();
  return o === "true" || o === "1";
}
function ll(e) {
  const i = new URL(e),
    o = String(i.searchParams.get("enterprisePipeline") || "").toLowerCase();
  return o === "true" || o === "1";
}
function io(e, i = {}) {
  const o =
    i.enterpriseRegistration === void 0
      ? dl(e)
      : i.enterpriseRegistration === !0;
  return {
    enterprisePipeline:
      o ||
      (i.enterprisePipeline === void 0 ? ll(e) : i.enterprisePipeline === !0),
    enterpriseRegistration: o,
  };
}
function ul({
  currentHref: e,
  selectedSubjectType: i = "",
  selectedSubjectId: o = "",
} = {}) {
  const c = io(e);
  return c.enterpriseRegistration || !String(o || "").trim()
    ? c
    : { enterprisePipeline: i === "MERCHANT", enterpriseRegistration: !1 };
}
function pl(e, i, o = {}) {
  const c = new URL(e),
    l = new URL(i, c),
    p = io(e, o);
  return (
    l.searchParams.delete("enterprisePipeline"),
    l.searchParams.delete("enterpriseRegistration"),
    p.enterprisePipeline && l.searchParams.set("enterprisePipeline", "true"),
    p.enterpriseRegistration &&
      l.searchParams.set("enterpriseRegistration", "true"),
    `${l.pathname}${l.search}${l.hash}`
  );
}
function fl(e, i = "USER") {
  const o = new URL(e);
  return (
    o.searchParams.delete("enterpriseRegistration"),
    i === "MERCHANT"
      ? o.searchParams.set("enterprisePipeline", "true")
      : o.searchParams.delete("enterprisePipeline"),
    `${o.pathname}${o.search}${o.hash}`
  );
}
function Na({
  kind: e,
  personalIdentity: i,
  enterpriseIdentities: o = [],
  selectionKey: c = "private",
} = {}) {
  if (e === "private") {
    const f = String(i?.principalId || "").trim();
    return f ? { subjectType: "USER", principalId: f, identity: i } : null;
  }
  const l = o.find((f) => `corporate:${f?.principalId}` === c),
    p = String(l?.principalId || "").trim();
  return p ? { subjectType: "MERCHANT", principalId: p, identity: l } : null;
}
function ml({ personalIdentity: e, currentState: i = {} } = {}) {
  const o = String(e?.principalId || "").trim();
  return {
    ...i,
    selectedSubjectType: "USER",
    selectedSubjectId: o,
    identityContext: o
      ? { accountType: "PRIVATE_ACCOUNT", personalUid: o }
      : null,
    identitySelectionPending: !1,
  };
}
const gl = ["bizTips", "biz_tips", "businessTips", "business_tips"],
  Il = [
    "extInfo",
    "data",
    "result",
    "resultObj",
    "error",
    "payload",
    "body",
    "response",
  ];
function oo(...e) {
  for (const i of e) {
    if (i == null || typeof i == "object") continue;
    const o = String(i).trim();
    if (o) return o;
  }
  return "";
}
function Br(e, i = 0, o = new Set()) {
  if (!e || typeof e != "object" || i > 4 || o.has(e)) return "";
  o.add(e);
  for (const c of gl) {
    const l = oo(e[c]);
    if (l) return l;
  }
  for (const c of Il) {
    const l = Br(e[c], i + 1, o);
    if (l) return l;
  }
  return "";
}
function ao(e) {
  return (
    Br(e) ||
    oo(e?.subMsg, e?.errorMsg, e?.msg, e?.resultMessage, e?.message) ||
    "请求失败"
  );
}
function Dn(e) {
  if (!e || typeof e != "object") return "";
  const i =
      e.displayData && typeof e.displayData == "object" ? e.displayData : {},
    o = e.formData && typeof e.formData == "object" ? e.formData : {},
    c = i.data && typeof i.data == "object" ? i.data : {},
    l = o.data && typeof o.data == "object" ? o.data : {};
  return (
    oo(
      e.productOpenBizTips,
      e.productOpenErrorMessage,
      e.bizTips,
      e.errorMessage,
      e.errorMsg,
      i.productOpenBizTips,
      i.productOpenErrorMessage,
      i.bizTips,
      i.errorMessage,
      i.errorMsg,
      c.productOpenBizTips,
      c.productOpenErrorMessage,
      c.bizTips,
      c.errorMessage,
      c.errorMsg,
      o.productOpenBizTips,
      o.productOpenErrorMessage,
      o.bizTips,
      l.productOpenBizTips,
      l.productOpenErrorMessage,
      l.bizTips,
      e.failMsg,
      i.failMsg,
      o.failMsg,
    ) || Br(e)
  );
}
const Sl = "/onboarding",
  yt = "MRCH",
  yl = "/pamir/login/identityPageQuery.json",
  El = "/pamir/login/selectIdentity.json",
  hl = "/pamir/login/queryLoginAccount.json",
  Ra = {
    [vr.DEV]: "https://enterpriseportal-769.gz00b.dev.alipay.net",
    [vr.PRE]: "https://enterpriseportal.alipay.com",
    [vr.PROD]: "https://enterpriseportal.alipay.com",
  },
  wl = "/bazaar/query.json",
  Cl = "/bazaar/save.json",
  Vn = 10,
  bl = 10,
  Al = {
    APPROVED: "审核已通过",
    REJECTED: "审核未通过",
    PENDING: "审核中",
    DRAFT: "暂存",
  },
  Un = {
    APPROVED: "ACTIVE,APPROVED,PASSED,SUCCESS",
    REJECTED: "INACTIVE,REJECTED,FAILED,FAIL,DENIED",
    PENDING: "PENDING,AUDITING,PROCESSING,SUBMITTED",
    DRAFT: "DRAFT,TEMP,SAVED",
  },
  Lr = [Un.APPROVED, Un.REJECTED, Un.PENDING, Un.DRAFT].join(","),
  rn = "006",
  _r = [];
function Pl(e) {
  return (
    _r.push(e),
    () => {
      const i = _r.indexOf(e);
      i >= 0 && _r.splice(i, 1);
    }
  );
}
function Hn(e) {
  return !e || String(e?.errorCode ?? "") !== rn
    ? !1
    : e.success === !1 || e.isSuccess === !1;
}
function zn(e, i, o) {
  _r.forEach((c) => {
    try {
      c(e, { url: i, options: o });
    } catch (l) {
      console.error("Response interceptor error:", l);
    }
  });
}
const Tl = {
  instanceId: "",
  productCode: "",
  productName: "",
  description: "",
  iconUrl: "",
  pipelineCode: "",
  pipelineVersion: "",
  status: "",
  currentNodeIds: [],
  progress: null,
  renderGraph: { nodes: [], edges: [] },
  currentForm: null,
  successSnapshot: null,
  raw: null,
};
function rs(e) {
  return ao(e);
}
function La(e) {
  return ao(e);
}
function is(e, i) {
  return typeof i == "function" ? i(e) : i || rs(e);
}
class os extends Error {
  constructor(i, o) {
    (super(o || rs(i)),
      (this.name = "OnboardingApiError"),
      (this.code = String(i?.code ?? "")),
      (this.subCode = String(i?.subCode ?? "")),
      (this.subMsg = i?.subMsg || ""),
      (this.bizTips = Br(i)),
      (this.data = i?.data ?? null),
      (this.extInfo = i?.extInfo ?? null),
      (this.traceId = String(i?.traceId || "")),
      (this.raw = i));
  }
}
function qe(e, i = null, o = {}) {
  if (
    !(o.strictCode
      ? e?.code === "10000"
      : e?.success === !0 || e?.code === "10000")
  ) {
    const l = is(e, o.errorMessage);
    throw o.structuredError ? new os(e, l) : new Error(l);
  }
  return e?.data ?? i;
}
function vl(e) {
  return e?.body && typeof e.body == "object" ? e.body : e;
}
function _l(e) {
  const o = (e?.headers?.get?.("content-type") || "").match(
      /charset\s*=\s*["']?([^;"'\s]+)/i,
    ),
    c = String(o?.[1] || "").toLowerCase();
  return ["gbk", "gb2312", "x-gbk"].includes(c) ? "gb18030" : c;
}
function Oa(e) {
  const i = String(e || "")
    .replace(/^\uFEFF/, "")
    .trim();
  if (!i) return null;
  try {
    return JSON.parse(i);
  } catch {
    return null;
  }
}
async function Fr(e, { legacyChinese: i = !1 } = {}) {
  if (i && typeof e?.arrayBuffer == "function" && typeof TextDecoder < "u")
    try {
      const o = new Uint8Array(await e.arrayBuffer()),
        c = [],
        l = (p) => {
          p && !c.includes(p) && c.push(p);
        };
      (l(_l(e)), l("utf-8"), l("gb18030"));
      for (const p of c)
        try {
          const f = new TextDecoder(p, { fatal: !0 }).decode(o),
            g = Oa(f);
          if (g !== null) return g;
        } catch {}
      for (const p of c)
        try {
          const f = Oa(new TextDecoder(p).decode(o));
          if (f !== null) return f;
        } catch {}
    } catch {}
  try {
    return await e.json();
  } catch {
    return null;
  }
}
function so(e) {
  if (!e || typeof e != "object") return "";
  const i =
      e.data && typeof e.data == "object" && !Array.isArray(e.data)
        ? e.data
        : {},
    o = q(e, ["stat", "status"]).toUpperCase(),
    c = q(e, ["code", "resultCode", "errorCode"]).toUpperCase(),
    l =
      q(e, ["target", "redirectUrl", "redirectURL"]) ||
      q(i, ["target", "redirectUrl", "redirectURL"]);
  if (!l) return "";
  const p = new Set(["DENY", "DENIED", "LOGIN", "UNAUTHORIZED", "REDIRECT"]),
    f = new Set([
      "PAM_NEED_SELECT_IDENTITY",
      "NEED_SELECT_IDENTITY",
      "UNAUTHORIZED",
      "REDIRECT",
    ]);
  return p.has(o) || f.has(c) ? l : "";
}
function nn(e, i = "正在跳转到企业身份选择页") {
  (typeof window < "u" && (window.__AIPAY_PAMIR_REDIRECTING__ = !0),
    typeof window < "u" &&
      window.location &&
      e &&
      window.location.assign(String(e)));
  const o = new Error(i);
  throw ((o.isPamirRedirect = !0), (o.redirectUrl = String(e || "")), o);
}
async function $e(
  e,
  { method: i = "GET", body: o, errorMessage: c, structuredError: l = !1 } = {},
) {
  const { url: p, headers: f } = es(`${Sl}${e}`, {
      headers: { Accept: "application/json" },
    }),
    g = { method: i, credentials: "include", headers: f, cache: "no-store" };
  o !== void 0 &&
    (f.set("Content-Type", "application/json"), (g.body = JSON.stringify(o)));
  const I = await fetch(p, g);
  if (I.redirected && I.url)
    try {
      const w = new URL(p, typeof window < "u" ? window.location.href : p)
          .origin,
        A = new URL(I.url, p).origin;
      if (w !== A) {
        (typeof window < "u" && (window.__AIPAY_PAMIR_REDIRECTING__ = !0),
          typeof window < "u" &&
            window.location &&
            window.location.assign(I.url));
        const L = new Error("正在跳转到企业身份选择页");
        throw ((L.isPamirRedirect = !0), L);
      }
    } catch (w) {
      if (w?.isPamirRedirect) throw w;
    }
  const y = await Fr(I);
  zn(y, p, g);
  const E =
      y?.redirectUrl ||
      y?.redirectURL ||
      y?.data?.redirectUrl ||
      y?.data?.redirectURL,
    C = String(y?.code || y?.errorCode || y?.resultCode || "");
  if (E && (C.includes("PAM_NEED_SELECT_IDENTITY") || C === "REDIRECT")) {
    (typeof window < "u" && (window.__AIPAY_PAMIR_REDIRECTING__ = !0),
      typeof window < "u" &&
        window.location &&
        window.location.assign(String(E)));
    const w = new Error("正在跳转到企业身份选择页");
    throw ((w.isPamirRedirect = !0), w);
  }
  if (y && Hn(y)) {
    const w = new Error(y.errorMsg || "用户未登录或登录态失效");
    throw (
      (w.code = rn),
      (w.data = y),
      (w.response = y),
      (w.isLoginExpired = !0),
      w
    );
  }
  if (!I.ok) {
    if (y && typeof y == "object") {
      const w = is(y, c);
      throw l ? new os(y, w) : new Error(w);
    }
    throw new Error(`请求失败: ${I.status}`);
  }
  return y;
}
async function co(e, { method: i = "GET", body: o } = {}) {
  const { url: c, headers: l } = es(e, {
      headers: { Accept: "application/json" },
    }),
    p = { method: i, credentials: "include", headers: l, cache: "no-store" };
  o !== void 0 &&
    (l.set("Content-Type", "application/json"), (p.body = JSON.stringify(o)));
  const f = await fetch(c, p);
  if (!f.ok) throw new Error(`请求失败: ${f.status}`);
  const g = await f.json();
  if ((zn(g, c, p), g && Hn(g))) {
    const I = new Error(g.errorMsg || "用户未登录或登录态失效");
    throw (
      (I.code = rn),
      (I.data = g),
      (I.response = g),
      (I.isLoginExpired = !0),
      I
    );
  }
  return g;
}
function as(e, i) {
  return String(e?.productCode || e?.id || e?.productId || `product-${i + 1}`);
}
function ss(e) {
  return String(e?.iconUrl || "");
}
function Nl(e, i) {
  const o = String(
      e?.group || e?.category || e?.productGroup || "",
    ).toLowerCase(),
    c =
      `${i} ${e?.productName || ""} ${e?.name || ""} ${e?.title || ""}`.toLowerCase();
  return ["payment", "pay", "payer", "付款产品"].includes(o)
    ? "payment"
    : ["receive", "receipt", "collection", "收款产品"].includes(o)
      ? "receive"
      : c.includes("agent") || c.includes("代理") || c.includes("付款")
        ? "payment"
        : "receive";
}
function Rl(e, i) {
  const o = as(e, i),
    c = String(e?.productName || e?.name || e?.title || o),
    l = String(e?.description || e?.desc || "暂无产品描述"),
    p = e?.docs || "";
  return {
    id: o,
    name: c,
    desc: l,
    description: l,
    docs: p,
    group: Nl(e, o),
    badge: e?.badge || "",
    iconUrl: ss(e),
    instanceId: e?.instanceId || "",
    pipelineStatus: e?.pipelineStatus || "",
    opened: e?.opened === !0 || e?.isOpened === !0,
    productCode: o,
    actions: e?.actions || null,
    raw: e,
  };
}
function Ll(e) {
  const i = e && typeof e == "object" ? e : {};
  return {
    monthlyTradeCount:
      i.monthlyTradeCount === void 0 || i.monthlyTradeCount === null
        ? "0"
        : String(i.monthlyTradeCount),
    monthlyTradeAmount:
      i.monthlyTradeAmount === void 0 || i.monthlyTradeAmount === null
        ? "0"
        : String(i.monthlyTradeAmount),
  };
}
function Ol(e, i = 0) {
  const o = as(e, i),
    c = Number(e?.displayOrder ?? i + 1);
  return {
    id: o,
    productCode: o,
    productName: String(e?.productName || e?.name || e?.title || o),
    name: String(e?.productName || e?.name || e?.title || o),
    description: String(e?.description || e?.desc || "暂无产品说明"),
    iconUrl: ss(e),
    displayOrder: Number.isFinite(c) ? c : i + 1,
    instanceId: String(e?.instanceId || ""),
    tradeStatistic: Ll(e?.tradeStatistic),
    raw: e,
  };
}
function cs(e) {
  return !e || typeof e != "object"
    ? null
    : {
        actionType: String(e.actionType || e.type || ""),
        label: String(e.label || e.actionName || e.name || e.actionType || ""),
        enabled: e.enabled !== !1,
        disabledReason: e.disabledReason || e.blockReason || "",
        raw: e,
      };
}
function Ml(e) {
  return !e || typeof e != "object"
    ? null
    : {
        nodeId: String(e.nodeId || ""),
        nodeName: String(e.nodeName || e.name || e.nodeId || ""),
        pluginCode: e.pluginCode || "",
        formKey: e.formKey || "",
        nodeType: e.nodeType || "",
        nodeStatus: e.nodeStatus || "",
        flowStatus: e.flowStatus || "",
        viewState: e.viewState || "",
        externalBizId: e.externalBizId || e.external_biz_id || "",
        signOrderNo: e.signOrderNo || e.sign_order_no || "",
        businessProductCode:
          e.businessProductCode || e.business_product_code || "",
        appType: e.appType || e.app_type || "",
        createdAppId: e.createdAppId || e.created_app_id || "",
        approvedAppId: e.approvedAppId || e.approved_app_id || "",
        required: e.required !== !1,
        visible: e.visible !== !1,
        actions: Array.isArray(e.actions)
          ? e.actions.map(cs).filter(Boolean)
          : [],
        blockers: Array.isArray(e.blockers) ? e.blockers : [],
        blockReason: e.blockReason || "",
        failMsg: e.fail_msg || e.failMsg || "",
        raw: e,
      };
}
function xl(e) {
  if (!e || typeof e != "object") return {};
  const i = { ...e };
  if (typeof e.data == "string")
    try {
      const o = JSON.parse(e.data);
      i.data = o && typeof o == "object" ? o : null;
    } catch {
      i.data = null;
    }
  else
    e.data && typeof e.data == "object" ? (i.data = e.data) : (i.data = null);
  return i;
}
function ds(e) {
  if (!e || typeof e != "object") return null;
  const i =
      e?.contextPatch && typeof e.contextPatch == "object"
        ? e.contextPatch
        : {},
    o = xl(e.displayData),
    c = String(e.nodeId || ""),
    p = be(e) ? Dn({ ...e, displayData: o }) : "";
  return {
    nodeId: c,
    pluginCode: e.pluginCode || "",
    nodeName: String(e.nodeName || c || ""),
    nodeStatus: e.nodeStatus || "",
    viewState: e.viewState || "",
    flowStatus: e.flowStatus || "",
    failMsg: e.fail_msg || e.failMsg || "",
    externalBizId: e.externalBizId || e.external_biz_id || "",
    businessOrderNo: e.businessOrderNo || e.business_order_no || "",
    bizOrderNo: e.bizOrderNo || e.biz_order_no || "",
    batchOrderId: e.batchOrderId || e.batch_order_id || "",
    businessProductCode: e.businessProductCode || e.business_product_code || "",
    bizChannelCode:
      e.bizChannelCode || e.biz_channel_code || e.channelCode || "",
    signOrderNo: i.productOpenOrderNo || e.signOrderNo || e.sign_order_no || "",
    registerNo:
      i.RegisteCompletedOrderNo || e.registerNo || e.register_no || "",
    contextPatch: i,
    appType: e.appType || e.app_type || "",
    createdAppId: e.createdAppId || e.created_app_id || "",
    approvedAppId: e.approvedAppId || e.approved_app_id || "",
    formKey: e.formKey || "",
    formVersion: e.formVersion || "",
    formData: e.formData && typeof e.formData == "object" ? e.formData : {},
    displayData: o,
    productOpenBizTips: p,
    productOpenErrorMessage: p,
    blockers: Array.isArray(e.blockers) ? e.blockers : [],
    actions: Array.isArray(e.actions) ? e.actions.map(cs).filter(Boolean) : [],
    raw: e,
  };
}
function Ma(...e) {
  for (const i of e) if (i != null && String(i).trim()) return String(i).trim();
  return "";
}
function Nr(e) {
  return Array.isArray(e)
    ? e.map((i) => String(i).trim()).filter(Boolean)
    : String(e || "")
        .split(/[;,]/)
        .map((i) => i.trim())
        .filter(Boolean);
}
function Dl(e) {
  const i = String(e || "").trim();
  if (!i) return "";
  const o = i
    .toUpperCase()
    .replace(/^ROLE[._-]?/, "")
    .replace(/[._\-\s]+/g, "");
  return o === "SUPERADMIN"
    ? "SUPER.ADMIN"
    : o === "MRCHGLOBALADMIN"
      ? "MRCH.GLOBAL.ADMIN"
      : i;
}
function Ke(e) {
  return (
    e === !0 || ["true", "1", "yes"].includes(String(e || "").toLowerCase())
  );
}
function zi(e = {}, i = {}, o = {}) {
  const c = e && typeof e == "object" ? e : {},
    l = i && typeof i == "object" ? i : {},
    p =
      o?.identityContext && typeof o.identityContext == "object"
        ? o.identityContext
        : {},
    f = o?.allowPersonalRegistration === !0,
    g = Ma(o?.fallbackPersonalUid),
    I = c.data && typeof c.data == "object" ? c.data : {},
    y = l.data && typeof l.data == "object" ? l.data : {},
    E = (...x) =>
      Ma(
        ...x.map((P) => c[P]),
        ...x.map((P) => I[P]),
        ...x.map((P) => l[P]),
        ...x.map((P) => y[P]),
        ...x.map((P) => p[P]),
      ),
    C = E("pamirMasterPid", "masterPid", "merchantPid"),
    w = E("ipRoleId", "ip_role_id"),
    A = C || w,
    L = E("pamirLoginUserId", "personalUid", "userId") || g;
  if (!A && !f) return null;
  const N = Array.from(
      new Set(Nr(E("pamirRoleCodes", "roleCodes")).map(Dl).filter(Boolean)),
    ),
    D = Nr(E("pamirRoleTypes", "roleTypes")).map((x) =>
      String(x || "")
        .trim()
        .toUpperCase(),
    );
  return (
    !N.length &&
      (Ke(E("pamirIsAccount")) || f || D.includes("MASTER")) &&
      N.push("SUPER.ADMIN"),
    {
      ...{
        mainAccountId: A,
        operatorId: E("pamirOperatorId", "operatorId"),
        personalUid: L,
        pamirMasterPid: C,
        ipRoleId: w,
        regionMode:
          Ke(E("pamirRegionMode", "regionMode")) || D.includes("REGION"),
        regions: Nr(E("pamirRegions", "regions")),
        roleCodes: N,
        tenantId: E("pamirTenantId", "tenantId", "pamirAppScene", "appScene"),
      },
      merchantPid: A,
      subjectType: A ? "MERCHANT" : "USER",
      subjectId: A || L,
      merchantName: E("pamirMasterName", "merchantName") || "当前企业",
    }
  );
}
function ce(e) {
  if (e == null) return "";
  const i = String(e);
  if (typeof document < "u") {
    const o = document.createElement("textarea");
    return (
      (o.innerHTML = i),
      o.value
        .replace(
          /\\r\\n/g,
          `
`,
        )
        .replace(
          /\\n/g,
          `
`,
        )
        .replace(
          /\\r/g,
          `
`,
        )
    );
  }
  return i
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(
      /\\r\\n/g,
      `
`,
    )
    .replace(
      /\\n/g,
      `
`,
    )
    .replace(
      /\\r/g,
      `
`,
    );
}
function xa(e, ...i) {
  if (!e || typeof e != "object") return "";
  for (const o of i) {
    const c = e[o];
    if (c != null && String(c).trim()) return c;
  }
  return "";
}
function lo(e) {
  return String(e || "").trim();
}
function Ul(e) {
  const i = e?.metadata && typeof e.metadata == "object" ? e.metadata : {},
    o = e?.extInfo && typeof e.extInfo == "object" ? e.extInfo : {},
    c = String(e?.serviceStatus || "").toUpperCase();
  return (
    ["DRAFT", "TEMP", "SAVED"].includes(c) ||
    i.serviceManageStatus === "DRAFT" ||
    i.submitAction === "save" ||
    o.serviceManageStatus === "DRAFT" ||
    o.submitAction === "save"
  );
}
function Da(e) {
  if (!e) return "PENDING";
  if (Ul(e)) return "DRAFT";
  const i = String(e.serviceStatus || "").toUpperCase();
  return ["ACTIVE", "APPROVED", "PASSED", "SUCCESS"].includes(i)
    ? "APPROVED"
    : ["INACTIVE", "REJECTED", "FAILED", "FAIL", "DENIED"].includes(i)
      ? "REJECTED"
      : "PENDING";
}
function Bl(e = []) {
  return e.some((i) => {
    const c = (i?.extInfo && typeof i.extInfo == "object" ? i.extInfo : {})
      .ifWhiteUid;
    return typeof c == "boolean"
      ? c
      : typeof c == "string" && c.toLowerCase() === "true";
  });
}
function ls(e = []) {
  const i = new Map();
  return (
    e.forEach((o, c) => {
      const l = o.serviceId || o.resourceUrl || o.serviceName || String(c);
      i.set(l, o);
    }),
    Array.from(i.values())
  );
}
function Fl(e, i) {
  const o = lo(i).toLowerCase();
  return o
    ? [e.serviceName, e.serviceId]
        .filter(Boolean)
        .some((c) => String(c).toLowerCase().includes(o))
    : !0;
}
function us(e, i = 0) {
  const o = e?.metadata && typeof e.metadata == "object" ? e.metadata : {},
    c = e?.extInfo && typeof e.extInfo == "object" ? e.extInfo : {},
    l = ce(
      e?.serviceId ||
        e?.service_id ||
        e?.id ||
        e?.resourceId ||
        `service-${i + 1}`,
    ),
    p = ce(e?.serviceName || e?.name || e?.title || `已注册服务 ${i + 1}`),
    f = ce(e?.serviceType || "API") || "API",
    g = ce(e?.serviceDesc || e?.serviceSummary || e?.description),
    I = ce(e?.resourceUrl || e?.url || e?.endpoint),
    y = ce(
      xa(o, "pricing", "price", "unitPrice") ||
        e?.pricing ||
        e?.price ||
        e?.unitPrice,
    ),
    E = ce(
      xa(o, "schema_url", "schemaUrl") ||
        e?.schema_url ||
        e?.schemaUrl ||
        e?.requestExample ||
        e?.requestDemo,
    );
  return {
    id: l,
    serviceId: l,
    serviceName: p,
    name: p,
    serviceType: f,
    serviceDesc: g,
    serviceSummary: ce(e?.serviceSummary),
    resourceUrl: I,
    endpointUrl: I,
    pricing: y,
    schema_url: E,
    schemaUrl: E,
    serviceStatus: ce(e?.serviceStatus),
    manageStatus: Da(e),
    manageStatusText: Al[Da(e)],
    chargeType: ce(e?.chargeType),
    paymentProtocol: ce(e?.paymentProtocol),
    httpMethod: ce(e?.httpMethod),
    metadata: o,
    extInfo: c,
    raw: e,
  };
}
function ps(e, i = null) {
  if (!(e?.success === !0 || e?.isSuccess === !0 || e?.code === "10000"))
    throw new Error(ao(e));
  return e?.data ?? i;
}
function on(e) {
  if (!e || typeof e != "object") return { ...Tl };
  const i =
      e.renderGraph && typeof e.renderGraph == "object" ? e.renderGraph : {},
    o = Array.isArray(i.nodes) ? i.nodes.map(Ml).filter(Boolean) : [],
    c = Array.isArray(i.edges) ? i.edges : [];
  return {
    instanceId: String(e.instanceId || ""),
    productCode: String(e.productCode || ""),
    productName: String(e.productName || e.productCode || ""),
    description: String(e.description || ""),
    iconUrl: e.iconUrl || "",
    pipelineCode: e.pipelineCode || "",
    pipelineVersion: e.pipelineVersion || "",
    status: e.status || "",
    currentNodeIds: Array.isArray(e.currentNodeIds)
      ? e.currentNodeIds.map(String)
      : [],
    progress: e.progress || null,
    renderGraph: { ...i, nodes: o, edges: c },
    currentForm: ds(
      e.currentForm
        ? {
            ...e.currentForm,
            pluginCode:
              e.currentForm.pluginCode ||
              o.find((l) => l.nodeId === e.currentForm.nodeId)?.pluginCode ||
              "",
          }
        : null,
    ),
    successSnapshot:
      e.successSnapshot && typeof e.successSnapshot == "object"
        ? e.successSnapshot
        : null,
    raw: e,
  };
}
function uo(e = {}) {
  const i =
    typeof window > "u" ? "https://aipay.alipay.com/" : window.location.href;
  return io(i, e);
}
function jn(e, i = {}) {
  const o = uo(i);
  return (
    e.set("enterprisePipeline", String(o.enterprisePipeline)),
    e.set("enterpriseRegistration", String(o.enterpriseRegistration)),
    e
  );
}
async function Ua(e = {}) {
  const i = jn(new URLSearchParams(), e),
    o = await $e(`/products?${i.toString()}`, {
      structuredError: e.strictCode,
    }),
    c = qe(o, [], { structuredError: e.strictCode, strictCode: e.strictCode });
  return (Array.isArray(c) ? c : []).map(Rl);
}
function po() {
  const e = zd();
  return Ra[e] || Ra[vr.PROD];
}
function Vl(e) {
  if (typeof document > "u") return "";
  const i = `${e}=`,
    o = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(i));
  if (!o) return "";
  try {
    return decodeURIComponent(o.slice(i.length));
  } catch {
    return o.slice(i.length);
  }
}
function ql() {
  return (
    new URLSearchParams(typeof window < "u" ? window.location.search : "").get(
      "ctoken",
    ) || Vl("ctoken")
  );
}
function fo({ appScene: e = yt, queryStr: i, pageNum: o, pageSize: c } = {}) {
  const l = new URLSearchParams(),
    p = ql();
  return (
    p && l.set("ctoken", p),
    l.set("_input_charset", "utf-8"),
    l.set("_ksTS", String(Date.now())),
    l.set("appScene", String(e || yt)),
    i && l.set("queryStr", String(i)),
    o !== void 0 && l.set("pageNum", String(o)),
    c !== void 0 && l.set("pageSize", String(c)),
    l
  );
}
function q(e, i = []) {
  if (!e || typeof e != "object") return "";
  for (const o of i) {
    const c = e[o];
    if (c != null && String(c).trim()) return String(c).trim();
  }
  return "";
}
function Bn(e, i = []) {
  if (!e || typeof e != "object") return [];
  for (const o of i) if (Array.isArray(e[o])) return e[o];
  return [];
}
function mo(e, i) {
  if (!e || !i) return !1;
  try {
    const o = new URL(e),
      c = new URL(i, e);
    return o.hostname !== c.hostname || o.port !== c.port;
  } catch {
    return !1;
  }
}
function fs(e) {
  return String(e || "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
}
function kl(e) {
  if (Array.isArray(e)) return e;
  const i = [
      e,
      e?.data,
      e?.pageResult,
      e?.result,
      e?.data?.pageResult,
      e?.data?.result,
    ],
    o = [
      "identityList",
      "identityInfos",
      "identityInfoList",
      "identities",
      "operators",
      "list",
      "rows",
      "items",
    ];
  for (const c of i) {
    if (Array.isArray(c)) return c;
    const l = Bn(c, o);
    if (l.length) return l;
  }
  return [];
}
function Hl(e) {
  const i = fs(q(e, ["accountType", "identityType", "type", "relationType"]));
  return [
    "CORPORATE_ACCOUNT",
    "MERCHANT_OPERATOR",
    "MERCHANT",
    "ENTERPRISE",
    "BUSINESS",
  ].includes(i);
}
function zl(e) {
  const i = fs(q(e, ["accountType", "identityType", "type", "relationType"])),
    o = Hl(e),
    c = ["PRIVATE_ACCOUNT", "PERSONAL", "PRIVATE", "USER"].includes(i);
  if (!o && !c) return null;
  const l = q(e, [
      "merchantPid",
      "masterPid",
      "pid",
      "merchantId",
      "principalId",
      "masterUserId",
      "identityId",
      "roleId",
      "ipRoleId",
    ]),
    f =
      q(e, [
        "principalId",
        "merchantPid",
        "masterPid",
        "pid",
        "merchantId",
        "identityId",
        "masterUserId",
        "roleId",
        "ipRoleId",
        "userId",
        "accountId",
      ]) || (c ? q(e, ["uid", "logonUid", "loginUid"]) : "");
  if (!f) return null;
  const g = Bn(e, ["titleList"])
      .map((C) => String(C || "").trim())
      .filter(Boolean),
    I = Bn(e, ["roleTypes"])
      .map((C) =>
        String(C || "")
          .trim()
          .toUpperCase(),
      )
      .filter(Boolean),
    y = Bn(e, ["regions"]),
    E = y
      .map((C) =>
        C && typeof C == "object"
          ? q(C, ["regionId", "id", "regionCode", "code", "value"])
          : String(C || "").trim(),
      )
      .filter(Boolean);
  return {
    principalId: f,
    identityType: i,
    identityKind: o ? "corporate" : "private",
    operatorId:
      q(e, [
        "operatorId",
        "operatorUid",
        "userId",
        "id",
        "ipRoleId",
        "accountId",
      ]) || (o ? l : f),
    merchantPid: l,
    merchantName: q(e, [
      "merchantName",
      "identityName",
      "companyName",
      "principalName",
      "realName",
      "name",
    ]),
    accountDisplay: q(e, ["logonId", "accountDisplay", "accountName"]),
    roleName:
      q(e, [
        "title",
        "roleName",
        "operatorRoleName",
        "roleDesc",
        "role",
        "tag",
      ]) || g.join("、"),
    relationType: i,
    frozen: Ke(e.frozen) || Ke(e.freezed),
    roleTypes: I,
    regions: y,
    regionIds: E,
    regionMode: Ke(e.regionMode) || I.includes("REGION") || E.length > 0,
    raw: e,
  };
}
function jl(e, { appScene: i = yt } = {}) {
  const o = e && typeof e == "object" ? e : {},
    c =
      o.data && typeof o.data == "object" && !Array.isArray(o.data)
        ? o.data
        : o,
    l = q(o, ["stat", "status"]).toUpperCase(),
    p = q(o, ["code", "resultCode"]).toUpperCase();
  if (
    o.success === !1 ||
    o.isSuccess === !1 ||
    ["FAILED", "FAIL", "ERROR", "DENY", "DENIED"].includes(l) ||
    ["FAILED", "FAIL", "ERROR", "DENY", "DENIED"].includes(p)
  )
    throw new Error(
      q(o, ["msg", "message", "errorMsg"]) || "Enterprise Portal 身份查询失败",
    );
  const I = kl(o).map(zl).filter(Boolean),
    y = I.filter((C) => C.identityKind === "corporate"),
    E = I.find((C) => C.identityKind === "private");
  return {
    personalUid:
      q(c, [
        "personalUid",
        "uid",
        "userId",
        "accountId",
        "logonUid",
        "loginUid",
      ]) ||
      E?.principalId ||
      "",
    identitySelected: Ke(c.identitySelected) || Ke(o.identitySelected),
    appScene: q(c, ["appScene"]) || i,
    identitySelectionUrl: "",
    hasOperator: y.length > 0,
    operators: I,
    raw: o,
  };
}
async function Kl({ appScene: e = yt } = {}) {
  const i = new URL(`${po()}${yl}`);
  i.search = fo({ appScene: e, pageNum: 1, pageSize: 100 }).toString();
  let o;
  try {
    o = await fetch(i.toString(), {
      method: "GET",
      credentials: "include",
      mode: "cors",
      referrerPolicy: "origin",
      headers: { Accept: "application/json, text/javascript, */*" },
      cache: "no-store",
    });
  } catch (f) {
    throw new Error(
      `Enterprise Portal 身份查询失败: ${f?.message || "网络请求失败"}`,
    );
  }
  o.redirected && o.url && mo(i.toString(), o.url) && nn(o.url);
  const c = await Fr(o, { legacyChinese: !0 }),
    l = {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json, text/javascript, */*" },
      cache: "no-store",
    };
  zn(c, i.toString(), l);
  const p = so(c);
  if ((p && nn(p), !c || typeof c != "object" || Array.isArray(c)))
    throw new Error("Enterprise Portal 身份查询失败: 响应格式错误");
  if (c && Hn(c)) {
    const f = new Error(c.errorMsg || "用户未登录或登录态失效");
    throw (
      (f.code = rn),
      (f.data = c),
      (f.response = c),
      (f.isLoginExpired = !0),
      f
    );
  }
  if (!o.ok) throw new Error(`Enterprise Portal 身份查询失败: ${o.status}`);
  return jl(c, { appScene: e });
}
async function Ba({
  principalId: e,
  appScene: i = yt,
  regionMode: o = !1,
  regions: c = [],
} = {}) {
  if (!e) throw new Error("缺少身份标识");
  const l = new URLSearchParams();
  if (
    (l.set("appScene", String(i || yt)),
    l.set("principalId", String(e)),
    o === !0)
  ) {
    l.set("regionMode", "true");
    for (const N of Array.isArray(c) ? c : [])
      N != null && String(N).trim() && l.append("regions", String(N).trim());
  }
  const p = new URL(`${po()}${El}`),
    f = fo({ appScene: i });
  (f.delete("appScene"), (p.search = f.toString()));
  const g = p.toString(),
    I = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      referrerPolicy: "origin",
      headers: { Accept: "application/json, text/javascript, */*" },
      body: l,
      cache: "no-store",
    };
  let y;
  try {
    y = await fetch(g, I);
  } catch (N) {
    throw new Error(
      `Enterprise Portal 身份选择失败: ${N?.message || "网络请求失败"}`,
    );
  }
  const E = await Fr(y, { legacyChinese: !0 });
  (zn(E, g, I), y.redirected && y.url && mo(g, y.url) && nn(y.url));
  const C = so(E);
  if ((C && nn(C), E && Hn(E))) {
    const N = new Error(E.errorMsg || "用户未登录或登录态失效");
    throw (
      (N.code = rn),
      (N.data = E),
      (N.response = E),
      (N.isLoginExpired = !0),
      N
    );
  }
  if (!y.ok) throw new Error(`Enterprise Portal 身份选择失败: ${y.status}`);
  const w = E?.data && typeof E.data == "object" ? E.data : E,
    A = q(w, ["stat", "status"]).toLowerCase();
  if (
    !(
      E?.success === !0 ||
      E?.isSuccess === !0 ||
      E?.code === "10000" ||
      w?.success === !0 ||
      w?.isSuccess === !0 ||
      w?.code === "10000" ||
      A === "ok" ||
      A === "success"
    )
  )
    throw new Error(
      q(w, ["msg", "message", "errorMsg"]) ||
        q(E, ["msg", "message", "errorMsg"]) ||
        "Enterprise Portal 身份选择失败",
    );
  return E;
}
function Gl(e, { appScene: i = yt } = {}) {
  const o = e && typeof e == "object" ? e : {},
    c =
      o.data && typeof o.data == "object" && !Array.isArray(o.data)
        ? o.data
        : o,
    l = q(o, ["stat", "status"]).toUpperCase(),
    p = q(o, ["code", "resultCode", "errorCode"]).toUpperCase();
  if (
    o.success === !1 ||
    o.isSuccess === !1 ||
    ["FAILED", "FAIL", "ERROR", "DENY", "DENIED"].includes(l) ||
    ["FAILED", "FAIL", "ERROR", "DENY", "DENIED"].includes(p)
  )
    throw new Error(
      q(o, ["msg", "message", "errorMsg"]) ||
        "Enterprise Portal 登录上下文查询失败",
    );
  const f = Bn(c, ["regions"]),
    g = Nr(c.roleCodes || o.roleCodes),
    I = f
      .map((y) =>
        y && typeof y == "object"
          ? q(y, ["regionId", "id", "regionCode", "code", "value"])
          : String(y || "").trim(),
      )
      .filter(Boolean);
  return {
    appScene: q(c, ["appScene"]) || i,
    identitySelected: Ke(c.identitySelected) || Ke(o.identitySelected),
    personalUid: q(c, ["logonUserId", "userId", "personalUid", "accountId"]),
    operatorId: q(c, ["operatorId", "operatorUid"]),
    masterPid: q(c, ["masterPid", "merchantPid", "pid"]),
    masterUserId: q(c, ["masterUserId"]),
    masterOid: q(c, ["masterOid"]),
    masterCustomerId: q(c, ["masterCustomerId"]),
    merchantName: q(c, ["masterName", "merchantName", "principalName"]),
    accountType: q(c, ["accountType", "masterAccountType"]),
    roleCodes: g,
    regionMode: Ke(c.regionMode) || I.length > 0,
    regions: f,
    regionIds: I,
    raw: o,
  };
}
async function $l({ appScene: e = yt } = {}) {
  const i = new URL(`${po()}${hl}`),
    o = fo({ appScene: e });
  (o.set("fillZ97Tag", "0"), (i.search = o.toString()));
  const c = i.toString(),
    l = {
      method: "GET",
      credentials: "include",
      mode: "cors",
      referrerPolicy: "origin",
      headers: { Accept: "application/json, text/javascript, */*" },
      cache: "no-store",
    };
  let p;
  try {
    p = await fetch(c, l);
  } catch (I) {
    throw new Error(
      `Enterprise Portal 登录上下文查询失败: ${I?.message || "网络请求失败"}`,
    );
  }
  const f = await Fr(p, { legacyChinese: !0 });
  (zn(f, c, l), p.redirected && p.url && mo(c, p.url) && nn(p.url));
  const g = so(f);
  if ((g && nn(g), f && Hn(f))) {
    const I = new Error(f.errorMsg || "用户未登录或登录态失效");
    throw (
      (I.code = rn),
      (I.data = f),
      (I.response = f),
      (I.isLoginExpired = !0),
      I
    );
  }
  if (!p.ok)
    throw new Error(`Enterprise Portal 登录上下文查询失败: ${p.status}`);
  return Gl(f, { appScene: e });
}
async function Yl(e = {}) {
  const i = jn(new URLSearchParams(), e),
    o = await $e(`/account/in-transit?${i.toString()}`),
    c = qe(o, {});
  return {
    inTransit: c?.inTransit === !0,
    accountInTransit: c?.accountInTransit === !0,
    pipelineInTransit: c?.pipelineInTransit === !0,
    accountRegisterProductOpenInTransit:
      c?.accountRegisterProductOpenInTransit === !0,
    pipeline: c?.pipeline && typeof c.pipeline == "object" ? c.pipeline : null,
    status: c?.status || "",
    applicationId: c?.applicationId || "",
    message: c?.message || "",
    ipRoleId: c?.ipRoleId || "",
    productName: c?.productName || "",
    raw: c,
  };
}
async function Wl() {
  const e = await co("/backend/products"),
    i = qe(vl(e), []);
  return (Array.isArray(i) ? i : [])
    .map(Ol)
    .sort((o, c) => o.displayOrder - c.displayOrder);
}
async function qn(e = {}) {
  const i = await co(wl, {
      method: "POST",
      body: {
        limit: e.limit ?? 50,
        offset: e.offset ?? 0,
        ...e,
        serviceStatus: e.serviceStatus || "ACTIVE",
      },
    }),
    o = ps(i, {});
  return {
    items: (Array.isArray(o?.items) ? o.items : [])
      .map(us)
      .filter((l) => l.serviceId && l.serviceName),
    pagination: o?.pagination || null,
    raw: o,
  };
}
async function Ql(e = {}) {
  const i = Number(e.pageNum || 1),
    o = Number(e.pageSize || Vn),
    c = lo(e.keyword),
    l = e.status && e.status !== "ALL" ? e.status : "ALL",
    p = l === "ALL" ? Lr : Un[l],
    f = !!c || l !== "ALL",
    g = qn({
      keyword: c || void 0,
      serviceStatus: p,
      limit: o,
      offset: (i - 1) * o,
    }),
    I = f ? qn({ serviceStatus: Lr, limit: 1, offset: 0 }) : g,
    [y, E] = await Promise.all([g, I]),
    C = ls(y.items || [])
      .filter((w) => l === "ALL" || w.manageStatus === l)
      .filter((w) => Fl(w, c));
  return {
    list: C,
    total: Number(y.pagination?.total || C.length),
    quotaTotal: Number(E.pagination?.total || E.items?.length || 0),
    ifWhiteUid: Bl(E.items || []),
    pageNum: i,
    pageSize: o,
  };
}
async function Jl(e) {
  if (!e) return null;
  const i = await qn({ limit: Vn, offset: 0, keyword: e, serviceStatus: Lr });
  return i.items.find((o) => o.serviceId === e) || i.items[0] || null;
}
async function Xl(e, i = null) {
  const o = lo(e);
  if (!o) return null;
  const c = await qn({ keyword: o, serviceStatus: Lr, limit: Vn, offset: 0 }),
    l = ls(c.items || []);
  return (
    l.find((p) => p.serviceId === o) ||
    l.find((p) => i?.resourceUrl && p.resourceUrl === i.resourceUrl) ||
    l.find((p) => i?.serviceName && p.serviceName === i.serviceName) ||
    i ||
    null
  );
}
async function Zl(e = {}) {
  const i = ce(e.pricing),
    o = ce(e.schemaUrl || e.schema_url),
    c = ce(e.serviceDesc),
    l = e.submitAction || e.action || "submit",
    p = l === "save",
    f = {
      serviceId: ce(e.serviceId),
      serviceName: ce(e.serviceName),
      serviceType: ce(e.serviceType) || "API",
      httpMethod: "POST",
      serviceDesc: c,
      serviceSummary: c,
      resourceUrl: ce(e.resourceUrl),
      chargeType: "PAID",
      paymentProtocol: "A2A",
      paymentRequirements: {},
      metadata: {
        pricing: i,
        schema_url: o,
        serviceManageStatus: p ? "DRAFT" : "SUBMITTED",
        submitAction: l,
      },
      extInfo: {
        pricing: i,
        schema_url: o,
        serviceManageStatus: p ? "DRAFT" : "SUBMITTED",
        submitAction: l,
      },
    },
    g = await co(Cl, {
      method: "POST",
      body: Object.fromEntries(Object.entries(f).filter(([, w]) => w !== "")),
    }),
    I = ps(g, {}),
    y = I && typeof I == "object" && !Array.isArray(I) ? I : {},
    E = {
      ...f,
      ...y,
      metadata: { ...f.metadata, ...(y.metadata || {}) },
      extInfo: { ...f.extInfo, ...(y.extInfo || {}) },
    };
  return E.serviceId || E.service_id || E.id || E.resourceId ? us(E) : null;
}
async function ji(e, i = {}) {
  const o = {
      ...jd(),
      isMobile:
        /Android|iPhone|iPad|iPod|HarmonyOS|OpenHarmony/i.test(
          navigator.userAgent,
        ) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    },
    c = uo(i),
    l = {
      productCode: e,
      subjectType: i.subjectType || "USER",
      subjectId: i.subjectId || "",
      enterprisePipeline: c.enterprisePipeline,
      enterpriseRegistration: c.enterpriseRegistration,
      extInfo: o,
    },
    p = await $e("/pipeline/start", {
      method: "POST",
      structuredError: !0,
      body: l,
    });
  return on(qe(p, {}, { structuredError: !0, strictCode: i.strictCode }));
}
async function Qt(e, i = {}) {
  const o = jn(new URLSearchParams({ instanceId: e }), i),
    c = await $e(`/pipeline/detail?${o.toString()}`, {
      structuredError: i.strictCode,
    });
  return on(
    qe(c, {}, { structuredError: i.strictCode, strictCode: i.strictCode }),
  );
}
async function Le(e, i, o = {}) {
  const c = jn(new URLSearchParams({ instanceId: e, nodeId: i }), o),
    l = await $e(`/pipeline/node/form?${c.toString()}`, {
      structuredError: o.strictCode,
    }),
    p = qe(l, {}, { structuredError: o.strictCode, strictCode: o.strictCode });
  return ds({ ...p, pluginCode: p.pluginCode || o.pluginCode || "" });
}
async function eu(e, i, o = {}) {
  const c = jn(new URLSearchParams({ instanceId: e, nodeId: i }), o),
    l = await $e(`/pipeline/node/productOpenQuery?${c.toString()}`, {
      method: "POST",
      structuredError: !0,
    });
  return qe(l, null, { structuredError: !0, strictCode: !0 });
}
function Fa(e = {}) {
  return Object.fromEntries(
    Object.entries(e || {})
      .filter(([, i]) => i != null && typeof i != "function")
      .map(([i, o]) => [
        i,
        typeof o == "object" ? JSON.stringify(o) : String(o),
      ]),
  );
}
function Vr(e = {}) {
  const {
      instanceId: i,
      nodeId: o,
      actionType: c,
      formData: l,
      payload: p,
    } = e,
    f = uo(e);
  return {
    instanceId: i,
    nodeId: o,
    actionType: c,
    enterprisePipeline: f.enterprisePipeline,
    enterpriseRegistration: f.enterpriseRegistration,
    formData: e.strictCode ? Fa(l) : l || {},
    payload: e.strictCode ? Fa(p) : p || {},
  };
}
async function it(e) {
  const i = await $e("/pipeline/node/submit", {
    method: "POST",
    body: Vr({ ...e, actionType: e.actionType || "SUBMIT" }),
    errorMessage: La,
    structuredError: e.strictCode,
  });
  return on(
    qe(
      i,
      {},
      {
        errorMessage: La,
        strictCode: e.strictCode,
        structuredError: e.strictCode,
      },
    ),
  );
}
async function Va(e) {
  const i = await $e("/pipeline/node/saveDraft", {
    method: "POST",
    body: Vr({ ...e, actionType: "SAVE_DRAFT" }),
    structuredError: e.strictCode,
  });
  return on(
    qe(i, {}, { strictCode: e.strictCode, structuredError: e.strictCode }),
  );
}
async function qa(e) {
  const i = await $e("/pipeline/node/handleNodeData", {
    method: "POST",
    body: Vr(e),
    structuredError: e.strictCode,
  });
  return on(
    qe(i, {}, { strictCode: e.strictCode, structuredError: e.strictCode }),
  );
}
async function Rt(e) {
  const i = await $e("/pipeline/node/action", {
    method: "POST",
    body: Vr(e),
    structuredError: e.strictCode,
  });
  return on(
    qe(i, {}, { strictCode: e.strictCode, structuredError: e.strictCode }),
  );
}
const tu = {
    tech: ["TECH_INTEGRATION", "SANDBOX_TEST"],
    product: ["PRODUCT_OPEN", "ACCOUNT_REGISTER_PRODUCT_OPEN"],
    service: ["SERVICE_REGISTER"],
    keys: ["KEY_CONFIG"],
    verify: ["ONLINE_VERIFY", "ONLINE_INTEGRATION"],
    success: ["SUCCESS"],
  },
  ka = {
    techIntegration: "tech",
    sandboxTest: "tech",
    productOpen: "product",
    enterpriseAccountRegisterProductOpen: "product",
    serviceRegister: "service",
    keyConfig: "keys",
    onlineVerify: "verify",
    onlineIntegration: "verify",
  },
  nu = new Set(["SUCCESS", "COMPLETED", "COMPLETE", "DONE", "FINISHED"]),
  ru = "ENTERPRISE_",
  Xt = "ACCOUNT_REGISTER_PRODUCT_OPEN";
function Ji(e, { enterprisePipelineRequested: i = !1 } = {}) {
  return i ||
    e?.selectedSubjectType === "MERCHANT" ||
    String(e?.pipelineView?.pipelineCode || "")
      .toUpperCase()
      .startsWith(ru)
    ? !0
    : qr(e?.pipelineView).some((c) => _e(c));
}
function iu(e, { enterpriseRegistrationRequested: i = !1 } = {}) {
  const o = String(
    e?.pipelineView?.instanceId || e?.pipelineInstanceId || "",
  ).trim();
  return !i || e?.selectedSubjectType !== "USER" || !o
    ? {}
    : { enterpriseRegistration: !0, instanceId: o };
}
function le(e) {
  const i = String(e?.status || "").toUpperCase();
  if (H(e)) return i === "SUCCESS";
  const o = e?.progress;
  return (
    nu.has(i) ||
    (Number(o?.total) > 0 && Number(o?.completed) >= Number(o?.total))
  );
}
function pe(e) {
  const i = Ce(e);
  if (i) return ["app-key", "web-key"].includes(i) ? "keys" : i;
  const o = typeof e == "string" ? e : String(e?.nodeId || "").toUpperCase(),
    c = typeof e == "string" ? "" : e?.formKey || "";
  if (c && ka[c]) return ka[c];
  const l = o.toUpperCase(),
    p = Object.entries(tu).find(([, f]) => f.includes(l));
  return p
    ? p[0]
    : l.includes("TECH") || l.includes("SANDBOX")
      ? "tech"
      : l.includes("SERVICE")
        ? "service"
        : l.includes("PRODUCT")
          ? "product"
          : l.includes("KEY") || l.includes("APP")
            ? "keys"
            : l.includes("VERIFY") || l.includes("ONLINE")
              ? "verify"
              : "product";
}
function qr(e) {
  const i = e?.renderGraph?.nodes;
  return Array.isArray(i) ? i.filter((o) => o.visible !== !1) : [];
}
function go(e) {
  return qr(e).filter((i) => i.nodeType !== "GUIDE");
}
function ou(e) {
  return e?.currentForm || null;
}
function V(e, i) {
  return (i && qr(e).find((o) => o.nodeId === i)) || null;
}
function Ln(e, i) {
  const o = go(e),
    c = e?.currentForm?.nodeId || e?.currentNodeIds?.[0] || "",
    l = V(e, c);
  return l && pe(l) === i ? l : o.find((p) => pe(p) === i) || null;
}
function On(e, i = "tech") {
  if (le(e)) return "success";
  const o = ou(e);
  if (o?.nodeId || o?.formKey)
    return pe({
      ...V(e, o.nodeId),
      ...o,
      pluginCode: o.pluginCode || V(e, o.nodeId)?.pluginCode,
    });
  const c = V(e, e?.currentNodeIds?.[0]);
  if (c) return pe(c);
  const l = go(e)[0];
  return l ? pe(l) : i;
}
function br(e) {
  return e?.viewState === "EDITABLE";
}
function ms(e, i, o = !1, c = "register_and_sign") {
  return !["component", "pending", "failed", "completed"].includes(e) ||
    !i.businessProductCode
    ? !1
    : e === "completed"
      ? !0
      : c === "sign_only" && !i.externalBizId
        ? !1
        : o || !!i.externalBizId;
}
let Ha = !1,
  Ar = null;
function za(e) {
  window.yuyanMonitor?.log({
    code: 1013,
    msg: "mobile_login_alipay_open",
    d1: location.pathname,
    d2: document.title,
    d3: e,
  });
}
function au() {
  const e = document.querySelector(".communityUi"),
    i = (c) => (e ? Hd("mobileLogin", c) : ""),
    o = document.createElement("dialog");
  return (
    e || (o.className = "mobileLoginPrompt"),
    o.setAttribute("aria-labelledby", "mobile-login-title"),
    o.setAttribute("aria-describedby", "mobile-login-message"),
    (o.innerHTML = `
    <div class="modalInner"><section ${i()} class="communityConfirmDialog">
      <div class="modalHead">
        <h2 id="mobile-login-title">在支付宝打开${e ? "社区" : "AI 付"}</h2>
        <button class="close" type="button" data-mobile-login-cancel data-mobile-login-close ${i("cancel")} aria-label="关闭提示">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </div>
      <p class="subtle" id="mobile-login-message">检测到您可能是在移动端访问，可跳转到支付宝打开${e ? "社区" : "AI 付"}并登录。</p>
      <div class="modalActions">
        <button class="btn" type="button" data-mobile-login-cancel ${i("cancel")}>取消</button>
        <button class="btn primary" type="button" data-mobile-login-open ${i("open")}>打开支付宝</button>
      </div>
    </section></div>`),
    { dialog: o, container: e || document.body }
  );
}
function su({ signal: e, createPrompt: i = au, returnPath: o } = {}) {
  if (e?.aborted) return Promise.resolve(!1);
  if (Ar)
    return (Ar.openButton.focus({ preventScroll: !0 }), Promise.resolve(!1));
  const c = navigator.userAgent;
  if (
    !(
      /Android|iPhone|iPad|iPod|HarmonyOS|OpenHarmony/i.test(c) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) ||
    /AlipayClient/i.test(c)
  )
    return Promise.resolve(!0);
  const p = new URL(location.href);
  o &&
    o !== location.pathname + location.search + location.hash &&
    (p.searchParams.set("aipay_login", "1"),
    p.searchParams.set("aipay_return_to", o));
  const f =
      "alipays://platformapi/startapp?appId=20000067&url=" +
      encodeURIComponent(p.href),
    g = Kd(f),
    I = document.activeElement,
    { dialog: y, container: E = document.body, report: C } = i();
  return new Promise((w) => {
    let A = !1,
      L = 0;
    const N = new AbortController(),
      D = (r, M, ne) => r.addEventListener(M, ne, { signal: N.signal }),
      k = y.querySelector("[data-mobile-login-open]"),
      x = () => _(!1),
      P = () => _(!0);
    Ar = { openButton: k, close: x };
    function _(r) {
      A ||
        ((A = !0),
        cancelAnimationFrame(L),
        e?.removeEventListener("abort", x),
        N.abort(),
        y.open && y.close(),
        y.remove(),
        (Ar = null),
        I?.isConnected && I.focus({ preventScroll: !0 }),
        w(r));
    }
    (y.querySelectorAll("[data-mobile-login-cancel]").forEach((r) =>
      D(r, "click", () => {
        (C?.(r.hasAttribute("data-mobile-login-close") ? "close" : "cancel"),
          P());
      }),
    ),
      D(k, "click", () => {
        (cancelAnimationFrame(L),
          C?.("open"),
          g.manualInvokeApp(),
          za("manual"));
      }),
      D(y, "cancel", (r) => {
        (r.preventDefault(), C?.("close", "escape"), P());
      }),
      D(y, "close", P),
      e?.addEventListener("abort", x, { once: !0 }),
      D(window, "pagehide", x),
      D(window, "popstate", x),
      D(document, "astro:before-swap", x),
      E.append(y),
      y.showModal(),
      kd(y),
      C?.("prompt_exposure"),
      k.focus({ preventScroll: !0 }),
      Ha ||
        ((Ha = !0),
        (L = requestAnimationFrame(() => {
          (C?.("auto_open"), g.run(), za("auto"));
        }))));
  });
}
const cu = [
    "data-aspm",
    "data-aspm-click",
    "data-aspm-desc",
    "data-aspm-expo",
    "data-aspm-param",
  ],
  gs = {
    "/open-flow": { spmc: "c486868", name: "业务开通入口", actions: {} },
    "/open-flow/products": {
      spmc: "c486869",
      name: "产品选择",
      actions: {
        "products.selectMetered": {
          spmd: "d737434",
          name: "产品选择-选择按量付费",
        },
        "products.selectMobile": {
          spmd: "d737435",
          name: "产品选择-选择移动应用收款",
        },
        "products.selectWeb": {
          spmd: "d737433",
          name: "产品选择-选择网页应用收款",
        },
        "products.selectTraditional": {
          spmd: "d737439",
          name: "产品选择-选择传统供给技能变现",
        },
        "products.selectVibe": {
          spmd: "d773779",
          name: "产品选择-应用收款接入",
        },
        "products.selectSubscription": {
          spmd: "d773780",
          name: "产品选择-连续订阅接入",
        },
        "products.viewAgent": {
          spmd: "d737437",
          name: "产品选择-查看智能体支付",
        },
        "products.merchantPlatform": {
          spmd: "d737438",
          name: "产品选择-前往商家平台",
        },
        "products.completeCertification": {
          spmd: "d737436",
          name: "产品选择-完成身份认证",
        },
      },
    },
    "/open-flow/console": {
      spmc: "c486870",
      name: "接入控制台",
      actions: {
        "console.viewProducts": {
          spmd: "d737442",
          name: "接入控制台-查看产品管理",
        },
        "console.viewServices": {
          spmd: "d737446",
          name: "接入控制台-查看服务管理",
        },
        "console.createService": {
          spmd: "d737441",
          name: "接入控制台-注册新服务",
        },
        "console.searchServices": {
          spmd: "d737445",
          name: "接入控制台-查询服务",
        },
        "console.viewService": {
          spmd: "d737440",
          name: "接入控制台-查看服务详情",
        },
        "console.editService": { spmd: "d737444", name: "接入控制台-修改服务" },
        "console.submitService": {
          spmd: "d737443",
          name: "接入控制台-提交服务",
        },
      },
    },
    "/open-flow/tech": {
      spmc: "c486872",
      name: "技术集成",
      actions: {
        "tech.showCode": { spmd: "d737455", name: "技术集成-切换代码接入" },
        "tech.showSandbox": { spmd: "d737451", name: "技术集成-切换沙箱测试" },
        "tech.copySkillPrompt": {
          spmd: "d737452",
          name: "技术集成-复制技能提示词",
        },
        "tech.viewGuide": {
          spmd: "d737450",
          name: "技术集成-查看产品接入指南",
        },
        "tech.complete": { spmd: "d737453", name: "技术集成-完成集成" },
        "tech.skip": { spmd: "d737454", name: "技术集成-暂时跳过" },
      },
    },
    "/open-flow/product": {
      spmc: "c486871",
      name: "产品开通",
      actions: {
        "product.submit": {
          spmd: "d737448",
          name: "产品开通-提交开通",
          manual: !0,
        },
        "product.reopen": {
          spmd: "d737447",
          name: "产品开通-重新发起开通",
          manual: !0,
        },
        "product.skip": {
          spmd: "d737449",
          name: "产品开通-暂时跳过",
          manual: !0,
        },
      },
    },
    "/open-flow/service": {
      spmc: "c486865",
      name: "服务注册",
      actions: {
        "service.openManagement": {
          spmd: "d737422",
          name: "服务注册-打开服务管理",
        },
        "service.registerNew": { spmd: "d737421", name: "服务注册-注册新服务" },
        "service.viewDetail": {
          spmd: "d737425",
          name: "服务注册-查看服务详情",
        },
        "service.useExisting": {
          spmd: "d737423",
          name: "服务注册-使用已有服务",
        },
        "service.submit": { spmd: "d737426", name: "服务注册-提交注册" },
        "service.skip": { spmd: "d737420", name: "服务注册-暂时跳过" },
        "service.rechoose": { spmd: "d737424", name: "服务注册-重新选择服务" },
      },
    },
    "/open-flow/keys": {
      spmc: "c486864",
      name: "密钥配置",
      actions: {
        "keys.createApp": {
          spmd: "d737419",
          name: "密钥配置-创建应用",
          manual: !0,
        },
        "keys.approveApp": {
          spmd: "d737418",
          name: "密钥配置-完成应用授权",
          manual: !0,
        },
        "keys.reopen": {
          spmd: "d737417",
          name: "密钥配置-重新配置",
          manual: !0,
        },
      },
    },
    "/open-flow/verify": {
      spmc: "c486867",
      name: "线上验证",
      actions: {
        "verify.showIntegration": {
          spmd: "d737432",
          name: "线上验证-切换线上集成",
        },
        "verify.showTransaction": {
          spmd: "d737431",
          name: "线上验证-切换交易验证",
        },
        "verify.copySandbox": {
          spmd: "d737429",
          name: "线上验证-复制沙箱配置",
        },
        "verify.copyProduction": {
          spmd: "d737428",
          name: "线上验证-复制线上配置",
        },
        "verify.verifyTrade": { spmd: "d737430", name: "线上验证-验证交易" },
      },
    },
    "/open-flow/success": {
      spmc: "c486866",
      name: "接入成功",
      actions: {
        "success.openConsole": { spmd: "d737427", name: "接入成功-进入工作台" },
      },
    },
  };
let Xi, Zi, Ki;
function du(e) {
  const i = {
      WEB: "products.selectWeb",
      AI_WEB_APP_PAY: "products.selectWeb",
      ONLINE: "products.selectMobile",
      AI_MOBILE_APP_PAY: "products.selectMobile",
      METERED: "products.selectMetered",
      PAY_BY_API: "products.selectMetered",
      "TRADITIONAL-SUPPLY-SKILL": "products.selectTraditional",
      "VIBE-PAY": "products.selectVibe",
      AI_SUBSCRIPTION: "products.selectSubscription",
    }[String(e || "").toUpperCase()],
    o = gs["/open-flow/products"],
    c = o.actions[i];
  if (c)
    return {
      spm: `${Xd}.${ns("/open-flow/products").spmb}.${o.spmc}.${c.spmd}`,
      name: c.name,
    };
}
function Is(e) {
  cu.forEach((i) => e.removeAttribute(i));
}
function eo(e) {
  Is(e);
  const i = e.getAttribute("data-onboarding-spm-action"),
    o = Zi?.actions[i];
  !o ||
    o.manual ||
    (e.setAttribute("data-aspm-click", `${Zi.spmc}.${o.spmd}`),
    e.setAttribute("data-aspm-desc", o.name),
    e.setAttribute("data-aspm-expo", ""),
    e.setAttribute("data-aspm-param", ""));
}
function lu(e) {
  (e.matches?.("[data-onboarding-spm-action]") && eo(e),
    e.querySelectorAll?.("[data-onboarding-spm-action]").forEach((i) => eo(i)));
}
function uu(e, i) {
  (Is(e),
    i &&
      (e.setAttribute("data-aspm", i.spmc),
      e.setAttribute("data-aspm-desc", i.name),
      e.setAttribute("data-aspm-expo", ""),
      e.setAttribute("data-aspm-param", "")),
    e.querySelectorAll("[data-onboarding-spm-action]").forEach((o) => eo(o)));
}
function pu(e, i) {
  if (typeof window > "u" || !e) return;
  const o = window._to?.spmBPos,
    c = window._to?.pathName;
  (document.body?.setAttribute("data-aspm", e.spmb),
    document.body?.setAttribute(
      "data-biz-type",
      window._to?.bizType || "common",
    ),
    (window._to = {
      ...(window._to || {}),
      spmBPos: e.spmb,
      pathName: i,
      name: e.title,
    }),
    (window.__aipaySpmPageName = e.title),
    !(
      (o === e.spmb && c === i) ||
      !window.Tracert?.call ||
      window.Tracert._isInit === !0
    ) &&
      (window.Tracert.call("set", window._to),
      window.Tracert.call("pageName", e.title)));
}
function Ss(e) {
  return gs[ts(e)];
}
function Rr(e) {
  const i = ts(e),
    o = Ss(i),
    c = ns(i);
  return ((Zi = o), Xi && uu(Xi, o), c && pu(c, i), !!(o && c));
}
function fu(e) {
  ((Xi = e),
    Rr(window.location.pathname),
    Ki?.disconnect(),
    (Ki = new MutationObserver((i) => {
      i.forEach((o) => {
        o.addedNodes.forEach((c) => {
          c instanceof Element && lu(c);
        });
      });
    })),
    Ki.observe(e, { childList: !0, subtree: !0 }));
}
const Gi = new WeakSet();
function Mn(e, { reset: i = !1 } = {}) {
  const o = "[data-onboarding-spm-exposure]",
    c = Array.from(e.querySelectorAll(o));
  (e.matches(o) && c.unshift(e),
    c.forEach((l) => {
      const p = l.getAttribute("data-onboarding-spm-exposure");
      if (i) {
        Gi.delete(l);
        return;
      }
      requestAnimationFrame(() => {
        l.closest("[hidden]") ||
          !window.Tracert?.call ||
          Gi.has(l) ||
          (window.Tracert.call("expo", p), Gi.add(l));
      });
    }));
}
function Jt(e) {
  const i = Ss(window.location.pathname),
    o = i?.actions[e];
  return !i || !o || !window.Tracert?.click
    ? !1
    : (window.Tracert.click(`${i.spmc}.${o.spmd}`, {}), !0);
}
const ja = "此内容导致审核失败，请重新编辑",
  Fn = Ot.filter((e) => e !== "success"),
  tn = "KEY_CONFIG",
  mu = "onlineVerify",
  gu = new Set([
    "SUCCESS",
    "COMPLETED",
    "COMPLETE",
    "DONE",
    "FINISHED",
    "OPEN",
    "OPENED",
  ]),
  Iu = new Set([
    "WAITING_RESULT",
    "IN_PROGRESS",
    "PROCESSING",
    "RUNNING",
    "SUBMITTED",
    "PENDING",
    "REVIEW",
    "REVIEWING",
  ]),
  Or = "获取应用信息失败，请确认密钥配置已完成",
  Mr = "获取应用公钥失败，请前往开放平台查看",
  ys = "（需自行配置线上 JAVA 语言私钥）",
  Es = "（需自行配置线上非 JAVA 语言私钥）",
  Ka = "正在加载...",
  xr = "获取支付宝公钥失败，请前往开放平台查看",
  Su = "npx -y @alipay/alipay-aipay@latest install",
  $i = "请前往查看最新进展",
  Ga = {
    TECH: "TECH_INTEGRATION",
    TECH_INTEGRATION: "TECH_INTEGRATION",
    SANDBOX: "SANDBOX_TEST",
    SANDBOX_TEST: "SANDBOX_TEST",
    PRODUCT: "PRODUCT_OPEN",
    PRODUCT_OPEN: "PRODUCT_OPEN",
    SERVICE: "SERVICE_REGISTER",
    SERVICE_REGISTER: "SERVICE_REGISTER",
    KEY: "KEY_CONFIG",
    KEYS: "KEY_CONFIG",
    KEY_CONFIG: "KEY_CONFIG",
    APP: "KEY_CONFIG",
    VERIFY: "ONLINE_VERIFY",
    ONLINE: "ONLINE_VERIFY",
    ONLINE_VERIFY: "ONLINE_VERIFY",
    ONLINE_INTEGRATION: "ONLINE_INTEGRATION",
  },
  $a = {
    AI_MOBILE_APP_PAY:
      "https://aipay.alipay.com/docs/vibe-pay/mobile-app-pay/app-pay-integration-guide-new.html",
    AI_WEB_APP_PAY:
      "https://aipay.alipay.com/docs/vibe-pay/ai-web-app-payment-qianyi/ai-web-app-payment-integration-guide.html",
    PAY_BY_API: "https://aipay.alipay.com/docs/ai-receive/MACHINE_PAY.html",
  },
  Ya = {
    metered: "PAY_BY_API",
    online: "AI_MOBILE_APP_PAY",
    web: "AI_WEB_APP_PAY",
  },
  mt = {
    metered: {
      tech: "为我的 api 接口集成按量付费",
      agent: "为我的 api 接口集成按量付费",
    },
    web: { tech: "为我的项目集成网站支付", agent: "为我的项目集成网站支付" },
    online: {
      tech: "为我的 APP 集成支付宝支付",
      agent: "为我的 APP 集成支付宝支付",
    },
  },
  yu = {
    APPROVED: "审核已通过",
    REJECTED: "审核未通过",
    PENDING: "审核中",
    DRAFT: "暂存",
  },
  Eu = 10,
  to = new Map(),
  Yi = new Map();
let hu = 0;
function St(e, i, o) {
  e.querySelectorAll(i).forEach((c) => {
    c.textContent = o;
  });
}
function wu(e, i, o) {
  const c = i.pipelineView?.productName
      ? {
          name: i.pipelineView.productName,
          desc: i.pipelineView.description || o.desc,
          iconUrl: i.pipelineView.iconUrl,
        }
      : null,
    l = c?.name || o.name,
    p = c?.desc || o.desc;
  (St(e, "[data-selected-product-name]", l),
    St(e, "[data-selected-product-desc]", p),
    St(e, "[data-summary-product]", l),
    St(e, "[data-wizard-product-name]", l));
  const f = e.querySelector("[data-selected-product-icon]");
  if (
    f instanceof HTMLElement &&
    ((f.className = "productChoiceIcon"), f.replaceChildren(), c?.iconUrl)
  ) {
    f.classList.add("hasRemoteIcon");
    const g = document.createElement("img");
    ((g.className = "productChoiceIconImage"),
      (g.src = c.iconUrl),
      (g.alt = ""),
      (g.loading = "lazy"),
      (g.decoding = "async"),
      f.append(g));
  }
}
function hs(e) {
  return (
    {
      tech: "技术集成",
      product: "产品开通",
      service: "服务注册",
      keys: "密钥配置",
      "app-auth": "应用授权",
      verify: "线上验证",
      success: "接入成功",
    }[e] || e
  );
}
function Io(e) {
  const i = String(e?.flowStatus || "").toUpperCase(),
    o = String(e?.nodeStatus || "").toUpperCase();
  return i === "COMPLETED" ||
    e?.viewState === "COMPLETED" ||
    o === "SUCCESS" ||
    i === "SUCCESS"
    ? null
    : i === "FAILED" || o === "FAILED"
      ? { className: "isFailed", text: "审核失败", title: e.failMsg || "" }
      : i === "WAITING_RESULT" || o === "WAITING_RESULT"
        ? { className: "isProcessing", text: "审核中", title: "" }
        : null;
}
function So(e, i) {
  return i?.nodeId === e.nodeId
    ? {
        ...e,
        flowStatus: i.flowStatus || e.flowStatus,
        nodeStatus: i.nodeStatus || e.nodeStatus,
        viewState: i.viewState || e.viewState,
        failMsg: i.failMsg || e.failMsg,
        blockers: i.blockers?.length ? i.blockers : e.blockers,
      }
    : e;
}
function Cu(e) {
  return (
    e.flowStatus === "COMPLETED" ||
    e.viewState === "COMPLETED" ||
    e.nodeStatus === "SUCCESS"
  );
}
function bu(e, i) {
  return e
    .map((o) => {
      const c = So(o, i),
        l = Io(c);
      return [
        o.nodeId,
        pe(o),
        c.nodeName || "",
        c.nodeType || "",
        c.flowStatus || "",
        c.nodeStatus || "",
        c.viewState || "",
        l?.className || "",
        l?.text || "",
        l?.title || "",
      ].join("");
    })
    .join("");
}
function ws(e, i, o) {
  const c = Io(i);
  (e.classList.toggle("isGuide", i.nodeType === "GUIDE"),
    e.classList.toggle("isFailed", c?.className === "isFailed"),
    e.classList.toggle("isProcessing", c?.className === "isProcessing"),
    e.classList.toggle("isDone", Cu(i)),
    e.classList.toggle("isActive", i.nodeId === o.pipelineCurrentNodeId),
    i.nodeId === o.pipelineCurrentNodeId
      ? e.setAttribute("aria-current", "step")
      : e.removeAttribute("aria-current"));
}
function Au(e, i, o, c) {
  const l = Array.from(e.querySelectorAll("[data-pipeline-node-id]"));
  i.forEach((p) => {
    const f = l.find(
      (g) => g.getAttribute("data-pipeline-node-id") === p.nodeId,
    );
    f instanceof HTMLButtonElement && ws(f, So(p, o), c);
  });
}
function Pu(e, i) {
  const o = e.querySelector("[data-wizard-step-rail]");
  if (!(o instanceof HTMLElement)) return !1;
  const c = qr(i.pipelineView).filter((f) => pe(f) !== "success");
  if (!c.length || i.currentStep === "success" || le(i.pipelineView))
    return (op(o), !1);
  o.dataset.wizardStepCount = String(c.length);
  const l = i.pipelineCurrentForm,
    p = bu(c, l);
  return o.dataset.pipelineRailSignature === p
    ? (Au(o, c, l, i), !0)
    : ((o.dataset.pipelineRailSignature = p),
      o.replaceChildren(),
      c.forEach((f) => {
        const g = So(f, l),
          I = pe(f),
          y = document.createElement("span");
        y.className = "wizardStepSlot";
        const E = document.createElement("button");
        ((E.className = "wizardStep"),
          (E.type = "button"),
          (E.dataset.wizardStep = I),
          (E.dataset.pipelineNodeId = f.nodeId));
        const C = document.createElement("strong"),
          w = document.createElement("span");
        ((w.className = "wizardStepTitleText"),
          (w.textContent = g.nodeName || hs(I)),
          C.append(w));
        const A = Io(g);
        if (A?.text) {
          const D = document.createElement("small");
          ((D.className = "wizardStepStatus"),
            (D.textContent = A.text),
            A.title && (D.title = A.title),
            C.append(D));
        }
        const L = document.createElement("span");
        ((L.className = "wizardStepIcon"),
          L.setAttribute("aria-hidden", "true"),
          E.append(C, L),
          ws(E, g, i));
        const N = document.createElement("span");
        ((N.className = "wizardStepConnector"),
          N.setAttribute("aria-hidden", "true"),
          y.append(E, N),
          o.append(y));
      }),
      !0);
}
function Tu(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm;
  return i?.nodeId === "SERVICE_REGISTER"
    ? i
    : o?.nodeId === "SERVICE_REGISTER"
      ? o
      : null;
}
function Ge(e) {
  if (!e) return null;
  if (typeof e == "object" && !Array.isArray(e)) return e;
  if (typeof e != "string") return null;
  try {
    const i = JSON.parse(e);
    return i && typeof i == "object" && !Array.isArray(i) ? i : null;
  } catch {
    return null;
  }
}
function xt(...e) {
  for (const i of e) {
    if (i == null) continue;
    const o = String(i).trim();
    if (o) return o;
  }
  return "";
}
function Kn(e = {}) {
  const i = e.pipelineView || {},
    o = i.raw || {},
    c = e.pipelineCurrentForm?.displayData || {},
    l = i.currentForm?.displayData || {},
    p = gt[e.selectedProduct] || null,
    f = i.productName && i.productName !== i.productCode ? i.productName : "";
  return xt(
    o.productName,
    o.product_name,
    f,
    c.productName,
    c.product_name,
    c.data?.productName,
    c.data?.product_name,
    l.productName,
    l.product_name,
    l.data?.productName,
    l.data?.product_name,
    p?.name,
    i.productName,
    "当前产品",
  );
}
function vu(e = {}) {
  const i = Kn(e);
  if (i.includes("按量")) return mt.metered;
  if (i.includes("网页") || i.includes("网站")) return mt.web;
  if (i.includes("移动") || i.includes("APP")) return mt.online;
  const o = String(
    e.pipelineView?.productCode || e.selectedProduct || "",
  ).toLowerCase();
  return mt[o]
    ? mt[o]
    : o.includes("meter") || o.includes("usage") || o.includes("call")
      ? mt.metered
      : o.includes("web") || o.includes("site") || o.includes("pc")
        ? mt.web
        : o.includes("app") || o.includes("mobile") || o.includes("online")
          ? mt.online
          : null;
}
function _u(e) {
  return `${/^[A-Za-z0-9]/.test(e) ? " " : ""}${e}`;
}
function no(e, i = {}) {
  const o = vu(e),
    c = Kn(e),
    l = o
      ? o[i.includeOnboarding ? "agent" : "tech"]
      : `为我集成${_u(c || "当前产品")}`,
    p = i.includeOnboarding ? "，完成沙箱测试，并完成签约入驻" : "";
  return `通过 ${Su} 安装支付宝 AI 付 Skill，加载 alipay-aipay 技能${l}${p}`;
}
function Nu(e) {
  const i = e == null ? "" : String(e).trim();
  return i ? Ya[i] || Ya[i.toLowerCase()] || i.toUpperCase() : "";
}
function Cs(e = {}) {
  const i = e.pipelineView || {},
    o = i.raw || {},
    c = e.pipelineCurrentForm?.displayData || {},
    l = i.currentForm?.displayData || {};
  return Nu(
    xt(
      o.productCode,
      o.product_code,
      o.businessProductCode,
      o.business_product_code,
      i.productCode,
      c.productCode,
      c.product_code,
      c.businessProductCode,
      c.business_product_code,
      c.data?.productCode,
      c.data?.product_code,
      c.data?.businessProductCode,
      c.data?.business_product_code,
      l.productCode,
      l.product_code,
      l.businessProductCode,
      l.business_product_code,
      l.data?.productCode,
      l.data?.product_code,
      l.data?.businessProductCode,
      l.data?.business_product_code,
      e.selectedProduct,
    ),
  );
}
function Ru(e) {
  return $a[e] || $a.PAY_BY_API;
}
function Lu(e = {}) {
  return Cs(e) === "PAY_BY_API" || Kn(e).includes("按量");
}
function Ou(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm;
  return be(i, e.pipelineView) ? i : be(o, e.pipelineView) ? o : null;
}
function Mu(e) {
  return (
    e.pipelineView?.renderGraph?.nodes?.find((i) => be(i, e.pipelineView)) ||
    null
  );
}
function kn(e) {
  return e.pipelineView?.renderGraph?.nodes?.find((i) => _e(i)) || null;
}
function xu(e) {
  const i = String(e.pipelineCurrentNodeId || "");
  return _e(i, e.pipelineView) || It(i, e.pipelineView) || [Xt, tn].includes(i)
    ? i
    : e.currentStep === "keys" && V(e.pipelineView, tn)
      ? tn
      : e.currentStep === "product" && kn(e)
        ? kn(e).nodeId
        : "";
}
function bs(e) {
  const i = e?.displayData || {},
    o = e?.formData || {},
    c = Ge(i.data) || {},
    l = Ge(o.data) || {};
  return {
    displayData: i,
    formData: o,
    externalBizId: xt(
      e?.externalBizId,
      e?.external_biz_id,
      e?.businessOrderNo,
      e?.business_order_no,
      e?.bizOrderNo,
      e?.biz_order_no,
      e?.batchOrderId,
      e?.batch_order_id,
      i.externalBizId,
      i.external_biz_id,
      i.business_order_no,
      i.businessOrderNo,
      i.biz_order_no,
      i.bizOrderNo,
      i.batch_order_id,
      i.batchOrderId,
      c.externalBizId,
      c.external_biz_id,
      c.business_order_no,
      c.businessOrderNo,
      c.biz_order_no,
      c.bizOrderNo,
      c.batch_order_id,
      c.batchOrderId,
      o.externalBizId,
      o.external_biz_id,
      o.business_order_no,
      o.businessOrderNo,
      o.biz_order_no,
      o.bizOrderNo,
      o.batch_order_id,
      o.batchOrderId,
      l.externalBizId,
      l.external_biz_id,
      l.business_order_no,
      l.businessOrderNo,
      l.biz_order_no,
      l.bizOrderNo,
      l.batch_order_id,
      l.batchOrderId,
    ),
    businessProductCode: xt(
      e?.businessProductCode,
      e?.business_product_code,
      i.businessProductCode,
      i.business_product_code,
      c.businessProductCode,
      c.business_product_code,
      o.businessProductCode,
      o.business_product_code,
      l.businessProductCode,
      l.business_product_code,
    ),
    bizChannelCode: xt(
      e?.bizChannelCode,
      e?.biz_channel_code,
      i.bizChannelCode,
      i.biz_channel_code,
      c.bizChannelCode,
      c.biz_channel_code,
      o.bizChannelCode,
      o.biz_channel_code,
      l.bizChannelCode,
      l.biz_channel_code,
      "B_SELF_HELP",
    ),
  };
}
function As(e, i) {
  return [
    e?.flowStatus,
    e?.viewState,
    e?.nodeStatus,
    i?.flowStatus,
    i?.viewState,
    i?.nodeStatus,
  ]
    .map((o) => String(o || "").toUpperCase())
    .some((o) => gu.has(o));
}
function Ps(e, i) {
  return [e?.flowStatus, e?.nodeStatus, i?.flowStatus, i?.nodeStatus]
    .map((o) => String(o || "").toUpperCase())
    .includes("FAILED");
}
function Du(e, i) {
  return (
    String(e?.viewState || i?.viewState || "").toUpperCase() === "EDITABLE"
  );
}
function Uu(e, i) {
  return As(e, i) || Ps(e, i)
    ? !1
    : String(e?.viewState || i?.viewState || "").toUpperCase() === "READONLY"
      ? !0
      : [e?.flowStatus, e?.nodeStatus, i?.flowStatus, i?.nodeStatus]
          .map((c) => String(c || "").toUpperCase())
          .some((c) => Iu.has(c));
}
function Bu(e, i, o) {
  if (!o.pipelineView?.instanceId || !i) return "";
  const c = _e(e, o.pipelineView) || _e(i, o.pipelineView);
  return e?.nodeId
    ? As(e, i)
      ? "completed"
      : Du(e, i)
        ? c || bs(e).externalBizId
          ? "component"
          : "form-error"
        : Ps(e, i)
          ? "failed"
          : Uu(e, i)
            ? "pending"
            : ""
    : o.productOpenFormError
      ? "form-error"
      : (o.productOpenFormLoading, "loading");
}
function Fu(e) {
  return (
    e.pipelineView?.renderGraph?.nodes?.find(
      (i) => i.nodeId === "SERVICE_REGISTER",
    ) || null
  );
}
function ro(e) {
  return (
    e?.flowStatus === "COMPLETED" ||
    e?.viewState === "COMPLETED" ||
    e?.nodeStatus === "SUCCESS"
  );
}
function Ts(e) {
  const i = e?.displayData || {},
    o = e?.formData || {},
    c = Ge(i.serviceDetail),
    l = Ge(c?.metadata) || c?.metadata || {},
    p = Ge(c?.extInfo) || c?.extInfo || {};
  return {
    ...o,
    ...i,
    ...(c || {}),
    pricing: c?.pricing || l?.pricing || i.pricing || o.pricing || "",
    schemaUrl:
      c?.schemaUrl ||
      c?.schema_url ||
      l?.schema_url ||
      l?.schemaUrl ||
      i.schemaUrl ||
      i.schema_url ||
      o.schemaUrl ||
      o.schema_url ||
      "",
    extInfo: p,
  };
}
function Dr(...e) {
  for (const i of e) {
    if (!i || typeof i != "object") continue;
    const o = i.serviceId || i.service_id || i.id || i.resourceId;
    if (o != null && String(o).trim()) return String(o).trim();
    const c = Ge(i.serviceDetail);
    if (c) {
      const l = c.serviceId || c.service_id || c.id || c.resourceId;
      if (l != null && String(l).trim()) return String(l).trim();
    }
  }
  return "";
}
function Vu(e) {
  return Ts(e);
}
function qu(e, i) {
  return (
    (e?.flowStatus === "FAILED" ||
      i?.flowStatus === "FAILED" ||
      i?.nodeStatus === "FAILED") &&
    (e?.viewState === "EDITABLE" || i?.viewState === "EDITABLE")
  );
}
function ku(e) {
  const i = String(e?.failMsg || e?.errorMsg || "").trim();
  return !i || /^(success|请求成功)$/i.test(i) ? "" : i;
}
function Hu(e, i) {
  return e?.viewState === "READONLY" || i?.viewState === "READONLY";
}
function zu(e, i) {
  return ro(e) || ro(i)
    ? !1
    : [e?.flowStatus, e?.nodeStatus, i?.flowStatus, i?.nodeStatus]
        .map((o) => String(o || "").toUpperCase())
        .includes("WAITING_RESULT");
}
function ju(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm;
  return i?.nodeId === e.pipelineCurrentNodeId
    ? i
    : o?.nodeId === e.pipelineCurrentNodeId
      ? o
      : null;
}
function Ku(e) {
  return (
    (e.pipelineCurrentNodeId &&
      e.pipelineView?.renderGraph?.nodes?.find(
        (i) => i.nodeId === e.pipelineCurrentNodeId,
      )) ||
    null
  );
}
function vs(e, i) {
  const o =
    Array.isArray(e?.blockers) && e.blockers.length ? e.blockers : i?.blockers;
  return Array.isArray(o) ? o.filter(Boolean) : [];
}
function Gu(e, i) {
  const o = String(e?.viewState || i?.viewState || "").toUpperCase(),
    c = String(e?.nodeStatus || i?.nodeStatus || "").toUpperCase(),
    p = vs(e, i).some(
      (f) => String(f?.code || "").toUpperCase() === "NO_OPERATOR_PERMISSION",
    );
  return o === "READONLY" && (c === "INIT" || p);
}
function $u(e) {
  const i = String(e?.code || e?.nodeId || e?.nodeCode || "")
    .trim()
    .toUpperCase()
    .replace(/[-\s]+/g, "_");
  return i
    ? Ga[i]
      ? Ga[i]
      : i.includes("TECH")
        ? "TECH_INTEGRATION"
        : i.includes("SANDBOX")
          ? "SANDBOX_TEST"
          : i.includes("PRODUCT")
            ? "PRODUCT_OPEN"
            : i.includes("SERVICE")
              ? "SERVICE_REGISTER"
              : i.includes("KEY") || i.includes("APP")
                ? "KEY_CONFIG"
                : i.includes("VERIFY")
                  ? "ONLINE_VERIFY"
                  : i.includes("ONLINE")
                    ? "ONLINE_INTEGRATION"
                    : ""
    : "";
}
function Yu(e, i, o) {
  const c = i.indexOf($i);
  if (!o || c === -1) {
    const I = document.createElement("span");
    ((I.textContent = i), e.append(I));
    return;
  }
  const l = i.slice(0, c),
    p = i.slice(c + $i.length);
  if (l) {
    const I = document.createElement("span");
    ((I.textContent = l), e.append(I));
  }
  const f = pe(o),
    g = document.createElement("a");
  if (
    ((g.className = "nodeBlockerLink"),
    (g.href = `/open-flow/${f}`),
    (g.dataset.openBlockerNode = o),
    (g.dataset.openBlockerStep = f),
    (g.textContent = $i),
    e.append(g),
    p)
  ) {
    const I = document.createElement("span");
    ((I.textContent = p), e.append(I));
  }
}
function Wu(e) {
  const i = document.createElement("p"),
    o =
      e?.message || e?.msg || e?.reason || "前置节点未完成，请先完成后再继续。";
  if (
    (Yu(i, String(o), $u(e)),
    String(e?.code || "").toUpperCase() === "TECH_INTEGRATION")
  ) {
    const c = document.createElement("button");
    ((c.className = "nodeBlockerAction"),
      (c.type = "button"),
      (c.dataset.completeBlockerNode = "TECH_INTEGRATION"),
      (c.textContent = "我已完成"),
      i.append(c));
  }
  return i;
}
function _s(e, i, o) {
  const c = Gu(i, o),
    l = vs(i, o),
    p = e.querySelector("[data-node-blocker-banner]"),
    f = e.querySelector("[data-node-blocker-list]");
  return (
    p instanceof HTMLElement && (p.hidden = !(c && l.length)),
    f instanceof HTMLElement &&
      (f.replaceChildren(), c && l.forEach((g) => f.append(Wu(g)))),
    c
  );
}
function Qu(e) {
  const o =
    (Ge(e?.extInfo) || e?.extInfo || {})?.rejectKey || e?.rejectKey || "";
  return new Set(
    String(o || "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map(Ju),
  );
}
function Ju(e) {
  const i = String(e || "").trim(),
    o = {
      typer: "serviceType",
      name: "serviceName",
      description: "serviceDesc",
      schema_url: "schemaUrl",
      schemaUrl: "schemaUrl",
      pricing: "pricing",
      endpoint_url: "resourceUrl",
      endpointUrl: "resourceUrl",
      currency: "pricing",
      seller_pid: "",
    };
  return o[i] !== void 0
    ? o[i]
    : /servicecard.*name|service_card.*name|service.*name/i.test(i)
      ? "serviceName"
      : /description|desc/i.test(i)
        ? "serviceDesc"
        : /endpoint|resource.*url|service.*url/i.test(i)
          ? "resourceUrl"
          : /schema|request.*example|request.*demo/i.test(i)
            ? "schemaUrl"
            : /pricing|price/i.test(i)
              ? "pricing"
              : i;
}
function Xu(e) {
  return [e.resourceUrl, e.pricing ? `${e.pricing} 元/次` : ""]
    .filter(Boolean)
    .join(" · ");
}
function Zu(e) {
  if (!e) return "";
  const i = String(e);
  try {
    return JSON.stringify(JSON.parse(i), null, 2);
  } catch {
    return i;
  }
}
function ep(e) {
  const i = e.selectedServiceId || "";
  return (e.registeredServices || []).find((o) => o.serviceId === i) || null;
}
function xn(e, i, o = {}) {
  const c = document.createElement("div"),
    l = ["fieldRow"];
  (o.wide && l.push("isWide"),
    o.stacked && l.push("isStacked"),
    o.className && l.push(o.className),
    (c.className = l.join(" ")));
  const p = document.createElement("span");
  p.textContent = e;
  let f,
    g = null;
  if (o.multiline) {
    if (
      ((f = document.createElement("textarea")),
      (f.rows = o.rows || 5),
      (f.value = i || ""),
      o.withCounter)
    ) {
      ((g = document.createElement("span")),
        (g.className = "serviceTextareaWrap"));
      const I = document.createElement("em");
      ((I.textContent = `${String(i || "").length}/500`), g.append(f, I));
    }
  } else
    ((f = document.createElement("input")),
      (f.type = "text"),
      (f.value = i || ""));
  if (((f.readOnly = !0), (f.disabled = !0), c.append(p, g || f), o.hint)) {
    const I = document.createElement("small");
    ((I.textContent = o.hint), c.append(I));
  }
  return c;
}
function Ns(e, i = {}) {
  const o = String(e || "").trim();
  if (!o) return null;
  const c = document.createElement("span");
  c.className = i.className || "serviceIdInline";
  const l = document.createElement("span");
  l.textContent = "服务ID";
  const p = document.createElement("span");
  p.className = "serviceIdValue";
  const f = document.createElement("strong");
  f.textContent = o;
  const g = document.createElement("button");
  return (
    (g.className = "serviceCopyButton"),
    (g.type = "button"),
    (g.dataset.copyText = o),
    g.setAttribute("aria-label", "复制服务ID"),
    p.append(f, g),
    c.append(l, p),
    c
  );
}
function tp(e, i) {
  const o = String(i || "").trim(),
    c = e.querySelector("[data-service-id-row]"),
    l = e.querySelector("[data-service-id-text]"),
    p = e.querySelector("[data-service-id-copy]");
  (c instanceof HTMLElement && (c.hidden = !o),
    l instanceof HTMLElement && (l.textContent = o),
    p instanceof HTMLElement && ((p.dataset.copyText = o), (p.hidden = !o)));
}
function np(e, i, o) {
  const c = document.createElement("div");
  ((c.className = "serviceDetailPanel"),
    (c.dataset.serviceDetailPanel = "true"));
  const l = Dr(i),
    p = i.serviceDesc || i.description || "",
    f = i.schema_url || i.schemaUrl || i.requestExample || i.requestDemo || "",
    g = document.createElement("div");
  g.className = "serviceFormGrid isReadonly";
  const I = Ns(l, { className: "fieldRow serviceIdRow" });
  (I && g.append(I),
    g.append(
      xn("服务类型", i.serviceType || "API", {
        hint: "目前仅支持以下：Restful 接口、回调接口。",
      }),
      xn("服务名称", i.serviceName, { hint: "例如：天气查询" }),
      xn("服务地址", i.resourceUrl, { hint: "可访问的接口地址" }),
    ));
  const y = document.createElement("div");
  y.className = "fieldRow isPricing";
  const E = document.createElement("span");
  E.textContent = "服务单价";
  const C = document.createElement("span");
  C.className = "priceInputGroup";
  const w = document.createElement("input");
  ((w.type = "text"),
    (w.value = i.pricing || ""),
    (w.readOnly = !0),
    (w.disabled = !0));
  const A = document.createElement("em");
  A.textContent = "元/次";
  const L = document.createElement("small");
  L.textContent =
    "目前服务单价可定价范围为：0.01元≤服务单价≤50元，支持小数点后两位";
  const N = document.createElement("small");
  ((N.className = "serviceWarning"),
    (N.textContent =
      "注意：如实际支付时的价格和此处填写不一致将会导致用户无法支付，请谨慎填写！"),
    C.append(w, A),
    y.append(E, C, L, N),
    g.append(y));
  const D = document.createElement("div");
  ((D.className = "serviceRichFieldGrid"),
    D.append(
      xn("服务描述", p, {
        wide: !0,
        stacked: !0,
        multiline: !0,
        rows: 8,
        withCounter: !0,
        className: "serviceRichField isDescription",
      }),
      xn("请求示例", Zu(f), {
        wide: !0,
        stacked: !0,
        multiline: !0,
        rows: 8,
        className: "serviceRichField isRequestExample",
      }),
    ),
    g.append(D));
  const k = document.createElement("div");
  k.className = "serviceSelectionActions";
  const x = document.createElement("button");
  ((x.className = "onboardingPrimaryAction"),
    (x.type = "button"),
    (x.dataset.useExistingService = "true"),
    (x.dataset.serviceId = i.serviceId),
    (x.dataset.onboardingSpmAction = "service.useExisting"),
    (x.disabled = e.dataset.serviceSubmittingId === i.serviceId),
    (x.textContent = x.disabled ? "提交中" : "使用"));
  const P = document.createElement("button");
  ((P.className = "onboardingSecondaryAction"),
    (P.type = "button"),
    (P.dataset.cancelServiceDetail = "true"),
    (P.textContent = "取消"),
    k.append(x, P),
    c.append(g, k),
    o.append(c));
}
function Lt(e, i, o) {
  const c = e.querySelector(`[name="${i}"]`);
  if (!c) return;
  const l = o == null ? "" : String(o);
  if (c instanceof HTMLInputElement && c.type === "radio") {
    e.querySelectorAll(`input[type="radio"][name="${i}"]`).forEach((p) => {
      p instanceof HTMLInputElement && (p.checked = p.value === l);
    });
    return;
  }
  (c instanceof HTMLInputElement ||
    c instanceof HTMLSelectElement ||
    c instanceof HTMLTextAreaElement) &&
    (c.value = l);
}
function rp(e, i, o) {
  const c = e.querySelector("[data-registered-service-list]");
  c instanceof HTMLElement &&
    (c.replaceChildren(),
    i.length &&
      i.forEach((l) => {
        const p = document.createElement("article");
        ((p.className = "serviceReuseItem"),
          o === l.serviceId && p.classList.add("isSelected"),
          (p.dataset.serviceRow = l.serviceId));
        const f = document.createElement("div");
        f.className = "serviceReuseSummary";
        const g = document.createElement("span"),
          I = document.createElement("strong");
        ((I.textContent = `${l.serviceName} ${l.serviceType || "API"}`),
          g.append(I));
        const y = Xu(l),
          E = Ns(Dr(l));
        if (y || E) {
          const w = document.createElement("small");
          if (((w.className = "serviceReuseMeta"), y)) {
            const A = document.createElement("span");
            ((A.textContent = y), w.append(A));
          }
          if (E) {
            if (y) {
              const A = document.createElement("span");
              ((A.className = "serviceMetaSeparator"),
                (A.textContent = "·"),
                w.append(A));
            }
            w.append(E);
          }
          g.append(w);
        }
        const C = document.createElement("button");
        if (
          ((C.className = "serviceUseAction"),
          (C.type = "button"),
          (C.dataset.viewServiceDetail = "true"),
          (C.dataset.serviceId = l.serviceId),
          (C.dataset.onboardingSpmAction = "service.viewDetail"),
          (C.disabled = e.dataset.serviceDetailLoadingId === l.serviceId),
          (C.textContent = C.disabled ? "加载中" : "查看详情"),
          f.append(g, C),
          p.append(f),
          o === l.serviceId)
        ) {
          if (e.dataset.serviceDetailError) {
            const w = document.createElement("div");
            ((w.className = "serviceDetailError"),
              (w.textContent = e.dataset.serviceDetailError),
              p.append(w));
          }
          e.dataset.serviceDetailLoadingId !== l.serviceId && np(e, l, p);
        }
        c.append(p);
      }));
}
function ip(e, i, o, c = null) {
  const l = i?.displayData || {},
    p = ep(o),
    f = o.nodeFormDrafts?.SERVICE_REGISTER || {},
    g =
      o.serviceRegisterMode === "create" ||
      o.serviceRegisterMode === "createOnly",
    I = i?.formData || {},
    y = Ge(l.serviceDetail),
    E = Dr(I, l, y, p, f) || o.selectedServiceId || l.selectedServiceId || "",
    C = {
      ...l,
      schemaUrl:
        l.schemaUrl || l.schema_url || l.requestExample || l.requestDemo || "",
    },
    w =
      c ||
      (o.serviceRegisterMode === "reuse" && p
        ? p
        : g
          ? { serviceType: "API", ...f }
          : { ...C, ...f }),
    A = Dr(w, y, I, l, p) || E,
    L =
      c &&
      i?.nodeId === "SERVICE_REGISTER" &&
      i?.flowStatus === "FAILED" &&
      i?.viewState === "EDITABLE"
        ? c
        : null;
  (Lt(e, "serviceId", A),
    tp(e, A),
    Lt(e, "serviceType", w.serviceType || l.serviceType || "API"),
    Lt(e, "serviceName", w.serviceName),
    Lt(e, "resourceUrl", w.resourceUrl),
    Lt(e, "pricing", w.pricing),
    Lt(e, "serviceDesc", w.serviceDesc || w.description),
    Lt(e, "schemaUrl", w.schema_url || w.schemaUrl));
  const N = e.querySelector("[data-service-description]"),
    D = e.querySelector("[data-service-description-count]");
  N instanceof HTMLTextAreaElement &&
    D instanceof HTMLElement &&
    (D.textContent = `${Array.from(N.value).length}/500`);
  const k = o.serviceRejectedFieldEdits || {},
    x = L ? Qu(L) : new Set();
  e.querySelectorAll("[data-field-error]").forEach((P) => {
    const _ = P.getAttribute("data-field-error") || "";
    if (!(P instanceof HTMLElement) || !_) return;
    const r = e.querySelector(`[name="${_}"]`);
    if (!(r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement))
      return;
    x.has(_) && !k[_]
      ? ((P.textContent = ja), (P.hidden = !1), r.classList.add("isRejected"))
      : (P.textContent === ja && ((P.textContent = ""), (P.hidden = !0)),
        r.classList.remove("isRejected"));
  });
}
function op(e) {
  ((e.dataset.pipelineRailSignature = "default"),
    !e.querySelector("[data-pipeline-default-step]") &&
      ((e.dataset.wizardStepCount = String(Fn.length)),
      e.replaceChildren(),
      Fn.forEach((o) => {
        const c = document.createElement("span");
        c.className = "wizardStepSlot";
        const l = document.createElement("button");
        ((l.className = "wizardStep"),
          (l.type = "button"),
          (l.dataset.wizardStep = o),
          (l.dataset.pipelineDefaultStep = "true"));
        const p = document.createElement("strong");
        p.textContent = hs(o);
        const f = document.createElement("span");
        ((f.className = "wizardStepIcon"),
          f.setAttribute("aria-hidden", "true"));
        const g = document.createElement("span");
        ((g.className = "wizardStepConnector"),
          g.setAttribute("aria-hidden", "true"),
          l.append(p, f),
          c.append(l, g),
          e.append(c));
      })));
}
function ap(e, i, { enterprisePipelineRequested: o = !1 } = {}) {
  (St(
    e,
    "[data-success-product-name]",
    H(i.pipelineView) ? Kn(i) : "AI按量付费能力",
  ),
    e.classList.toggle(
      "isSuccessStep",
      i.currentStep === "success" && le(i.pipelineView),
    ));
  const c = i.currentStep === "success" ? Fn.length : Fn.indexOf(i.currentStep),
    l = Pu(e, i);
  (e.querySelectorAll("[data-wizard-step]").forEach((g) => {
    const I = g.getAttribute("data-wizard-step"),
      y = Fn.indexOf(I);
    if (!l)
      (g.classList.toggle("isActive", I === i.currentStep),
        g.classList.toggle("isDone", y >= 0 && y < c));
    else {
      const E = g.getAttribute("data-pipeline-node-id");
      g.classList.toggle(
        "isActive",
        E ? E === i.pipelineCurrentNodeId : I === i.currentStep,
      );
    }
  }),
    e.querySelectorAll("[data-step-panel]").forEach((g) => {
      g.hidden =
        g.getAttribute("data-step-panel") !== i.currentStep ||
        (H(i.pipelineView) &&
          ["tech", "verify"].includes(g.getAttribute("data-step-panel")));
    }));
  const p = e.querySelector("[data-agent-cta-label]");
  p && (p.textContent = "Agent接入");
  const f = e.querySelector("[data-open-agent-modal]");
  f instanceof HTMLElement &&
    (f.hidden = Ji(i, { enterprisePipelineRequested: o }));
}
function sp(e, i) {
  const o = Ou(i),
    c = Mu(i),
    l = kn(i),
    p = xu(i),
    f = e.querySelector('[data-step-panel="product"]'),
    g = e.querySelector("[data-enterprise-product-open-panel]"),
    I = !!(l && p);
  (f instanceof HTMLElement && (f.hidden = i.currentStep !== "product" || I),
    I || _s(f instanceof HTMLElement ? f : e, o, c));
  const y = bs(o),
    E = Bu(o, c, i),
    C = xt(
      y.businessProductCode,
      l?.businessProductCode,
      l?.business_product_code,
      i.pipelineView?.productCode,
    ),
    w = ms(
      I ? "component" : E,
      { ...y, businessProductCode: C },
      I,
      "register_and_sign",
    ),
    A = e.querySelector("[data-product-open-error]"),
    L = e.querySelector("[data-product-open-error-text]"),
    N = String(i.productOpenFormError || "").trim();
  if (
    (A instanceof HTMLElement && (A.hidden = i.currentStep !== "product" || !N),
    L instanceof HTMLElement && (L.textContent = N || "产品开通信息加载失败"),
    g instanceof HTMLElement)
  ) {
    const k = It(p, i.pipelineView);
    if (
      ((g.hidden =
        !I ||
        (k &&
          (i.pipelineCurrentForm?.nodeId !== p ||
            !!Tr(i.pipelineCurrentForm, i.pipelineView)))),
      I)
    ) {
      const x = H(i.pipelineView) && _e(p, i.pipelineView),
        P = x && o?.nodeId !== p,
        _ = g.querySelector("[data-enterprise-product-loading]");
      _ instanceof HTMLElement &&
        (_.hidden = x ? !P || !i.productOpenFormLoading : w);
      const r = g.querySelector("[data-enterprise-product-retry]");
      r instanceof HTMLElement &&
        (r.hidden = !P || i.productOpenFormLoading || !N);
    }
  }
  const D = e.querySelector("[data-product-open-bridge]");
  D instanceof HTMLElement &&
    ((D.hidden = !!l || !w),
    (D.dataset.externalBizId = y.externalBizId),
    (D.dataset.businessProductCode = y.businessProductCode));
}
function cp(e, i) {
  const o = Tu(i),
    c = Fu(i),
    l = e.querySelector("[data-service-block]"),
    p = Array.isArray(i.registeredServices) ? i.registeredServices : [],
    f = p.length > 0,
    g = qu(o, c),
    I = !g && Hu(o, c),
    y = !g && ro(c),
    E = y || I,
    C =
      (g ? "failedEditable" : i.serviceRegisterMode) ||
      (I ? "readonly" : "") ||
      (y ? "completed" : "") ||
      (f ? "list" : i.registeredServicesLoaded ? "create" : "list"),
    w = C === "create" || C === "createOnly",
    A = y && i.serviceRechooseMode === !0,
    N = (g ? Ts(o) : null) || (E && !A && !w ? Vu(o) : null),
    D = i.pipelineView?.status || "",
    k =
      y &&
      !["SUCCESS", "COMPLETED", "COMPLETE", "DONE", "FINISHED"].includes(D);
  (l instanceof HTMLElement &&
    (l.classList.toggle("isCompleted", y),
    l.classList.toggle("isFailedEditable", g),
    (l.hidden = !1)),
    i.registeredServicesLoading,
    (e.dataset.serviceDetailLoadingId = i.serviceDetailLoadingId || ""),
    (e.dataset.serviceDetailError = i.serviceDetailError || ""),
    (e.dataset.serviceSubmittingId = i.serviceSubmittingId || ""));
  const x = e.querySelector("[data-service-loading]"),
    P = e.querySelector("[data-service-error]"),
    _ = e.querySelector("[data-service-error-text]"),
    r = e.querySelector("[data-service-review-banner]"),
    M = e.querySelector("[data-service-review-text]"),
    ne = e.querySelector("[data-service-pending-banner]"),
    Z = e.querySelector("[data-existing-services]"),
    ie = e.querySelector("[data-service-create-divider]"),
    Y = e.querySelector("[data-new-service-form]"),
    J = e.querySelector("[data-new-service-actions]"),
    U = e.querySelector("[data-new-service-title]"),
    te = E && !A && !w,
    fe = ku(o);
  if (
    (x instanceof HTMLElement && (x.hidden = !i.registeredServicesLoading),
    P instanceof HTMLElement && (P.hidden = !i.registeredServicesError),
    _ instanceof HTMLElement &&
      (_.textContent = i.registeredServicesError || "服务查询失败"),
    r instanceof HTMLElement && (r.hidden = !g || !fe),
    M instanceof HTMLElement && (M.textContent = fe),
    ne instanceof HTMLElement && (ne.hidden = g || !zu(o, c)),
    Z instanceof HTMLElement &&
      (Z.hidden = g || te || !f || C === "createOnly"),
    ie instanceof HTMLElement &&
      (ie.hidden = g || te || !f || C === "createOnly"),
    Y instanceof HTMLElement &&
      ((Y.hidden = g
        ? !1
        : E
          ? A && f && C !== "create"
          : i.registeredServicesLoading ||
            !!(i.registeredServicesError && !i.registeredServicesLoaded) ||
            (f && C !== "create")),
      Y.classList.toggle("isNested", f),
      Y.classList.toggle("isReadonly", te),
      Y.querySelectorAll("input, textarea, select").forEach(($) => {
        ($ instanceof HTMLInputElement ||
          $ instanceof HTMLTextAreaElement ||
          $ instanceof HTMLSelectElement) &&
          (($.disabled = te),
          ($ instanceof HTMLInputElement || $ instanceof HTMLTextAreaElement) &&
            ($.readOnly = te || $.name === "serviceType"));
      })),
    J instanceof HTMLElement)
  ) {
    J.hidden = g ? !1 : te ? !k : !(C === "create" || C === "createOnly");
    const $ = J.querySelector('button[type="submit"]');
    $ instanceof HTMLElement &&
      (($.hidden = te && !g), ($.textContent = "提交注册"));
    const Ne = J.querySelector("[data-service-form-skip]");
    Ne instanceof HTMLElement &&
      (Ne.hidden = te || !(g || C === "create" || C === "createOnly"));
    const Oe = J.querySelector("[data-rechoose-service]");
    Oe instanceof HTMLElement && (Oe.hidden = !y || A || !k);
    const ye = J.querySelector("[data-cancel-register-service]");
    ye instanceof HTMLElement && (ye.hidden = te || g || !f);
  }
  (U instanceof HTMLElement &&
    ((U.hidden = g || te), (U.textContent = "注册新服务")),
    rp(
      e,
      p,
      (C === "reuse" &&
        (i.selectedServiceId || o?.displayData?.selectedServiceId)) ||
        "",
    ));
  const Se = e.querySelector("[data-registered-service-caption]");
  (Se instanceof HTMLElement &&
    p.length &&
    (Se.textContent = `检测到您已注册 ${p.length} 个服务，可直接选择，也可注册新服务`),
    ip(e, o, i, N));
}
function dp(e, i) {
  const o = e.querySelector('[data-step-panel="keys"]'),
    c = !!kn(i);
  o instanceof HTMLElement && (o.hidden = i.currentStep !== "keys" || c);
  const l = e.querySelector("[data-key-config-bridge]");
  l instanceof HTMLElement && (l.hidden = i.currentStep !== "keys" || !!kn(i));
}
function lp(e, i) {
  const o = e.querySelector('[data-step-panel="verify"]');
  if (!(o instanceof HTMLElement)) return;
  const c = ju(i),
    l = Ku(i),
    p = e.querySelector('[data-step-panel="verify"]'),
    f = _s(p instanceof HTMLElement ? p : e, c, l),
    g = Lu(i);
  o.querySelectorAll("[data-verify-checklist]").forEach((U) => {
    U instanceof HTMLElement &&
      (U.hidden =
        U.getAttribute("data-verify-checklist") === "metered" ? !g : g);
  });
  const I = gp(c),
    y = o.querySelector("[data-sandbox-app-id]"),
    E = o.querySelector("[data-sandbox-app-public-key]"),
    C = o.querySelector("[data-sandbox-private-key]"),
    w = o.querySelector("[data-sandbox-private-pkcs-key]"),
    A = o.querySelector("[data-sandbox-alipay-public-key]"),
    L = o.querySelector("[data-sandbox-copy-all]");
  if (I) {
    if (
      (y && (y.textContent = I.appId || ""),
      E && (E.textContent = I.appPublicKey || "MIIBIjANBgkqhk..."),
      C && (C.textContent = I.appPrivateKey || "MIIEvQIBADANBg..."),
      w && (w.textContent = I.appPrivatePkcsKey || "MIIEowIBAA..."),
      A && (A.textContent = I.alipayPublicKey || "MIIBIjANBgkqhk..."),
      L)
    ) {
      const U = `AIPAY_APP_ID=${I.appId || ""}
# 沙箱应用公钥
AIPAY_PUBLIC_KEY=${I.appPublicKey || ""}
# JAVA 语言私钥
AIPAY_PRIVATE_KEY=${I.appPrivateKey || ""}
# 非 JAVA 语言私钥
AIPAY_PRIVATE_PKCS_KEY=${I.appPrivatePkcsKey || ""}
# 沙箱支付宝公钥
AIPAY_ALIPAY_PUBLIC_KEY=${I.alipayPublicKey || ""}`;
      L.setAttribute("data-copy-text", U);
    }
  } else
    (y && (y.textContent = "2024001234567890"),
      E && (E.textContent = "MIIBIjANBgkqhk..."),
      C && (C.textContent = "MIIEvQIBADANBg..."),
      w && (w.textContent = "MIIEowIBAA..."),
      A && (A.textContent = "MIIBIjANBgkqhk..."),
      L &&
        L.setAttribute(
          "data-copy-text",
          `AIPAY_APP_ID=2024001234567890
# 沙箱应用公钥
AIPAY_PUBLIC_KEY=MIIBIjANBgkqhk...
# JAVA 语言私钥
AIPAY_PRIVATE_KEY=MIIEvQIBADANBg...
# 非 JAVA 语言私钥
AIPAY_PRIVATE_PKCS_KEY=MIIEowIBAA...
# 沙箱支付宝公钥
AIPAY_ALIPAY_PUBLIC_KEY=MIIBIjANBgkqhk...`,
        ));
  const N = Ls(),
    D = mp(i),
    k = Sp(D, c, fp(i), N),
    x = o.querySelector("[data-prod-app-id]"),
    P = o.querySelector("[data-prod-app-public-key]"),
    _ = o.querySelector("[data-prod-private-key]"),
    r = o.querySelector("[data-prod-private-pkcs-key]"),
    M = o.querySelector("[data-prod-alipay-public-key]"),
    ne = o.querySelector("[data-prod-copy-all]"),
    Z = to.get(k) || null,
    ie = !!(D && k),
    Y = Z?.appPublicKey || (k ? Ka : Or),
    J = Z?.alipayPublicKey || (k ? Ka : Or);
  (Zt({
    appId: k,
    appPublicKey: Y,
    publicKey: J,
    appIdElement: x,
    appPublicKeyElement: P,
    privateKeyElement: _,
    privatePkcsKeyElement: r,
    publicKeyElement: M,
    copyButton: ne,
  }),
    ie && !Z && hp(k, o),
    o.querySelectorAll("input, select, textarea").forEach((U) => {
      (U instanceof HTMLInputElement ||
        U instanceof HTMLSelectElement ||
        U instanceof HTMLTextAreaElement) &&
        ((U.disabled = f),
        (U instanceof HTMLInputElement || U instanceof HTMLTextAreaElement) &&
          (U.readOnly = f));
    }),
    o.querySelectorAll(".verifyTradeButton").forEach((U) => {
      if (U instanceof HTMLButtonElement) {
        const te = o.querySelector("[data-verify-trade-no]"),
          fe =
            te instanceof HTMLInputElement || te instanceof HTMLTextAreaElement
              ? te.value.trim()
              : "";
        ((U.disabled = f || !fe || U.dataset.submitting === "true"),
          U.setAttribute("aria-disabled", U.disabled ? "true" : "false"));
      }
    }),
    o.classList.toggle("isBlockedReadonly", f));
}
function Rs(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm;
  return i?.nodeId === "TECH_INTEGRATION"
    ? i
    : o?.nodeId === "TECH_INTEGRATION"
      ? o
      : null;
}
function up(e) {
  return V(e.pipelineView, "TECH_INTEGRATION");
}
function pp(e) {
  const i = Rs(e),
    o = up(e);
  return [i?.flowStatus, o?.flowStatus]
    .map((c) => String(c || "").toUpperCase())
    .includes("COMPLETED");
}
function Ls() {
  return typeof window > "u" ? null : window.__AIPAY_KEY_CONFIG_STATE__ || null;
}
function fp(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm,
    c = Ls()?.form;
  return i?.nodeId === tn
    ? i
    : o?.nodeId === tn
      ? o
      : c?.nodeId === tn
        ? c
        : null;
}
function Wa(e) {
  return e?.formKey === mu;
}
function mp(e) {
  const i = e.pipelineCurrentForm,
    o = e.pipelineView?.currentForm;
  return Wa(i) ? i : Wa(o) ? o : null;
}
function gp(e) {
  const i = e?.displayData;
  if (!i || typeof i != "object") return null;
  const o = i.data && typeof i.data == "object" ? i.data : i.sandboxData;
  try {
    const c =
      typeof o == "string"
        ? JSON.parse(o)
        : o && typeof o == "object"
          ? o
          : null;
    if (!c) return null;
    const p = (Array.isArray(c.appIds) ? c.appIds : [])[0];
    return !p || typeof p != "object"
      ? null
      : {
          appId: p.appId || "",
          appPublicKey: p.appPublicKey || "",
          appPrivateKey: p.appPrivateKey || "",
          appPrivatePkcsKey: p.appPrivatePkcsKey || "",
          alipayPublicKey: p.alipayPublicKey || "",
        };
  } catch (c) {
    return (
      console.error("Failed to parse verify sandbox credentials:", c),
      null
    );
  }
}
function Ip(e) {
  const i = e?.displayData || {},
    o = e?.formData || {},
    c = Ge(i.data) || {},
    l = Ge(o.data) || {};
  return [
    e?.onlineAppId,
    e?.online_app_id,
    e?.approvedAppId,
    e?.approved_app_id,
    e?.createdAppId,
    e?.created_app_id,
    i.onlineAppId,
    i.online_app_id,
    i.approvedAppId,
    i.approved_app_id,
    i.createdAppId,
    i.created_app_id,
    c.onlineAppId,
    c.online_app_id,
    c.approvedAppId,
    c.approved_app_id,
    c.createdAppId,
    c.created_app_id,
    o.onlineAppId,
    o.online_app_id,
    o.approvedAppId,
    o.approved_app_id,
    o.createdAppId,
    o.created_app_id,
    l.onlineAppId,
    l.online_app_id,
    l.approvedAppId,
    l.approved_app_id,
    l.createdAppId,
    l.created_app_id,
    e?.externalBizId,
  ];
}
function Sp(...e) {
  return xt(...e.flatMap(Ip));
}
function yp(e, i, o) {
  return `AIPAY_APP_ID=${e || Or}
# 线上应用公钥
AIPAY_PUBLIC_KEY=${i || Mr}
# 线上 JAVA 语言私钥
AIPAY_PRIVATE_KEY=${ys}
# 线上非 JAVA 语言私钥
AIPAY_PRIVATE_PKCS_KEY=${Es}
# 线上支付宝公钥
AIPAY_ALIPAY_PUBLIC_KEY=${o || xr}`;
}
function Zt({
  appId: e,
  appPublicKey: i,
  publicKey: o,
  appIdElement: c,
  appPublicKeyElement: l,
  privateKeyElement: p,
  privatePkcsKeyElement: f,
  publicKeyElement: g,
  copyButton: I,
}) {
  (c && (c.textContent = e || Or),
    l && (l.textContent = i || Mr),
    p && (p.textContent = ys),
    f && (f.textContent = Es),
    g && (g.textContent = o || xr),
    I && I.setAttribute("data-copy-text", yp(e, i, o)));
}
function Ep() {
  const e = window.location.hostname;
  return e.includes(".dev.alipay.net") ||
    e.includes("localhost") ||
    e.includes("127.0.0.1")
    ? "http://openhome-3011.gz00b.dev.alipay.net"
    : e.includes("pre.alipay.com") || e.includes("-pre.")
      ? "https://openhome-pre.alipay.com"
      : "https://openhome.alipay.com";
}
async function hp(e, i) {
  const o = () => ({
      appIdElement: i.querySelector("[data-prod-app-id]"),
      appPublicKeyElement: i.querySelector("[data-prod-app-public-key]"),
      privateKeyElement: i.querySelector("[data-prod-private-key]"),
      privatePkcsKeyElement: i.querySelector("[data-prod-private-pkcs-key]"),
      publicKeyElement: i.querySelector("[data-prod-alipay-public-key]"),
      copyButton: i.querySelector("[data-prod-copy-all]"),
    }),
    c = to.get(e);
  if (c)
    return (
      Zt({
        appId: e,
        appPublicKey: c.appPublicKey,
        publicKey: c.alipayPublicKey,
        ...o(),
      }),
      c
    );
  const l = Yi.get(e);
  if (l)
    try {
      const I = await l;
      return (
        Zt({
          appId: e,
          appPublicKey: I.appPublicKey,
          publicKey: I.alipayPublicKey,
          ...o(),
        }),
        I
      );
    } catch {
      return (Zt({ appId: e, appPublicKey: Mr, publicKey: xr, ...o() }), null);
    }
  const f = `${Ep()}/platform/appDetail.json?appId=${encodeURIComponent(e)}`,
    g = (async () => {
      const I = await fetch(f, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!I.ok) throw new Error(`HTTP error! status: ${I.status}`);
      const y = await I.json(),
        E = y.data?.appEnvInfo,
        w =
          (Array.isArray(E?.securityConfigMaps?.RSA2)
            ? E.securityConfigMaps.RSA2
            : []
          ).find((N) => N?.partnerPublicKey)?.partnerPublicKey || "",
        A = E?.alipayKeyMaps?.RSA2?.alipayPublicKey || "";
      if (y.stat !== "ok" || (!w && !A))
        throw new Error("Missing online public keys");
      const L = { appPublicKey: w, alipayPublicKey: A };
      return (to.set(e, L), L);
    })();
  Yi.set(e, g);
  try {
    const I = await g;
    return (
      Zt({
        appId: e,
        appPublicKey: I.appPublicKey,
        publicKey: I.alipayPublicKey,
        ...o(),
      }),
      I
    );
  } catch (I) {
    return (
      console.error("Failed to fetch online keys:", I),
      Zt({ appId: e, appPublicKey: Mr, publicKey: xr, ...o() }),
      null
    );
  } finally {
    Yi.delete(e);
  }
}
function wp(e) {
  const i = e?.displayData?.data,
    o =
      typeof i == "string"
        ? (() => {
            try {
              return JSON.parse(i);
            } catch (p) {
              return (
                console.error(
                  "Failed to parse tech integration displayData.data:",
                  p,
                ),
                null
              );
            }
          })()
        : i;
  if (!o || typeof o != "object") return null;
  const l = (Array.isArray(o.appIds) ? o.appIds : [])[0];
  return !l || typeof l != "object"
    ? null
    : {
        appId: l.appId || "",
        appPublicKey: l.appPublicKey || "",
        appPrivateKey: l.appPrivateKey || "",
        appPrivatePkcsKey: l.appPrivatePkcsKey || "",
        alipayPublicKey: l.alipayPublicKey || "",
        sandboxId: l.sandboxId || o.sandboxId || "",
        sandboxName: l.sandboxName || o.sandboxName || "",
        sandboxAccounts: o.sandboxAccounts || null,
      };
}
function Qa(e, i) {
  return i === "buyer" && e?.user && typeof e.user == "object"
    ? e.user
    : i === "seller" && e?.partner && typeof e.partner == "object"
      ? e.partner
      : (Array.isArray(e)
          ? e
          : Array.isArray(e?.list)
            ? e.list
            : Array.isArray(e?.accounts)
              ? e.accounts
              : []
        ).find((c) =>
          String(c?.role || c?.accountType || c?.type || "")
            .toLowerCase()
            .includes(i),
        ) || null;
}
function Cp(e, i) {
  const o = Rs(i),
    c = wp(o),
    l = Kn(i),
    p = no(i),
    f = no(i, { includeOnboarding: !0 });
  (St(e, "[data-aipay-skill-prompt]", p),
    e.querySelectorAll("[data-aipay-skill-prompt-copy]").forEach((P) => {
      P.setAttribute("data-copy-text", p);
    }));
  const g = Ru(Cs(i));
  (St(e, "[data-product-guide-name]", l),
    e.querySelectorAll("[data-product-guide-url]").forEach((P) => {
      P instanceof HTMLAnchorElement && (P.href = g);
    }),
    St(e, "[data-aipay-agent-prompt]", f),
    e.querySelectorAll("[data-aipay-agent-prompt-copy]").forEach((P) => {
      P.setAttribute("data-copy-text", f);
    }),
    e.querySelectorAll("[data-tech-footer-actions]").forEach((P) => {
      P.hidden = pp(i);
    }));
  const I = e.querySelectorAll("[data-sandbox-app-id]"),
    y = e.querySelectorAll("[data-sandbox-app-public-key]"),
    E = e.querySelectorAll("[data-sandbox-private-key]"),
    C = e.querySelectorAll("[data-sandbox-private-pkcs-key]"),
    w = e.querySelectorAll("[data-sandbox-alipay-public-key]"),
    A = e.querySelectorAll("[data-sandbox-copy-all]"),
    L = (P, _) => {
      P.forEach((r) => {
        r.textContent = _;
      });
    },
    N = (P) => {
      A.forEach((_) => {
        _.setAttribute("data-copy-text", P);
      });
    },
    D = (P) =>
      [
        `AIPAY_APP_ID=${P.appId || ""}`,
        "# 沙箱应用公钥",
        `AIPAY_PUBLIC_KEY=${P.appPublicKey || ""}`,
        "# JAVA 语言私钥",
        `AIPAY_PRIVATE_KEY=${P.appPrivateKey || ""}`,
        "# 非 JAVA 语言私钥",
        `AIPAY_PRIVATE_PKCS_KEY=${P.appPrivatePkcsKey || ""}`,
        "# 沙箱支付宝公钥",
        `AIPAY_ALIPAY_PUBLIC_KEY=${P.alipayPublicKey || ""}`,
      ].join(`
`),
    k = (P, _, r) => {
      const M = r == null ? "" : String(r).trim(),
        ne = _.replace(/[A-Z]/g, (Y) => `-${Y.toLowerCase()}`),
        Z = e.querySelector(`[data-sandbox-${P}-${ne}]`),
        ie = Z?.nextElementSibling;
      (Z && (Z.textContent = M),
        ie instanceof HTMLButtonElement &&
          (ie.setAttribute("data-copy-text", M), (ie.disabled = !M)));
    },
    x = (P, _) => {
      const r = _?.account || _?.accountNo || _?.loginId || _?.email || "",
        M = _?.userId || _?.user_id || _?.uid || "",
        Z = !!(r || M) ? "111111" : "",
        ie = {
          account: r,
          userId: M,
          loginPassword:
            _?.loginPassword ||
            _?.logonPassword ||
            _?.password ||
            _?.loginPwd ||
            Z,
          payPassword: _?.payPassword || _?.payPwd || _?.paymentPassword || Z,
        };
      Object.entries(ie).forEach(([Y, J]) => {
        k(P, Y, J);
      });
    };
  if (c)
    (L(I, c.appId || ""),
      L(y, c.appPublicKey || "MIIBIjANBgkqhk..."),
      L(E, c.appPrivateKey || "MIIEvQIBADANBg..."),
      L(C, c.appPrivatePkcsKey || "MIIEowIBAA..."),
      L(w, c.alipayPublicKey || "MIIBIjANBgkqhk..."),
      N(D(c)));
  else {
    const P = {
      appId: "2024001234567890",
      appPublicKey: "MIIBIjANBgkqhk...",
      appPrivateKey: "MIIEvQIBADANBg...",
      appPrivatePkcsKey: "MIIEowIBAA...",
      alipayPublicKey: "MIIBIjANBgkqhk...",
    };
    (L(I, "2024001234567890"),
      L(y, "MIIBIjANBgkqhk..."),
      L(E, "MIIEvQIBADANBg..."),
      L(C, "MIIEowIBAA..."),
      L(w, "MIIBIjANBgkqhk..."),
      N(D(P)));
  }
  (x("buyer", Qa(c?.sandboxAccounts, "buyer")),
    x("seller", Qa(c?.sandboxAccounts, "seller")));
}
function Os(e) {
  const i = String(e ?? 0)
    .trim()
    .replace(/,/g, "");
  if (!/^-?\d+(?:\.\d+)?$/.test(i)) return String(e ?? 0);
  const [o, c] = i.split("."),
    l = o.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return c ? `${l}.${c.slice(0, 2)}` : l;
}
function bp(e) {
  return Os(e);
}
function Ap(e) {
  return Os(e);
}
function Pp(e) {
  const i =
    `${e?.productCode || ""} ${e?.productName || e?.name || ""}`.toLowerCase();
  return i.includes("mobile") || i.includes("app") || i.includes("移动")
    ? "isMobile"
    : i.includes("meter") || i.includes("api") || i.includes("按量")
      ? "isMetered"
      : "isWeb";
}
function Tp(e) {
  const i = document.createElement("span");
  if (
    ((i.className = `consoleProductIcon ${Pp(e)}`),
    i.setAttribute("aria-hidden", "true"),
    e.iconUrl)
  ) {
    i.classList.add("hasRemoteIcon");
    const o = document.createElement("img");
    ((o.src = e.iconUrl),
      (o.alt = ""),
      (o.loading = "lazy"),
      (o.decoding = "async"),
      i.append(o));
  }
  return i;
}
function Ja(e, i, o, c, l = "") {
  const p = document.createElement("div");
  p.className = "consoleProductStat";
  const f = document.createElement("div");
  f.className = "consoleStatCaption";
  const g = document.createElement("span"),
    I = document.createElement("strong"),
    y = document.createElement("small");
  if (
    ((g.className = "consoleStatLabelText"),
    (g.textContent = e),
    f.append(g),
    l)
  ) {
    const E = `console-stat-tip-${++hu}`,
      C = document.createElement("span"),
      w = document.createElement("button"),
      A = document.createElement("span");
    ((C.className = "consoleStatInfo"),
      (w.className = "consoleStatInfoButton"),
      (w.type = "button"),
      (w.dataset.consoleStatTip = "true"),
      w.setAttribute("aria-label", `${e}说明`),
      w.setAttribute("aria-expanded", "false"),
      w.setAttribute("aria-describedby", E),
      (w.textContent = "?"),
      (A.id = E),
      (A.className = "consoleStatTip"),
      A.setAttribute("role", "tooltip"),
      (A.hidden = !0),
      (A.textContent = l),
      C.append(w, A),
      f.append(C));
  }
  return (
    (I.textContent = c(i)),
    (y.textContent = o),
    I.append(y),
    p.append(f, I),
    p
  );
}
function vp(e) {
  const i = document.createElement("article");
  i.className = "consoleProductCard";
  const o = document.createElement("div");
  o.className = "consoleProductHead";
  const c = document.createElement("div");
  c.className = "consoleProductTitle";
  const l = document.createElement("strong"),
    p = document.createElement("p");
  ((l.textContent = e.productName || e.name || e.productCode || "未命名产品"),
    (p.textContent = e.description || "暂无产品说明"),
    c.append(l, p),
    o.append(Tp(e), c));
  const f = document.createElement("div");
  return (
    (f.className = "consoleProductStats"),
    f.append(
      Ja(
        "本月交易笔数",
        e.tradeStatistic?.monthlyTradeCount,
        "笔",
        bp,
        "数据T+1更新",
      ),
      Ja(
        "本月交易额",
        e.tradeStatistic?.monthlyTradeAmount,
        "元",
        Ap,
        "数据T+1更新",
      ),
    ),
    i.append(o, f),
    i
  );
}
function Ur(e, i = "", o = "products") {
  const c = document.createElement("div");
  c.className = "consoleStateMessageInner";
  const l = document.createElement("span");
  if (((l.textContent = e), c.append(l), i)) {
    const p = document.createElement("button");
    ((p.type = "button"),
      o === "services"
        ? (p.dataset.consoleServicesRetry = "true")
        : (p.dataset.consoleProductsRetry = "true"),
      (p.textContent = i),
      c.append(p));
  }
  return c;
}
function _p(e, i) {
  const o = e.querySelector("[data-console-product-list]"),
    c = e.querySelector("[data-console-product-empty]"),
    l = e.querySelector("[data-console-product-status]"),
    p = Array.isArray(i.products) ? i.products : [];
  if (
    !(
      !(o instanceof HTMLElement) ||
      !(c instanceof HTMLElement) ||
      !(l instanceof HTMLElement)
    )
  ) {
    if (
      (o.replaceChildren(),
      l.replaceChildren(),
      i.productsLoading && !i.productsLoaded)
    ) {
      ((o.hidden = !0),
        (c.hidden = !0),
        (l.hidden = !1),
        l.replaceChildren(Ur("产品数据加载中...")));
      return;
    }
    if (i.productsError) {
      ((o.hidden = !0),
        (c.hidden = !0),
        (l.hidden = !1),
        l.replaceChildren(Ur(i.productsError, "重新加载")));
      return;
    }
    if (!p.length) {
      ((o.hidden = !0), (c.hidden = !1), (l.hidden = !0));
      return;
    }
    ((o.hidden = !1), (c.hidden = !0), (l.hidden = !0), o.append(...p.map(vp)));
  }
}
function Np(e, i) {
  const o = e.querySelector("[data-console-service-list]"),
    c = e.querySelector("[data-console-service-empty]"),
    l = e.querySelector("[data-console-service-status]"),
    p = e.querySelector("[data-console-service-notice]"),
    f = e.querySelector("[data-console-service-pager]"),
    g = e.querySelector("[data-console-create-service]");
  if (
    !(o instanceof HTMLElement) ||
    !(c instanceof HTMLElement) ||
    !(l instanceof HTMLElement) ||
    !(p instanceof HTMLElement) ||
    !(f instanceof HTMLElement)
  )
    return;
  const I = Array.isArray(i.services) ? i.services : [],
    y = Array.isArray(I) ? I : [],
    E = Number(i.servicesPageNum || 1),
    C = Number(i.servicesPageSize || 10),
    w = Number(i.servicesTotal || y.length),
    A = Math.max(1, Math.ceil(w / C));
  (o.replaceChildren(),
    l.replaceChildren(),
    p.replaceChildren(),
    f.replaceChildren(),
    g instanceof HTMLButtonElement &&
      ((g.disabled = i.servicesLoaded && !i.servicesCanCreate),
      (g.textContent =
        i.servicesLoaded && !i.servicesCanCreate ? "已达上限" : "注册新服务")),
    (p.className = "consoleServiceNotice"));
  const L = document.createElement("span");
  if (
    (i.servicesIfWhiteUid
      ? (L.textContent = `当前已有${i.servicesQuotaTotal || 0}个服务。审核通过后可使用对应产品服务。`)
      : (L.textContent = `试运行期间最多支持${Eu}个服务（含审核中、审核未通过、审核已通过），当前已有${i.servicesQuotaTotal || 0}个。审核通过后可使用对应产品服务。`),
    p.append(L),
    i.servicesLoading && !i.servicesLoaded)
  ) {
    ((o.hidden = !0),
      (c.hidden = !0),
      (f.hidden = !0),
      (l.hidden = !1),
      l.replaceChildren(Ur("服务数据加载中...")));
    return;
  }
  if (i.servicesError) {
    ((o.hidden = !0),
      (c.hidden = !0),
      (f.hidden = !0),
      (l.hidden = !1),
      l.replaceChildren(Ur(i.servicesError, "重新加载", "services")));
    return;
  }
  if (!y.length) {
    ((o.hidden = !0), (c.hidden = !1), (f.hidden = !0), (l.hidden = !0));
    return;
  }
  ((o.hidden = !1), (c.hidden = !0), (l.hidden = !0));
  const N = document.createElement("div");
  N.className = "consoleServiceTableWrap";
  const D = document.createElement("table");
  D.className = "consoleServiceTable";
  const k = document.createElement("thead"),
    x = document.createElement("tr");
  (["序号", "服务名称", "服务ID", "单价（元）", "状态", "操作"].forEach((_) => {
    const r = document.createElement("th");
    ((r.textContent = _), x.append(r));
  }),
    k.append(x));
  const P = document.createElement("tbody");
  if (
    (y.forEach((_, r) => {
      const M = document.createElement("tr"),
        ne = document.createElement("td"),
        Z = document.createElement("td"),
        ie = document.createElement("td"),
        Y = document.createElement("td"),
        J = document.createElement("td"),
        U = document.createElement("td"),
        te = _.manageStatus || "PENDING";
      if (
        ((ne.textContent = String((E - 1) * C + r + 1)),
        (Z.textContent = _.serviceName || _.name || "-"),
        (Z.className = "consoleServiceNameCell"),
        _.serviceId)
      ) {
        const Ne = document.createElement("span"),
          Oe = document.createElement("span"),
          ye = document.createElement("button");
        ((Ne.className = "consoleServiceCopy"),
          (Oe.textContent = _.serviceId),
          (ye.type = "button"),
          (ye.textContent = "复制"),
          ye.addEventListener("click", async () => {
            try {
              (await navigator.clipboard?.writeText(_.serviceId),
                (ye.textContent = "已复制"),
                window.setTimeout(() => {
                  ye.textContent = "复制";
                }, 1200));
            } catch {
              ye.textContent = "复制失败";
            }
          }),
          Ne.append(Oe, ye),
          ie.append(Ne));
      } else ie.textContent = "-";
      Y.textContent = _.pricing || "-";
      const fe = document.createElement("span");
      ((fe.className = `consoleServiceStatusTag is${te}`),
        (fe.textContent = yu[te] || _.serviceStatus || "审核中"),
        J.append(fe));
      const Se = document.createElement("button");
      ((Se.type = "button"),
        (Se.className = "consoleServiceTextAction"),
        (Se.dataset.consoleServiceView = _.serviceId || ""),
        (Se.dataset.onboardingSpmAction = "console.viewService"),
        (Se.textContent = "查看"),
        U.append(Se));
      const $ = document.createElement("button");
      (($.type = "button"),
        ($.className = "consoleServiceTextAction"),
        ($.dataset.consoleServiceEditId = _.serviceId || ""),
        ($.dataset.onboardingSpmAction = "console.editService"),
        ($.textContent = "修改"),
        te === "PENDING" &&
          (($.disabled = !0), ($.title = "审核中的服务暂不支持修改")),
        U.append($),
        M.append(ne, Z, ie, Y, J, U),
        P.append(M));
    }),
    D.append(k, P),
    N.append(D),
    o.append(N),
    (f.hidden = w <= C),
    w > C)
  ) {
    const _ = document.createElement("span");
    _.textContent = `共有${w}条`;
    const r = document.createElement("button"),
      M = document.createElement("button");
    ((r.type = "button"),
      (M.type = "button"),
      (r.textContent = "上一页"),
      (M.textContent = "下一页"),
      (r.disabled = E <= 1),
      (M.disabled = E >= A),
      (r.dataset.consoleServicePage = String(Math.max(1, E - 1))),
      (M.dataset.consoleServicePage = String(Math.min(A, E + 1))));
    const ne = document.createElement("span");
    ((ne.textContent = `${E}/${A}`), f.append(_, r, ne, M));
  }
}
function Rp(e, i, o, c = {}) {
  const l = c.activeView === "services" ? "services" : "products";
  (e.querySelectorAll("[data-console-nav]").forEach((p) => {
    const f = p.getAttribute("data-console-nav") === l;
    (p.classList.toggle("isActive", f),
      p instanceof HTMLButtonElement &&
        p.setAttribute("aria-pressed", String(f)));
  }),
    e.querySelectorAll("[data-console-view]").forEach((p) => {
      const f = p.getAttribute("data-console-view") === l;
      (p.classList.toggle("isActive", f),
        p instanceof HTMLElement && (p.hidden = !f));
    }),
    _p(e, c),
    Np(e, c));
}
function Ms(e) {
  return !!(e && typeof e == "object" && !Array.isArray(e));
}
function Lp(e) {
  return String(e || "")
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();
}
function Pr(e, i) {
  const o = Ms(e?.raw) ? e.raw : {};
  return new Set(
    i
      .flatMap((c) => [e?.[c], o[c]])
      .map(Lp)
      .filter(Boolean),
  );
}
function Xa(e, i) {
  for (const o of e) if (i.has(o)) return !0;
  return !1;
}
function Op(e) {
  return {
    applicationId: e.applicationId || "",
    status: e.status || "",
    message: e.message || "",
    productName: e.productName || "",
    ipRoleId: e.ipRoleId || "",
  };
}
function Mp(e = {}) {
  const i = e.inTransit === !0,
    o = Ms(e.pipeline) ? e.pipeline : null,
    c = String(
      o?.instanceId ||
        o?.instance_id ||
        e.pipelineInstanceId ||
        e.pipeline_instance_id ||
        "",
    ).trim(),
    l =
      i && c
        ? {
            ...o,
            instanceId: c,
            productCode:
              o?.productCode || o?.product_code || e.productCode || "",
            productName:
              o?.productName || o?.product_name || e.productName || "",
          }
        : null,
    p =
      i &&
      !l &&
      (e.accountInTransit === !0 ||
        e.accountRegisterProductOpenInTransit === !0 ||
        e.pipelineInTransit === !0 ||
        e.inTransit === !0);
  return { pipeline: l, accountRegistration: p ? Op(e) : null, shouldBlock: i };
}
function xp(e, i) {
  const o = Pr(e, [
      "productCode",
      "product_code",
      "productId",
      "product_id",
      "id",
      "businessProductCode",
      "business_product_code",
    ]),
    c = Pr(i, [
      "productCode",
      "product_code",
      "productId",
      "product_id",
      "id",
      "businessProductCode",
      "business_product_code",
    ]);
  if (o.size && c.size) return Xa(o, c);
  const l = Pr(e, ["name", "productName", "title"]),
    p = Pr(i, ["name", "productName", "title"]);
  return !!(l.size && p.size && Xa(l, p));
}
function Za({
  inTransitPipeline: e,
  accountRegistration: i,
  selectedProduct: o,
} = {}) {
  return e?.instanceId
    ? xp(o, e)
      ? "RESUME"
      : "BLOCK"
    : i
      ? "BLOCK"
      : "START";
}
const Dp = "006",
  Wi = "MERCHANT_NOT_SUPPORT",
  Qi = "PERSONAL_NOT_CERTIFIED",
  Up = "https://b.alipay.com/page/product-workspace/all-product",
  Bp = "当前账号暂不满足该产品的接入条件，请前往商家平台查看可开通产品";
function xs(e) {
  return !e || typeof e != "object" || String(e.errorCode ?? "") !== Dp
    ? !1
    : e.success === !1 || e.isSuccess === !1;
}
function Fp(e) {
  return !e || typeof e != "object" ? !1 : e.isLoginExpired === !0 ? !0 : xs(e);
}
(() => {
  const e = document.querySelector("[data-onboarding-root]");
  if (!e) return;
  fu(e);
  const i = e.getAttribute("data-onboarding-mode") === "page",
    o = "/open-flow",
    c = "aipay_return_to",
    l = "aipay:login-return-path",
    p = { products: `${o}/products`, wizard: o, console: `${o}/console` };
  function f(t) {
    e.querySelectorAll("[data-console-stat-tip]").forEach((n) => {
      if (!(n instanceof HTMLButtonElement) || n === t) return;
      const a = n.parentElement?.querySelector(".consoleStatTip");
      (n.setAttribute("aria-expanded", "false"),
        delete n.dataset.consoleStatTipPinned,
        n.parentElement?.classList.remove("isOpen"),
        a instanceof HTMLElement && (a.hidden = !0));
    });
  }
  function g(t, n = {}) {
    const a = t.parentElement?.querySelector(".consoleStatTip");
    a instanceof HTMLElement &&
      (f(t),
      t.setAttribute("aria-expanded", "true"),
      n.pinned && (t.dataset.consoleStatTipPinned = "true"),
      t.parentElement?.classList.add("isOpen"),
      (a.hidden = !1));
  }
  function I(t, n = {}) {
    if (t.dataset.consoleStatTipPinned === "true" && !n.force) return;
    const a = t.parentElement?.querySelector(".consoleStatTip");
    (t.setAttribute("aria-expanded", "false"),
      delete t.dataset.consoleStatTipPinned,
      t.parentElement?.classList.remove("isOpen"),
      a instanceof HTMLElement && (a.hidden = !0));
  }
  function y(t) {
    if (
      t.getAttribute("aria-expanded") === "true" &&
      t.dataset.consoleStatTipPinned === "true"
    ) {
      I(t, { force: !0 });
      return;
    }
    g(t, { pinned: !0 });
  }
  const E = "/merchant-intent",
    C = "aipay:authcenter-force-logout-at",
    w = 60 * 1e3,
    A = "aipay:pamir-identity-decision",
    L = 300 * 1e3,
    N = [0, 300, 800, 1500],
    D = 1500,
    k = 1e3,
    x = 15 * 1e3,
    P = Array.from(e.querySelectorAll("[data-onboarding-panel]")),
    _ = e.querySelector("[data-onboarding-toast]");
  let r = uc(),
    M = Object.entries(gt).map(([t, n]) => ({
      id: t,
      name: n.name,
      desc: n.desc,
      description: n.desc,
      docs: n.docs,
      icon: n.icon,
      group: n.group || "receive",
      badge: "",
    })),
    ne,
    Z,
    ie,
    Y = null,
    J,
    U = "private",
    te = "",
    fe = null,
    Se,
    $ = !1,
    Ne = [],
    Oe,
    ye = !1,
    kr = !1,
    Gn = "",
    Me = "products",
    Et = !1,
    xe = "create",
    Ye = null,
    Dt = !1,
    We = "",
    ot = 1,
    $n = "",
    Yn = "ALL",
    Hr = 0,
    zr = 0,
    jr = !1,
    Re,
    an = [],
    Qe = "",
    sn = 0,
    Ut = 0,
    yo = 0,
    Kr = 0,
    Eo = !1,
    ht = !1,
    Bt = 0,
    ho = 0,
    cn = null,
    Gr = !1,
    Wn = "",
    dn = 0,
    $r = !1,
    Ft = 0,
    Yr = "",
    Wr = 0;
  r.isLoggedIn;
  const wo = new Set([
      "SUCCESS",
      "COMPLETED",
      "COMPLETE",
      "DONE",
      "FINISHED",
      "OPEN",
      "OPENED",
    ]),
    Je = "PRODUCT_OPEN",
    Ds = "aipay-product-open:update",
    Us = "aipay-enterprise-product-open:mount",
    Bs = "aipay-enterprise-product-open:node-change",
    Fs = "aipay-product-open:submit",
    Vs = "aipay-product-open:refresh",
    qs = "aipay-product-open:reopen",
    ks = "aipay-product-open:skip",
    re = "KEY_CONFIG",
    Hs = "aipay-key-config:update",
    zs = "aipay-key-config:created",
    js = "aipay-key-config:approved",
    Ks = "aipay-key-config:reopen",
    Gs = "onCreatedApp",
    $s = "onApprovedApp",
    Ys = "onReopenFlow",
    Ws = new Set([
      "WAITING_RESULT",
      "IN_PROGRESS",
      "PROCESSING",
      "RUNNING",
      "SUBMITTED",
      "PENDING",
      "REVIEW",
      "REVIEWING",
    ]);
  let Qr = !1,
    ln = null;
  const un = Ud();
  let Xe = 0;
  const Qs = el();
  let Ae = null,
    Jr = null,
    pn = null;
  function me() {
    const t = Fe(r);
    return Ae?.instanceId === t.instanceId && Ae?.subjectKey === t.subjectKey
      ? Ae
      : null;
  }
  function Co(t, n) {
    (clearTimeout(Jr),
      (Jr = setTimeout(() => {
        de(t, r) && Be(n, { silent: !0 });
      }, 1e4)));
  }
  let bo = 0;
  function Qn(t, n) {
    e.querySelectorAll(t).forEach((a) => {
      a.textContent = n;
    });
  }
  function fn() {
    const t = r.userInfo && typeof r.userInfo == "object" ? r.userInfo : {},
      n = va(t),
      a = Qd(n),
      s = Cr(t),
      d = Jd(t);
    (e.querySelectorAll("[data-onboarding-account]").forEach((u) => {
      u instanceof HTMLElement &&
        ((u.hidden = !r.isLoggedIn),
        s ? (u.title = `用户ID：${s}`) : u.removeAttribute("title"));
    }),
      Qn("[data-onboarding-account-name]", n),
      Qn("[data-onboarding-account-initial]", a),
      e
        .querySelectorAll("[data-onboarding-account-avatar-image]")
        .forEach((u) => {
          u instanceof HTMLImageElement &&
            (d
              ? ((u.src = d), (u.hidden = !1))
              : (u.removeAttribute("src"), (u.hidden = !0)));
        }));
  }
  function wt(t = r.userInfo) {
    if (!t || typeof t != "object") return "";
    const n = Cr(t);
    if (n) return `id:${n}`;
    const a = [t.logonName, t.userName, t.nickName, t.name]
      .map((s) => String(s || "").trim())
      .find(Boolean);
    return a ? `name:${a}` : "";
  }
  function Ct() {
    ((Kr += 1),
      Ta(),
      Jn(),
      Wt(),
      (r.isLoggedIn = !1),
      (r.userInfo = {}),
      (r.identityContext = null),
      (r.selectedSubjectType = "USER"),
      (r.selectedSubjectId = ""),
      (r.identitySelectionPending = !1),
      (r.inTransitPipeline = null),
      (r.accountRegistrationInTransit = null),
      (r.pipelineStarting = !1),
      At(),
      fn());
  }
  function Jn() {
    try {
      window.sessionStorage.removeItem(A);
    } catch {}
  }
  function Js() {
    const t = wt();
    if (!t || !r.selectedSubjectId) return;
    const n =
        r.identityContext && typeof r.identityContext == "object"
          ? r.identityContext
          : null,
      a = {
        accountKey: t,
        selectedAccountKey: `id:${r.selectedSubjectId}`,
        selectedSubjectType: r.selectedSubjectType,
        selectedSubjectId: r.selectedSubjectId,
        identityContext: n,
        createdAt: Date.now(),
      };
    try {
      window.sessionStorage.setItem(A, JSON.stringify(a));
    } catch {}
  }
  function Xs() {
    let t;
    try {
      const a = window.sessionStorage.getItem(A);
      if ((window.sessionStorage.removeItem(A), !a)) return !1;
      t = JSON.parse(a);
    } catch {
      return !1;
    }
    const n = wt();
    return nl({ decision: t, accountKey: n, maxAgeMs: L })
      ? ((r.selectedSubjectType = t.selectedSubjectType),
        (r.selectedSubjectId = String(t.selectedSubjectId)),
        (r.identityContext =
          t.identityContext && typeof t.identityContext == "object"
            ? t.identityContext
            : null),
        (r.identitySelectionPending = !1),
        b(),
        !0)
      : !1;
  }
  function Xr(t = r.userInfo) {
    const n = r.qualificationBlocker;
    if (!n?.subCode) return !1;
    if (!r.isLoggedIn) return ((r.qualificationBlocker = null), !0);
    const a = wt(t);
    return !a || (n.accountKey && n.accountKey === a)
      ? !1
      : ((r.qualificationBlocker = null), !0);
  }
  function Ao() {
    (et(), ct(M.length ? "ready" : "empty"), Pt());
  }
  function Po(t) {
    const n = wt();
    (!r.isLoggedIn || (t && t !== n)) && Wt();
  }
  async function Xn({
    silent: t = !0,
    redirectOnLoginExpired: n = !1,
    force: a = !1,
  } = {}) {
    const s = ++Kr,
      d = await Hi({
        localLoggedIn: !!r.isLoggedIn,
        fallbackUserInfo: r.userInfo || {},
        force: a,
      });
    if (s !== Kr) return d;
    if (n && d.isLoginExpired) return (lr(), d);
    const u = wt();
    ((r.isLoggedIn = d.isLoggedIn), (r.userInfo = d.userInfo || {}), Po(u));
    const m = Xr(r.userInfo);
    return (
      b(),
      fn(),
      ze(),
      m && Ao(),
      !t && d.error && h("账号信息获取失败，请稍后重试"),
      d
    );
  }
  function To(t) {
    const n = wt();
    ((r.isLoggedIn = t.isLoggedIn), (r.userInfo = t.userInfo || {}), Po(n));
    const a = Xr(r.userInfo);
    (b(), fn(), ze(), a && Ao());
  }
  function vo(t) {
    return new Promise((n) => window.setTimeout(n, t));
  }
  async function _o({ retry: t = !1, forceLogoutOnExpired: n = !0 } = {}) {
    const a = t ? N : [0];
    let s = null;
    for (const d of a) {
      d > 0 && (await vo(d));
      const u = await Hi({
        localLoggedIn: !1,
        fallbackUserInfo: r.userInfo || {},
        preserveLocalLoginOnLocalHost: !1,
        force: !0,
      });
      if (((s = u), To(u), u.isLoggedIn)) return u;
    }
    return (s?.isLoginExpired && n && lr(), s);
  }
  async function Zn() {
    const t = await Hi({
      localLoggedIn: !1,
      fallbackUserInfo: {},
      preserveLocalLoginOnLocalHost: !1,
      force: !0,
    });
    return (
      To(t),
      t.isLoggedIn && window.dispatchEvent(new CustomEvent(Rn)),
      t
    );
  }
  async function Zs(t = {}) {
    if (!ve() || r.isLoggedIn) return;
    const n =
      t.isLoggedInHref === !0 || (t.hrefReadable === !1 && t.loadIndex > 1);
    n && (Vt("syncing", { message: "正在同步登录状态..." }), Zr());
    const a = await Er({
      source: t.source || "iframe-load",
      silentFailure: !0,
    });
    a?.loggedIn ||
      r.isLoggedIn ||
      (n &&
        (t.href,
        t.hrefReadable,
        t.loadIndex,
        t.source,
        a?.accountInfo?.error,
        void 0));
  }
  function Vt(t, { message: n = "", allowFullLogout: a = !1 } = {}) {
    const s = e.querySelector('[data-onboarding-panel="login"]'),
      d = e.querySelector("[data-login-iframe-panel]"),
      u = e.querySelector("[data-login-status-panel]"),
      m = e.querySelector("[data-login-status-text]"),
      S = e.querySelector("[data-login-status-spinner]"),
      T = e.querySelector("[data-login-status-actions]"),
      R = e.querySelector("[data-login-full-logout]");
    (s instanceof HTMLElement && (s.dataset.loginState = t),
      d instanceof HTMLElement && (d.hidden = t !== "ready" && t !== "loading"),
      u instanceof HTMLElement && (u.hidden = t === "ready"),
      m && (m.textContent = n),
      S instanceof HTMLElement && (S.hidden = t === "error"),
      T instanceof HTMLElement && (T.hidden = t !== "error"),
      R instanceof HTMLElement && (R.hidden = !a));
  }
  function ec() {
    Ft && (window.clearTimeout(Ft), (Ft = 0));
  }
  function Zr() {
    Ft ||
      (Ft = window.setTimeout(() => {
        ((Ft = 0),
          !(r.isLoggedIn || !ve()) &&
            Vt("error", { message: "登录状态同步超时，请重试" }));
      }, x));
  }
  function ei() {
    (dn && (window.clearInterval(dn), (dn = 0)), ec());
  }
  async function tc() {
    if ($r || r.isLoggedIn || !ht || !ve()) return;
    const t = Bt;
    $r = !0;
    try {
      const n = await _o({ retry: !1, forceLogoutOnExpired: !1 });
      if (t !== Bt || !ve()) return;
      n?.isLoggedIn && (ei(), _n({ source: "backend-poll" }));
    } catch {
    } finally {
      $r = !1;
    }
  }
  function No() {
    dn || r.isLoggedIn || (dn = window.setInterval(tc, k));
  }
  async function nc() {
    (Vt("syncing", { message: "正在同步登录状态..." }), Zr(), No());
    const t = await Er({ source: "manual-backend-retry", silentFailure: !0 });
    t?.loggedIn ||
      r.isLoggedIn ||
      (t?.accountInfo?.isLoginExpired, t?.accountInfo?.error, void 0);
  }
  function ti({ clearSource: t = !0 } = {}) {
    (ei(), (ht = !1));
    const n = e.querySelector("[data-login-iframe]");
    if (n instanceof HTMLIFrameElement) {
      const a = Number(n.dataset.authcenterLoadGeneration || 0) + 1;
      ((n.dataset.authcenterLoadGeneration = String(a)),
        t && (n.src = "about:blank"));
    }
  }
  function rc() {
    ht || ((ht = !0), Vt("ready"), Wd(e), No());
  }
  function ic() {
    if (!ve() || !ht) return;
    e.querySelector('[data-onboarding-panel="login"]')?.dataset.loginState ===
      "loading" && Vt("ready");
  }
  function oc({
    backendAccountInfo: t = null,
    skipBackendCheck: n = !1,
    panelOptions: a = {},
  } = {}) {
    ee("login", a);
    const s = ++Bt;
    return (
      ti({ clearSource: !1 }),
      rc(),
      (t ? Promise.resolve(t) : n ? Promise.resolve(null) : Zn())
        .then((u) => {
          !u ||
            s !== Bt ||
            !ve() ||
            (u.isLoggedIn && _n({ source: "backend-precheck" }));
        })
        .catch((u) => {
          u?.message;
        }),
      Promise.resolve({ ready: !0 })
    );
  }
  function ac() {
    try {
      const t = window.sessionStorage.getItem(C),
        n = Number(t || 0);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  }
  function sc() {
    try {
      window.sessionStorage.setItem(C, String(Date.now()));
    } catch {}
  }
  function Ro() {
    try {
      window.sessionStorage.removeItem(C);
    } catch {}
  }
  function cc() {
    return Date.now() - ac() <= w;
  }
  function dc() {
    (Ct(), b(), ze(), sc(), window.location.assign(Pa()));
  }
  function ni({
    backendAccountInfo: t = null,
    skipBackendCheck: n = !1,
    ...a
  } = {}) {
    return (
      ve() || (Gr = !1),
      oc({ backendAccountInfo: t, skipBackendCheck: n, panelOptions: a })
    );
  }
  function lc() {
    _ instanceof HTMLElement && (window.clearTimeout(h.timer), (_.hidden = !0));
  }
  function er(t) {
    i ||
      (document.documentElement.classList.toggle("onboardingNoScroll", t),
      document.body?.classList.toggle("onboardingNoScroll", t));
  }
  function uc() {
    try {
      const t = JSON.parse(window.localStorage.getItem(Aa) || "{}"),
        n = { ...wr, ...t };
      return (
        (n.identityContext = null),
        (n.selectedSubjectType = ""),
        (n.selectedSubjectId = ""),
        (n.identitySelectionPending = !1),
        Ot.includes(n.currentStep) || (n.currentStep = "tech"),
        n.pipelineView?.instanceId ||
          ((n.pipelineView = null),
          (n.pipelineCurrentForm = null),
          (n.pipelineCurrentNodeId = ""),
          (n.nodeFormDrafts = {})),
        (n.nodeFormDrafts =
          n.nodeFormDrafts && typeof n.nodeFormDrafts == "object"
            ? n.nodeFormDrafts
            : {}),
        (n.registeredServices = []),
        (n.registeredServicesLoaded = !1),
        (n.registeredServicesLoading = !1),
        (n.registeredServicesError = ""),
        (n.serviceRegisterMode = ""),
        (n.serviceDetailLoadingId = ""),
        (n.serviceDetailError = ""),
        (n.serviceSubmittingId = ""),
        (n.serviceRechooseMode = !1),
        (n.pipelineStarting = !1),
        (n.qualificationBlocker = null),
        (n.productOpenFormLoading = !1),
        (n.productOpenFormError = ""),
        (n.serviceRejectedFieldEdits =
          n.serviceRejectedFieldEdits &&
          typeof n.serviceRejectedFieldEdits == "object"
            ? n.serviceRejectedFieldEdits
            : {}),
        n
      );
    } catch {
      return { ...wr };
    }
  }
  function b() {
    window.localStorage.setItem(Aa, JSON.stringify(r));
  }
  function tr(t) {
    const n = t || "/";
    return n.length > 1 ? n.replace(/\/+$/, "") : n;
  }
  function mn() {
    return `${window.location.pathname || "/"}${window.location.search || ""}`;
  }
  function ke() {
    return `${mn()}${window.location.hash || ""}`;
  }
  function Lo() {
    if (!na() || !window.history?.replaceState) return;
    const t = new URL(window.location.href),
      n = [
        "product",
        "productCode",
        "enterprisePipeline",
        "enterpriseRegistration",
        "step",
        "nodeId",
      ];
    n.some((s) => t.searchParams.has(s)) &&
      (n.forEach((s) => t.searchParams.delete(s)),
      window.history.replaceState(
        window.history.state,
        document.title,
        `${t.pathname}${t.search}${t.hash}`,
      ));
  }
  function gn(t) {
    if (!t) return "";
    try {
      const n = new URL(t, window.location.origin);
      return n.origin !== window.location.origin
        ? ""
        : `${n.pathname || "/"}${n.search || ""}${n.hash || ""}`;
    } catch {
      return "";
    }
  }
  function Oo(t) {
    const n = gn(t);
    Wn = n;
    try {
      n
        ? window.sessionStorage.setItem(l, n)
        : window.sessionStorage.removeItem(l);
    } catch {}
    return n;
  }
  function Mo() {
    if (Wn) return Wn;
    try {
      return gn(window.sessionStorage.getItem(l) || "");
    } catch {
      return "";
    }
  }
  function In() {
    Wn = "";
    try {
      window.sessionStorage.removeItem(l);
    } catch {}
  }
  function xo(t) {
    const n = gn(t);
    if (n) {
      if (n === ke()) {
        i && Sn({ replaceRoute: !0 });
        return;
      }
      window.location.replace(we(n));
    }
  }
  function pc() {
    const t = new URL(window.location.href);
    if (t.searchParams.get("aipay_login") !== "1") return !1;
    const n = gn(t.searchParams.get(c));
    (t.searchParams.delete("aipay_login"),
      t.searchParams.delete(c),
      window.history.replaceState(
        window.history.state,
        document.title,
        t.toString(),
      ));
    const a = n || ke();
    return (
      gr({ returnPath: a }).then((s) => {
        s && xo(a);
      }),
      !0
    );
  }
  function fc() {
    const t = new URL(window.location.href);
    (!t.searchParams.has("aipay_login") && !t.searchParams.has(c)) ||
      (t.searchParams.delete("aipay_login"),
      t.searchParams.delete(c),
      window.history.replaceState(
        window.history.state,
        document.title,
        t.toString(),
      ));
  }
  function qt(t = window.location.pathname) {
    const n = tr(t);
    return n === o || n.startsWith(`${o}/`);
  }
  function ri(t) {
    const n = String(t || "").toLowerCase();
    return n === "services" || n === "service" ? "services" : "products";
  }
  function mc() {
    const t = new URLSearchParams(window.location.search);
    return ri(t.get("view") || t.get("tab") || "");
  }
  function ii() {
    const t = tr(window.location.pathname);
    if (!qt(t)) return null;
    const n = t === o ? "" : t.slice(o.length + 1).split("/")[0],
      s = new URLSearchParams(window.location.search).get("step") || "";
    if (n === "products") return { panel: "products" };
    if (n === "console") return { panel: "console", consoleView: mc() };
    const d = n || s || r.currentStep;
    return { panel: "wizard", step: Ot.includes(d) ? d : "tech" };
  }
  function Do(t) {
    if (!t || t.panel !== "wizard" || t.step !== "success") return !1;
    const n = new URLSearchParams(window.location.search);
    return (
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") &&
      n.get("preview") === "success"
    );
  }
  function kt() {
    const t = new URLSearchParams(window.location.search);
    return tr(window.location.pathname) !== p.products &&
      !(qt() && (t.get("product") || t.get("productCode")) === Ve)
      ? ""
      : (t.get("product") || t.get("productCode") || "").trim();
  }
  function ue() {
    return oi().enterpriseRegistration;
  }
  function He() {
    return oi().enterprisePipeline;
  }
  function oi() {
    return ul({
      currentHref: window.location.href,
      selectedSubjectType: r.selectedSubjectType,
      selectedSubjectId: r.selectedSubjectId,
    });
  }
  function ai(t) {
    return pl(window.location.href, t, oi());
  }
  function Uo(t) {
    return String(t || "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }
  function gc(t, n) {
    const a = Uo(n?.name);
    return a
      ? [
          t?.name,
          t?.productName,
          t?.title,
          t?.raw?.productName,
          t?.raw?.name,
          t?.raw?.title,
        ].some((s) => Uo(s) === a)
      : !1;
  }
  function Bo(t, n = M) {
    if (!t) return null;
    const a = n.find(
      (d) => d?.id === t || d?.productCode === t || d?.raw?.productCode === t,
    );
    if (a) return a;
    const s = gt[t];
    return (s && n.find((d) => gc(d, s))) || null;
  }
  function Ht(t = "") {
    const n = String(t || "").trim(),
      a = new URLSearchParams();
    (n && a.set("product", n),
      He() && a.set("enterprisePipeline", "true"),
      ue() && a.set("enterpriseRegistration", "true"));
    const s = a.toString(),
      d = s ? `${p.products}?${s}` : p.products;
    return ai(we(d));
  }
  function Ic(t = Me) {
    const n = ri(t) === "services" ? `${p.console}?view=services` : p.console;
    return ai(we(n));
  }
  function at(t, n = r.currentStep, a = "") {
    if (t === "wizard") {
      const s = Ot.includes(n) ? n : "tech",
        d = new URLSearchParams({
          product: r.pipelineView?.productCode || r.selectedProduct,
        });
      return (
        H(r.pipelineView) &&
          r.pipelineCurrentNodeId &&
          s !== "success" &&
          d.set("nodeId", r.pipelineCurrentNodeId),
        ai(we(`${o}/${s}?${d.toString()}`))
      );
    }
    return t === "products" ? Ht(a) : t === "console" ? Ic() : we(p[t] || mn());
  }
  function Sc() {
    qt()
      ? (!r.routeReturnPath || qt(r.routeReturnPath.split("?")[0])) &&
        ((r.routeReturnPath = "/"), b())
      : ((r.routeReturnPath = mn()), b());
  }
  function Pe(t, { replace: n = !1, productParam: a = "" } = {}) {
    if (!window.history?.pushState || t === "existing") return;
    const s = at(t, r.currentStep, a),
      d = mn();
    if (s === d) return;
    const u = n ? "replaceState" : "pushState",
      m = new URL(s, window.location.href).pathname;
    (window.history[u](
      {
        ...(window.history.state || {}),
        aipayOnboarding: !0,
        panel: t,
        step: r.currentStep,
      },
      document.title,
      s,
    ),
      Rr(m));
  }
  function nr(t, { replace: n = !1 } = {}) {
    const a = n ? "replace" : "assign";
    window.location[a](at(t));
  }
  function yc({ replace: t = !1 } = {}) {
    if (!window.history?.pushState) return;
    const n = r.routeReturnPath || "/",
      a = we(qt(n.split("?")[0]) ? "/" : n),
      s = mn();
    if (a === s) return;
    const d = t ? "replaceState" : "pushState";
    (window.history[d](
      { ...(window.history.state || {}), aipayOnboarding: !1 },
      document.title,
      a,
    ),
      Rr(new URL(a, window.location.href).pathname));
  }
  function Fo(
    t,
    n = new URLSearchParams(window.location.search).get("nodeId"),
  ) {
    if (!Ot.includes(t) || t === "success" || !r.pipelineView?.instanceId)
      return;
    const a = V(r.pipelineView, n),
      s = a && pe(a) === t ? a : Ln(r.pipelineView, t);
    s?.nodeId &&
      ((r.pipelineCurrentNodeId = s.nodeId),
      r.pipelineCurrentForm?.nodeId !== s.nodeId &&
        ((r.pipelineCurrentForm =
          r.pipelineView?.currentForm?.nodeId === s.nodeId
            ? r.pipelineView.currentForm
            : null),
        (Qe = r.pipelineCurrentForm?.nodeId
          ? `${r.pipelineInstanceId}:${s.nodeId}`
          : "")));
  }
  function Sn({ replaceRoute: t = !0 } = {}) {
    const n = ii();
    return n
      ? ((!r.routeReturnPath || qt(r.routeReturnPath.split("?")[0])) &&
          (r.routeReturnPath = "/"),
        n.step &&
          Ot.includes(n.step) &&
          ((r.currentStep =
            n.step === "success" && !Do(n) && !le(r.pipelineView)
              ? On(r.pipelineView, "verify")
              : n.step),
          Fo(r.currentStep)),
        n.panel === "console" && (Me = ri(n.consoleView)),
        b(),
        ee(n.panel, { syncRoute: !1, replaceRoute: t }),
        !0)
      : !1;
  }
  async function si({ replaceRoute: t = !0 } = {}) {
    if (!i) return Sn({ replaceRoute: t });
    const n = ii();
    if (!n) return !1;
    if (r.isLoggedIn) {
      let s;
      try {
        s = await Zn();
      } catch (d) {
        return (d?.message, h("登录状态确认失败，请稍后重试"), !0);
      }
      if (s?.isLoggedIn)
        return ue()
          ? yn({ replaceRoute: t })
          : (await vt({
                productParam: kt(),
                returnPanel:
                  n.panel === "wizard" && kt() === Ve
                    ? "wizard"
                    : n.panel === "console"
                      ? "console"
                      : "products",
              }))
            ? yn({ replaceRoute: t })
            : !0;
      (Ct(), b());
    }
    if (Do(n)) return Sn({ replaceRoute: t });
    if (await gr({ returnPath: ke() })) {
      if (ue()) return (await yn({ replaceRoute: !0 }), !0);
      (await vt({
        productParam: kt(),
        returnPanel:
          n.panel === "wizard" && kt() === Ve
            ? "wizard"
            : n.panel === "console"
              ? "console"
              : "products",
      })) && (await yn({ replaceRoute: !0 }));
    }
    return !0;
  }
  async function yn({ replaceRoute: t = !0 } = {}) {
    const n = ii(),
      a = new URLSearchParams(window.location.search),
      s = a.get("product") || a.get("productCode");
    if (n?.panel !== "wizard" || s !== Ve) return Sn({ replaceRoute: t });
    if (!st()) return (window.location.assign(we(E)), !0);
    const d = ++bo,
      u = Fe(r).subjectKey,
      m = () => d === bo && u === Fe(r).subjectKey,
      S = a.get("nodeId");
    try {
      const T = { ...je, strictCode: !0 },
        R = await Ua(T);
      if (!m()) return !0;
      const O = R.find((F) => F.productCode === Ve);
      if (!O) throw new Error("当前身份暂不可接入订阅，请返回产品选择");
      const v = O.instanceId
        ? await Qt(O.instanceId, T)
        : await ji(Ve, {
            ...T,
            subjectType: r.selectedSubjectType,
            subjectId: r.selectedSubjectId,
          });
      if (!m()) return !0;
      if ((oe(v), !le(v))) {
        const F = V(v, S);
        F && pe(F) === n.step && ((r.currentStep = n.step), Fo(n.step, S));
      }
      ee("wizard", { replaceRoute: !0 });
    } catch (T) {
      m() && h(T?.message || "接入流程恢复失败，请刷新重试");
    }
    return !0;
  }
  function En() {
    return (
      M.find((t) => t.id === r.selectedProduct) ||
      gt[r.selectedProduct] ||
      M[0] ||
      gt.metered
    );
  }
  function bt(t) {
    const n = String(
      t?.group || t?.raw?.group || t?.raw?.productGroup || "",
    ).toLowerCase();
    if (["payment", "pay", "payer", "付款产品"].includes(n)) return "payment";
    const a =
      `${t?.id || ""} ${t?.productCode || ""} ${t?.name || ""}`.toLowerCase();
    return a.includes("agent") || a.includes("付款") ? "payment" : "receive";
  }
  function Te(t) {
    return (t?.productCode || t?.raw?.productCode) === "AI_SUBSCRIPTION";
  }
  function Ze(t) {
    const n = String(t?.productCode || t?.id || "").toUpperCase();
    return n === "WEB" || n === "AI_WEB_APP_PAY"
      ? 0
      : n === "ONLINE" || n === "AI_MOBILE_APP_PAY"
        ? 1
        : n === "METERED" || n === "PAY_BY_API"
          ? 2
          : Te(t)
            ? 3
            : 4;
  }
  function st() {
    return (
      r.userInfo?.loginCorporateAccount !== !1 &&
      r.selectedSubjectType === "MERCHANT" &&
      !!r.selectedSubjectId &&
      !ue()
    );
  }
  function De(t) {
    return H(r.pipelineView)
      ? { ...je, strictCode: !0, pluginCode: t?.pluginCode || "" }
      : {};
  }
  function zt(t) {
    if (Te(t) && !st()) return !1;
    const n = String(
      t?.pipelineStatus ||
        t?.status ||
        t?.raw?.pipelineStatus ||
        t?.raw?.status ||
        "",
    ).toUpperCase();
    return (
      !!t?.instanceId &&
      (Te(t)
        ? n === "SUCCESS"
        : wo.has(n) || t?.opened === !0 || t?.raw?.opened === !0)
    );
  }
  function ci(t = M) {
    const n = t.filter((a) => bt(a) === "receive");
    return n.length > 0 && n.some((a) => !zt(a));
  }
  function di(t = M) {
    return i && t.length > 0 && !ci(t);
  }
  function Vo(t) {
    return t?.subCode === Wi || t?.subCode === Qi;
  }
  function qo(t, n) {
    const a = t?.data && typeof t.data == "object" ? t.data : {},
      s =
        t?.extInfo && typeof t.extInfo == "object"
          ? t.extInfo
          : t?.raw?.extInfo && typeof t.raw.extInfo == "object"
            ? t.raw.extInfo
            : {};
    return {
      subCode: t?.subCode || "",
      message: t?.message || t?.subMsg || "当前账号暂不满足接入条件",
      productCode: n || r.selectedProduct,
      accountKey: wt(),
      personalCertifyUrl:
        a.personalCertifyUrl ||
        a.personal_certify_url ||
        s.personalCertifyUrl ||
        s.personal_certify_url ||
        "",
    };
  }
  function At() {
    r.qualificationBlocker && (r.qualificationBlocker = null);
  }
  function Ec() {
    (e.querySelectorAll("[data-qualification-blocker]").forEach((t) => {
      t instanceof HTMLElement && (t.hidden = !0);
    }),
      e
        .querySelectorAll(
          "[data-qualification-enterprise], [data-qualification-personal]",
        )
        .forEach((t) => {
          t instanceof HTMLElement && (t.hidden = !0);
        }));
  }
  async function hc(t) {
    const n = t?.personalCertifyUrl || "",
      a = ++yo,
      s = Array.from(
        e.querySelectorAll("[data-qualification-qr-canvas]"),
      ).filter((u) => u instanceof HTMLCanvasElement),
      d = !!n;
    if (
      (e.querySelectorAll("[data-qualification-qr-frame]").forEach((u) => {
        u instanceof HTMLElement && (u.hidden = !d);
      }),
      e.querySelectorAll("[data-qualification-qr-error]").forEach((u) => {
        u instanceof HTMLElement && (u.hidden = d);
      }),
      e.querySelectorAll("[data-qualification-certified]").forEach((u) => {
        u instanceof HTMLButtonElement &&
          (u.disabled = !d || r.pipelineStarting);
      }),
      e.querySelectorAll("[data-qualification-back-products]").forEach((u) => {
        u instanceof HTMLElement && (u.hidden = d);
      }),
      !!d)
    )
      try {
        await Promise.all(
          s.map((u) =>
            Zd.toCanvas(u, n, {
              color: { dark: "#1d2129", light: "#ffffff" },
              errorCorrectionLevel: "M",
              margin: 0,
              width: 142,
            }),
          ),
        );
      } catch {
        if (a !== yo) return;
        (e.querySelectorAll("[data-qualification-qr-frame]").forEach((u) => {
          u instanceof HTMLElement && (u.hidden = !0);
        }),
          e.querySelectorAll("[data-qualification-qr-error]").forEach((u) => {
            u instanceof HTMLElement &&
              ((u.hidden = !1),
              (u.textContent = "二维码生成失败，请返回产品选择后重试。"));
          }),
          e.querySelectorAll("[data-qualification-certified]").forEach((u) => {
            u instanceof HTMLButtonElement && (u.disabled = !0);
          }),
          e
            .querySelectorAll("[data-qualification-back-products]")
            .forEach((u) => {
              u instanceof HTMLElement && (u.hidden = !1);
            }));
      }
  }
  function wc() {
    Xr() && b();
    const n = r.qualificationBlocker,
      a = !!n?.subCode;
    if (
      (e.querySelectorAll("[data-product-select-grid]").forEach((s) => {
        s instanceof HTMLElement && (s.hidden = a);
      }),
      !a)
    ) {
      Ec();
      return;
    }
    (e.querySelectorAll("[data-qualification-blocker]").forEach((s) => {
      s instanceof HTMLElement && (s.hidden = !1);
    }),
      e.querySelectorAll("[data-qualification-enterprise]").forEach((s) => {
        s instanceof HTMLElement && (s.hidden = n.subCode !== Wi);
      }),
      e.querySelectorAll("[data-qualification-personal]").forEach((s) => {
        s instanceof HTMLElement && (s.hidden = n.subCode !== Qi);
      }),
      e.querySelectorAll("[data-qualification-merchant-link]").forEach((s) => {
        s instanceof HTMLAnchorElement && (s.href = Up);
      }),
      n.subCode === Wi && Qn("[data-qualification-enterprise-message]", Bp),
      n.subCode === Qi && hc(n));
  }
  function ct(t, n = "") {
    const a = !!r.qualificationBlocker?.subCode,
      s =
        a ||
        t === "loading" ||
        t === "empty" ||
        (t === "error" && M.length === 0);
    (e.querySelectorAll("[data-product-choice-list]").forEach((d) => {
      d instanceof HTMLElement && (d.hidden = s);
    }),
      e.querySelectorAll("[data-product-loading]").forEach((d) => {
        d instanceof HTMLElement && (d.hidden = a || t !== "loading");
      }),
      e.querySelectorAll("[data-product-error]").forEach((d) => {
        d instanceof HTMLElement && (d.hidden = a || t !== "error");
      }),
      e.querySelectorAll("[data-product-empty]").forEach((d) => {
        d instanceof HTMLElement && (d.hidden = a || t !== "empty");
      }),
      e.querySelectorAll("[data-product-error-text]").forEach((d) => {
        d.textContent = n || "产品列表获取失败";
      }),
      wc());
  }
  function Cc(t, n) {
    if (
      ((t.className = "productChoiceIcon"),
      t.replaceChildren(),
      t.setAttribute("aria-hidden", "true"),
      !n.iconUrl)
    )
      return;
    t.classList.add("hasRemoteIcon");
    const a = document.createElement("img");
    ((a.className = "productChoiceIconImage"),
      (a.src = n.iconUrl),
      (a.alt = ""),
      (a.loading = "lazy"),
      (a.decoding = "async"),
      t.append(a));
  }
  function li(t) {
    const n = document.createElement("button");
    ((n.className = "productChoice"),
      (n.type = "button"),
      (n.dataset.productChoice = t.id),
      Te(t) &&
        !st() &&
        (n.setAttribute("data-aspm-click", "a5486.b217838.c486869.d773285"),
        n.setAttribute("data-aspm-desc", "产品选择-连续订阅联系销售"),
        n.setAttribute("data-track-name", "产品选择-连续订阅联系销售")));
    const a = zt(t);
    a &&
      (n.classList.add("isComplete"),
      n.setAttribute(
        "aria-label",
        `${t.name}已接入，${Te(t) ? "查看接入结果" : "查看交易"}`,
      ));
    const s = bt(t) === "payment";
    r.pipelineStarting &&
      ((n.disabled = !0),
      r.selectedProduct === t.id && n.classList.add("isLoading"));
    const d = document.createElement("span");
    Cc(d, t);
    const u = document.createElement("span");
    u.className = "productChoiceCopy";
    const m = document.createElement("strong");
    m.textContent = t.name;
    const S = document.createElement("small");
    if (
      ((S.textContent = t.description || t.desc || "暂无产品描述"),
      u.append(m, S),
      bt(t) !== "payment" &&
        (!Te(t) || st()) &&
        (a || t.badge || (r.pipelineStarting && r.selectedProduct === t.id)))
    ) {
      const O = document.createElement("em");
      ((O.className = "productChoiceBadge"),
        (O.textContent = a
          ? "接入完成"
          : r.pipelineStarting && r.selectedProduct === t.id
            ? "启动中"
            : t.badge),
        u.append(O));
    }
    const R = document.createElement("span");
    if (
      ((R.className = "productChoiceAction"),
      (R.textContent = Te(t)
        ? st()
          ? a
            ? "查看接入结果"
            : "接入"
          : "联系销售"
        : a
          ? "查看交易"
          : s
            ? "查看详情"
            : "接入"),
      R.textContent === "接入" && (t.id !== "vibe-pay" || !ui()))
    ) {
      const O = du(t.productCode || t.id);
      O &&
        (n.setAttribute("data-aspm-click", O.spm),
        n.setAttribute("data-aspm-desc", O.name));
    }
    return (n.append(d, u, R), n);
  }
  function Pt() {
    const t = !!r.pipelineStarting;
    (e.classList.toggle("isPipelineStarting", t),
      e.querySelectorAll("[data-pipeline-starting-overlay]").forEach((n) => {
        n instanceof HTMLElement && (n.hidden = !t);
      }),
      e
        .querySelectorAll("[data-product-choice], [data-vibe-pay-choice]")
        .forEach((n) => {
          n instanceof HTMLButtonElement && (n.disabled = t);
        }),
      e.querySelectorAll("[data-qualification-certified]").forEach((n) => {
        n instanceof HTMLButtonElement &&
          (n.disabled = t || !r.qualificationBlocker?.personalCertifyUrl);
      }));
  }
  function et() {
    const t = Array.from(
      e.querySelectorAll("[data-product-choice-list]"),
    ).filter((n) => n instanceof HTMLElement);
    t.length &&
      (t.forEach((n) => {
        n.replaceChildren();
        const a = n.getAttribute("data-product-group"),
          s = a ? M.filter((d) => bt(d) === a) : [...M];
        if (
          (s.sort((d, u) => Ze(d) - Ze(u)),
          s.forEach((d) => {
            if (i && Ze(d) < 2) {
              if (d === s.find((u) => Ze(u) < 2)) {
                const u = li({
                  id: "vibe-pay",
                  name: "VibePay AI 应用收款",
                  description:
                    "面向 AI 创作者的应用收款方案，支持网页与移动应用",
                  group: "receive",
                  iconUrl: "/assets/media/e47ab09e19c6732cd77a.svg",
                });
                (delete u.dataset.productChoice,
                  (u.dataset.vibePayChoice = ""));
                const m = ui();
                (u.classList.toggle("isComplete", m),
                  (u.querySelector(".productChoiceAction").textContent = m
                    ? "查看"
                    : "接入"),
                  n.append(u));
              }
              return;
            }
            n.append(li(d));
          }),
          !s.length)
        ) {
          const d = document.createElement("div");
          ((d.className = "productChoicePlaceholder"),
            (d.textContent = "暂无产品"),
            n.append(d));
        }
      }),
      ct(M.length ? "ready" : "empty"),
      Pt());
  }
  function ui() {
    return [0, 1].every((t) => M.some((n) => Ze(n) === t && zt(n)));
  }
  function bc() {
    const t = e.querySelector("[data-vibe-pay-dialog]"),
      n = t.querySelector("[data-vibe-pay-options]"),
      a = M.filter((s) => Ze(s) < 2).sort((s, d) => Ze(s) - Ze(d));
    (n.replaceChildren(
      ...a.map((s) =>
        li({ ...s, name: Ze(s) === 0 ? "我是网页应用" : "我是移动应用" }),
      ),
    ),
      t.showModal());
  }
  function rr() {
    e.querySelector("[data-vibe-pay-dialog]")?.close();
  }
  function ko() {
    zo();
    const t = e.querySelector(".productSelectBody");
    (t instanceof HTMLElement && t.classList.remove("isAccessModeSelected"),
      e.querySelectorAll("[data-access-mode]").forEach((a) => {
        (a.classList.remove("isActive"),
          a.setAttribute("aria-selected", "false"));
      }));
    const n = e.querySelector("[data-access-mode-selector]");
    (n instanceof HTMLElement && n.classList.remove("isCompact"),
      e.querySelectorAll("[data-access-workspace]").forEach((a) => {
        a instanceof HTMLElement && (a.hidden = !0);
      }));
  }
  function pi() {
    const t = e.querySelector(".productSelectBody"),
      n = e.querySelector("[data-access-mode-experience]");
    (t instanceof HTMLElement && t.classList.remove("isAccessMode"),
      n instanceof HTMLElement && ((n.hidden = !0), Mn(n, { reset: !0 })),
      (Yr = ""),
      ko());
  }
  function fi(t, n = "") {
    if (He()) return;
    const a = t
      .map((S) => String(S || "").trim())
      .find((S) => M.some((T) => T.id === S));
    if (!a) return;
    Yr = a;
    const s = M.find((S) => S.id === a),
      d = no(
        {
          ...r,
          selectedProduct: a,
          pipelineCurrentForm: null,
          pipelineView: {
            productCode: s?.productCode || s?.id || a,
            productName: s?.name || gt[a]?.name || "当前产品",
          },
        },
        { includeOnboarding: !0 },
      );
    (Qn("[data-aipay-agent-prompt]", d),
      e.querySelectorAll("[data-aipay-agent-prompt-copy]").forEach((S) => {
        S.setAttribute("data-copy-text", d);
      }),
      ko());
    const u = e.querySelector(".productSelectBody"),
      m = e.querySelector("[data-access-mode-experience]");
    (u instanceof HTMLElement && u.classList.add("isAccessMode"),
      m instanceof HTMLElement && (m.hidden = !1),
      n === "agent" && mi("agent"),
      m instanceof HTMLElement && Mn(m));
  }
  function mi(t) {
    if (!["agent", "guided"].includes(t)) return;
    if (
      (e.querySelectorAll("[data-access-mode]").forEach((s) => {
        const d = s.getAttribute("data-access-mode") === t;
        (s.classList.toggle("isActive", d),
          s.setAttribute("aria-selected", String(d)));
      }),
      t === "guided")
    ) {
      const s = Yr;
      (pi(), s && Ni(s));
      return;
    }
    const n = e.querySelector(".productSelectBody");
    n instanceof HTMLElement && n.classList.add("isAccessModeSelected");
    const a = e.querySelector("[data-access-mode-selector]");
    (a instanceof HTMLElement && a.classList.add("isCompact"),
      e.querySelectorAll("[data-access-workspace]").forEach((s) => {
        s instanceof HTMLElement &&
          (s.hidden = s.getAttribute("data-access-workspace") !== t);
      }),
      Ac());
  }
  function Ho(t, n = !1) {
    Array.from(e.querySelectorAll("[data-agent-flow-step]")).forEach((d, u) => {
      (d.classList.toggle("isComplete", n || u < t),
        d.classList.toggle("isActive", !n && u === t));
    });
    const s = t < 2 ? 0 : 1;
    e.querySelectorAll("[data-agent-flow-group]").forEach((d, u) => {
      d.classList.toggle("isActive", n || u === s);
    });
  }
  function zo() {
    (window.clearTimeout(Wr), (Wr = 0));
    const t = e.querySelector("[data-agent-flow]");
    t instanceof HTMLElement && t.classList.remove("isAnimating");
  }
  function Ac() {
    zo();
    const t = e.querySelector("[data-agent-flow]"),
      n = e.querySelectorAll("[data-agent-flow-step]");
    if (!(t instanceof HTMLElement) || !n.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (Ho(-1, !0), t.classList.add("isComplete"));
      return;
    }
    (t.classList.remove("isComplete"),
      t.offsetWidth,
      t.classList.add("isAnimating"));
    const a = (s) => {
      Ho(s);
      const d = s === n.length - 1 ? 800 : 1200,
        u = s === n.length - 1 ? 0 : s + 1;
      Wr = window.setTimeout(() => {
        (u === 0 &&
          (t.classList.remove("isAnimating"),
          t.offsetWidth,
          t.classList.add("isAnimating")),
          a(u));
      }, d);
    };
    a(0);
  }
  function jo() {
    const t = V(r.pipelineView, "SERVICE_REGISTER"),
      n =
        t?.flowStatus === "COMPLETED" ||
        t?.viewState === "COMPLETED" ||
        t?.nodeStatus === "SUCCESS";
    return (
      r.currentStep === "service" &&
      r.pipelineCurrentNodeId === "SERVICE_REGISTER" &&
      (!n || r.serviceRechooseMode === !0 || r.serviceRegisterMode === "list")
    );
  }
  function ir() {
    const t = V(r.pipelineView, "SERVICE_REGISTER"),
      n =
        r.pipelineCurrentForm?.nodeId === "SERVICE_REGISTER"
          ? r.pipelineCurrentForm
          : r.pipelineView?.currentForm?.nodeId === "SERVICE_REGISTER"
            ? r.pipelineView.currentForm
            : null;
    return (
      r.currentStep === "service" &&
      r.pipelineCurrentNodeId === "SERVICE_REGISTER" &&
      (n?.flowStatus === "FAILED" ||
        t?.flowStatus === "FAILED" ||
        t?.nodeStatus === "FAILED") &&
      (n?.viewState === "EDITABLE" || t?.viewState === "EDITABLE")
    );
  }
  function Pc() {
    const t =
        r.pipelineCurrentForm?.nodeId === r.pipelineCurrentNodeId
          ? r.pipelineCurrentForm
          : r.pipelineView?.currentForm?.nodeId === r.pipelineCurrentNodeId
            ? r.pipelineView.currentForm
            : null,
      n = V(r.pipelineView, r.pipelineCurrentNodeId),
      a = String(t?.viewState || n?.viewState || "").toUpperCase(),
      s = String(t?.nodeStatus || n?.nodeStatus || "").toUpperCase();
    return a === "READONLY" && s === "INIT";
  }
  function tt(t) {
    if (!t) return null;
    if (typeof t == "object" && !Array.isArray(t)) return t;
    if (typeof t != "string") return null;
    try {
      const n = JSON.parse(t);
      return n && typeof n == "object" && !Array.isArray(n) ? n : null;
    } catch {
      return null;
    }
  }
  function X(...t) {
    for (const n of t) {
      if (n == null || typeof n == "object") continue;
      const a = String(n).trim();
      if (a) return a;
    }
    return "";
  }
  function or(t) {
    return t && typeof t == "object" && !Array.isArray(t);
  }
  function dt() {
    const t = V(r.pipelineView, r.pipelineCurrentNodeId);
    return t && be(t, r.pipelineView) ? t : V(r.pipelineView, Je) || lt();
  }
  function ar() {
    const t = r.pipelineCurrentForm,
      n = r.pipelineView?.currentForm;
    return be(t, r.pipelineView) ? t : be(n, r.pipelineView) ? n : null;
  }
  function hn(t = ar()) {
    const n = t?.displayData || {},
      a = t?.formData || {},
      s = tt(n.data) || {},
      d = tt(a.data) || {};
    return {
      displayData: n,
      formData: a,
      signOrderNo: X(
        t?.signOrderNo,
        t?.sign_order_no,
        n.signOrderNo,
        n.sign_order_no,
        s.signOrderNo,
        s.sign_order_no,
        a.signOrderNo,
        a.sign_order_no,
        d.signOrderNo,
        d.sign_order_no,
      ),
      registerNo: X(
        t?.registerNo,
        t?.register_no,
        n.registerNo,
        n.register_no,
        s.registerNo,
        s.register_no,
        a.registerNo,
        a.register_no,
        d.registerNo,
        d.register_no,
      ),
      appType: X(
        t?.appType,
        t?.app_type,
        n.appType,
        n.app_type,
        s.appType,
        s.app_type,
        a.appType,
        a.app_type,
        d.appType,
        d.app_type,
      ).toUpperCase(),
      externalBizId: X(
        t?.externalBizId,
        t?.external_biz_id,
        t?.businessOrderNo,
        t?.business_order_no,
        t?.bizOrderNo,
        t?.biz_order_no,
        t?.batchOrderId,
        t?.batch_order_id,
        n.externalBizId,
        n.external_biz_id,
        n.business_order_no,
        n.businessOrderNo,
        n.biz_order_no,
        n.bizOrderNo,
        n.batch_order_id,
        n.batchOrderId,
        s.externalBizId,
        s.external_biz_id,
        s.business_order_no,
        s.businessOrderNo,
        s.biz_order_no,
        s.bizOrderNo,
        s.batch_order_id,
        s.batchOrderId,
        a.externalBizId,
        a.external_biz_id,
        a.business_order_no,
        a.businessOrderNo,
        a.biz_order_no,
        a.bizOrderNo,
        a.batch_order_id,
        a.batchOrderId,
        d.externalBizId,
        d.external_biz_id,
        d.business_order_no,
        d.businessOrderNo,
        d.biz_order_no,
        d.bizOrderNo,
        d.batch_order_id,
        d.batchOrderId,
      ),
      businessProductCode: X(
        t?.businessProductCode,
        t?.business_product_code,
        n.businessProductCode,
        n.business_product_code,
        s.businessProductCode,
        s.business_product_code,
        a.businessProductCode,
        a.business_product_code,
        d.businessProductCode,
        d.business_product_code,
      ),
      bizChannelCode: X(
        t?.bizChannelCode,
        t?.biz_channel_code,
        t?.channelCode,
        t?.channel_code,
        n.channelCode,
        n.channel_code,
        n.bizChannelCode,
        n.biz_channel_code,
        s.channelCode,
        s.channel_code,
        s.bizChannelCode,
        s.biz_channel_code,
        a.channelCode,
        a.channel_code,
        a.bizChannelCode,
        a.biz_channel_code,
        d.channelCode,
        d.channel_code,
        d.bizChannelCode,
        d.biz_channel_code,
        "B_SELF_HELP",
      ),
    };
  }
  function Tc(t = {}) {
    return {
      isManual: t && typeof t == "object" ? t.isManual === !0 : t === !0,
    };
  }
  function gi({
    success: t,
    isManual: n = !1,
    form: a,
    view: s,
    error: d,
    code: u,
    message: m,
  }) {
    const S = hn(a),
      T = m || d?.message || "";
    return {
      success: t === !0,
      code: u || (t ? "SUCCESS" : "FAILED"),
      message: T,
      msg: T,
      isManual: n,
      orderNo: S.externalBizId,
      externalBizId: S.externalBizId,
      businessProductCode: S.businessProductCode,
      productCode: S.businessProductCode,
      channelCode: S.bizChannelCode,
      data: {
        orderNo: S.externalBizId,
        externalBizId: S.externalBizId,
        businessProductCode: S.businessProductCode,
        productCode: S.businessProductCode,
        channelCode: S.bizChannelCode,
        isManual: n,
      },
      view: s || null,
      form: a || null,
      error:
        d && typeof d == "object"
          ? {
              name: d.name || "",
              message: d.message || T,
              code: String(d.code || ""),
              subCode: String(d.subCode || ""),
              subMsg: d.subMsg || "",
            }
          : null,
    };
  }
  function Ue() {
    const t = V(r.pipelineView, r.pipelineCurrentNodeId);
    return t && (t.nodeId === re || It(t, r.pipelineView))
      ? t
      : Ln(r.pipelineView, "keys");
  }
  function sr() {
    const t = Ue()?.nodeId;
    return (
      [r.pipelineCurrentForm, r.pipelineView?.currentForm].find(
        (n) => n?.nodeId === t,
      ) || null
    );
  }
  function Tt(t = sr()) {
    const n = t?.displayData || {},
      a = t?.formData || {},
      s = tt(n.data) || {},
      d = tt(a.data) || {};
    return {
      displayData: n,
      formData: a,
      appType: X(
        hr(t, r.pipelineView),
        n.appType,
        n.app_type,
        s.appType,
        s.app_type,
        a.appType,
        a.app_type,
        d.appType,
        d.app_type,
      ).toUpperCase(),
      createdAppId: X(
        t?.createdAppId,
        t?.created_app_id,
        n.createdAppId,
        n.created_app_id,
        n.externalBizId,
        n.external_biz_id,
        s.createdAppId,
        s.created_app_id,
        s.externalBizId,
        s.external_biz_id,
        a.createdAppId,
        a.created_app_id,
        a.externalBizId,
        a.external_biz_id,
        d.createdAppId,
        d.created_app_id,
        d.externalBizId,
        d.external_biz_id,
        t?.externalBizId,
      ),
      approvedAppId: X(
        t?.approvedAppId,
        t?.approved_app_id,
        n.approvedAppId,
        n.approved_app_id,
        s.approvedAppId,
        s.approved_app_id,
        a.approvedAppId,
        a.approved_app_id,
        d.approvedAppId,
        d.approved_app_id,
      ),
    };
  }
  function wn(t, n) {
    const a = or(t) ? t : null,
      s = tt(a?.data) || {},
      d = tt(a?.payload) || {},
      u = n === "approvedAppId" ? "approved_app_id" : "created_app_id";
    return X(
      a ? "" : t,
      a?.[n],
      a?.[u],
      a?.appId,
      a?.app_id,
      a?.externalBizId,
      a?.external_biz_id,
      a?.id,
      s[n],
      s[u],
      s.appId,
      s.app_id,
      s.externalBizId,
      s.external_biz_id,
      s.id,
      d[n],
      d[u],
      d.appId,
      d.app_id,
      d.externalBizId,
      d.external_biz_id,
      d.id,
    );
  }
  function Ii(t, n) {
    const a = or(t) ? t : null,
      s = tt(a?.data) || {},
      d = tt(a?.payload) || {};
    return X(
      a?.appType,
      a?.app_type,
      a?.type,
      s.appType,
      s.app_type,
      s.type,
      d.appType,
      d.app_type,
      d.type,
      n,
    ).toUpperCase();
  }
  function vc() {
    const t = Ue();
    return t?.nodeId
      ? {
          nodeId: re,
          nodeName: t.nodeName || "密钥配置",
          nodeStatus: t.nodeStatus || "",
          viewState: t.viewState || "",
          flowStatus: t.flowStatus || "",
          failMsg: t.failMsg || "",
          externalBizId: t.externalBizId || "",
          formData: {},
          displayData: {},
          blockers: Array.isArray(t.blockers) ? t.blockers : [],
          actions: Array.isArray(t.actions) ? t.actions : [],
          raw: t,
        }
      : null;
  }
  function Cn(t = {}, { activate: n = !0 } = {}) {
    const a = sr() || vc();
    if (!a?.nodeId) return null;
    const s = or(a.displayData) ? { ...a.displayData } : {},
      d = or(a.formData) ? { ...a.formData } : {},
      u = { ...a, displayData: s, formData: d },
      m = (S) => Object.prototype.hasOwnProperty.call(t, S);
    if (m("appType")) {
      const S = X(t.appType).toUpperCase();
      S
        ? ((s.appType = S), (d.appType = S))
        : (delete s.appType,
          delete s.app_type,
          delete d.appType,
          delete d.app_type);
    }
    if (m("createdAppId")) {
      const S = X(t.createdAppId);
      S
        ? ((s.createdAppId = S), (d.createdAppId = S))
        : (delete s.createdAppId,
          delete s.created_app_id,
          delete d.createdAppId,
          delete d.created_app_id);
    }
    if (m("approvedAppId")) {
      const S = X(t.approvedAppId);
      S
        ? ((s.approvedAppId = S), (d.approvedAppId = S))
        : (delete s.approvedAppId,
          delete s.approved_app_id,
          delete d.approvedAppId,
          delete d.approved_app_id);
    }
    return (
      m("externalBizId") &&
        ((u.externalBizId = X(t.externalBizId)),
        u.externalBizId
          ? ((s.externalBizId = u.externalBizId),
            (d.externalBizId = u.externalBizId))
          : (delete s.externalBizId,
            delete s.external_biz_id,
            delete d.externalBizId,
            delete d.external_biz_id)),
      n
        ? ((r.currentStep = "keys"),
          (r.pipelineCurrentNodeId = re),
          (r.pipelineCurrentForm = u))
        : r.pipelineCurrentForm?.nodeId === re && (r.pipelineCurrentForm = u),
      (r.pipelineView?.currentForm?.nodeId === re || (n && r.pipelineView)) &&
        (r.pipelineView.currentForm = u),
      Kt(u),
      u
    );
  }
  function Si(t, n) {
    return [
      t?.flowStatus,
      t?.viewState,
      t?.nodeStatus,
      n?.flowStatus,
      n?.viewState,
      n?.nodeStatus,
    ]
      .map((s) => String(s || "").toUpperCase())
      .some((s) => wo.has(s));
  }
  function Ko(t, n) {
    return [t?.flowStatus, t?.nodeStatus, n?.flowStatus, n?.nodeStatus]
      .map((a) => String(a || "").toUpperCase())
      .includes("FAILED");
  }
  function _c(t, n) {
    return (
      String(t?.viewState || n?.viewState || "").toUpperCase() === "EDITABLE"
    );
  }
  function Nc(t, n) {
    return Si(t, n) || Ko(t, n)
      ? !1
      : String(t?.viewState || n?.viewState || "").toUpperCase() === "READONLY"
        ? !0
        : [t?.flowStatus, t?.nodeStatus, n?.flowStatus, n?.nodeStatus]
            .map((s) => String(s || "").toUpperCase())
            .some((s) => Ws.has(s));
  }
  function Go(t = ar(), n = dt()) {
    if (!r.pipelineView?.instanceId || !n) return "";
    const a = _e(t, r.pipelineView) || _e(n, r.pipelineView);
    return a && !t?.nodeId
      ? r.productOpenFormError
        ? "form-error"
        : "loading"
      : Si(t, n)
        ? "completed"
        : _c(t, n)
          ? a || hn(t).externalBizId
            ? "component"
            : "form-error"
          : Ko(t, n)
            ? "failed"
            : Nc(t, n)
              ? "pending"
              : "";
  }
  function Rc() {
    const t = ar(),
      n = dt(),
      a = hn(t),
      s = Go(t, n),
      d = _e(t, r.pipelineView) || _e(n, r.pipelineView),
      u = t?.displayData || {},
      m = String(
        t?.registerMode ||
          t?.displayData?.registerMode ||
          t?.formData?.registerMode ||
          (d ? "register_and_sign" : "sign_only"),
      ).toLowerCase(),
      S = d
        ? zi(u, t?.formData, {
            allowPersonalRegistration: m === "register_and_sign",
            fallbackPersonalUid: r.userInfo?.userId,
            identityContext: r.identityContext,
          })
        : null,
      T = ms(s, a, d && !!S, m);
    return {
      visible: !H(r.pipelineView) && r.currentStep === "product" && T,
      mode: s,
      currentStep: r.currentStep,
      instanceId: r.pipelineView?.instanceId || r.pipelineInstanceId || "",
      nodeId: n?.nodeId || Je,
      productName: r.pipelineView?.productName || En().name || "",
      flowStatus: t?.flowStatus || n?.flowStatus || "",
      viewState: t?.viewState || n?.viewState || "",
      nodeStatus: t?.nodeStatus || n?.nodeStatus || "",
      failMsg: t?.failMsg || n?.failMsg || "",
      externalBizId: a.externalBizId,
      businessProductCode: a.businessProductCode,
      bizChannelCode: a.bizChannelCode,
      registerMode: m,
      pamirContext:
        d && S
          ? { ...S, personalUid: S.personalUid || r.userInfo?.userId || "" }
          : null,
      merchantSelectChain:
        d && S
          ? [
              {
                subjectType: "MERCHANT",
                subjectId: S.subjectId || "",
                merchantPid: S.merchantPid || "",
                merchantName: S.merchantName || "",
              },
            ]
          : [],
      operatorScene: "MRCH",
      form: t,
    };
  }
  function Ee() {
    const t = Rc();
    ((window.__AIPAY_PRODUCT_OPEN_STATE__ = t),
      window.dispatchEvent(new CustomEvent(Ds, { detail: t })));
    const n = $o();
    ((window.__AIPAY_ENTERPRISE_PRODUCT_OPEN_STATE__ = n),
      window.dispatchEvent(new CustomEvent(Us, { detail: n })));
  }
  function lt() {
    return r.pipelineView?.renderGraph?.nodes?.find((t) => _e(t)) || null;
  }
  function Lc() {
    const t = V(r.pipelineView, r.pipelineCurrentNodeId);
    return r.currentStep === "keys" && Ue()
      ? Ue().nodeId
      : r.currentStep === "product" && lt()
        ? lt().nodeId
        : t && [Xt, re].includes(t.nodeId)
          ? t.nodeId
          : "";
  }
  function Oc(t, n, a) {
    const s = X(
      n?.appType,
      t?.appType,
      t?.formData?.appType,
      t?.formData?.app_type,
    ).toUpperCase();
    if (s === "APP" || s === "PC") return s;
    const d = String(a || "").toUpperCase();
    return d === "I1080300001000041313" || d.includes("MOBILE") ? "APP" : "PC";
  }
  function $o() {
    const t = lt(),
      n = Lc(),
      a = ar(),
      s = sr(),
      d = hn(a),
      u = Tt(s),
      m = _e(n, r.pipelineView),
      S = X(
        d.businessProductCode,
        t?.businessProductCode,
        t?.business_product_code,
        r.pipelineView?.currentForm?.businessProductCode,
        r.pipelineView?.currentForm?.business_product_code,
        r.pipelineView?.productCode,
      ),
      T = m && H(r.pipelineView),
      R =
        typeof S == "string" &&
        (T ? /^I\d+(,I\d+)*$/ : /^I\d+$/).test(S.trim());
    let O = m && !R ? "" : S || "";
    const v = m ? a : s,
      F = v?.formData || {},
      W = v?.displayData || {},
      z = X(
        d.signOrderNo,
        v?.signOrderNo,
        v?.sign_order_no,
        F.signOrderNo,
        F.sign_order_no,
        W.signOrderNo,
        W.sign_order_no,
        t?.signOrderNo,
        t?.sign_order_no,
      ),
      ae = X(
        d.registerNo,
        v?.registerNo,
        v?.register_no,
        F.registerNo,
        F.register_no,
        W.registerNo,
        W.register_no,
        t?.registerNo,
        t?.register_no,
      ),
      j = X(
        d.externalBizId,
        v?.externalBizId,
        v?.external_biz_id,
        F.externalBizId,
        F.external_biz_id,
        W.externalBizId,
        W.external_biz_id,
        t?.externalBizId,
        t?.external_biz_id,
      ),
      Q = It(n, r.pipelineView),
      K = Q ? hr(s, r.pipelineView) : Oc(d, u, O);
    Q &&
      (O =
        K === "APP"
          ? "I1080300001000041313"
          : K === "PC"
            ? "I1080300001000041203"
            : "");
    const nt = zi(W, F, {
      allowPersonalRegistration: !H(r.pipelineView),
      fallbackPersonalUid: r.userInfo?.userId,
      identityContext: r.identityContext,
    });
    return {
      visible: !!(
        t &&
        n &&
        (T ? v?.nodeId === n : O) &&
        (!It(n, r.pipelineView) || v?.nodeId === n) &&
        !Tr(v, r.pipelineView) &&
        (!Q || (me()?.products && !me()?.loading && !me()?.error))
      ),
      instanceId: r.pipelineView?.instanceId || r.pipelineInstanceId || "",
      currentNode: m ? Xt : re,
      ...Fe(r),
      nodeId: n,
      subscription: H(r.pipelineView),
      productCode: O,
      selectedProductCode: (T && F.subscription_apply_product) || "",
      busy: T && Xe > 0,
      products: T ? me()?.products : void 0,
      productsLoading: T && !!me()?.loading,
      productsError: (T && me()?.error) || "",
      productOpenBlocker: T ? qd(v, z, r.pipelineView) : "",
      signOrderNo: z,
      registerNo: ae,
      secretType: K,
      createdAppId: u.createdAppId,
      approvedAppId: u.approvedAppId,
      externalBizId: j,
      legacy: {
        activeNode: m ? Xt : re,
        registerMode: "register_and_sign",
        type: K,
        orderNo: j || z,
        channelCode: "B_SELF_HELP",
        signOrigin: "服务市场订购签约一体化",
        pamirContext: nt,
      },
      flowStatus: v?.flowStatus || V(r.pipelineView, n)?.flowStatus || "",
      viewState: v?.viewState || V(r.pipelineView, n)?.viewState || "",
      nodeStatus: v?.nodeStatus || V(r.pipelineView, n)?.nodeStatus || "",
    };
  }
  function Mc() {
    const t = sr(),
      n = Ue(),
      a = Tt(t),
      s = t?.displayData || {},
      d = zi(s, t?.formData, {
        fallbackPersonalUid: r.userInfo?.userId,
        identityContext: r.identityContext,
      });
    return {
      visible: !H(r.pipelineView) && r.currentStep === "keys" && !!n?.nodeId,
      loading: r.currentStep === "keys" && !!n?.nodeId && !t?.nodeId,
      currentStep: r.currentStep,
      instanceId: r.pipelineView?.instanceId || r.pipelineInstanceId || "",
      ...Fe(r),
      nodeId: n?.nodeId || "",
      subscription: H(r.pipelineView),
      flowStatus: t?.flowStatus || n?.flowStatus || "",
      viewState: t?.viewState || n?.viewState || "",
      nodeStatus: t?.nodeStatus || n?.nodeStatus || "",
      failMsg: t?.failMsg || n?.failMsg || "",
      type: hr(t, r.pipelineView) || a.appType,
      createdAppId: a.createdAppId,
      approvedAppId: a.approvedAppId,
      pamirContext: d
        ? { ...d, personalUid: d.personalUid || r.userInfo?.userId || "" }
        : null,
      form: t,
    };
  }
  function ge() {
    const t = Mc();
    ((window.__AIPAY_KEY_CONFIG_STATE__ = t),
      window.dispatchEvent(new CustomEvent(Hs, { detail: t })));
  }
  function xc() {
    return (
      r.currentStep === "product" &&
      (!r.pipelineCurrentNodeId || be(r.pipelineCurrentNodeId, r.pipelineView))
    );
  }
  function cr(t, n = dt(), a = {}) {
    if (!t?.nodeId) return;
    const { activate: s = !0 } = a;
    (Kt(t),
      s &&
        ((r.pipelineCurrentForm = t),
        (r.pipelineCurrentNodeId = t.nodeId),
        (r.currentStep = pe(t || n)),
        (Qe = `${r.pipelineInstanceId}:${t.nodeId}`)),
      Si(t, n) && (r.productStatus = "open"));
  }
  function Dc() {
    if (!ir()) return "";
    const t =
        r.pipelineCurrentForm?.nodeId === "SERVICE_REGISTER"
          ? r.pipelineCurrentForm
          : r.pipelineView?.currentForm?.nodeId === "SERVICE_REGISTER"
            ? r.pipelineView.currentForm
            : null,
      n = t?.displayData || {},
      a = t?.formData || {},
      s = tt(n.serviceDetail) || {};
    return String(
      s.serviceId ||
        s.service_id ||
        n.serviceId ||
        n.service_id ||
        a.serviceId ||
        a.service_id ||
        "",
    ).trim();
  }
  function yi(t) {
    if (!t?.serviceId) return;
    const n = Array.isArray(r.registeredServices) ? r.registeredServices : [],
      a = n.findIndex((s) => s.serviceId === t.serviceId);
    if (a >= 0) {
      r.registeredServices = n.map((s, d) => (d === a ? { ...s, ...t } : s));
      return;
    }
    r.registeredServices = [...n, t];
  }
  async function Ei({ force: t = !1 } = {}) {
    if (!jo()) return [];
    if (ir()) return [];
    if (Re && !t) return Re;
    if (r.registeredServicesLoaded && !t) return r.registeredServices;
    if (r.registeredServicesLoading && !t)
      return Re || Promise.resolve(r.registeredServices || []);
    ((r.registeredServicesLoading = !0),
      (r.registeredServicesError = ""),
      b(),
      B());
    const n = iu(r, { enterpriseRegistrationRequested: ue() });
    Re = qn({ limit: 50, offset: 0, ...n })
      .then(
        (a) => (
          (r.registeredServices = a.items || []),
          (r.registeredServicesLoaded = !0),
          (r.registeredServicesLoading = !1),
          (r.registeredServicesError = ""),
          (r.serviceRegisterMode = r.registeredServices.length
            ? "list"
            : "create"),
          r.registeredServices.some(
            (s) => s.serviceId === r.selectedServiceId,
          ) || (r.selectedServiceId = ""),
          b(),
          B(),
          r.registeredServices
        ),
      )
      .catch((a) => {
        throw (
          (r.registeredServicesLoading = !1),
          (r.registeredServicesError = a?.message || "服务查询失败"),
          (r.serviceRegisterMode =
            r.registeredServicesLoaded && r.registeredServices.length
              ? "list"
              : "create"),
          b(),
          B(),
          a
        );
      })
      .finally(() => {
        Re = void 0;
      });
    try {
      return await Re;
    } catch {
      return (h("服务查询失败，请稍后重试"), []);
    }
  }
  async function ut({ force: t = !1 } = {}) {
    if (Re && !t) return Re;
    if (r.registeredServicesLoaded && !t) return r.registeredServices;
    if (r.registeredServicesLoading && !t)
      return Re || Promise.resolve(r.registeredServices || []);
    ((r.registeredServicesLoading = !0),
      (r.registeredServicesError = ""),
      b(),
      Ie(),
      (Re = Ql({ pageNum: ot, pageSize: Vn, keyword: $n, status: Yn })
        .then(
          (n) => (
            (r.registeredServices = n.list || []),
            (r.registeredServicesLoaded = !0),
            (r.registeredServicesLoading = !1),
            (r.registeredServicesError = ""),
            (Hr = n.total || 0),
            (zr = n.quotaTotal || 0),
            (jr = !!n.ifWhiteUid),
            (ot = n.pageNum || ot),
            (r.serviceRegisterMode = r.registeredServices.length
              ? "list"
              : "create"),
            r.registeredServices.some(
              (a) => a.serviceId === r.selectedServiceId,
            ) || (r.selectedServiceId = ""),
            b(),
            Ie(),
            r.registeredServices
          ),
        )
        .catch((n) => {
          throw (
            (r.registeredServicesLoading = !1),
            (r.registeredServicesError = n?.message || "服务查询失败"),
            (Hr = 0),
            (r.serviceRegisterMode =
              r.registeredServicesLoaded && r.registeredServices.length
                ? "list"
                : "create"),
            b(),
            Ie(),
            n
          );
        })
        .finally(() => {
          Re = void 0;
        })));
    try {
      return await Re;
    } catch {
      return (h("服务查询失败，请稍后重试"), r.registeredServices || []);
    }
  }
  function Yo() {
    return jr || zr < bl;
  }
  function Uc() {
    const t = e.querySelector("[data-console-service-status-filter]");
    t instanceof HTMLSelectElement && (t.value = Yn);
    const n = e.querySelector("[data-console-service-keyword]");
    n instanceof HTMLInputElement && (n.value = $n);
  }
  function hi({ resetPage: t = !0 } = {}) {
    const n = e.querySelector("[data-console-service-keyword]"),
      a = e.querySelector("[data-console-service-status-filter]");
    (($n = n instanceof HTMLInputElement ? n.value.trim() : ""),
      (Yn = a instanceof HTMLSelectElement ? a.value : "ALL"),
      t && (ot = 1),
      (r.registeredServicesLoaded = !1),
      ut({ force: !0 }));
  }
  function Wo() {
    const t = e.querySelector("[data-console-service-form]");
    return t instanceof HTMLFormElement
      ? Array.from(
          t.querySelectorAll(
            '[name="serviceName"], [name="resourceUrl"], [name="pricing"], [name="serviceDesc"], [name="schemaUrl"]',
          ),
        ).filter(
          (n) =>
            n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement,
        )
      : [];
  }
  function dr(t) {
    Wo().forEach((n) => {
      n.disabled = !!t;
    });
  }
  function wi(t = {}) {
    const n = e.querySelector("[data-console-service-form]");
    if (!(n instanceof HTMLFormElement)) return;
    const a = {
      serviceId: t.serviceId || "",
      serviceType: t.serviceType || "API",
      serviceName: t.serviceName || "",
      resourceUrl: t.resourceUrl || t.endpointUrl || "",
      pricing: t.pricing || "",
      serviceDesc:
        t.serviceDesc || t.serviceDescription || t.serviceSummary || "",
      schemaUrl: t.schemaUrl || t.schema_url || "",
    };
    Object.entries(a).forEach(([d, u]) => {
      const m = n.elements.namedItem(d);
      (m instanceof HTMLInputElement || m instanceof HTMLTextAreaElement) &&
        (m.value = u);
    });
    const s = e.querySelector("[data-console-service-description-count]");
    (s instanceof HTMLElement &&
      (s.textContent = `${Array.from(a.serviceDesc).length}/500`),
      Wo().forEach((d) => $t(d, "")));
  }
  function Bc() {
    const t = e.querySelector("#console-service-dialog-title");
    t instanceof HTMLElement &&
      (t.textContent =
        xe === "view" ? "服务详情" : xe === "edit" ? "修改服务" : "注册新服务");
    const n = e.querySelector("[data-console-service-submit]");
    n instanceof HTMLButtonElement &&
      ((n.hidden = xe === "view"),
      (n.disabled = Dt),
      (n.textContent = Dt ? "提交中" : "提交"));
    const a = e.querySelector("[data-console-service-edit]");
    if (a instanceof HTMLButtonElement) {
      const s = xe === "view" && Ye?.manageStatus !== "PENDING";
      ((a.hidden = !s), (a.disabled = !s));
    }
    dr(xe === "view");
  }
  function Ci() {
    const t = e.querySelector("[data-console-service-form]");
    if (!(t instanceof HTMLFormElement)) return;
    t.reset();
    const n = t.elements.namedItem("serviceId");
    n instanceof HTMLInputElement && (n.value = "");
    const a = e.querySelector("[data-console-service-description-count]");
    (a instanceof HTMLElement && (a.textContent = "0/500"),
      t
        .querySelectorAll(
          '[name="serviceName"], [name="resourceUrl"], [name="pricing"], [name="serviceDesc"], [name="schemaUrl"]',
        )
        .forEach((s) => {
          (s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement) &&
            $t(s, "");
        }));
  }
  function Fc() {
    const t = e.querySelector("[data-console-service-create]");
    (t instanceof HTMLElement && (t.hidden = !Et), Bc(), Uc());
    const n = e.querySelector("[data-console-service-submit-error]");
    n instanceof HTMLElement && ((n.textContent = We), (n.hidden = !We));
  }
  function Vc() {
    if (r.registeredServicesLoaded && !Yo()) {
      h("服务数量已达上限");
      return;
    }
    ((Me = "services"),
      (xe = "create"),
      (Ye = null),
      (Et = !0),
      (We = ""),
      Ci(),
      dr(!1),
      Ie(),
      r.registeredServicesLoaded || ut(),
      requestAnimationFrame(() => {
        const t = e.querySelector(
          '[data-console-service-form] [name="serviceName"]',
        );
        t instanceof HTMLInputElement && t.focus();
      }));
  }
  function Qo() {
    ((Et = !1), (xe = "create"), (Ye = null), (We = ""), Ci(), Ie());
  }
  async function qc(t) {
    const n = (r.registeredServices || []).find((a) => a.serviceId === t);
    ((xe = "view"),
      (Ye = n || null),
      (Et = !0),
      (We = ""),
      wi(n || {}),
      dr(!0),
      Ie());
    try {
      const a = await Xl(t, n);
      a && ((Ye = a), yi(a), wi(a), Ie());
    } catch {}
  }
  function Jo(t) {
    const n = (r.registeredServices || []).find((a) => a.serviceId === t);
    if (n) {
      if (n.manageStatus === "PENDING") {
        h("审核中的服务暂不支持修改");
        return;
      }
      (n.manageStatus === "APPROVED" &&
        !window.confirm(
          "当前服务已审核通过，修改后将重新进入审核流程。确认修改吗？",
        )) ||
        ((Me = "services"),
        (xe = "edit"),
        (Ye = n),
        (Et = !0),
        (We = ""),
        wi(n),
        dr(!1),
        Ie());
    }
  }
  function kc(t) {
    const n = Sr(t),
      a = n.schemaUrl || n.schema_url || "";
    return (
      (n.schemaUrl = ya(a)),
      (n.submitAction = "submit"),
      delete n.schema_url,
      n
    );
  }
  async function Hc(t) {
    if (t instanceof HTMLFormElement && !Dt && Ea(t)) {
      ((Dt = !0), (We = ""), Ie());
      try {
        const n = xe,
          a = await Zl(kc(t));
        (a?.serviceId && yi(a),
          (Dt = !1),
          (Et = !1),
          (xe = "create"),
          (Ye = null),
          Ci(),
          Ie(),
          await ut({ force: !0 }),
          h(n === "edit" ? "服务修改已提交" : "服务已提交审核"));
      } catch (n) {
        ((Dt = !1), (We = yd(n?.message)), Ie(), h(We));
      }
    }
  }
  async function zc(t) {
    if (!t) return null;
    const n = (r.registeredServices || []).find(
      (a) => a.serviceId === t && (a.serviceDesc || a.schema_url),
    );
    if (n)
      return (
        (r.selectedServiceId = t),
        (r.serviceRegisterMode = "reuse"),
        (r.serviceDetailError = ""),
        b(),
        B(),
        n
      );
    ((r.selectedServiceId = t),
      (r.serviceRegisterMode = "reuse"),
      (r.serviceDetailLoadingId = t),
      (r.serviceDetailError = ""),
      b(),
      B());
    try {
      const a = await Jl(t);
      return (
        a && yi(a),
        (r.selectedServiceId = t),
        (r.serviceRegisterMode = "reuse"),
        (r.serviceDetailLoadingId = ""),
        (r.serviceDetailError = a ? "" : "服务详情为空"),
        b(),
        B(),
        a
      );
    } catch (a) {
      return (
        (r.serviceDetailLoadingId = ""),
        (r.serviceDetailError = a?.message || "服务详情查询失败"),
        b(),
        B(),
        h(r.serviceDetailError),
        null
      );
    }
  }
  async function bi({ force: t = !1 } = {}) {
    if (ne && !t) return ne;
    (ct("loading"),
      (ne = Ua({ enterprisePipeline: He(), enterpriseRegistration: ue() })
        .then(
          (n) => (
            Array.isArray(n) && n.length,
            !ue() && di(n),
            Array.isArray(n) &&
              n.map((a) => ({
                id: a.id,
                name: a.name,
                opened: zt(a),
                group: bt(a),
              })),
            (M = n),
            M.some((a) => a.id === r.selectedProduct) ||
              ((r.selectedProduct = M[0]?.id || wr.selectedProduct), b()),
            et(),
            da(M) || (!ue() && di(n) && ee("console", { replaceRoute: !0 })),
            M
          ),
        )
        .catch((n) => {
          if (n?.isPamirRedirect) return [];
          throw (
            n?.message,
            n?.name,
            et(),
            ct("error", n?.message || "产品列表获取失败"),
            n
          );
        })
        .finally(() => {
          ne = void 0;
        })));
    try {
      await ne;
    } catch (n) {
      if (n?.isPamirRedirect) return [];
      h("产品列表获取失败，已展示默认产品");
    }
    return M;
  }
  async function Ai({ force: t = !1 } = {}) {
    if (Oe && !t) return Oe;
    if (ye && !t) return Ne;
    ((kr = !0),
      (Gn = ""),
      Ie(),
      (Oe = Wl()
        .then(
          (n) => ((Ne = Array.isArray(n) ? n : []), (ye = !0), (Gn = ""), Ne),
        )
        .catch((n) => {
          throw ((Gn = n?.message || "产品数据获取失败"), n);
        })
        .finally(() => {
          ((kr = !1), (Oe = void 0), Ie());
        })));
    try {
      return await Oe;
    } catch {
      return (h("产品数据获取失败，请稍后重试"), Ne);
    }
  }
  function h(t) {
    _ instanceof HTMLElement &&
      ((_.textContent = t),
      (_.hidden = !1),
      window.clearTimeout(h.timer),
      (h.timer = window.setTimeout(() => {
        _.hidden = !0;
      }, 2200)));
  }
  function jc() {
    (Ct(), b(), ze());
    const t = i ? ke() : Ht(r.routeProductParam);
    (ca({
      returnPath: t,
      panelOptions: {
        syncRoute: !1,
        preserveCurrentPanel: !0,
        skipBackendCheck: !0,
      },
    }).then((n) => {
      n &&
        (i
          ? si({ replaceRoute: !0 })
          : vt({ productParam: r.routeProductParam }).then((a) => {
              a && Ir({ replace: !0 });
            }));
    }),
      h("登录已过期，请重新扫码登录"));
  }
  function lr() {
    if (ve() && ht && !r.isLoggedIn) {
      (Ct(), b(), ze());
      return;
    }
    jc();
  }
  function Kc(t) {
    const n = String(t?.code || ""),
      a = String(t?.subCode || ""),
      s = String(t?.subMsg || t?.msg || "");
    return (
      n === "40001" &&
      a === "INVALID_PARAMETER" &&
      s.includes("Pipeline 实例不存在")
    );
  }
  function Gc() {
    ((r.currentStep = "tech"),
      (r.productStatus = "idle"),
      (r.hasOnboarded = !1),
      (r.hasService = !1),
      (r.selectedServiceId = ""),
      (r.serviceRegisterMode = ""),
      (r.registeredServices = []),
      (r.registeredServicesLoaded = !1),
      (r.registeredServicesLoading = !1),
      (r.registeredServicesError = ""),
      (r.serviceDetailLoadingId = ""),
      (r.serviceDetailError = ""),
      (r.serviceSubmittingId = ""),
      (r.serviceRechooseMode = !1),
      (r.serviceRejectedFieldEdits = {}),
      (r.hasApp = !1),
      (r.keyReady = !1),
      (r.pipelineInstanceId = ""),
      (r.pipelineView = null),
      (r.pipelineCurrentNodeId = ""),
      (r.pipelineCurrentForm = null),
      (r.nodeFormDrafts = {}),
      (r.productOpenFormLoading = !1),
      (r.productOpenFormError = ""),
      (r.pipelineError = ""),
      (r.pipelineStarting = !1),
      (r.qualificationBlocker = null));
  }
  function $c(t) {
    const n = t?.subMsg || "Pipeline 实例不存在";
    return (
      Gc(),
      b(),
      Pt(),
      h(n),
      window.clearTimeout(ho),
      (ho = window.setTimeout(() => {
        window.location.assign(we("/"));
      }, 1400)),
      !0
    );
  }
  async function Be(
    t,
    {
      silent: n = !1,
      inWriteQueue: a = !1,
      preserveProductFormOnFailure: s = !1,
    } = {},
  ) {
    const d = V(r.pipelineView, t);
    if (!d || d.nodeType === "GUIDE" || !r.pipelineInstanceId) return null;
    const u = ++sn,
      m = Fe(r),
      S = H(r.pipelineView),
      T =
        S &&
        r.pipelineView.renderGraph?.nodes?.find(
          (v) => Ce(v, r.pipelineView) === "product",
        ),
      R =
        !!T && !["app-auth", "tech", "verify"].includes(Ce(d, r.pipelineView)),
      O = () => u === sn && (!S || de(m, r));
    be(d, r.pipelineView) &&
      ((r.productOpenFormLoading = !0),
      (r.productOpenFormError = ""),
      b(),
      B());
    try {
      let v;
      if (R) {
        const F = T,
          W = { ...m, nodeId: F.nodeId };
        ((Ae = { ...m, loading: !0, products: me()?.products }),
          clearTimeout(Jr),
          Ee());
        const z = await Qs({
          context: W,
          isCurrent: O,
          onProducts: (Q) => {
            Ae = { ...Ae, products: Q };
          },
          query: () => eu(m.instanceId, F.nodeId, je),
          form: () => Le(m.instanceId, F.nodeId, De(F)),
          save: (Q) => {
            const K = async () => {
              if (!O()) throw new Error("页面已切换，请重新操作");
              return Va({
                ...W,
                ...je,
                strictCode: !0,
                actionType: "SAVE_DRAFT",
                formData: { subscription_product_open_app_types: Q },
                payload: {},
              });
            };
            return a ? K() : un(K);
          },
          detail: () => Qt(m.instanceId, { ...je, strictCode: !0 }),
        });
        if (!O()) return null;
        ((Ae = { ...m, products: z.products, loading: !1, error: "" }),
          z.view && (r.pipelineView = z.view));
        const ae =
            z.opening.kind !== "opened" ||
            z.form.nodeStatus !== "SUCCESS" ||
            (z.opening.kind === "opened" &&
              !z.appTypes &&
              !z.form.formData?.subscription_product_open_app_types),
          j =
            !ae && d.nodeId !== F.nodeId && V(r.pipelineView, d.nodeId)
              ? d.nodeId
              : "";
        ((v =
          ae || !j
            ? z.form
            : await Le(m.instanceId, j, De(V(r.pipelineView, j)))),
          (z.opening.kind === "pending" ||
            (z.opening.kind === "opened" && ae)) &&
            Co({ ...m, nodeId: F.nodeId }, F.nodeId));
      } else v = await Le(r.pipelineInstanceId, d.nodeId, De(d));
      return O()
        ? (Kt(v),
          S && le(r.pipelineView)
            ? oe(r.pipelineView)
            : ((r.pipelineCurrentForm = v),
              (r.pipelineCurrentNodeId = v?.nodeId || d.nodeId),
              (r.currentStep = pe(v || d))),
          (Qe = `${r.pipelineInstanceId}:${r.pipelineCurrentNodeId}`),
          be(d, r.pipelineView) && (r.productOpenFormLoading = !1),
          be(v, r.pipelineView) &&
            ((r.productOpenFormLoading = !1),
            (r.productOpenFormError = Dn(v)),
            (r.productStatus =
              Go(v, d) === "completed" ? "open" : r.productStatus)),
          (!S || !le(r.pipelineView)) &&
            (v?.nodeId === re || It(v, r.pipelineView)) &&
            (r.currentStep = "keys"),
          v?.nodeId === "SERVICE_REGISTER" &&
            v.flowStatus === "FAILED" &&
            v.viewState === "EDITABLE" &&
            ((r.serviceRegisterMode = ""),
            (r.selectedServiceId = ""),
            (r.serviceRechooseMode = !1),
            (r.serviceRejectedFieldEdits = {})),
          b(),
          Pe("wizard", { replace: !0 }),
          B(),
          v)
        : null;
    } catch (v) {
      return s && R && O()
        ? ((Ae = { ...m, products: me()?.products, loading: !1, error: "" }),
          (r.productOpenFormLoading = !1),
          b(),
          B(),
          null)
        : (R &&
            O() &&
            ((Ae = {
              ...m,
              products: me()?.products,
              loading: !1,
              error: v?.message || "产品开通状态查询失败",
            }),
            Ae.products && en(Ae.products).kind !== "opened"
              ? ((r.pipelineCurrentNodeId = T.nodeId),
                (r.pipelineCurrentForm = null),
                (r.currentStep = "product"),
                (r.productOpenFormLoading = !1),
                (r.productOpenFormError = Ae.error),
                (Qe = ""),
                b(),
                Pe("wizard", { replace: !0 }),
                B())
              : Ee(),
            en(Ae.products, r.pipelineCurrentForm?.nodeStatus).kind ===
              "pending" && Co({ ...m, nodeId: T.nodeId }, T.nodeId)),
          O() &&
            be(d, r.pipelineView) &&
            ((r.productOpenFormLoading = !1),
            (r.productOpenFormError = v?.message || "产品开通信息加载失败"),
            b(),
            B()),
          O() && !n && h(v?.message || "节点表单获取失败"),
          null);
    }
  }
  function Xo({ silent: t = !0, inWriteQueue: n = !1 } = {}) {
    if (!H(r.pipelineView) || !r.pipelineInstanceId || r.pipelineStarting)
      return Promise.resolve(null);
    const a = r.pipelineView.renderGraph?.nodes?.find(
      (T) => Ce(T, r.pipelineView) === "product",
    );
    if (!a) return Promise.resolve(null);
    const s = V(r.pipelineView, r.pipelineCurrentNodeId)?.nodeId || a.nodeId,
      d = { ...Fe(r), nodeId: r.pipelineCurrentNodeId },
      u = () => (de(d, r) ? Be(s, { silent: t, inWriteQueue: !0 }) : null);
    if (n) return Promise.resolve(u());
    if (Xe) return Promise.resolve(null);
    const m = JSON.stringify([d.instanceId, d.subjectKey, d.nodeId]);
    if (pn?.key === m) return pn.promise;
    const S = { key: m, promise: null };
    return (
      (S.promise = un(u).finally(() => {
        pn === S && (pn = null);
      })),
      (pn = S),
      S.promise
    );
  }
  function Zo() {
    const t = r.currentStep === "product" ? dt() : null,
      n = r.currentStep === "keys" ? Ue() : null,
      a =
        r.currentStep === "service" &&
        r.pipelineCurrentNodeId === "SERVICE_REGISTER",
      s =
        r.currentStep === "product" &&
        (!!t?.nodeId || be(r.pipelineCurrentNodeId, r.pipelineView)),
      d = r.currentStep === "keys" && !!n?.nodeId,
      u = a
        ? "SERVICE_REGISTER"
        : s
          ? t?.nodeId || Je
          : d
            ? n.nodeId
            : H(r.pipelineView)
              ? r.pipelineCurrentNodeId
              : "";
    !u ||
      (r.pipelineCurrentForm?.nodeId === u &&
        Qe === `${r.pipelineInstanceId}:${u}` &&
        !(
          H(r.pipelineView) &&
          ["product", "keys", "app-key", "web-key"].includes(
            Ce(u, r.pipelineView),
          ) &&
          !me()
        )) ||
      Be(u, { silent: !0 });
  }
  function ur() {
    (rr(),
      (ve() || ht) && ((Bt += 1), ti()),
      bn(),
      P.forEach((t) => {
        ((t.hidden = !0),
          t.classList.remove("isVisible"),
          Mn(t, { reset: !0 }));
      }),
      er(!1));
  }
  function ve() {
    const t = e.querySelector('[data-onboarding-panel="login"]');
    return t instanceof HTMLElement && !t.hidden;
  }
  function Yc() {
    const t = e.querySelector('[data-onboarding-panel="existing"]');
    return t instanceof HTMLElement && !t.hidden;
  }
  function ea() {
    const t = e.querySelector('[data-onboarding-panel="existing"]');
    (t instanceof HTMLElement &&
      ((t.hidden = !0), t.classList.remove("isVisible")),
      ta() || er(!1));
  }
  function ta() {
    return P.some(
      (t) => t.getAttribute("data-onboarding-panel") !== "login" && !t.hidden,
    );
  }
  function na(t = window.location.pathname) {
    const n = tr(t);
    return n === "/" || n === "/home";
  }
  function ra() {
    const t = e.querySelector('[data-onboarding-panel="login"]');
    (t instanceof HTMLElement &&
      ((t.hidden = !0), t.classList.remove("isVisible"), Mn(t, { reset: !0 })),
      (Bt += 1),
      ti(),
      ta() || er(!1));
  }
  function Wc() {
    (ra(), In(), mr(!1));
  }
  function bn(t = null) {
    e.querySelectorAll("[data-onboarding-account]").forEach((n) => {
      if (!(n instanceof HTMLElement) || n === t) return;
      n.classList.remove("is-open");
      const a = n.querySelector("[data-onboarding-account-trigger]"),
        s = n.querySelector("[data-onboarding-account-panel]");
      (a instanceof HTMLButtonElement &&
        a.setAttribute("aria-expanded", "false"),
        s instanceof HTMLElement && s.setAttribute("aria-hidden", "true"));
    });
  }
  function Qc(t, n) {
    if (!(t instanceof HTMLElement)) return;
    t.classList.toggle("is-open", n);
    const a = t.querySelector("[data-onboarding-account-trigger]"),
      s = t.querySelector("[data-onboarding-account-panel]");
    (a instanceof HTMLButtonElement &&
      a.setAttribute("aria-expanded", String(n)),
      s instanceof HTMLElement && s.setAttribute("aria-hidden", String(!n)));
  }
  function Jc(t) {
    if (!(t instanceof HTMLElement)) return;
    const n = t.classList.contains("is-open");
    (bn(t), Qc(t, !n));
  }
  function Xc() {
    (Ta(),
      Ct(),
      b(),
      ze(),
      window.dispatchEvent(new CustomEvent(Rn)),
      window.location.assign(Pa()));
  }
  function ia(t = "auto") {
    if (!i) return;
    const n = () => window.scrollTo({ top: 0, left: 0, behavior: t });
    (n(), requestAnimationFrame(n));
  }
  function ee(t, n = {}) {
    const {
      syncRoute: a = !0,
      replaceRoute: s = !1,
      preserveCurrentPanel: d = !1,
      productParam: u = "",
    } = n;
    if (t === "console" && !i) {
      nr("console", { replace: s });
      return;
    }
    ((t === "login" || t === "existing") && d) || ur();
    const m = e.querySelector(`[data-onboarding-panel="${t}"]`);
    m instanceof HTMLElement &&
      ((m.hidden = !1),
      i
        ? m.classList.add("isVisible")
        : requestAnimationFrame(() => m.classList.add("isVisible")),
      er(!0),
      a && t !== "login" && Pe(t, { replace: s, productParam: u }),
      t === "products" && (pi(), At(), b()),
      t === "products" && cd(),
      t === "identity" && pt(),
      (t === "login" || t === "identity") && Mn(m),
      t === "wizard" &&
        (B(),
        H(r.pipelineView) &&
        !["app-auth", "tech", "verify"].includes(
          Ce(r.pipelineCurrentNodeId, r.pipelineView),
        )
          ? Xo()
          : Zo(),
        ia()),
      t === "console" &&
        (Ie(), Me === "products" && Ai(), Me === "services" && ut()));
  }
  function pr() {
    const t = ve();
    if (t) {
      if (i && !na()) {
        (In(), mr(!1), window.location.assign(we("/")));
        return;
      }
      Wc();
      return;
    }
    if (Yc()) {
      ea();
      return;
    }
    if (i) {
      window.location.assign(we("/"));
      return;
    }
    (ur(), vn(), yc(), t && mr(!1));
  }
  function ze() {
    const t =
      r.isLoggedIn &&
      !!r.selectedSubjectId &&
      !r.identitySelectionPending &&
      !st();
    document.querySelectorAll("[data-subscription-entry]").forEach((a) => {
      a instanceof HTMLAnchorElement &&
        ((a.textContent = t ? "联系销售" : "立即接入"),
        (a.href = we(t ? E : "/open-flow/products?product=AI_SUBSCRIPTION")),
        t
          ? (a.removeAttribute("data-onboarding-entry"),
            a.removeAttribute("target"),
            (a.rel = "noopener noreferrer"))
          : (a.setAttribute("data-onboarding-entry", ""),
            a.setAttribute("data-onboarding-mode", "start"),
            a.setAttribute("data-onboarding-product", Ve),
            a.removeAttribute("target"),
            a.removeAttribute("rel")));
    });
    const n = r.isLoggedIn ? "工作台" : "登录";
    document.querySelectorAll("[data-onboarding-entry-label]").forEach((a) => {
      a.textContent = n;
      const s = a.closest("[data-onboarding-entry]");
      if (s) {
        const d = s.hasAttribute("data-account-login-entry"),
          u = d ? "stay" : "products";
        if (
          (s.setAttribute(
            "aria-label",
            r.isLoggedIn ? "打开 Agent支付工作台" : "登录支付宝 Agent支付",
          ),
          s.setAttribute("data-onboarding-mode", r.isLoggedIn ? "console" : u),
          s instanceof HTMLAnchorElement)
        )
          if (r.isLoggedIn) s.href = at("console");
          else if (d) {
            const m = ke(),
              S = new URL(window.location.href);
            (S.searchParams.set("aipay_login", "1"),
              S.searchParams.set(c, m),
              (s.href = `${S.pathname}${S.search}${S.hash}`));
          } else s.href = at("products");
      }
    });
  }
  function jt(t = Y) {
    const n = r.userInfo && typeof r.userInfo == "object" ? r.userInfo : {},
      a = t?.operators?.find((s) => s.identityKind === "private");
    return (
      a ||
      (Array.isArray(t?.operators)
        ? null
        : {
            principalId: t?.personalUid || Cr(r.userInfo),
            identityKind: "private",
            identityType: "PRIVATE_ACCOUNT",
            merchantName: n.maskedUserName || n.maskedLogonName || va(n),
            accountDisplay:
              n.maskedLoginAccount ||
              n.loginAccount ||
              n.logonId ||
              n.customerId ||
              n.userId ||
              "",
            relationType: "PRIVATE_ACCOUNT",
            raw: null,
          })
    );
  }
  function Pi(t = Y) {
    return (t?.operators || []).filter(
      (n) => n.identityKind === "corporate" && n.principalId,
    );
  }
  function An(t, n = "当前个人账号") {
    return t?.merchantName || t?.identityName || n;
  }
  function Ti(t) {
    const n = t?.raw && typeof t.raw == "object" ? t.raw : {};
    return (
      t?.accountDisplay ||
      n.accountDisplay ||
      n.accountName ||
      n.loginName ||
      n.logonId ||
      n.userName ||
      n.email ||
      n.mobile ||
      n.principalId ||
      t?.principalId ||
      ""
    );
  }
  function Zc(t) {
    return (
      String(t || "开")
        .trim()
        .slice(0, 1) || "开"
    );
  }
  function pt(t = Y) {
    if (!t) return;
    Y = t;
    const n = jt(t),
      a = Pi(t),
      s = !!n?.principalId;
    !s && U === "private" && (U = "");
    const d = a.find((K) => `corporate:${K.principalId}` === U);
    U !== "private" && !d && (U = s ? "private" : "");
    const u = e.querySelector("[data-identity-personal-name]"),
      m = e.querySelector("[data-identity-personal-account]"),
      S = e.querySelector("[data-identity-personal-avatar]"),
      T = e.querySelector("[data-identity-personal-section]");
    (T instanceof HTMLElement && (T.hidden = !s),
      u && (u.textContent = An(n)),
      m && (m.textContent = Ti(n)),
      S && (S.textContent = Zc(An(n))));
    const R = e.querySelector('[data-identity-option="private"]');
    if (R instanceof HTMLElement) {
      R.hidden = !s;
      const K = U === "private";
      (R.classList.toggle("isSelected", K),
        R.setAttribute("aria-pressed", String(K)));
    }
    const O = e.querySelector("[data-identity-enterprise-section]");
    O instanceof HTMLElement && (O.hidden = a.length === 0);
    const v = e.querySelector("[data-identity-enterprise-list]"),
      F = e.querySelector("[data-identity-enterprise-empty]");
    if (v instanceof HTMLElement) {
      const K = te.trim().toLowerCase(),
        nt = a.filter((se) =>
          K ? [An(se, ""), Ti(se)].join(" ").toLowerCase().includes(K) : !0,
        );
      (v.replaceChildren(
        ...nt.map((se) => {
          const he = document.createElement("button"),
            Nn = `corporate:${se.principalId}` === U;
          ((he.type = "button"),
            (he.className = "identityEnterpriseOption"),
            he.classList.toggle("isSelected", Nn),
            (he.dataset.identityOption = "corporate"),
            (he.dataset.identityKey = `corporate:${se.principalId}`),
            (he.dataset.identityPrincipalId = se.principalId),
            he.setAttribute("aria-pressed", String(Nn)),
            (he.disabled = se.frozen === !0),
            he.classList.toggle("isFrozen", se.frozen === !0));
          const Yt = document.createElement("span");
          ((Yt.className = "identityRadio"),
            Yt.setAttribute("aria-hidden", "true"));
          const G = document.createElement("span");
          G.className = "identityEnterpriseCopy";
          const rt = document.createElement("span");
          rt.className = "identityEnterpriseTitle";
          const ba = document.createElement("strong");
          ba.textContent = An(se, "未命名企业");
          const qi = document.createElement("span");
          ((qi.className = "identityRoleTag"),
            (qi.textContent = se.frozen
              ? "已冻结"
              : se.roleName || "企业操作员"),
            rt.append(ba, qi));
          const ki = document.createElement("span");
          return (
            (ki.className = "identityEnterpriseMeta"),
            (ki.textContent = Ti(se)),
            G.append(rt, ki),
            he.append(Yt, G),
            he
          );
        }),
      ),
        F instanceof HTMLElement &&
          (F.hidden = a.length === 0 || v.children.length > 0));
    }
    const W = e.querySelector("[data-identity-selection-notice]");
    if (W instanceof HTMLElement) {
      const K = U !== "private" && d;
      if (((W.hidden = !K), W.replaceChildren(), K)) {
        const nt = document.createElement("strong");
        nt.textContent = `本次将以“${An(d, "当前企业")}”身份进入。`;
        const se = document.createElement("span");
        ((se.textContent =
          "进入后，你看到的数据和可执行的操作将以该企业的授权范围为准。"),
          W.append(nt, se));
      }
    }
    const z = e.querySelector("[data-identity-enter-enterprise]");
    if (z instanceof HTMLButtonElement) {
      const K = !!d;
      (z.classList.toggle("onboardingPrimaryAction", K),
        z.classList.toggle("onboardingSecondaryAction", !K),
        (z.disabled = !!J));
    }
    const ae = e.querySelector("[data-identity-enter-personal]");
    if (ae instanceof HTMLButtonElement) {
      ae.hidden = !s;
      const K = U === "private";
      (ae.classList.toggle("onboardingPrimaryAction", K),
        ae.classList.toggle("onboardingSecondaryAction", !K),
        (ae.disabled = !!J));
    }
    const j = e.querySelector("[data-identity-register-enterprise-row]");
    j instanceof HTMLElement && (j.hidden = !sl(r.userInfo, Y));
    const Q = e.querySelector('[data-onboarding-panel="identity"]');
    Q instanceof HTMLElement && Q.setAttribute("aria-busy", String(!!J));
  }
  function ed(t) {
    (t === "private" && !jt()) ||
      (t !== "private" &&
        !Pi().some((n) => `corporate:${n.principalId}` === t)) ||
      ((U = t), pt());
  }
  function td() {
    (Object.assign(r, ml({ personalIdentity: jt(), currentState: r })),
      (U = "private"),
      (fe = null),
      (r.inTransitPipeline = null),
      (r.accountRegistrationInTransit = null),
      Jn(),
      b());
  }
  async function nd(
    t = "/open-flow/products?enterprisePipeline=true&enterpriseRegistration=true",
  ) {
    if (J) return;
    const n = jt(),
      a = Na({ kind: "private", personalIdentity: n });
    if (!a) {
      h("未找到个人身份，请刷新后重试");
      return;
    }
    const s =
      gn(t) ||
      "/open-flow/products?enterprisePipeline=true&enterpriseRegistration=true";
    ((J = Ba({
      appScene: Y?.appScene || "MRCH",
      principalId: a.principalId,
      regionMode: !1,
      regions: [],
    })
      .then(() => (td(), window.location.assign(s), !0))
      .catch((d) => {
        const u = d?.message || "个人身份选择失败，请稍后重试",
          m = e.querySelector("[data-identity-selection-error]");
        return (
          m instanceof HTMLElement && ((m.textContent = u), (m.hidden = !1)),
          h(u),
          !1
        );
      })
      .finally(() => {
        ((J = void 0), pt());
      })),
      pt(),
      await J);
  }
  function oa() {
    if (window.history?.replaceState) {
      const t = fl(window.location.href, r.selectedSubjectType);
      t !== ke() &&
        window.history.replaceState(window.history.state, document.title, t);
    }
  }
  function rd() {
    const t = fe || {
      productParam: r.routeProductParam,
      returnPanel: "products",
    };
    if (
      (i || Js(),
      (fe = null),
      (r.identitySelectionPending = !1),
      b(),
      oa(),
      ze(),
      t.returnPanel === "wizard" && t.productParam === Ve)
    ) {
      yn({ replaceRoute: !0 });
      return;
    }
    if (t.returnPanel === "console") {
      ee("console", { replaceRoute: !0 });
      return;
    }
    if (i) {
      ee("products", { replaceRoute: !0, productParam: t.productParam });
      return;
    }
    Ir({ replace: !0, productParam: t.productParam });
  }
  async function aa(t) {
    if (J) return;
    const n = jt(),
      a = Na({
        kind: t,
        personalIdentity: n,
        enterpriseIdentities: Pi(),
        selectionKey: U,
      });
    if (!a) {
      h(t === "private" ? "未找到个人身份，请刷新后重试" : "请先选择企业身份");
      return;
    }
    const s = a.identity;
    ((J = Ba({
      appScene: Y?.appScene || "MRCH",
      principalId: a.principalId,
      regionMode: a.subjectType === "MERCHANT" && s.regionMode === !0,
      regions: a.subjectType === "MERCHANT" ? s.regionIds || [] : [],
    })
      .then(async () => {
        if (a.subjectType === "USER")
          ((r.selectedSubjectType = "USER"),
            (r.selectedSubjectId = a.principalId),
            (r.identityContext = {
              accountType: "PRIVATE_ACCOUNT",
              personalUid: a.principalId,
            }));
        else {
          const d = await $l({ appScene: Y?.appScene || "MRCH" });
          ((r.selectedSubjectType = "MERCHANT"),
            (r.selectedSubjectId = d.masterPid || s.principalId),
            (r.identityContext = {
              ...s,
              ...d,
              merchantPid: d.masterPid || s.merchantPid || s.principalId,
              operatorId: d.operatorId || s.operatorId,
              personalUid: d.personalUid || s.personalUid || r.userInfo?.userId,
              operationContextLoaded: !0,
            }));
        }
        return (
          await Xn({ force: !0 }),
          Wt(Y),
          window.dispatchEvent(new CustomEvent(Rn)),
          rd(),
          !0
        );
      })
      .catch((d) => {
        const u = d?.message || "企业身份选择失败，请稍后重试",
          m = e.querySelector("[data-identity-selection-error]");
        return (
          m instanceof HTMLElement && ((m.textContent = u), (m.hidden = !1)),
          h(u),
          !1
        );
      })
      .finally(() => {
        ((J = void 0), pt());
      })),
      pt(),
      await J);
  }
  async function vt({
    productParam: t = "",
    returnPanel: n = "products",
    forceIdentitySelection: a = !1,
  } = {}) {
    if (window.__AIPAY_PAMIR_REDIRECTING__) return !1;
    a && Jn();
    const s = cl({
      enterpriseRegistrationRequested: ue(),
      forceIdentitySelection: a,
      hasPendingQuery: !!ie,
    });
    return s === Mt.CONTINUE
      ? ((fe = null), !0)
      : s === Mt.REUSE_PENDING_QUERY
        ? ie
        : s === Mt.CONSUME_IDENTITY_DECISION && Xs()
          ? (Wt({ hasOperator: !0 }), (fe = null), !0)
          : ((fe = { productParam: t, returnPanel: n }),
            Wt(),
            (ie = Kl()
              .then((d) => {
                if ((Wt(d), !d?.hasOperator)) {
                  const m =
                    jt(d)?.principalId ||
                    d?.personalUid ||
                    Cr(r.userInfo) ||
                    "";
                  return (
                    (r.selectedSubjectType = "USER"),
                    (r.selectedSubjectId = m),
                    (r.identityContext = m
                      ? { accountType: "PRIVATE_ACCOUNT", personalUid: m }
                      : null),
                    (r.identitySelectionPending = !1),
                    (Y = d),
                    (fe = null),
                    b(),
                    oa(),
                    !0
                  );
                }
                return (
                  (Y = d),
                  (U = "private"),
                  (te = ""),
                  (r.identitySelectionPending = !0),
                  b(),
                  pt(d),
                  ee("identity", { syncRoute: !1 }),
                  !1
                );
              })
              .catch(
                (d) => (
                  d?.isPamirRedirect ||
                    (d?.message, h("操作员关系查询失败，请稍后重试")),
                  !1
                ),
              )
              .finally(() => {
                ie = void 0;
              })),
            ie);
  }
  async function fr(t) {
    const n = t || "start";
    if ((Lo(), Sc(), r.isLoggedIn, r.routeReturnPath, r.isLoggedIn))
      try {
        (await Zn())?.isLoggedIn || (Ct(), b());
      } catch (a) {
        (a?.message, h("登录状态确认失败，请稍后重试"));
        return;
      }
    if (!r.isLoggedIn) {
      const a =
        n === "console"
          ? at("console")
          : n === "stay"
            ? ke()
            : Ht(r.routeProductParam);
      if (!(await gr({ returnPath: a }))) return;
    }
    if (
      n !== "stay" &&
      !(
        n !== "stay" &&
        !(await vt({
          productParam: r.routeProductParam,
          returnPanel: n === "console" ? "console" : "products",
          forceIdentitySelection: n === "start",
        }))
      )
    ) {
      if (n === "console") {
        if (i) {
          ee("console");
          return;
        }
        (at("console"), nr("console"));
        return;
      }
      if (!i) {
        Ir();
        return;
      }
      ee("products");
    }
  }
  function sa(t) {
    const n = String(t || "").trim();
    return ((r.routeProductParam = n), n && (r.selectedProduct = n), b(), n);
  }
  function id(t) {
    return (sa(t), r.selectedProduct, fr("start"));
  }
  async function od() {
    return (
      bn(),
      At(),
      b(),
      (await vt({ returnPanel: "products", forceIdentitySelection: !0 }))
        ? (i ? ee("products", { replaceRoute: !0 }) : Ir({ replace: !0 }), !0)
        : !1
    );
  }
  function ad() {
    return new Promise((t) => {
      an.push(t);
    });
  }
  function mr(t) {
    const n = an;
    ((an = []), n.forEach((a) => a(t)));
  }
  function sd() {
    (mr(!0),
      window.dispatchEvent(new CustomEvent("aipay-onboarding-login-success")));
  }
  async function ca({
    returnPath: t = ke(),
    panelOptions: n = {},
    skipMobilePrompt: a = !1,
  } = {}) {
    if (!a && !(await su({ returnPath: t }))) return !1;
    Oo(t);
    let s = null,
      d = null;
    try {
      ((d = Zn()), (s = await Promise.race([d, vo(D).then(() => null)])));
    } catch (S) {
      S?.message;
    }
    if (s?.isLoggedIn) return (In(), !0);
    const u = ad();
    (ni({ syncRoute: !1, ...n, backendAccountInfo: s, skipBackendCheck: !0 }),
      d?.then((S) => {
        !S?.isLoggedIn || !ve() || _n({ source: "backend-precheck" });
      }));
    const m = await u;
    return (In(), m);
  }
  async function gr({ returnPath: t = ke(), skipMobilePrompt: n = !1 } = {}) {
    return ca({ returnPath: t, skipMobilePrompt: n });
  }
  function da(t) {
    if (Eo) return !1;
    const n = kt(),
      a = Bo(n, t);
    if (!a?.id) return !1;
    Eo = !0;
    const s =
      new URLSearchParams(window.location.search).get("accessMode") || "";
    return (
      Ni(a.id, {
        routeAutoStart: !0,
        showAccessMode: s !== "guided",
        accessMode: s,
      }),
      !0
    );
  }
  async function cd() {
    if (Se) return Se;
    ua();
    const t = [bi()];
    return (
      ue() && t.push(la()),
      (Se = Promise.all(t)
        .then(async ([n]) => {
          if (window.__AIPAY_PAMIR_REDIRECTING__) return;
          const a = Bo(kt(), n),
            s = Za({
              selectedProduct: a,
              inTransitPipeline: r.inTransitPipeline,
              accountRegistration: r.accountRegistrationInTransit,
            });
          if (s === "RESUME") {
            ((r.selectedProduct = a.id), b(), await Li());
            return;
          }
          if (s === "BLOCK") {
            pa();
            return;
          }
          da(n) || (!ue() && di(n) && ee("console", { replaceRoute: !0 }));
        })
        .catch(() => {})
        .finally(() => {
          Se = void 0;
        })),
      Se
    );
  }
  async function la({ force: t = !1 } = {}) {
    return ue()
      ? ((Z && !t) ||
          (Z = Yl({ enterprisePipeline: !0, enterpriseRegistration: !0 })
            .then((n) => {
              const a = Mp(n);
              return (
                (r.inTransitPipeline = a.pipeline),
                (r.accountRegistrationInTransit = a.accountRegistration),
                a.shouldBlock || ($ = !1),
                n
              );
            })
            .catch(
              (n) => (
                n?.isPamirRedirect ||
                  (n?.message, h("在途状态查询失败，请稍后重试")),
                null
              ),
            )
            .finally(() => {
              Z = void 0;
            })),
        Z)
      : null;
  }
  async function Ir({ replace: t = !1, productParam: n = "" } = {}) {
    let a = "products";
    const s = n || r.routeProductParam || "";
    try {
      ua();
      const m = [bi()];
      ue() && m.push(la());
      const [S] = await Promise.all(m);
      if (window.__AIPAY_PAMIR_REDIRECTING__) return;
      (!ue() && !s && S.length > 0 && !ci(S) && (a = "console"),
        (r.inTransitPipeline?.instanceId || r.accountRegistrationInTransit) &&
          (a = "products"));
      const T = a === "products" ? Ht(s) : at(a);
      (S.length, ci(S));
    } catch {
      ((a = "products"), Ht(s));
    }
    const d = t ? "replace" : "assign",
      u = a === "products" ? Ht(s) : at(a);
    window.location[d](u);
  }
  function ua() {
    ue() ||
      (!r.inTransitPipeline && !r.accountRegistrationInTransit && !$) ||
      ((r.inTransitPipeline = null),
      (r.accountRegistrationInTransit = null),
      ($ = !1),
      b());
  }
  function pa() {
    return !r.inTransitPipeline?.instanceId && !r.accountRegistrationInTransit
      ? !1
      : (($ = !0),
        fd(),
        ee("existing", { syncRoute: !1, preserveCurrentPanel: !0 }),
        !0);
  }
  function dd(t) {
    t?.productCode &&
      (M = M.map((n) =>
        n.id === t.productCode
          ? {
              ...n,
              instanceId: t.instanceId || n.instanceId,
              pipelineStatus: t.status || n.pipelineStatus,
              name: t.productName || n.name,
              desc: t.description || n.desc,
              description: t.description || n.description,
              iconUrl: t.iconUrl || n.iconUrl,
            }
          : n,
      ));
  }
  function oe(t) {
    const n = t?.currentForm || null,
      a = n?.nodeId || t?.currentNodeIds?.[0] || "",
      s = le(t);
    ((r.pipelineView = t),
      (r.pipelineInstanceId = t?.instanceId || ""),
      (r.pipelineCurrentNodeId = s ? "" : a),
      (r.pipelineCurrentForm = s ? null : n),
      (Qe = ""),
      (r.nodeFormDrafts = r.nodeFormDrafts || {}),
      (r.pipelineError = ""),
      (r.pipelineStarting = !1),
      (r.productOpenFormLoading = !1),
      (r.productOpenFormError = be(n, t) ? Dn(n) : ""),
      (r.currentStep = On(t, r.currentStep)),
      (r.productStatus = s ? "open" : r.productStatus),
      (r.hasOnboarded = s || r.hasOnboarded),
      (r.qualificationBlocker = null),
      t?.productCode && (r.selectedProduct = t.productCode),
      dd(t),
      b(),
      Pt(),
      Pe("wizard", { replace: !0 }));
  }
  function Kt(t) {
    !t?.nodeId ||
      !Array.isArray(r.pipelineView?.renderGraph?.nodes) ||
      (r.pipelineView.renderGraph.nodes = r.pipelineView.renderGraph.nodes.map(
        (n) =>
          n?.nodeId === t.nodeId
            ? {
                ...n,
                nodeName: t.nodeName || n.nodeName,
                flowStatus: t.flowStatus || n.flowStatus,
                nodeStatus: t.nodeStatus || n.nodeStatus,
                viewState: t.viewState || n.viewState,
                failMsg: t.failMsg || n.failMsg,
                blockers: t.blockers?.length ? t.blockers : n.blockers,
              }
            : n,
      ));
  }
  function vi(t) {
    if (t == null) return "";
    if (typeof t == "object") {
      const n = t.node || t.targetNode || t.payload;
      return n && typeof n == "object"
        ? vi(n)
        : String(
            t.nodeId ||
              t.id ||
              t.key ||
              t.name ||
              t.currentNode ||
              t.activeNode ||
              t.targetNode ||
              t.targetNodeId ||
              "",
          ).trim();
    }
    return String(t).trim();
  }
  function fa(t, n) {
    if (!t || typeof t != "object") return "";
    for (const a of n) {
      const s = vi(t[a]);
      if (s) return s;
    }
    return "";
  }
  function ld(t, n) {
    const a = t?.renderGraph || {},
      s = Array.isArray(a.nodes)
        ? a.nodes.filter((R) => R && R.visible !== !1)
        : [],
      d = Array.isArray(a.edges) ? a.edges : [];
    if (!s.length || !d.length || !n) return null;
    const u = new Map(s.map((R) => [R.nodeId, R])),
      m = new Map();
    d.forEach((R) => {
      const O = fa(R, [
          "source",
          "sourceNode",
          "sourceNodeId",
          "from",
          "fromNode",
          "fromNodeId",
          "start",
          "startNode",
          "startNodeId",
        ]),
        v = fa(R, [
          "target",
          "targetNode",
          "targetNodeId",
          "to",
          "toNode",
          "toNodeId",
          "end",
          "endNode",
          "endNodeId",
        ]);
      if (!O || !v) return;
      const F = m.get(O) || [];
      (F.push(v), m.set(O, F));
    });
    const S = [...(m.get(n) || [])],
      T = new Set([n]);
    for (; S.length; ) {
      const R = S.shift();
      if (!R || T.has(R)) continue;
      T.add(R);
      const O = u.get(R);
      if (O && O.nodeType !== "GUIDE") return O;
      S.push(...(m.get(R) || []));
    }
    return null;
  }
  function ud(t, n) {
    const a = go(t);
    if (!a.length) return null;
    const s = Array.isArray(t?.currentNodeIds)
        ? t.currentNodeIds.map(String)
        : [],
      d = a.find((m) => m.nodeId !== n && s.includes(m.nodeId));
    if (d) return d;
    const u = a.findIndex((m) => m.nodeId === n);
    return u >= 0
      ? a.slice(u + 1).find((m) => m.nodeId !== n) || null
      : a.find((m) => m.nodeId !== n) || null;
  }
  function _i(t, n) {
    return ld(t, n) || ud(t, n);
  }
  async function Ni(
    t,
    { routeAutoStart: n = !1, showAccessMode: a = !1, accessMode: s = "" } = {},
  ) {
    if (r.pipelineStarting) return;
    const d = M.find((S) => S.id === t) || gt[t];
    if ((Te(d) || t === Ve) && !st()) {
      ((r.selectedProduct = t), window.location.assign(we(E)));
      return;
    }
    if (bt(d) === "payment") {
      (window.open(gt.agent.docs, "_blank", "noopener,noreferrer"), pr());
      return;
    }
    const u = Za({
      selectedProduct: { ...d, productCode: d?.productCode || t },
      inTransitPipeline: r.inTransitPipeline,
      accountRegistration: r.accountRegistrationInTransit,
    });
    if (u === "RESUME") {
      ((r.selectedProduct = t), b(), await Li());
      return;
    }
    if (u === "BLOCK") {
      pa();
      return;
    }
    if (a && i && d && bt(d) === "receive" && !zt(d) && !Te(d) && !He()) {
      fi([t], s);
      return;
    }
    if (((r.selectedProduct = t), At(), zt(d) && !Te(d))) {
      (b(), ee("console", { replaceRoute: i }));
      return;
    }
    if (a && i && !d?.instanceId && !Te(d) && !He()) {
      fi([t], s);
      return;
    }
    ((r.pipelineStarting = !0),
      (r.pipelineError = ""),
      (r.productOpenFormLoading = !1),
      (r.productOpenFormError = ""));
    const m = ++Ut;
    (b(), et(), h("正在启动接入流程"));
    try {
      const S = d?.instanceId
        ? await Qt(d.instanceId, Te(d) ? { ...je, strictCode: !0 } : {})
        : await ji(d?.productCode || d?.id || t, {
            subjectType: r.selectedSubjectType,
            subjectId: r.selectedSubjectId,
            enterprisePipeline: He(),
            enterpriseRegistration: ue(),
            ...(Te(d) ? { ...je, strictCode: !0 } : {}),
          });
      if (m !== Ut) return;
      (oe(S), ee("wizard", { replaceRoute: !0 }), h("接入流程已就绪"));
    } catch (S) {
      if (m !== Ut) return;
      if (((r.pipelineStarting = !1), Vo(S))) {
        ((r.pipelineError = ""),
          (r.qualificationBlocker = qo(S, d?.productCode || d?.id || t)),
          b(),
          et(),
          ct("ready"),
          Pt(),
          lc());
        return;
      }
      ((r.pipelineError = S?.message || "启动接入流程失败"),
        b(),
        et(),
        ct("error", r.pipelineError),
        h(r.pipelineError));
    }
  }
  async function pd() {
    if (r.pipelineStarting) return;
    const n = r.qualificationBlocker?.productCode || r.selectedProduct,
      a = M.find((u) => u.id === n) || En(),
      s = a?.productCode || a?.id || n;
    if (!s) {
      h("未找到当前产品，请返回产品选择后重试");
      return;
    }
    ((r.pipelineStarting = !0), (r.pipelineError = ""));
    const d = ++Ut;
    (b(), Pt(), h("正在确认认证结果"));
    try {
      const u = await ji(s, {
        subjectType: r.selectedSubjectType,
        subjectId: r.selectedSubjectId,
        enterprisePipeline: He(),
        enterpriseRegistration: ue(),
      });
      if (d !== Ut) return;
      (oe(u), ee("wizard", { replaceRoute: !0 }), h("接入流程已就绪"));
    } catch (u) {
      if (d !== Ut) return;
      if (((r.pipelineStarting = !1), Vo(u))) {
        ((r.qualificationBlocker = qo(u, s)),
          b(),
          et(),
          ct("ready"),
          Pt(),
          h(u?.message || "请完成认证后再继续"));
        return;
      }
      ((r.pipelineError = u?.message || "启动接入流程失败"),
        b(),
        et(),
        ct("error", r.pipelineError),
        h(r.pipelineError));
    }
  }
  function fd() {
    const t = r.inTransitPipeline,
      n = r.accountRegistrationInTransit,
      a = t || En(),
      s =
        a.productName ||
        a.name ||
        n?.productName ||
        (n ? "企业账号注册" : "当前接入产品"),
      d = e.querySelector("[data-existing-product-title]"),
      u = e.querySelector("[data-existing-product-name]");
    (d && (d.textContent = s), u && (u.textContent = s));
    const m = e.querySelector("[data-existing-detail]");
    m &&
      (m.textContent = t
        ? "账号注册&产品开通正在处理中，完成后可继续后续接入步骤。"
        : n
          ? n.message || "企业账号注册申请正在处理中，完成后才能继续接入。"
          : "该账号已有可用接入能力。");
    const S = e.querySelector("[data-existing-resume]");
    S instanceof HTMLButtonElement && (S.hidden = !t?.instanceId);
  }
  function Gt() {
    const t = H(r.pipelineView),
      n = V(r.pipelineView, r.pipelineCurrentNodeId),
      a =
        r.pipelineCurrentForm?.nodeId === n?.nodeId
          ? r.pipelineCurrentForm
          : null,
      s =
        le(r.pipelineView) && r.currentStep === "success"
          ? "success"
          : Ce(n, r.pipelineView),
      u = {
        visible:
          t &&
          ["keys", "app-key", "web-key", "app-auth", "tech", "verify"].includes(
            s,
          ),
        kind: s,
        form: a,
        view: r.pipelineView,
        context: Fe(r),
        productName: r.pipelineView?.productName,
        busy: Xe > 0,
        error: r.pipelineError,
        keyBlocker: Tr(a, r.pipelineView),
      };
    ((window.__AIPAY_SUBSCRIPTION_STATE__ = u),
      window.dispatchEvent(new CustomEvent(Vd, { detail: u })));
  }
  function Pn(
    t,
    n,
    { keepNode: a = !1, refreshForm: s = !0, discardForm: d = !1 } = {},
  ) {
    if (!de(n, r, { matchNode: !1 })) return !1;
    const u = {
        nodeId: r.pipelineCurrentNodeId,
        form: r.pipelineCurrentForm,
        step: r.currentStep,
      },
      m = a || u.nodeId !== n.nodeId;
    return (
      (sn += 1),
      oe(t),
      m &&
        !le(t) &&
        V(t, u.nodeId) &&
        ((r.pipelineCurrentNodeId = u.nodeId),
        (r.currentStep = u.step),
        (r.pipelineCurrentForm =
          t.currentForm?.nodeId === u.nodeId
            ? t.currentForm
            : u.form?.nodeId === u.nodeId
              ? {
                  ...u.form,
                  viewState: V(t, u.nodeId).viewState,
                  nodeStatus: V(t, u.nodeId).nodeStatus,
                  flowStatus: V(t, u.nodeId).flowStatus,
                }
              : null),
        (Qe = ""),
        Pe("wizard", { replace: !0 })),
      d &&
        r.pipelineCurrentNodeId === n.nodeId &&
        ((r.pipelineCurrentForm = null), (Qe = "")),
      b(),
      B(),
      s && Zo(),
      !0
    );
  }
  async function Ri(t, n) {
    if (!de(t, r, { matchNode: !1 })) return;
    const a = V(r.pipelineView, t.nodeId);
    if (!It(a, r.pipelineView)) return;
    const s = wn(t, n === "onCreatedApp" ? "createdAppId" : "approvedAppId");
    if (!s && n !== "REOPEN") {
      h("应用 ID 缺失，请重试");
      return;
    }
    ((Xe += 1), Gt());
    try {
      await un(async () => {
        if (!de(t, r, { matchNode: !1 })) return;
        const d = { ...je, strictCode: !0, pluginCode: a.pluginCode },
          u = await Le(t.instanceId, a.nodeId, d);
        if (!de(t, r, { matchNode: !1 })) return;
        const m = Tr(u, r.pipelineView);
        if (m) throw new Error(m);
        const S = hr(u, r.pipelineView);
        if (!S || t.appType !== S)
          throw new Error("应用类型已变化，请刷新当前节点后重新操作");
        if (n !== "REOPEN" && u?.viewState !== "EDITABLE")
          throw new Error("当前密钥节点不可编辑，请刷新状态");
        const T = Tt(u),
          R = n === "onCreatedApp",
          O = {
            instanceId: t.instanceId,
            nodeId: a.nodeId,
            actionType: n,
            ...d,
            formData: {
              externalBizId: s,
              appType: S,
              createdAppId: R ? s : T.createdAppId || s,
              ...(R ? {} : { approvedAppId: s }),
            },
          };
        n === "REOPEN" &&
          (O.formData = {
            eventName: "onReopenFlow",
            ...(s ? { appId: s } : {}),
            appType: S,
          });
        const v = await (n === "REOPEN" ? Rt(O) : R ? qa(O) : it(O));
        Pn(v, t, { keepNode: R || n === "REOPEN" });
      });
    } catch (d) {
      de(t, r, { matchNode: !1 }) && h(d?.message || "密钥配置结果同步失败");
    } finally {
      ((Xe -= 1), B());
    }
  }
  window.addEventListener(Bd, (t) => {
    const { resolve: n, reject: a, action: s, value: d, ...u } = t.detail || {};
    if (!H(r.pipelineView) || !de(u, r)) {
      a?.(new Error("页面已切换，请重新操作"));
      return;
    }
    ((Xe += 1),
      Gt(),
      Ee(),
      un(async () => {
        if (!de(u, r)) throw new Error("页面已切换，请重新操作");
        const m = V(r.pipelineView, u.nodeId),
          S = r.pipelineCurrentForm;
        if (s === "SYNC_CANCELLED_ORDER") {
          if (
            Ce(m, r.pipelineView) !== "product" ||
            !d?.orderNo ||
            d.orderNo !== $o().signOrderNo
          )
            throw new Error("订单已变化，请刷新后重试");
          const Q = await Be(m.nodeId, {
            silent: !0,
            inWriteQueue: !0,
            preserveProductFormOnFailure: !0,
          });
          if (!de(u, r, { matchNode: !1 }))
            throw new Error("页面已切换，请重新操作");
          if (!Q) throw new Error("取消后的状态同步失败，请重试");
          return;
        }
        if (s === "REFRESH") {
          if (
            Ce(m, r.pipelineView) === "product" &&
            ["pending", "abnormal"].includes(
              en(me()?.products, S?.nodeStatus).kind,
            )
          )
            throw new Error("产品正在开通或已开通，请等待状态更新");
          if (Ce(m, r.pipelineView) === "app-auth") {
            const K = await Qt(u.instanceId, { ...je, strictCode: !0 });
            if (
              !Pn(K, u, { keepNode: !0, refreshForm: !1, discardForm: !0 }) ||
              !de(u, r)
            )
              throw new Error("页面已切换，请重新操作");
          }
          const Q = await Be(m.nodeId, { inWriteQueue: !0 });
          if (Ce(m, r.pipelineView) === "app-auth" && !Q)
            throw new Error("应用授权信息加载失败，请刷新状态后重试");
          return;
        }
        if (S?.nodeId !== m?.nodeId) throw new Error("请等待节点信息加载完成");
        if (
          Ce(m, r.pipelineView) === "product" &&
          (!me()?.products || me()?.loading || me()?.error)
        )
          throw new Error("请等待产品开通状态加载完成");
        const T = Fd(
            {
              ...u,
              view: r.pipelineView,
              ...(Ce(m, r.pipelineView) === "product"
                ? { products: me()?.products }
                : {}),
            },
            S,
            s,
            d,
          ),
          R = s === "SAVE_PRODUCT_SELECTION",
          O = s === "REOPEN_PRODUCT_SELECTION",
          v = s === "RETURN_TO_PRODUCT_SELECTION",
          F = s === "REOPEN_AUTHORIZATION",
          W = s === "EXECUTE_AUTH",
          z = R || O || v,
          ae = z || F || W,
          j = await (O || v || F ? Rt(T) : R ? Va(T) : it(T));
        if (
          !Pn(j, u, {
            keepNode: ae,
            refreshForm: !ae,
            ...(F ? { discardForm: !0 } : {}),
          })
        )
          throw new Error("页面已切换，请重新操作");
        if (F || (W && !le(j))) {
          if (!de(u, r)) throw new Error("页面已切换，请重新操作");
          const Q = await Be(m.nodeId, { inWriteQueue: !0 });
          if (!de(u, r)) throw new Error("页面已切换，请重新操作");
          if (!Q || Q.nodeId !== m.nodeId)
            throw new Error(
              F
                ? "授权节点已重新开启，但信息加载失败，请刷新状态后继续"
                : "应用已授权，但信息加载失败，请刷新状态后继续",
            );
          if (F && Q.viewState !== "EDITABLE")
            throw new Error("当前授权节点仍不可编辑，请刷新状态或检查重开权限");
        }
        if (z && !le(j)) {
          const Q = await Be(m.nodeId, { inWriteQueue: !0 });
          if (!Q || !de(u, r, { matchNode: !1 }))
            throw new Error("产品开通信息加载失败，请刷新状态后重试");
          if (v && Q.formData?.subscription_apply_product?.trim())
            throw new Error("产品选择尚未清除，请重试");
          if (Q.nodeStatus === "FAILED")
            throw new Error(Dn(Q) || "产品开通失败，请刷新状态后重试");
        }
      })
        .then(n, a)
        .finally(() => {
          ((Xe -= 1), Gt(), Ee());
        }));
  });
  function B() {
    const t = En(),
      n = e.querySelector("[data-wizard-access-mode-bar]");
    (n instanceof HTMLElement &&
      (n.hidden = Ji(r, { enterprisePipelineRequested: He() })),
      wu(e, r, t),
      ap(e, r, { enterprisePipelineRequested: He() }),
      H(r.pipelineView) || Cp(e, r),
      sp(e, r),
      cp(e, r),
      dp(e, r),
      H(r.pipelineView) || lp(e, r),
      jo() && Ei(),
      Ee(),
      ge(),
      Gt());
  }
  async function Li() {
    const t = r.inTransitPipeline?.instanceId,
      n =
        r.inTransitPipeline?.productCode ||
        r.inTransitPipeline?.raw?.productCode,
      a = n ? n === Ve : r.selectedProduct === Ve;
    if (a && !st()) {
      window.location.assign(we(E));
      return;
    }
    const s = Fe(r).subjectKey;
    if (!t) {
      h("企业账号注册申请正在处理中，请稍后再试");
      return;
    }
    try {
      const d = await Qt(t, a ? { ...je, strictCode: !0 } : {});
      if (a && s !== Fe(r).subjectKey) return;
      (oe(d),
        (r.inTransitPipeline = null),
        (r.accountRegistrationInTransit = null),
        ($ = !1),
        b(),
        ea(),
        ee("wizard", { replaceRoute: !0 }));
    } catch (d) {
      h(d?.message || "在途接入流程查询失败，请稍后重试");
    }
  }
  function Ie() {
    (Rp(e, r, En(), {
      activeView: Me,
      products: Ne,
      productsLoading: kr,
      productsLoaded: ye,
      productsError: Gn,
      services: r.registeredServices || [],
      servicesLoading: r.registeredServicesLoading,
      servicesLoaded: r.registeredServicesLoaded,
      servicesError: r.registeredServicesError,
      servicesPageNum: ot,
      servicesPageSize: Vn,
      servicesTotal: Hr,
      servicesQuotaTotal: zr,
      servicesIfWhiteUid: jr,
      servicesCanCreate: Yo(),
    }),
      Fc());
  }
  async function _t(t) {
    const n = V(r.pipelineView, t);
    if (!n) return !1;
    const a = H(r.pipelineView) && r.pipelineCurrentNodeId !== n.nodeId,
      s = pe(n);
    return (
      (sn += 1),
      (r.currentStep = s),
      (r.pipelineCurrentNodeId = n.nodeId),
      b(),
      Pe("wizard"),
      B(),
      a && ia("instant"),
      await Be(n.nodeId),
      !0
    );
  }
  function ft(t) {
    if (!Ot.includes(t)) return;
    const n = Ln(r.pipelineView, t);
    if (n?.nodeId) {
      _t(n.nodeId);
      return;
    }
    ((sn += 1), (r.currentStep = t), b(), Pe("wizard"), B());
  }
  function Sr(t) {
    const n = {};
    return (
      t instanceof HTMLFormElement &&
        (new FormData(t).forEach((s, d) => {
          d &&
            (n[d] === void 0
              ? (n[d] = String(s))
              : Array.isArray(n[d])
                ? n[d].push(String(s))
                : (n[d] = [n[d], String(s)]));
        }),
        t.querySelectorAll("input, select, textarea").forEach((s, d) => {
          if (
            !(
              s instanceof HTMLInputElement ||
              s instanceof HTMLSelectElement ||
              s instanceof HTMLTextAreaElement
            )
          )
            return;
          const u =
            s.name ||
            s.getAttribute("aria-label") ||
            s.dataset.field ||
            `field${d + 1}`;
          if (!(!u || n[u] !== void 0)) {
            if (
              s instanceof HTMLInputElement &&
              ["checkbox", "radio"].includes(s.type)
            ) {
              if (!s.checked) return;
              n[u] = s.value || "true";
              return;
            }
            n[u] = String(s.value || "");
          }
        })),
      n
    );
  }
  function Oi() {
    return (
      r.pipelineCurrentNodeId === "SERVICE_REGISTER" &&
      r.serviceRegisterMode === "reuse" &&
      r.selectedServiceId
    );
  }
  function md(t) {
    if (Oi()) return { serviceId: r.selectedServiceId };
    const n = Sr(t);
    if (r.pipelineCurrentNodeId === "SERVICE_REGISTER") {
      const a = Dc();
      a ? (n.serviceId = a) : delete n.serviceId;
      const s = n.schemaUrl || n.schema_url || "";
      ((n.schemaUrl = ya(s)), delete n.schema_url);
    }
    return n;
  }
  function Tn(t) {
    ((r.nodeFormDrafts = { ...(r.nodeFormDrafts || {}) }),
      delete r.nodeFormDrafts[t]);
  }
  function ma(t, n) {
    ((r.nodeFormDrafts = {
      ...(r.nodeFormDrafts || {}),
      [t]: { ...(r.nodeFormDrafts?.[t] || {}), ...n },
    }),
      b());
  }
  function Mi(t) {
    !t ||
      !ir() ||
      ((r.serviceRejectedFieldEdits = {
        ...(r.serviceRejectedFieldEdits || {}),
        [t]: !0,
      }),
      b());
  }
  function xi(t) {
    if (
      !(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) ||
      !t.name ||
      !t.classList.contains("isRejected")
    )
      return;
    const a = t
      .closest(".fieldRow")
      ?.querySelector(`[data-field-error="${t.name}"]`);
    (Mi(t.name),
      t.classList.remove("isRejected"),
      a instanceof HTMLElement &&
        a.textContent === "此内容导致审核失败，请重新编辑" &&
        ((a.textContent = ""), (a.hidden = !0)));
  }
  function ga() {
    if (
      r.pipelineCurrentNodeId !== "SERVICE_REGISTER" ||
      Oi() ||
      (!["create", "createOnly"].includes(r.serviceRegisterMode) && !ir())
    )
      return;
    const t = e.querySelector("[data-service-form]");
    t instanceof HTMLFormElement && ma("SERVICE_REGISTER", Sr(t));
  }
  function Ia(t) {
    const n = e.querySelector(`[data-step-panel="${t}"]`);
    if (!(n instanceof HTMLElement)) return {};
    const a = {};
    return (
      n.querySelectorAll("input, select, textarea").forEach((s, d) => {
        if (
          !(
            s instanceof HTMLInputElement ||
            s instanceof HTMLSelectElement ||
            s instanceof HTMLTextAreaElement
          )
        )
          return;
        const u =
          s.name ||
          s.getAttribute("aria-label") ||
          s.dataset.field ||
          `field${d + 1}`;
        if (!(!u || a[u] !== void 0)) {
          if (
            s instanceof HTMLInputElement &&
            ["checkbox", "radio"].includes(s.type)
          ) {
            if (!s.checked) return;
            a[u] = s.value || "true";
            return;
          }
          a[u] = String(s.value || "");
        }
      }),
      a
    );
  }
  function Sa(t) {
    const n = String(t || "").replace(/[^\d.]/g, ""),
      [a = "", ...s] = n.split("."),
      d = s.join("").slice(0, 2);
    return n ? (s.length ? `${a}.${d}` : a) : "";
  }
  function gd(t) {
    const n = String(t || "").trim();
    if (!n) return "请输入服务地址";
    if (!/^https?:\/\//i.test(n))
      return "服务地址必须以 http:// 或 https:// 开头";
    try {
      return (new URL(n), "");
    } catch {
      return "请输入有效的服务地址";
    }
  }
  function Id(t) {
    const n = String(t || "").trim();
    return n
      ? /^\d+(\.\d{1,2})?$/.test(n)
        ? Number(n) < 0.01
          ? "请输入 0.01 及以上的金额"
          : Number(n) > 50
            ? "请输入 50 及以下的金额"
            : ""
        : "请输入有效金额，最多保留 2 位小数"
      : "请输入定价信息";
  }
  function Sd(t) {
    const n = String(t || "").trim();
    if (!n) return "请输入请求示例";
    try {
      const a = JSON.parse(n);
      return typeof a != "object" || a === null || Array.isArray(a)
        ? "请输入合法的 JSON 对象"
        : "";
    } catch {
      return "请输入合法的 JSON 对象";
    }
  }
  function yd(t) {
    const n = String(t || "");
    return n.includes("AE051AGMT816")
      ? "服务单价不能超过50元，请修改"
      : n.includes("AE051AGMT818")
        ? "服务数量已达上限"
        : n.includes("AE051AGMT805")
          ? "服务名称重复，请修改后再试"
          : n.includes("AE051AGMT002")
            ? "提交的信息格式存在问题，请修改后重试"
            : n || "提交服务信息遇到问题，请稍后重试";
  }
  function ya(t) {
    const n = String(t || "").trim();
    return n ? JSON.stringify(JSON.parse(n)) : "";
  }
  function yr(t) {
    const n = t.name,
      a = String(t.value || "").trim();
    if (n === "serviceName") {
      if (!a) return "请输入服务名称";
      if (Array.from(a).length > 15) return "服务名称最多 15 个字";
    }
    if (n === "resourceUrl") return gd(a);
    if (n === "pricing") return Id(a);
    if (n === "schemaUrl" || n === "schema_url") return Sd(a);
    if (n === "serviceDesc") {
      if (!a) return "请输入服务描述";
      if (Array.from(a).length > 500) return "服务描述最多 500 个字";
    }
    return "";
  }
  function $t(t, n) {
    const s = t
      .closest(".fieldRow")
      ?.querySelector(`[data-field-error="${t.name}"]`);
    (t.classList.toggle("isInvalid", !!n),
      t.setAttribute("aria-invalid", n ? "true" : "false"),
      s instanceof HTMLElement && ((s.textContent = n), (s.hidden = !n)));
  }
  function Ea(t) {
    const n = Array.from(
      t.querySelectorAll(
        '[name="serviceName"], [name="resourceUrl"], [name="pricing"], [name="serviceDesc"], [name="schemaUrl"], [name="schema_url"]',
      ),
    );
    let a = null;
    return (
      n.forEach((s) => {
        if (
          !(s instanceof HTMLInputElement || s instanceof HTMLTextAreaElement)
        )
          return;
        s.value = String(s.value || "").trim();
        const d = yr(s);
        ($t(s, d), d && !a && (a = s));
      }),
      a ? (a.focus(), h("请检查服务注册信息"), !1) : !0
    );
  }
  function Di() {
    const t = e.querySelector("[data-verify-trade-no]"),
      n = e.querySelector("[data-verify-trade-submit]");
    if (!(t instanceof HTMLInputElement) || !(n instanceof HTMLButtonElement))
      return;
    const a = t.closest('[data-step-panel="verify"]'),
      s = a instanceof HTMLElement && a.classList.contains("isBlockedReadonly"),
      d = !!t.value.trim();
    ((n.disabled = s || !d || n.dataset.submitting === "true"),
      n.setAttribute("aria-disabled", n.disabled ? "true" : "false"));
  }
  function Nt(t = "") {
    const n = e.querySelector("[data-verify-trade-no]"),
      a = e.querySelector("[data-verify-trade-error]"),
      s = String(t || "").trim();
    (n instanceof HTMLInputElement &&
      n.setAttribute("aria-invalid", s ? "true" : "false"),
      a instanceof HTMLElement && ((a.textContent = s), (a.hidden = !s)));
  }
  function Ed() {
    return (
      Ln(r.pipelineView, "verify") || V(r.pipelineView, r.pipelineCurrentNodeId)
    );
  }
  async function hd() {
    const t = e.querySelector("[data-verify-trade-no]"),
      n = e.querySelector("[data-verify-trade-submit]");
    if (!(t instanceof HTMLInputElement)) return;
    const a = t.value.trim();
    if (!a) {
      (Nt("请输入支付宝交易号"), Di());
      return;
    }
    if (!r.pipelineView?.instanceId) {
      Nt("接入流程不存在，请刷新后重试");
      return;
    }
    const s = Ed();
    if (!s?.nodeId || s.nodeType === "GUIDE") {
      Nt("线上验证节点不存在");
      return;
    }
    const d =
      r.pipelineCurrentForm?.nodeId === s.nodeId
        ? r.pipelineCurrentForm
        : r.pipelineView.currentForm?.nodeId === s.nodeId
          ? r.pipelineView.currentForm
          : s;
    if (!br(d) && !br(s)) {
      Nt(s.blockReason || "请先完成前置工作");
      return;
    }
    n instanceof HTMLButtonElement &&
      ((n.dataset.submitting = "true"),
      (n.disabled = !0),
      n.setAttribute("aria-disabled", "true"));
    try {
      (Nt(""), h("正在验证交易"));
      const u = await it({
        instanceId: r.pipelineView.instanceId,
        nodeId: s.nodeId,
        formData: { tradeNo: a },
      });
      (oe(u), B(), h("交易验证已提交"));
    } catch (u) {
      Nt(u?.message || "交易验证失败");
    } finally {
      (n instanceof HTMLButtonElement && delete n.dataset.submitting, Di());
    }
  }
  async function Ui(t, n) {
    if (!r.pipelineView?.instanceId) return !1;
    const a = Ln(r.pipelineView, n || r.currentStep),
      s =
        (t instanceof HTMLFormElement,
        a || V(r.pipelineView, r.pipelineCurrentNodeId));
    if (!s?.nodeId || s.nodeType === "GUIDE") return !1;
    const d =
      r.pipelineCurrentForm?.nodeId === s.nodeId
        ? r.pipelineCurrentForm
        : r.pipelineView.currentForm?.nodeId === s.nodeId
          ? r.pipelineView.currentForm
          : s;
    if (!br(d) && !br(s)) return (s.blockReason && h(s.blockReason), !0);
    const u = s.nodeId === "SERVICE_REGISTER";
    try {
      u || h("正在提交节点");
      const m =
          t instanceof HTMLFormElement
            ? u
              ? md(t)
              : Sr(t)
            : Ia(n || r.currentStep),
        S = await it({
          instanceId: r.pipelineView.instanceId,
          nodeId: s.nodeId,
          actionType: u && Oi() ? "USE_EXISTING" : void 0,
          formData: m,
        });
      if ((oe(S), u && !le(S))) {
        (ma("SERVICE_REGISTER", m),
          (r.currentStep = "service"),
          (r.pipelineCurrentNodeId = "SERVICE_REGISTER"),
          (r.pipelineCurrentForm =
            S.currentForm?.nodeId === "SERVICE_REGISTER"
              ? S.currentForm
              : {
                  nodeId: "SERVICE_REGISTER",
                  nodeName: s.nodeName || "服务注册",
                  viewState: "COMPLETED",
                  flowStatus: "COMPLETED",
                  displayData: m,
                  formData: m,
                }),
          (r.hasService = !0),
          (r.serviceRegisterMode = ""),
          (r.serviceRechooseMode = !1),
          (r.serviceRejectedFieldEdits = {}),
          Tn("SERVICE_REGISTER"));
        try {
          const T = await Le(r.pipelineInstanceId, s.nodeId, De(s));
          (Kt(T),
            (r.pipelineCurrentForm = T || r.pipelineCurrentForm),
            (r.pipelineCurrentNodeId = T?.nodeId || s.nodeId),
            (r.currentStep = "service"),
            b());
        } catch {}
        (b(), Pe("wizard", { replace: !0 }));
      }
      return (B(), u || h("节点已提交"), !0);
    } catch (m) {
      return (h(m?.message || "节点提交失败"), !0);
    }
  }
  async function wd(t) {
    const n = String(t || "").trim(),
      a = V(r.pipelineView, n);
    if (!r.pipelineView?.instanceId || !a?.nodeId || a.nodeType === "GUIDE")
      return (h("前置节点不存在"), !0);
    try {
      h("正在提交前置节点");
      const s = await it({
        instanceId: r.pipelineView.instanceId,
        nodeId: a.nodeId,
        formData: Ia(pe(a)),
      });
      return (oe(s), B(), h("前置节点已提交"), !0);
    } catch (s) {
      return (h(s?.message || "前置节点提交失败"), !0);
    }
  }
  async function Cd(t) {
    const n = r.pipelineView?.instanceId || r.pipelineInstanceId,
      a = V(r.pipelineView, "SERVICE_REGISTER");
    if (!n || !a?.nodeId) return (h("服务注册节点不存在"), !0);
    ((r.selectedServiceId = t),
      (r.serviceRegisterMode = "reuse"),
      (r.hasService = !0),
      (r.serviceSubmittingId = t),
      Tn("SERVICE_REGISTER"),
      b(),
      B());
    try {
      h("正在使用已有服务");
      const s = await it({
        instanceId: n,
        nodeId: a.nodeId,
        actionType: "USE_EXISTING",
        formData: { serviceId: t },
      });
      if (
        (oe(s),
        (r.serviceSubmittingId = ""),
        (r.serviceRechooseMode = !1),
        Tn("SERVICE_REGISTER"),
        !le(s))
      )
        try {
          const d = await Le(r.pipelineInstanceId, a.nodeId, De(a));
          ((r.pipelineCurrentForm = d),
            (r.pipelineCurrentNodeId = d?.nodeId || a.nodeId),
            (r.currentStep = pe(d || a)));
        } catch {}
      return (b(), B(), h("已使用已有服务"), !0);
    } catch (s) {
      return (
        (r.serviceSubmittingId = ""),
        (r.hasService = !1),
        b(),
        B(),
        h(s?.message || "使用已有服务失败"),
        !0
      );
    }
  }
  async function bd() {
    const t = V(r.pipelineView, "SERVICE_REGISTER"),
      n = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!n || !t?.nodeId) {
      h("服务注册节点不存在");
      return;
    }
    try {
      h("正在重新打开服务注册");
      const a = await Rt({
        instanceId: n,
        nodeId: t.nodeId,
        actionType: "REOPEN",
      });
      (oe(a),
        (r.currentStep = "service"),
        (r.pipelineCurrentNodeId = "SERVICE_REGISTER"),
        (r.pipelineCurrentForm =
          a.currentForm?.nodeId === "SERVICE_REGISTER"
            ? a.currentForm
            : r.pipelineCurrentForm));
      try {
        const s = await Le(n, "SERVICE_REGISTER");
        ((r.pipelineCurrentForm = s),
          (r.pipelineCurrentNodeId = s?.nodeId || "SERVICE_REGISTER"),
          (r.currentStep = pe(s || t)));
      } catch {}
      ((r.hasService = !1),
        (r.selectedServiceId = ""),
        (r.serviceRechooseMode = !0),
        (r.serviceRegisterMode = "list"),
        Tn("SERVICE_REGISTER"),
        (r.registeredServicesLoaded = !1),
        (r.registeredServicesError = ""),
        (r.serviceDetailLoadingId = ""),
        (r.serviceDetailError = ""),
        (r.serviceSubmittingId = ""),
        b(),
        B(),
        Ei({ force: !0 }),
        h("请选择服务"));
    } catch (a) {
      h(a?.message || "重新选择失败");
    }
  }
  async function Bi(t = {}) {
    const { silent: n = !1 } = t || {},
      a = dt();
    if (Ce(a, r.pipelineView) === "product") {
      const u = en(me()?.products, r.pipelineCurrentForm?.nodeStatus);
      return ["pending", "abnormal"].includes(u.kind) ? null : Be(a.nodeId, t);
    }
    const s = a?.nodeId || Je,
      d = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!d || !a?.nodeId) return (n || h("产品开通节点不存在"), Ee(), null);
    try {
      ((r.productOpenFormLoading = !0),
        (r.productOpenFormError = ""),
        b(),
        B(),
        n || h("正在刷新产品开通状态"));
      const u = await Le(d, s, De(a)),
        m = xc();
      return (
        cr(u, a, { activate: m }),
        (r.productOpenFormLoading = !1),
        (r.productOpenFormError = Dn(u)),
        b(),
        m && Pe("wizard", { replace: !0 }),
        B(),
        n || h("产品开通状态已刷新"),
        u
      );
    } catch (u) {
      return (
        (r.productOpenFormLoading = !1),
        (r.productOpenFormError = u?.message || "产品开通状态刷新失败"),
        b(),
        B(),
        n || h(u?.message || "产品开通状态刷新失败"),
        Ee(),
        null
      );
    }
  }
  async function Ad(t = {}) {
    const n = dt(),
      a = n?.nodeId || Je,
      s = r.pipelineView?.instanceId || r.pipelineInstanceId,
      d = hn(),
      u = X(t.externalBizId, d.externalBizId),
      m = X(t.businessProductCode, d.businessProductCode);
    if (!s || !n?.nodeId) return (h("产品开通节点不存在"), Ee(), !0);
    if (!u) return (h("业务订单号缺失，请刷新后重试"), Ee(), !0);
    if (Qr) return !0;
    Qr = !0;
    try {
      h("正在同步产品开通结果");
      const S = await it({
        instanceId: s,
        nodeId: a,
        actionType: "SUBMIT",
        formData: { businessProductCode: m, externalBizId: u },
      });
      if (
        (oe(S),
        (r.currentStep = "product"),
        (r.pipelineCurrentNodeId = a),
        !le(S))
      )
        try {
          const T = await Le(s, a, De(n));
          cr(T, n);
        } catch {}
      return (b(), B(), h("产品开通结果已提交"), !0);
    } catch (S) {
      return (h(S?.message || "产品开通提交失败"), Ee(), !0);
    } finally {
      Qr = !1;
    }
  }
  async function Pd({ silent: t = !0 } = {}) {
    const n = H(r.pipelineView),
      a = r.pipelineView?.instanceId || r.pipelineInstanceId;
    return a
      ? n
        ? (await Xo({ silent: t, inWriteQueue: !0 }))
          ? r.pipelineView
          : null
        : ln ||
          ((ln = (async () => {
            try {
              const s = await Qt(a, De());
              oe(s);
              const d = r.pipelineCurrentNodeId;
              return (
                _e(d, r.pipelineView) || d === re || It(d, r.pipelineView)
                  ? await Be(d, { silent: !0 })
                  : B(),
                s
              );
            } catch (s) {
              return (t || h(s?.message || "企业入驻状态刷新失败"), null);
            } finally {
              ln = null;
            }
          })()),
          ln)
      : (t || h("接入流程不存在，请刷新后重试"), null);
  }
  async function ha(t = {}) {
    const {
        resolve: n,
        reject: a,
        instanceId: s,
        nodeId: d,
        subjectKey: u,
        ...m
      } = t || {},
      S = !!u || H(r.pipelineView),
      T = { instanceId: s, nodeId: d, subjectKey: u };
    if (S && !de(T, r, { matchNode: !1 })) {
      a?.(new Error("页面已切换，请重新操作"));
      return;
    }
    const R = lt(),
      O = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!O || !R) return (h("企业入驻节点不存在"), !0);
    const v =
        r.pipelineCurrentForm?.nodeId === R.nodeId
          ? r.pipelineCurrentForm
          : null,
      F = v?.formData || v?.displayData || {},
      W = String(m.action || "").toUpperCase();
    if (W === "CREATE_SIGN_ORDER" || W === "REOPEN") {
      const j = await vd();
      return (n?.(j), j);
    }
    if (W === "REFRESH") {
      const j = await Pd({ silent: !0 });
      return (n?.(!!j), !!j);
    }
    const z = String(
        m.externalBizId ||
          m.orderNo ||
          F.externalBizId ||
          F.applicationId ||
          F.applyId ||
          "",
      ).trim(),
      ae =
        String(m.layer || "").toLowerCase() === "account_register" &&
        String(m.scene || "").toLowerCase() === "iframe";
    if (!z && !ae) return (h("企业入驻申请号尚未生成"), !0);
    try {
      h("正在同步企业入驻结果");
      const j = await it({
        instanceId: O,
        nodeId: R.nodeId,
        ...De(R),
        actionType: "SUBMIT",
        formData: {
          ...m,
          externalBizId: z,
          applicationId: m.applicationId || z,
          status: Td(m),
          action: W,
        },
      });
      (S ? Pn(j, T) : (oe(j), (r.currentStep = On(j, "product")), B()),
        h("企业入驻结果已同步"),
        n?.(!0));
    } catch (j) {
      (h(j?.message || "企业入驻结果同步失败"), a?.(j));
    }
    return !0;
  }
  function Td(t = {}) {
    const n = String(t.action || "").toUpperCase(),
      a = String(t.settleStatus || "").toUpperCase(),
      s = String(t.signStatus || "").toUpperCase(),
      d = String(t.status || "").toUpperCase();
    return a === "FAIL" ||
      s === "FAIL" ||
      [
        "FAIL",
        "FAILED",
        "AUDIT_FAIL",
        "REJECT",
        "CANCEL",
        "CANCELED",
        "CLOSED",
      ].includes(d)
      ? "FAILED"
      : (a === "SUCCESS" && s === "SUCCESS") ||
          (s === "SUCCESS" && n === "REFRESH") ||
          ["SUCCESS", "OPENED", "FINISH", "COMPLETED"].includes(d)
        ? "SUCCESS"
        : (n === "SUBMIT" ||
            [
              "AUDITING",
              "PROCESSING",
              "PENDING",
              "REVIEWING",
              "WAIT_CONFIRM",
            ].includes(d) ||
            ["REVIEWING", "AUDITING"].includes(a) ||
            ["REVIEWING", "AUDITING"].includes(s),
          "WAITING_RESULT");
  }
  async function vd() {
    const t = H(r.pipelineView),
      n = Fe(r),
      a = r.pipelineView?.instanceId || r.pipelineInstanceId,
      s = lt();
    if (!a || !s) return (h("企业入驻节点不存在"), !0);
    try {
      const d = await Rt({
        instanceId: a,
        nodeId: s.nodeId,
        ...De(s),
        actionType: "REOPEN",
      });
      if (t)
        return (Pn(d, n, { keepNode: !0 }) && h("已重新打开企业入驻流程"), !0);
      (oe(d),
        (r.currentStep = "product"),
        (r.pipelineCurrentNodeId = s.nodeId));
      const u = await Le(a, s.nodeId, De(s));
      (cr(u, s), b(), B(), h("已重新打开企业入驻流程"));
    } catch (d) {
      h(d?.message || "重新打开企业入驻流程失败");
    }
    return !0;
  }
  async function Fi(t = {}) {
    const { isManual: n } = Tc(t),
      a = dt(),
      s = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!s || !a?.nodeId) {
      const d = "请重新填写产品开通信息";
      return (
        n ? ((r.productStatus = "idle"), b(), B(), h(d)) : Ee(),
        gi({
          success: !1,
          isManual: n,
          code: "PRODUCT_OPEN_NODE_MISSING",
          message: d,
        })
      );
    }
    try {
      n && h("正在重新开通产品");
      const d = await Rt({ instanceId: s, nodeId: Je, actionType: "REOPEN" });
      (oe(d), (r.currentStep = "product"), (r.pipelineCurrentNodeId = Je));
      const u = await Le(s, Je);
      return (
        cr(u, a),
        b(),
        B(),
        n && h("请重新提交产品开通"),
        gi({
          success: !0,
          isManual: n,
          form: u,
          view: d,
          message: "请重新提交产品开通",
        })
      );
    } catch (d) {
      const u = d?.message || "重新开通失败";
      return (
        n && h(u),
        Ee(),
        gi({ success: !1, isManual: n, error: d, message: u })
      );
    }
  }
  async function _d() {
    const t = r.pipelineView,
      a = dt()?.nodeId || Je;
    if (!t?.instanceId) {
      ft("service");
      return;
    }
    if (le(t)) {
      ft("success");
      return;
    }
    try {
      const u = await Rt({
        instanceId: t.instanceId,
        nodeId: a,
        actionType: "SKIP",
      });
      if ((oe(u), b(), B(), le(u))) {
        ft("success");
        return;
      }
      const m = _i(u, a);
      if (m?.nodeId) {
        await _t(m.nodeId);
        return;
      }
    } catch (u) {
      h(u?.message || "跳过当前节点失败");
      return;
    }
    const s = _i(t, a);
    if (s?.nodeId) {
      _t(s.nodeId);
      return;
    }
    const d = On(t, "keys");
    if (d && d !== "product") {
      ft(d);
      return;
    }
    (h("暂无可跳转的后续节点，请刷新流程状态"), Bi({ silent: !0 }));
  }
  async function wa({ silent: t = !1 } = {}) {
    const n = Ue(),
      a = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!a || !n?.nodeId) return (t || h("密钥配置节点不存在"), ge(), null);
    try {
      const s = await Le(a, re);
      return (
        Kt(s),
        (r.pipelineCurrentForm = s),
        (r.pipelineCurrentNodeId = s?.nodeId || re),
        (r.currentStep = "keys"),
        (Qe = `${r.pipelineInstanceId}:${re}`),
        b(),
        Pe("wizard", { replace: !0 }),
        B(),
        s
      );
    } catch (s) {
      return (t || h(s?.message || "密钥配置状态刷新失败"), ge(), null);
    }
  }
  async function Nd(t) {
    if (t.subjectKey || H(r.pipelineView)) return Ri(t, "onCreatedApp");
    const n = wn(t, "createdAppId"),
      a = Ue(),
      s = r.pipelineView?.instanceId || r.pipelineInstanceId,
      d = Ii(t, Tt().appType);
    if (!s || !a?.nodeId) return (h("密钥配置节点不存在"), ge(), !0);
    if (!n) return (h("应用 ID 缺失，请重试"), ge(), !0);
    const u = {
        createdAppId: n,
        externalBizId: n,
        ...(d ? { appType: d } : {}),
      },
      m = Cn(u);
    (b(), ge());
    try {
      h("正在同步应用创建结果");
      const S = await qa({
        instanceId: s,
        nodeId: re,
        actionType: Gs,
        formData: {
          externalBizId: n,
          createdAppId: n,
          ...(d ? { appType: d } : {}),
        },
      });
      (oe(S), (r.currentStep = "keys"), (r.pipelineCurrentNodeId = re));
      const T = await wa({ silent: !0 }),
        R = Tt(T);
      return (
        X(R.createdAppId, R.approvedAppId) ||
          (m
            ? ((r.pipelineCurrentForm = m),
              (r.pipelineCurrentNodeId = re),
              (r.currentStep = "keys"),
              Kt(m))
            : Cn(u),
          b(),
          ge()),
        h("应用创建结果已同步"),
        !0
      );
    } catch (S) {
      return (h(S?.message || "应用创建结果同步失败"), ge(), !0);
    }
  }
  async function Rd(t, n) {
    if (t.subjectKey || H(r.pipelineView)) return Ri(t, "onApprovedApp");
    const a = wn(t, "approvedAppId"),
      s = Ue(),
      d = r.pipelineView?.instanceId || r.pipelineInstanceId,
      u = Tt(),
      m = X(n, Ii(t), u.appType).toUpperCase();
    if (!d || !s?.nodeId) return (h("密钥配置节点不存在"), ge(), !0);
    if (!a) return (h("应用 ID 缺失，请重试"), ge(), !0);
    if (!["APP", "PC"].includes(m))
      return (h("服务端未返回应用类型，请刷新状态后重试"), ge(), !0);
    (Cn({ approvedAppId: a, externalBizId: a, appType: m }), b(), ge());
    try {
      h("正在同步密钥配置结果");
      const S = await it({
        instanceId: d,
        nodeId: re,
        actionType: $s,
        formData: {
          externalBizId: a,
          createdAppId: u.createdAppId || a,
          approvedAppId: a,
          appType: m,
        },
      });
      return (
        oe(S),
        !le(S) && r.currentStep === "keys" && (r.currentStep = On(S, "verify")),
        b(),
        Pe("wizard", { replace: !0 }),
        B(),
        h("密钥配置结果已同步"),
        !0
      );
    } catch (S) {
      return (h(S?.message || "密钥配置结果同步失败"), ge(), !0);
    }
  }
  async function Ld(t = {}) {
    if (t.subjectKey || H(r.pipelineView)) return Ri(t, "REOPEN");
    const n = Ue(),
      a = r.pipelineView?.instanceId || r.pipelineInstanceId;
    if (!a || !n?.nodeId) return (h("密钥配置节点不存在"), ge(), !0);
    const s = Tt(),
      d =
        wn(t, "createdAppId") ||
        wn(t, "approvedAppId") ||
        s.createdAppId ||
        s.approvedAppId,
      u = Ii(t, s.appType);
    (Cn({
      createdAppId: "",
      approvedAppId: "",
      externalBizId: "",
      ...(u ? { appType: u } : {}),
    }),
      b(),
      ge());
    try {
      h("正在重新选择应用");
      const m = await Rt({
        instanceId: a,
        nodeId: re,
        actionType: "REOPEN",
        formData: {
          eventName: Ys,
          ...(d ? { appId: d } : {}),
          ...(u ? { appType: u } : {}),
        },
      });
      return (
        oe(m),
        (r.currentStep = "keys"),
        (r.pipelineCurrentNodeId = re),
        await wa({ silent: !0 }),
        h("请重新选择应用"),
        !0
      );
    } catch (m) {
      return (
        Cn({
          createdAppId: s.createdAppId,
          approvedAppId: s.approvedAppId,
          externalBizId: s.approvedAppId || s.createdAppId,
          ...(s.appType ? { appType: s.appType } : {}),
        }),
        b(),
        h(m?.message || "重新选择应用失败"),
        ge(),
        !0
      );
    }
  }
  function Od() {
    if (Ji(r, { enterprisePipelineRequested: He() })) return;
    const t = e.querySelector("[data-agent-modal]");
    t instanceof HTMLElement &&
      ((t.hidden = !1),
      requestAnimationFrame(() => t.classList.add("isVisible")));
  }
  function vn() {
    const t = e.querySelector("[data-agent-modal]");
    t instanceof HTMLElement &&
      (t.classList.remove("isVisible"), (t.hidden = !0));
  }
  async function Md(t) {
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(t);
      else {
        const n = document.createElement("textarea");
        ((n.value = t),
          n.setAttribute("readonly", ""),
          (n.style.position = "fixed"),
          (n.style.top = "-9999px"),
          document.body.appendChild(n),
          n.select());
        const a = Reflect.get(document, "execCommand"),
          s = typeof a == "function" && a.call(document, "copy");
        if ((n.remove(), !s)) throw new Error("copy failed");
      }
      h("已复制");
    } catch {
      h("复制失败，请手动复制");
    }
  }
  function _n({ source: t = "authcenter" } = {}) {
    if (Gr) return;
    ((Gr = !0), ei(), Ro(), window.dispatchEvent(new CustomEvent(Rn)));
    const n = Mo();
    an.length > 0;
    const a = t === "backend-precheck" ? 0 : 200;
    window.setTimeout(async () => {
      (r.isLoggedIn, ra());
      const s = an.length > 0;
      (sd(), s || xo(n));
    }, a);
  }
  async function Er({ source: t = "authcenter", silentFailure: n = !1 } = {}) {
    if (cn) return cn;
    cn = (async () => {
      const a = await _o({ retry: !0, forceLogoutOnExpired: !1 });
      return a?.isLoggedIn
        ? (_n({ source: t }), { loggedIn: !0, accountInfo: a })
        : (a?.isLoginExpired,
          a?.error,
          n || h("登录态同步中，请稍后重试"),
          { loggedIn: !1, accountInfo: a });
    })();
    try {
      return await cn;
    } finally {
      cn = null;
    }
  }
  (document.addEventListener("click", (t) => {
    const n = t.target instanceof Element ? t.target : null;
    if (!n) return;
    const a = n.closest("[data-console-stat-tip]");
    if (a instanceof HTMLButtonElement) {
      (t.preventDefault(), y(a));
      return;
    }
    if (
      (n.closest(".consoleStatInfo") || f(),
      n.closest("[data-onboarding-account-logout]"))
    ) {
      (t.preventDefault(), Xc());
      return;
    }
    const d = n.closest("[data-onboarding-account-trigger]");
    if (d) {
      (t.preventDefault(), Jc(d.closest("[data-onboarding-account]")));
      return;
    }
    if (
      (n.closest("[data-onboarding-account]") || bn(),
      n.closest("[data-login-retry]"))
    ) {
      (t.preventDefault(), nc());
      return;
    }
    if (n.closest("[data-login-full-logout]")) {
      (t.preventDefault(), dc());
      return;
    }
    const u = n.closest("[data-onboarding-entry]");
    if (u) {
      if (
        u.hasAttribute("data-subscription-entry") &&
        (t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
      )
        return;
      const G = u.getAttribute("data-onboarding-mode") || "start",
        rt = u.getAttribute("data-onboarding-product") || "";
      (sa(rt),
        r.selectedProduct,
        u.tagName,
        u instanceof HTMLAnchorElement && u.href,
        u.textContent?.trim(),
        r.isLoggedIn,
        t.preventDefault(),
        fr(G));
      return;
    }
    const m = n.closest('a[href="javascript:void(0)"].pillPrimary');
    if (
      (m &&
        (m.textContent?.trim(),
        m.hasAttribute("data-onboarding-entry"),
        void 0),
      n.closest("[data-onboarding-close]"))
    ) {
      pr();
      return;
    }
    if (n.closest("[data-open-agent-modal]")) {
      Od();
      return;
    }
    if (n.closest("[data-close-agent-modal]")) {
      vn();
      return;
    }
    if (n.closest("[data-access-mode-back]")) {
      pi();
      return;
    }
    if (n.closest("[data-wizard-access-back]")) {
      ee("products", { replaceRoute: !0 });
      return;
    }
    const S = n.closest("[data-wizard-access-mode]");
    if (S) {
      if (S.getAttribute("data-wizard-access-mode") === "agent") {
        const rt = r.selectedProduct;
        (ee("products", { replaceRoute: !0 }), fi([rt]), mi("agent"));
      }
      return;
    }
    const T = n.closest("[data-access-mode]");
    if (T) {
      mi(T.getAttribute("data-access-mode"));
      return;
    }
    if (n.closest("[data-vibe-pay-choice]")) {
      if (r.pipelineStarting) return;
      ui() ? ee("console", { replaceRoute: i }) : bc();
      return;
    }
    if (n.closest("[data-close-vibe-pay-dialog]")) {
      rr();
      return;
    }
    const R = n.closest("[data-product-choice]");
    if (R) {
      rr();
      const G = R.getAttribute("data-product-choice");
      Ni(G, { showAccessMode: !0 });
      return;
    }
    const O = n.closest("[data-identity-option]");
    if (O) {
      (t.preventDefault(),
        ed(
          O.getAttribute("data-identity-key") ||
            O.getAttribute("data-identity-option") ||
            "private",
        ));
      return;
    }
    if (n.closest("[data-identity-enter-personal]")) {
      (t.preventDefault(), aa("private"));
      return;
    }
    if (n.closest("[data-identity-enter-enterprise]")) {
      (t.preventDefault(), aa("corporate"));
      return;
    }
    const v = n.closest("[data-identity-register-enterprise]");
    if (v) {
      (t.preventDefault(), nd(v.getAttribute("href")));
      return;
    }
    if (n.closest("[data-qualification-certified]")) {
      pd();
      return;
    }
    if (n.closest("[data-qualification-return-home]")) {
      window.location.assign(we("/"));
      return;
    }
    if (n.closest("[data-qualification-back-products]")) {
      (At(), b(), et());
      return;
    }
    if (n.closest("[data-product-list-retry]")) {
      (At(), b(), bi({ force: !0 }));
      return;
    }
    const F = n.closest("[data-console-nav]");
    if (F) {
      ((Me =
        F.getAttribute("data-console-nav") === "services"
          ? "services"
          : "products"),
        Ie(),
        Me === "products" && Ai(),
        Me === "services" && ut());
      return;
    }
    if (n.closest("[data-console-products-retry]")) {
      Ai({ force: !0 });
      return;
    }
    if (n.closest("[data-console-services-retry]")) {
      ut({ force: !0 });
      return;
    }
    if (n.closest("[data-console-service-search]")) {
      hi();
      return;
    }
    if (n.closest("[data-console-service-reset]")) {
      (($n = ""),
        (Yn = "ALL"),
        (ot = 1),
        (r.registeredServicesLoaded = !1),
        Ie(),
        ut({ force: !0 }));
      return;
    }
    const W = n.closest("[data-console-service-page]");
    if (W) {
      const G = Number(W.getAttribute("data-console-service-page"));
      Number.isFinite(G) &&
        G > 0 &&
        G !== ot &&
        ((ot = G), (r.registeredServicesLoaded = !1), ut({ force: !0 }));
      return;
    }
    const z = n.closest("[data-console-service-view]");
    if (z) {
      qc(z.getAttribute("data-console-service-view"));
      return;
    }
    const ae = n.closest("[data-console-service-edit-id]");
    if (ae) {
      Jo(ae.getAttribute("data-console-service-edit-id"));
      return;
    }
    if (n.closest("[data-console-service-edit]")) {
      Ye?.serviceId && Jo(Ye.serviceId);
      return;
    }
    if (n.closest("[data-console-create-service]")) {
      Vc();
      return;
    }
    if (n.closest("[data-console-cancel-service]")) {
      Qo();
      return;
    }
    if (n.closest("[data-product-refresh]")) {
      Bi();
      return;
    }
    if (n.closest("[data-enterprise-product-retry]")) {
      Be(lt()?.nodeId, { silent: !1 });
      return;
    }
    const j = n.closest("[data-open-blocker-node]");
    if (j) {
      (t.preventDefault(),
        _t(j.getAttribute("data-open-blocker-node")).then((G) => {
          G || ft(j.getAttribute("data-open-blocker-step"));
        }));
      return;
    }
    const Q = n.closest("[data-complete-blocker-node]");
    if (Q) {
      wd(Q.getAttribute("data-complete-blocker-node"));
      return;
    }
    if (n.closest("[data-reload-services]")) {
      Ei({ force: !0 });
      return;
    }
    if (n.closest("[data-verify-trade-submit]")) {
      hd();
      return;
    }
    const K = n.closest("[data-submit-current-node]");
    if (K) {
      Ui(null, r.currentStep).then((G) => {
        G || ft(K.getAttribute("data-next-step") || r.currentStep);
      });
      return;
    }
    const nt = n.closest("[data-set-step]");
    if (nt) {
      ft(nt.getAttribute("data-set-step"));
      return;
    }
    const se = n.closest("[data-wizard-step]");
    if (se) {
      const G = se.getAttribute("data-pipeline-node-id");
      if (G) {
        _t(G);
        return;
      }
      ft(se.getAttribute("data-wizard-step"));
      return;
    }
    const he = n.closest("[data-copy-text]");
    if (he) {
      Md(he.getAttribute("data-copy-text") || "");
      return;
    }
    if (n.closest("[data-existing-new]")) {
      (t.preventDefault(),
        vt({
          productParam: r.routeProductParam,
          returnPanel: "products",
          forceIdentitySelection: !0,
        }).then((G) => {
          G && ee("products");
        }));
      return;
    }
    if (n.closest("[data-existing-resume]")) {
      Li();
      return;
    }
    if (n.closest("[data-product-retry]")) {
      Fi({ isManual: !0 });
      return;
    }
    if (n.closest("[data-product-reopen]")) {
      Fi({ isManual: !0 });
      return;
    }
    if (n.closest("[data-register-new-service]")) {
      ((r.hasService = !1),
        (r.selectedServiceId = ""),
        (r.serviceRechooseMode = !1),
        (r.serviceRegisterMode = r.registeredServices?.length
          ? "create"
          : "createOnly"),
        Tn("SERVICE_REGISTER"),
        b(),
        B());
      return;
    }
    if (n.closest("[data-rechoose-service]")) {
      bd();
      return;
    }
    if (n.closest("[data-cancel-register-service]")) {
      ((r.serviceRegisterMode = r.registeredServices?.length
        ? "list"
        : "create"),
        (r.selectedServiceId = ""),
        (r.serviceRechooseMode = !0),
        b(),
        Pe("wizard"),
        B());
      return;
    }
    if (n.closest("[data-cancel-service-detail]")) {
      ((r.serviceRegisterMode = r.registeredServices?.length
        ? "list"
        : "create"),
        (r.selectedServiceId = ""),
        (r.serviceRechooseMode = !0),
        b(),
        B());
      return;
    }
    const Nn = n.closest("[data-view-service-detail]");
    if (Nn) {
      zc(Nn.getAttribute("data-service-id") || "");
      return;
    }
    const Yt = n.closest("[data-use-existing-service]");
    if (Yt) {
      const G = Yt.getAttribute("data-service-id") || r.selectedServiceId;
      if (!G) {
        h("请先选择服务");
        return;
      }
      ((r.selectedServiceId = G),
        (r.serviceRegisterMode = "reuse"),
        (r.hasService = !0),
        Cd(G).then((rt) => {
          rt || ((r.currentStep = "keys"), b(), B(), h("已选择复用服务"));
        }));
      return;
    }
    if (n.closest("[data-finish-onboarding]")) {
      if (Pc()) {
        h("请先完成前置工作");
        return;
      }
      Ui(null, "verify");
      return;
    }
    if (n.closest("[data-open-console-services]")) {
      (t.preventDefault(),
        (Me = "services"),
        i ? ee("console") : nr("console"));
      return;
    }
    if (n.closest("[data-open-console]")) {
      i ? ee("console") : nr("console");
      return;
    }
    if (n.closest("[data-start-new-flow]")) {
      (t.preventDefault(),
        At(),
        b(),
        vt({
          productParam: r.routeProductParam,
          returnPanel: "products",
          forceIdentitySelection: !0,
        }).then((G) => {
          G && ee("products");
        }));
      return;
    }
  }),
    e.addEventListener("input", (t) => {
      const n = t.target instanceof HTMLInputElement ? t.target : null;
      n?.matches("[data-identity-search]") && ((te = n.value || ""), pt());
    }),
    e.addEventListener("pointerover", (t) => {
      const a = (t.target instanceof Element ? t.target : null)?.closest(
        "[data-console-stat-tip]",
      );
      a instanceof HTMLButtonElement && g(a);
    }),
    e.addEventListener("pointerout", (t) => {
      const a = (t.target instanceof Element ? t.target : null)?.closest(
        ".consoleStatInfo",
      );
      if (!(a instanceof HTMLElement)) return;
      const s = t.relatedTarget instanceof Node ? t.relatedTarget : null;
      if (s && a.contains(s)) return;
      const d = a.querySelector("[data-console-stat-tip]");
      d instanceof HTMLButtonElement && I(d);
    }),
    e.addEventListener("focusin", (t) => {
      const a = (t.target instanceof Element ? t.target : null)?.closest(
        "[data-console-stat-tip]",
      );
      a instanceof HTMLButtonElement && g(a);
    }),
    e.addEventListener("focusout", (t) => {
      const a = (t.target instanceof Element ? t.target : null)?.closest(
        ".consoleStatInfo",
      );
      if (!(a instanceof HTMLElement)) return;
      const s = t.relatedTarget instanceof Node ? t.relatedTarget : null;
      if (s && a.contains(s)) return;
      const d = a.querySelector("[data-console-stat-tip]");
      d instanceof HTMLButtonElement && I(d);
    }),
    window.addEventListener(Fs, (t) => {
      (Jt("product.submit"), Ad(t.detail || {}));
    }),
    window.addEventListener("aipay-enterprise-product-open:status", (t) => {
      const n = t.detail || {};
      n.subjectKey || H(r.pipelineView)
        ? ((Xe += 1),
          Gt(),
          Ee(),
          un(() => ha(n)).finally(() => {
            ((Xe -= 1), Gt(), Ee());
          }))
        : ha(n);
    }),
    window.addEventListener(Bs, (t) => {
      let n = vi(t.detail?.node).toUpperCase();
      if (t.detail?.subjectKey || H(r.pipelineView)) {
        if (
          !de(t.detail, r) ||
          (n === Xt ? (n = lt()?.nodeId) : n === re && (n = Ue()?.nodeId),
          !V(r.pipelineView, n))
        )
          return;
      } else if (![Xt, re].includes(n)) return;
      _t(n);
    }),
    window.addEventListener(Vs, (t) => {
      Bi(t.detail || {});
    }),
    window.addEventListener(qs, (t) => {
      Jt("product.reopen");
      const n = t.detail || {};
      Fi({ isManual: n.isManual === !0 }).then(n.resolve, n.reject);
    }),
    window.addEventListener(ks, (t) => {
      if (t.detail?.subjectKey || H(r.pipelineView)) {
        if (!de(t.detail, r)) return;
        const n = _i(r.pipelineView, r.pipelineCurrentNodeId);
        n && _t(n.nodeId);
        return;
      }
      (Jt("product.skip"), _d());
    }),
    window.addEventListener(zs, (t) => {
      (Jt("keys.createApp"), Nd(t.detail || {}));
    }),
    window.addEventListener(js, (t) => {
      (Jt("keys.approveApp"), Rd(t.detail || {}, t.detail?.appType));
    }),
    window.addEventListener(Ks, (t) => {
      (Jt("keys.reopen"), Ld(t.detail || {}));
    }),
    e.querySelector("[data-service-form]")?.addEventListener("submit", (t) => {
      (t.preventDefault(),
        Ea(t.currentTarget) &&
          Ui(t.currentTarget, "service").then((n) => {
            n ||
              ((r.hasService = !0),
              (r.currentStep = "keys"),
              b(),
              Pe("wizard"),
              B(),
              h("服务注册已提交"));
          }));
    }),
    e.querySelector("[data-service-form]")?.addEventListener("input", (t) => {
      const n = t.target;
      (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) &&
        xi(n);
    }),
    e
      .querySelector("[data-console-service-form]")
      ?.addEventListener("submit", (t) => {
        (t.preventDefault(), Hc(t.currentTarget));
      }),
    e
      .querySelector("[data-console-service-form]")
      ?.addEventListener("input", (t) => {
        const n = t.target;
        if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) {
          if (
            (n.name === "pricing" && (n.value = Sa(n.value)),
            n.matches("[data-console-service-description]"))
          ) {
            const a = e.querySelector(
              "[data-console-service-description-count]",
            );
            a instanceof HTMLElement &&
              (a.textContent = `${Array.from(n.value).length}/500`);
          }
          $t(n, yr(n));
        }
      }),
    e
      .querySelector("[data-console-service-keyword]")
      ?.addEventListener("keydown", (t) => {
        t.key === "Enter" && (t.preventDefault(), hi());
      }),
    e
      .querySelector("[data-console-service-status-filter]")
      ?.addEventListener("change", () => {
        hi();
      }),
    e.querySelector("[data-verify-trade-no]")?.addEventListener("input", () => {
      (Nt(""), Di());
    }),
    e
      .querySelector("[data-service-description]")
      ?.addEventListener("input", (t) => {
        const n = t.currentTarget,
          a = e.querySelector("[data-service-description-count]");
        n instanceof HTMLTextAreaElement &&
          a instanceof HTMLElement &&
          (xi(n),
          (a.textContent = `${Array.from(n.value).length}/500`),
          $t(n, yr(n)),
          Mi(n.name),
          ga());
      }),
    e
      .querySelectorAll(
        '[name="serviceName"], [name="resourceUrl"], [name="pricing"], [name="schemaUrl"], [name="schema_url"]',
      )
      .forEach((t) => {
        t.addEventListener("input", (n) => {
          const a = n.currentTarget;
          (a instanceof HTMLInputElement || a instanceof HTMLTextAreaElement) &&
            (xi(a),
            a.name === "pricing" && (a.value = Sa(a.value)),
            $t(a, yr(a)),
            Mi(a.name),
            ga());
        });
      }),
    e.querySelectorAll("[data-tech-tab]").forEach((t) => {
      t.addEventListener("click", () => {
        const n = t.getAttribute("data-tech-tab");
        (e.querySelectorAll("[data-tech-tab]").forEach((a) => {
          a.classList.toggle("isActive", a === t);
        }),
          e.querySelectorAll("[data-tech-panel]").forEach((a) => {
            a.hidden = a.getAttribute("data-tech-panel") !== n;
          }));
      });
    }),
    document.addEventListener("keydown", (t) => {
      if (t.key === "Escape") {
        if (e.querySelector("[data-vibe-pay-dialog][open]")) {
          (t.preventDefault(), rr());
          return;
        }
        if (e.querySelector(".consoleStatInfo.isOpen")) {
          f();
          return;
        }
        if (Et) {
          Qo();
          return;
        }
        bn();
        const n = e.querySelector("[data-agent-modal]");
        if (n instanceof HTMLElement && !n.hidden) {
          vn();
          return;
        }
        pr();
      }
    }),
    window.addEventListener(
      "popstate",
      () => {
        if ((Rr(window.location.pathname), i)) {
          si({ replaceRoute: !0 }).then((t) => {
            t || (ur(), vn());
          });
          return;
        }
        Sn({ replaceRoute: !0 }) || (ur(), vn());
      },
      !0,
    ),
    (window.AIPayOnboarding = {
      open: () => fr("start"),
      openProduct: (t) => id(t),
      openLogin: (t) => gr(t),
      openConsole: () => fr("console"),
      reset: () => {
        ((r = { ...wr }), Jn(), In(), b(), fn(), ze(), pr());
      },
    }),
    Pl((t, n) => {
      if (Kc(t)) {
        (console.warn("[Pipeline实例不存在]", {
          traceId: t.traceId,
          code: t.code,
          subCode: t.subCode,
          subMsg: t.subMsg,
          request: n.url,
        }),
          $c(t));
        return;
      }
      xs(t) &&
        (console.warn("[登录失效]", {
          traceId: t.traceId,
          errorCode: t.errorCode,
          errorMsg: t.errorMsg,
          request: n.url,
        }),
        lr());
    }),
    window.addEventListener("aipay:login-expired", (t) => {
      if (!Fp(t.detail)) return;
      const { traceId: n, errorCode: a, errorMsg: s } = t.detail || {};
      (console.warn("[全局登录失效事件]", {
        traceId: n,
        errorCode: a,
        errorMsg: s,
      }),
        lr());
    }),
    window.addEventListener(Rn, () => {
      (ve() && !r.isLoggedIn) || Xn();
    }),
    window.addEventListener("aipay-onboarding-switch-account", () => {
      od();
    }));
  const Ca = () => {
    document.hidden ||
      Xn({ force: !0 }).then((t) => {
        t?.isLoggedIn && ve() && _n({ source: "visibility-sync" });
      });
  };
  (window.addEventListener("focus", Ca),
    document.addEventListener("visibilitychange", Ca),
    Gd(e, Zs, ic),
    $d(e, () => Er({ source: "post-message" })),
    Lo());
  const Vi = Yd();
  if ((i && Vi && !Mo() && Oo(ke()), Vi === "success"))
    (ni({ syncRoute: !1, preserveCurrentPanel: !0, skipBackendCheck: !0 }),
      Vt("syncing", { message: "正在同步登录状态..." }),
      Zr(),
      Er({ source: "return-url", silentFailure: !0 }));
  else if (Vi === "logout") {
    const t = cc();
    (Ro(),
      fc(),
      Ct(),
      b(),
      ze(),
      (i || t) &&
        ni({ syncRoute: !1, preserveCurrentPanel: !0, skipBackendCheck: !0 }));
  } else (fn(), ze(), pc() || (si(), i || Xn()));
})();
const Wp = Object.freeze(
  Object.defineProperty({ __proto__: null }, Symbol.toStringTag, {
    value: "Module",
  }),
);
export { Wp as o, su as p };
