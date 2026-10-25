const P = "I1080300001000161570",
  a = [
    {
      businessProductCode: P,
      name: "订阅",
      description: "用于管理用户订阅，提供发起订阅、取消订阅、升级订阅等能力。",
      required: !0,
    },
    {
      businessProductCode: "I1080300001000066811",
      name: "商家扣款",
      description: "按照用户授权，在约定周期内扣款。",
      required: !0,
    },
    {
      businessProductCode: "I1080300001000041203",
      name: "电脑网站支付",
      appType: "PC",
      description: "用户在电脑网站付款，资金即时到账。",
    },
    {
      businessProductCode: "I1080300001000041313",
      name: "APP支付",
      appType: "APP",
      description: "商家 APP 接入支付宝，调起支付宝完成支付。",
    },
  ],
  l = { NONE: "未开通", UN_VALID: "审核中", VALID: "已开通" };
function O(e, t = []) {
  const n = Array.isArray(e) ? e : String(e || "").split(",");
  if (n.some((s) => !a.some((r) => r.businessProductCode === s)))
    throw new Error("产品选择无效，请重新选择");
  if (a.some((s) => s.required && !n.includes(s.businessProductCode)))
    throw new Error("订阅和商家扣款为必选产品");
  if (
    !a.some((s) => !s.required && [...n, ...t].includes(s.businessProductCode))
  )
    throw new Error("请至少选择 APP支付或电脑网站支付");
  return a
    .filter((s) => n.includes(s.businessProductCode))
    .map((s) => s.businessProductCode)
    .join(",");
}
function L(e, t) {
  if (!Array.isArray(e)) throw new Error("产品开通状态加载失败，请重试");
  return a.map((n) => {
    const s = e.filter((o) => o.businessProductCode === n.businessProductCode),
      r = s[0]?.contractStatus;
    if (s.length !== 1 || !Object.hasOwn(l, r))
      throw new Error(`${n.name}的开通状态未能确认，请重试`);
    const i = !!(n.required || r !== "NONE");
    return {
      ...n,
      contractStatus: r,
      locked: i,
      selected:
        r !== "UN_VALID" &&
        (i || (t ? t.includes(n.businessProductCode) : !!n.defaultSelected)),
    };
  });
}
function w(e, t = "") {
  return E(e, t).message;
}
function E(e = [], t = "") {
  const n = e.find((i) => i.businessProductCode === P),
    s = e.find((i) => i.businessProductCode === "I1080300001000066811");
  if (n?.contractStatus === "VALID" && s?.contractStatus !== "VALID")
    return {
      kind: "abnormal",
      message:
        "订阅已开通，但商家扣款尚未开通或仍在开通中，暂不能操作，请联系支持人员处理。",
    };
  const r = a.filter(
    (i) =>
      i.required &&
      e.some(
        (o) =>
          o.businessProductCode === i.businessProductCode &&
          o.contractStatus === "UN_VALID",
      ),
  );
  return r.length
    ? {
        kind: "pending",
        message: `${r.map((i) => i.name).join("、")}正在开通中，请等待开通完成。`,
      }
    : n?.contractStatus === "VALID" && s?.contractStatus === "VALID"
      ? { kind: "opened", message: "" }
      : ["WAITING_RESULT", "PROCESSING"].includes(t)
        ? { kind: "pending", message: "产品正在开通中，请等待开通完成。" }
        : { kind: "normal", message: "" };
}
function k(e) {
  return a
    .filter(
      (t) =>
        t.appType &&
        e.some(
          (n) =>
            n.businessProductCode === t.businessProductCode &&
            ["VALID", "UN_VALID"].includes(n.contractStatus),
        ),
    )
    .map((t) => t.appType)
    .join(",");
}
function T(e, t = [], n = []) {
  const s = [...t, ...n],
    i = O(e, s).split(","),
    o = i.filter((c) => !s.includes(c));
  if (o.length === 0) throw new Error("所选产品均已开通，请刷新状态");
  return {
    subscription_apply_product: o.join(","),
    subscription_product_open_app_types: a
      .filter((c) => c.appType && [...i, ...s].includes(c.businessProductCode))
      .map((c) => c.appType)
      .join(","),
  };
}
const _ = "AI_SUBSCRIPTION",
  N = { enterprisePipeline: !0, enterpriseRegistration: !1 },
  G = "aipay-subscription:update",
  m = "aipay-subscription:action",
  K =
    "通过 npx alipay-subscription-skill@latest 安装支付宝订阅接入 skill，加载 alipay-subscription 技能告诉我怎么接入订阅",
  p = {
    SUBSCRIPTION_ACCOUNT_REGISTER_PRODUCT_OPEN_PLUGIN: "product",
    SUBSCRIPTION_KEY_CONFIG_PLUGIN: "keys",
    SUBSCRIPTION_APP_KEY_CONFIG_PLUGIN: "app-key",
    SUBSCRIPTION_WEB_KEY_CONFIG_PLUGIN: "web-key",
    SUBSCRIPTION_APP_AUTH_APPLY_PLUGIN: "app-auth",
    SUBSCRIPTION_TECH_INTEGRATION_PLUGIN: "tech",
    SUBSCRIPTION_ONLINE_VERIFY_PLUGIN: "verify",
  },
  b = {
    SUBSCRIPTION_ACCOUNT_REGISTER_PRODUCT_OPEN: "product",
    SUBSCRIPTION_KEY_CONFIG: "keys",
    SUBSCRIPTION_APP_AUTH_APPLY: "app-auth",
    SUBSCRIPTION_TECH_INTEGRATION: "tech",
    SUBSCRIPTION_ONLINE_VERIFY: "verify",
  },
  f = {
    subscriptionAccountRegisterProductOpen: "product",
    subscriptionAppAuthApply: "app-auth",
    subscriptionTechIntegration: "tech",
    subscriptionOnlineVerify: "verify",
  };
