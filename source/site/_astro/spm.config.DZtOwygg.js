const s = "a5486",
  b = [
    { path: "/", title: "AI支付官网首页", spmb: "b217651" },
    { path: "/products", title: "产品总览页", spmb: "b217652" },
    {
      path: "/products/vibe-pay",
      title: "Vibe Pay AI应用收款产品页",
      spmb: "b244788",
    },
    {
      path: "/products/token-pay",
      title: "Token Pay AI连续订阅产品页",
      spmb: "b217653",
    },
    {
      path: "/products/machine-pay",
      title: "Machine Pay AI按量付费产品页",
      spmb: "b217654",
    },
    { path: "/products/agent-pay", title: "Agent支付产品页", spmb: "b217655" },
    {
      path: "/products/pc-agent-pay",
      title: "办公智能体支付产品页",
      spmb: "b244789",
    },
    {
      path: "/products/mobile-agent-pay",
      title: "移动智能体支付产品页",
      spmb: "b244790",
    },
    {
      path: "/act/apass",
      title: "APASS 智能体可信身份基础设施",
      spmb: "b243958",
    },
    {
      path: "/products/device-agent-pay",
      title: "设备智能体支付产品页",
      spmb: "b244791",
    },
    {
      path: "/developers/skill",
      title: "开发者Skill工具箱页",
      spmb: "b217659",
    },
    { path: "/developers/blog", title: "开发者Blog列表页", spmb: "b217660" },
    {
      path: "/developers/blog/hzdah6lxiq8lqdkn",
      title: "Blog-Agent商业化之路",
      spmb: "b217661",
    },
    {
      path: "/developers/blog/siukmtkg8ihkyf9a",
      title: "Blog-什么是AI支付",
      spmb: "b217662",
    },
    {
      path: "/developers/blog/agent-economy-payment",
      title: "Blog-智能体经济时代的商业与支付",
      spmb: "b217663",
    },
    {
      path: "/article",
      match: "prefix",
      title: "Article详情页",
      spmb: "b217663",
    },
    {
      path: "/developers/blog/qeomsdwsur9ca0f6",
      title: "Blog-从碰一下到AI付：商家的AI经营新机会",
      spmb: "b221979",
    },
    {
      path: "/developers/blog/gecmiv6v1q10i3pw",
      title: "Blog-支付宝AI付Agent友好开发者体验实践",
      spmb: "b235787",
    },
    {
      path: "/developers/blog/aobp1nhgr7wsp4w9",
      title: "Blog-Alipay-PIBench给开发者的三条建议",
      spmb: "b235788",
    },
    {
      path: "/developers/benchmark",
      title: "开发者Benchmark页",
      spmb: "b230531",
    },
    { path: "/developers/changelog", title: "产品更新日志页", spmb: "b217664" },
    { path: "/incentive", title: "开发者激励计划页", spmb: "b217665" },
    {
      path: "/incentive/token-models",
      title: "Token包支持模型页",
      spmb: "b217665",
    },
    {
      path: "/incentive-mobile",
      title: "开发者激励计划移动页",
      spmb: "b231780",
    },
    {
      path: "/incentive-mobile/signup",
      title: "开发者激励计划移动报名页",
      spmb: "b231781",
    },
    { path: "/incentive-progress", title: "开发者激励进度页", spmb: "b217666" },
    {
      path: "/incentive-progress/202607",
      title: "开发者激励计划第2期结果页",
      spmb: "b217666",
    },
    { path: "/about", title: "关于我们页", spmb: "b217667" },
    { path: "/open-flow", title: "业务开通流程页", spmb: "b217668" },
    {
      path: "/open-flow/products",
      title: "业务开通流程-产品选择页",
      spmb: "b217838",
    },
    {
      path: "/open-flow/console",
      title: "业务开通流程-接入控制台页",
      spmb: "b217839",
    },
    {
      path: "/open-flow/tech",
      title: "业务开通流程-技术集成页",
      spmb: "b217840",
    },
    {
      path: "/open-flow/product",
      title: "业务开通流程-产品开通页",
      spmb: "b217841",
    },
    {
      path: "/open-flow/service",
      title: "业务开通流程-服务注册页",
      spmb: "b217842",
    },
    {
      path: "/open-flow/keys",
      title: "业务开通流程-密钥配置页",
      spmb: "b217843",
    },
    {
      path: "/open-flow/app-auth",
      title: "业务开通流程-订阅应用授权页",
      spmb: "",
    },
    {
      path: "/open-flow/verify",
      title: "业务开通流程-线上验证页",
      spmb: "b217844",
    },
    {
      path: "/open-flow/success",
      title: "业务开通流程-接入成功页",
      spmb: "b217845",
    },
    { path: "/cli-auth", title: "CLI授权二维码页", spmb: "b217669" },
    { path: "/public-key-confirm", title: "公钥确认二维码页", spmb: "b217670" },
    { path: "/wallet-guide", title: "Agent支付用户指南页", spmb: "b217671" },
    {
      path: "/merchant-guide",
      title: "已有支付服务接入智能体指南页",
      spmb: "b217672",
    },
    {
      path: "/docs",
      match: "prefix",
      title: "开发者文档页",
      spmb: "b217675",
      extParamCode: "doc_path",
    },
    { path: "/merchant-intent", title: "商户意向登记页", spmb: "b248448" },
    {
      path: "/vibe-pay-intent/creator",
      title: "Vibe Pay创作者意向登记页",
      spmb: "b248448",
    },
    {
      path: "/vibe-pay-intent/platform",
      title: "Vibe Pay平台合作意向登记页",
      spmb: "b248448",
    },
    { path: "/community", title: "AI付社区", spmb: "b263257" },
    {
      path: "/community/events/payathon-2026",
      title: "黑客松活动首页",
      spmb: "b253930",
    },
    {
      path: "/community/events/payathon-2026/me",
      title: "黑客松参赛概览",
      spmb: "b253931",
    },
    {
      path: "/community/events/payathon-2026/me/registration",
      title: "黑客松报名资料",
      spmb: "b253932",
    },
    {
      path: "/community/events/payathon-2026/me/works",
      title: "黑客松作品列表",
      spmb: "b253933",
    },
    {
      path: "/community/events/payathon-2026/me/works/new",
      title: "黑客松创建作品",
      spmb: "b253934",
    },
    {
      path: "/community/events/payathon-2026/me/works/detail",
      title: "黑客松作品详情",
      spmb: "b253935",
    },
    {
      path: "/community/events/payathon-2026/me/works/edit",
      title: "黑客松编辑作品",
      spmb: "b253936",
    },
    {
      path: "/community/events/payathon-2026/me/benefits",
      title: "黑客松参赛权益",
      spmb: "b253937",
    },
  ];
function i(p) {
  const t = String(p || "/").split(/[?#]/u, 1)[0] || "/";
  return t === "/" ? t : t.replace(/\/+$/u, "") || "/";
}
function l(p) {
  const t = i(p),
    a = b.find((e) => e.match !== "prefix" && e.path === t);
  return (
    a ||
    b.find(
      (e) =>
        e.match === "prefix" && (t === e.path || t.startsWith(`${e.path}/`)),
    )
  );
}
export { s as S, i as n, l as r };
