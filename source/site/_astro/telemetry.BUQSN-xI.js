import { S as p } from "./spm.config.DZtOwygg.js";
import { a as k } from "./service.DJvbNf3A.js";
const m = {
    registration_open: ["click", "ca126878.da218853"],
    registration_edit: ["click", "ca126878.da218854"],
    registration_submit: ["click", "ca126878.da218855"],
    registration_form_exposure: ["expo", "ca126878"],
    work_create: ["click", "ca126879.da218859"],
    work_edit: ["click", "ca126879.da218856"],
    work_detail: ["click", "ca126879.da218857"],
    work_submit: ["click", "ca126879.da218858"],
    mobile_prompt_exposure: ["expo", "ca126880"],
    mobile_open: ["click", "ca126880.da218845"],
    mobile_cancel: ["click", "ca126880.da218844"],
    mobile_close: ["click", "ca126880.da218846"],
    benefit_bailian: ["click", "ca126881.da218847"],
    benefit_bocha: ["click", "ca126881.da218851"],
    benefit_memtensor: ["click", "ca126881.da218850"],
    benefit_miaoda: ["click", "ca126881.da218849"],
    benefit_meoo: ["click", "ca126881.da218848"],
  },
  f = new WeakSet(),
  u = new WeakMap();
function r(a, t = "", { stage: e, requestId: o, error: i } = {}) {
  if (k || i?.name === "AbortError") return;
  i?.recoveryError &&
    _("request_recovery_error", i.recoveryError, {
      stage: "result_recovery",
      requestId: o,
    });
  const n = [i, i?.cause, i?.cause?.cause].filter(Boolean),
    s = n[n.length - 1],
    l = n.filter((c) => typeof c == "object");
  if (l.some((c) => f.has(c))) return;
  const d = m[a];
  d &&
    window._to?.spmBPos &&
    window.Tracert?.call(d[0], `${p}.${window._to.spmBPos}.${d[1]}`);
  try {
    if (!window.yuyanMonitor) return;
    (window.yuyanMonitor.log({
      code: 1010,
      msg: "payathon_" + a,
      d1: location.pathname,
      d2: document.title,
      d3: a,
      d4: t,
      ...(e ? { d5: e } : {}),
      ...(o ? { c4: o } : {}),
      ...(i
        ? {
            d6: s.name || "Error",
            d7: String(i.httpStatus || i.cause?.httpStatus || ""),
            c1: String(s.message || s).slice(0, 2e3),
            c2: n
              .map((c) => c.stack)
              .filter(Boolean)
              .join(
                `
Caused by: `,
              )
              .slice(0, 8e3),
            c3: String(i.traceId || i.cause?.traceId || ""),
            c5: i.apiPath || i.cause?.apiPath || "",
          }
        : {}),
    }),
      l.forEach((c) => f.add(c)));
  } catch {}
}
function _(a, t, { stage: e = a, requestId: o } = {}) {
  r(a, String(t?.errorCode || t?.code || t?.kind || "unknown"), {
    stage: e,
    requestId: o,
    error: t,
  });
}
function g(a, t, e) {
  const o = u.get(a);
  (u.set(a, t),
    t &&
      t !== o &&
      _("field_validation_error", t, { stage: `validation:${e}` }));
}
document.addEventListener(
  "click",
  (a) => {
    if (!a.isTrusted || !(a.target instanceof Element)) return;
    const t = a.target.closest("button, a[href]");
    if (t) {
      if (t.hasAttribute("data-registration-open")) {
        const e = t.dataset.registrationTrack;
        r(
          e
            ? "work_create"
            : t.hasAttribute("data-registration-edit")
              ? "registration_edit"
              : "registration_open",
          e || "",
        );
      } else if (t.hasAttribute("data-benefit-claim"))
        r("benefit_" + t.dataset.benefitClaim);
      else if (t instanceof HTMLAnchorElement && t.origin === location.origin) {
        const e = t.pathname.match(
          /^\/community\/events\/payathon-2026\/me\/works\/(new|edit|detail)\/?$/,
        )?.[1];
        e && r(e === "new" ? "work_create" : "work_" + e);
      }
    }
  },
  !0,
);
export { r as a, g as b, _ as r };