function u(e, t) {
  const n = typeof e == "string" ? { nodeId: e } : e;
  if (!n) return "";
  const s = t?.renderGraph?.nodes?.find((i) => i.nodeId === n.nodeId),
    r =
      p[n.pluginCode || s?.pluginCode] ||
      f[n.formKey || s?.formKey] ||
      b[n.nodeId] ||
      p[n.nodeId] ||
      "";
  return (
    r ||
    (y(t) &&
    (n.nodeId === "KEY_CONFIG" ||
      (n.formKey || s?.formKey) === "keyConfig" ||
      (n.pluginCode || s?.pluginCode) === "KEY_CONFIG_PLUGIN")
      ? "keys"
      : "")
  );
}
function y(e) {
  return e?.productCode === _ || !!e?.renderGraph?.nodes?.some((t) => u(t));
}
function V(e, t) {
  return ["keys", "app-key", "web-key"].includes(u(e, t));
}
function R(e, t) {
  const n = u(e, t);
  if (!["keys", "app-key", "web-key"].includes(n)) return "";
  const s = e?.displayData?.appType;
  return s === "APP" || s === "PC"
    ? s
    : n === "app-key"
      ? "APP"
      : n === "web-key"
        ? "PC"
        : "";
}
function F(e, t, n) {
  return u(e, n) === "product" && e?.displayData?.productOpenBlocker
    ? e.displayData.productOpenBlocker
    : u(e, n) !== "product" ||
        t?.trim() ||
        !(e?.nodeStatus
          ? e.nodeStatus === "FAILED"
          : e?.flowStatus === "FAILED")
      ? ""
      : [
          e?.displayData?.productOpenBizTips,
          e?.failMsg,
          e?.fail_msg,
          ...(e?.blockers || []).map((r) => r.message),
          e?.displayData?.productOpenErrorMessage,
        ].find((r) => typeof r == "string" && r.trim()) ||
        "产品开通失败，请联系支持人员处理。";
}
function U(e) {
  return (e?.blockers || []).filter(
    (t) =>
      !(
        e.viewState === "COMPLETED" &&
        e.nodeStatus === "SUCCESS" &&
        t.code === e.nodeId
      ),
  );
}
function M(e, t) {
  if (u(e, t) !== "keys") return "";
  const n = t?.renderGraph?.nodes?.find((r) => u(r, t) === "product");
  if (
    n?.nodeStatus !== "SUCCESS" &&
    !(n && !n.nodeStatus && n.flowStatus === "COMPLETED")
  )
    return "请先完成账号开通，再配置应用密钥。";
  const s = U(e);
  return s.length
    ? s
        .map((r) => r.message)
        .filter(Boolean)
        .join("；") || "当前节点暂不可操作，请刷新状态。"
    : R(e, t)
      ? ""
      : "应用类型尚未就绪，请刷新状态后继续。";
}
function j(e, t) {
  const n = typeof e == "string" ? e : e?.nodeId;
  return (
    ["PRODUCT_OPEN", "ACCOUNT_REGISTER_PRODUCT_OPEN"].includes(n) ||
    u(e, t) === "product"
  );
}
function Y(e, t) {
  return (
    (typeof e == "string" ? e : e?.nodeId) ===
      "ACCOUNT_REGISTER_PRODUCT_OPEN" || u(e, t) === "product"
  );
}
function d(e, t = "SUBMIT") {
  return e?.actions?.find((n) => n.actionType === t) || null;
}
function I(e, t = "SUBMIT") {
  const n = d(e, t);
  return e?.viewState === "EDITABLE" && (n?.raw || n)?.enabled === !0;
}
function A(e, t) {
  const n = t?.renderGraph?.nodes?.find((i) => i.nodeId === e?.nodeId),
    s = d(e, "REOPEN") || d(n, "REOPEN");
  if (u(e, t) !== "app-auth" || e?.viewState !== "COMPLETED")
    return { enabled: !1, disabledReason: "当前授权节点尚未完成。" };
  if (t?.status === "SUCCESS")
    return {
      enabled: !1,
      disabledReason: "接入流程已完成，无法重新开启授权。",
    };
  const r = (s?.raw || s)?.enabled === !0;
  return {
    enabled: r,
    disabledReason: r
      ? ""
      : s?.disabledReason || "当前节点未开放重新开启授权。",
  };
}
function S(e, t) {
  if (e == null || e === "") return [];
  let n = e;
  if (typeof e == "string")
    try {
      n = JSON.parse(e);
    } catch {
      throw new Error(`${t}加载失败，请刷新后重试`);
    }
  if (!Array.isArray(n)) throw new Error(`${t}加载失败，请刷新后重试`);
  return n;
}
function D(e) {
  return {
    apps: S(e?.displayData?.apps, "应用列表"),
    agreements: S(e?.displayData?.agreements, "授权协议"),
  };
}
function g(e, t) {
  return e?.viewState === "EDITABLE" && t?.canAuth === !0;
}
function H(e, t, n, s = "") {
  const r = u(t, e.view),
    i = {
      instanceId: e.instanceId,
      nodeId: t?.nodeId,
      actionType: "SUBMIT",
      ...N,
      strictCode: !0,
      formData: {},
      payload: {},
    };
  if (!i.instanceId || !i.nodeId)
    throw new Error("接入流程尚未就绪，请刷新后重试");
  if (
    r === "product" &&
    [
      "RETURN_TO_PRODUCT_SELECTION",
      "SAVE_PRODUCT_SELECTION",
      "REOPEN_PRODUCT_SELECTION",
    ].includes(n)
  ) {
    const o = E(e.products, t.nodeStatus);
    if (o.kind !== "normal" || t.displayData?.productOpenBlocker)
      throw new Error(
        o.message ||
          t.displayData?.productOpenBlocker ||
          "产品已开通，请刷新状态",
      );
  }
  if (r === "product" && n === "RETURN_TO_PRODUCT_SELECTION")
    i.actionType = "REOPEN";
  else if (
    r === "product" &&
    ["SAVE_PRODUCT_SELECTION", "REOPEN_PRODUCT_SELECTION"].includes(n)
  ) {
    const o = n === "REOPEN_PRODUCT_SELECTION";
    if (t.viewState !== "EDITABLE")
      throw new Error("当前产品选择不可编辑，请刷新状态");
    ((i.actionType = o ? "REOPEN" : "SAVE_DRAFT"),
      (i.formData = {
        ...t.formData,
        ...T(s.selectedCodes, s.openedProductCodes, s.reviewingProductCodes),
      }));
  } else if (r === "app-auth" && n === "REOPEN_AUTHORIZATION") {
    const o = A(t, e.view);
    if (!o.enabled) throw new Error(o.disabledReason);
    i.actionType = "REOPEN";
  } else if (r === "app-auth" && n === "EXECUTE_AUTH") {
    const { apps: o } = D(t),
      c = o.find((C) => C.appId === s);
    if (!g(t, c)) throw new Error("当前应用不可授权，请刷新状态");
    i.payload = { action: n, appId: String(c.appId) };
  } else if (["app-auth", "tech"].includes(r) && n === "FINISH_NODE") {
    if (!I(t)) throw new Error("请先完成当前节点要求");
    i.payload = { action: n };
  } else if (r === "verify" && n === "VERIFY") {
    if (!I(t)) throw new Error("请先完成前置步骤");
    const o = String(s).trim();
    if (!o) throw new Error("请输入订阅号");
    i.formData = { subscriptionId: o };
  } else throw new Error("当前节点不支持此操作");
  return i;
}
function h(e) {
  if (typeof e != "string" || !e.trim()) return "";
  try {
    const t = new URL(e, "https://aipay.alipay.com");
    return ["https:", "http:"].includes(t.protocol) ? e : "";
  } catch {
    return "";
  }
}
function q(e) {
  const t = {
    NOT_FOUND: "订阅 ID 不正确，请检查后重试。",
    SUBSCRIPTION_NOT_FOUND_OR_OWNER_MISMATCH: "订阅 ID 不正确，请检查后重试。",
    SUBSCRIPTION_STATUS_NOT_READY: "订阅状态尚未就绪，请完成订阅流程后重试。",
    SUBSCRIPTION_APP_AUTH_APPLY_NOT_COMPLETED: "请先完成至少一个应用的授权。",
  };
  return (
    t[e?.resultCode || e?.raw?.resultCode] ||
    t[e?.subCode] ||
    e?.message ||
    "操作失败，请重试"
  );
}
function z(e, t) {
  return (
    h(t) ||
    `https://${e === "prod" ? "b" : "b-pre"}.alipay.com/page/checkout-management/subscription-test/list`
  );
}
function B(e) {
  return {
    instanceId: e.pipelineInstanceId || e.pipelineView?.instanceId || "",
    nodeId: e.pipelineCurrentNodeId || "",
    subjectKey: JSON.stringify([
      e.userInfo?.userId || "",
      e.selectedSubjectType,
      e.selectedSubjectId,
      e.identityContext?.masterPid || e.identityContext?.merchantPid || "",
    ]),
  };
}
function $(e, t, { matchNode: n = !0 } = {}) {
  const s = B(t);
  return (
    !!(e?.instanceId && e.subjectKey) &&
    e.instanceId === s.instanceId &&
    e.subjectKey === s.subjectKey &&
    (!n || e.nodeId === s.nodeId)
  );
}
function W() {
  let e = Promise.resolve();
  return (t) => {
    const n = e.then(t);
    return ((e = n.catch(() => {})), n);
  };
}
export {
  B as A,
  R as B,
  F as C,
  N as D,
  _ as E,
  G as S,
  g as a,
  A as b,
  I as c,
  U as d,
  K as e,
  z as f,
  d as g,
  m as h,
  q as i,
  w as j,
  L as k,
  l,
  O as m,
  E as n,
  k as o,
  D as p,
  j as q,
  y as r,
  h as s,
  u as t,
  Y as u,
  V as v,
  M as w,
  W as x,
  $ as y,
  H as z,
};
