const t = Object.freeze({
    WECHAT_OFFICIAL_ACCOUNT: "微信公众号",
    XIAOHONGSHU: "小红书",
    ALIPAY_AI_PAY_OFFICIAL: "AI 付官网",
    DEVELOPER_COMMUNITY: "开发者社区",
    COMMUNITY_GROUP: "社群",
    PARTNER: "合作方",
    OTHER: "其他",
  }),
  O = Object.freeze(Object.values(t)),
  A = 3;
function n(e) {
  return Array.isArray(e)
    ? e.length > A
      ? `信息来源最多选择 ${A} 项`
      : new Set(e).size !== e.length
        ? "信息来源不能重复选择"
        : e.some((r) => !O.includes(r))
          ? "请选择有效的信息来源"
          : ""
    : "请选择有效的信息来源";
}
export { A as M, t as S, n as s };
