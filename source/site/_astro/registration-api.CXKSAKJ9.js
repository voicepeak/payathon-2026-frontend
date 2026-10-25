import { b as w } from "./openbridge-env.DInZk9-t.js";
const E = "/community/events/alipay_aipay_hackathon_2026",
  O = 15e3,
  g = {
    icon: "WORK_ICON",
    image: "WORK_PRODUCT_IMAGE",
    file: "WORK_ATTACHMENT",
  };
class c extends Error {
  constructor(
    l,
    {
      kind: h,
      httpStatus: d,
      result: s,
      uncertain: a = !1,
      cause: u,
      apiPath: t,
    } = {},
  ) {
    (super(l),
      (this.name = "RegistrationApiError"),
      (this.kind = h),
      (this.httpStatus = d),
      (this.errorCode = s?.errorCode),
      (this.errorMsg = s?.errorMsg),
      (this.traceId = s?.traceId),
      (this.isLoginExpired = String(this.errorCode ?? "") === "006"),
      (this.uncertain = a),
      (this.cause = u),
      (this.apiPath = t));
  }
}
function b({
  fetchImpl: T = (...s) => globalThis.fetch(...s),
  buildRequest: l = w,
  routeOptions: h = {},
  timeoutMs: d = O,
} = {}) {
  async function s(t, { method: o = "GET", body: n, json: f = !1 } = {}) {
    const { url: A, headers: m } = l(E + t, {
        ...h,
        headers: {
          Accept: "application/json",
          ...(f ? { "Content-Type": "application/json" } : {}),
        },
      }),
      p = new AbortController(),
      R = setTimeout(() => p.abort(), d);
    try {
      const e = await T(A, {
        method: o,
        headers: m,
        credentials: "include",
        cache: "no-store",
        signal: p.signal,
        ...(n === void 0 ? {} : { body: n }),
      });
      let r;
      try {
        r = JSON.parse(await e.text());
      } catch (i) {
        throw p.signal.aborted ||
          i?.name === "AbortError" ||
          !(i instanceof SyntaxError)
          ? i
          : new c("服务响应无法确认，请重新查询参赛状态。", {
              kind: e.ok ? "protocol" : "http",
              httpStatus: e.status,
              uncertain: !0,
              cause: i,
            });
      }
      if (!e.ok)
        throw new c(
          r?.errorMsg || `请求失败（HTTP ${e.status}），请重新查询参赛状态。`,
          { kind: "http", httpStatus: e.status, result: r, uncertain: !0 },
        );
      if (
        !r ||
        typeof r != "object" ||
        Array.isArray(r) ||
        typeof r.success != "boolean"
      )
        throw new c("服务响应无法确认，请重新查询参赛状态。", {
          kind: "protocol",
          httpStatus: e.status,
          result: r,
          uncertain: !0,
        });
      if (r.success !== !0) {
        const i =
          r.errorCode === "COMMUNITY_OPERATION_TOO_FREQUENT"
            ? "操作频繁，请稍后重试，当前填写内容已保留。"
            : r.errorMsg || "参赛服务暂不可用，请稍后重试。";
        throw new c(i, {
          kind: "business",
          httpStatus: e.status,
          result: r,
          uncertain: r.errorCode === "SYSTEM_ERROR",
        });
      }
      return r.data;
    } catch (e) {
      if (e instanceof c) throw ((e.apiPath = t), e);
      const r = p.signal.aborted || e?.name === "AbortError";
      throw new c(
        r
          ? "请求超时，结果尚未确认，请重新查询参赛状态。"
          : "网络连接中断，结果尚未确认，请重新查询参赛状态。",
        {
          kind: r ? "timeout" : "network",
          uncertain: !0,
          cause: e,
          apiPath: t,
        },
      );
    } finally {
      clearTimeout(R);
    }
  }
  const a = (t, o) =>
      s(t, { method: "POST", json: !0, body: JSON.stringify(o) }),
    u = (t, o) => {
      const n = new FormData();
      return (
        n.append("materialType", t),
        n.append("file", o),
        s("/files/upload.json", { method: "POST", body: n })
      );
    };
  return {
    getCurrentRegistration: () => s("/signup/current.json"),
    submitRegistration: (t) => a("/signup/submit.json", t),
    uploadSignupAvatar: (t) => u("SIGNUP_AVATAR", t),
    getSignupFileUrl: (t, o) =>
      a("/files/access-url.json", {
        businessType: "SIGNUP",
        versionNo: t,
        fileId: o,
      }),
    getWorks: (t = "ALL") =>
      s("/participation.json?trackCode=" + encodeURIComponent(t)),
    getWork: (t) => s("/works/" + encodeURIComponent(t) + "/detail.json"),
    submitWork: (t) => a("/works/submit.json", t),
    uploadWorkAsset(t, { kind: o } = {}) {
      if (!Object.hasOwn(g, o)) throw new TypeError("不支持的作品材料类型。");
      return u(g[o], t);
    },
    getWorkFileUrl: (t, o, n) =>
      a("/files/access-url.json", {
        businessType: "WORK",
        workId: t,
        versionNo: o,
        fileId: n,
      }),
  };
}
export {
  E as REGISTRATION_API_BASE,
  c as RegistrationApiError,
  b as createRegistrationApi,
};
