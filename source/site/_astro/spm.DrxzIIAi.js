const d = "aipay:onboarding-state",
  o = {
    AI_SUBSCRIPTION: {
      name: "AI订阅",
      desc: "为 AI 产品提供订阅收款能力",
      icon: "is-metered",
      docs: "/products/token-pay",
      group: "receive",
    },
    web: {
      name: "AI网页应用收款",
      desc: "支持PC/H5多端收款，适用于电商、内容付费等场景",
      icon: "is-web",
      docs: "/products/machine-pay",
      group: "receive",
    },
    online: {
      name: "AI移动应用收款",
      desc: "支持APP收款，适用于电商、内容付费等场景",
      icon: "is-app",
      docs: "/products/token-pay",
      group: "receive",
    },
    metered: {
      name: "按量付费",
      desc: "基于用量的灵活计费，适用于 API 服务商、MCP Tool 提供者、Skill 开发者",
      icon: "is-metered",
      docs: "/products/machine-pay",
      group: "receive",
    },
    "traditional-supply-skill": {
      name: "传统供给Skill变现",
      desc: "让 APP、小程序、网站等传统商品供给可以被 Agent 调用并收款",
      icon: "is-skill",
      docs: "/products/device-agent-pay",
      group: "receive",
    },
    agent: {
      name: "Agent支付",
      desc: "专为本地、云端智能体设计的支付解决方案，让智能体在 PC 端、手机端都能实现一键下单支付",
      icon: "is-agent",
      docs: "https://aipay.alipay.com/products/agent-pay",
      group: "payment",
    },
  },
  r = ["tech", "product", "service", "keys", "app-auth", "verify", "success"],
  l = {
    isLoggedIn: !1,
    userInfo: {},
    identityContext: null,
    selectedSubjectType: "USER",
    selectedSubjectId: "",
    identitySelectionPending: !1,
    hasOnboarded: !1,
    selectedProduct: "metered",
    currentStep: "tech",
    productStatus: "idle",
    hasService: !1,
    selectedServiceId: "",
    serviceRegisterMode: "",
    registeredServices: [],
    registeredServicesLoaded: !1,
    registeredServicesLoading: !1,
    registeredServicesError: "",
    serviceDetailLoadingId: "",
    serviceDetailError: "",
    serviceSubmittingId: "",
    serviceRechooseMode: !1,
    serviceRejectedFieldEdits: {},
    serviceReview: "pass",
    hasApp: !1,
    keyReady: !1,
    pipelineInstanceId: "",
    pipelineView: null,
    pipelineCurrentNodeId: "",
    pipelineCurrentForm: null,
    nodeFormDrafts: {},
    productOpenFormLoading: !1,
    productOpenFormError: "",
    pipelineError: "",
    pipelineStarting: !1,
    inTransitPipeline: null,
    accountRegistrationInTransit: null,
    qualificationBlocker: null,
    routeReturnPath: "/",
  },
  c = {
    navigation: {
      code: "c514177",
      name: "社区导航",
      actions: {
        home: ["d786047", "社区导航-社区首页"],
        events: ["d786052", "社区导航-活动"],
        articles: ["d786048", "社区导航-文章"],
        questions: ["d786049", "社区导航-问答"],
        mine: ["d786053", "社区导航-我的"],
        create: ["d786051", "社区导航-发布"],
        login: ["d786046", "社区导航-登录"],
        logout: ["d786050", "社区导航-退出登录"],
      },
    },
    banner: {
      code: "c514175",
      name: "社区推荐",
      actions: {
        payathon: ["d786054", "社区推荐-黑客松活动"],
        incentive: ["d786055", "社区推荐-开发者激励计划"],
      },
    },
    events: { code: "c514189", name: "社区活动栏目" },
    articles: { code: "c514190", name: "社区文章栏目" },
    questions: { code: "c514188", name: "社区问答栏目" },
    list: {
      code: "c514173",
      name: "社区内容列表",
      actions: {
        activity: ["d786062", "社区内容列表-查看活动"],
        article: ["d786060", "社区内容列表-查看文章"],
        question: ["d786061", "社区内容列表-查看问题"],
        filter: ["d786063", "社区内容列表-筛选活动"],
        publishArticle: ["d786057", "社区内容列表-发布文章"],
        publishQuestion: ["d786059", "社区内容列表-我要提问"],
        page: ["d786056", "社区内容列表-翻页"],
        answers: ["d786058", "社区内容列表-展开或收起回答"],
      },
    },
    interaction: {
      code: "c514174",
      name: "社区内容互动",
      actions: {
        like: ["d786064", "社区内容互动-点赞或取消点赞"],
        share: ["d786069", "社区内容互动-分享"],
        reply: ["d786073", "社区内容互动-回复"],
        answer: ["d786068", "社区内容互动-写回答"],
        replies: ["d786067", "社区内容互动-展开或收起回复"],
        detail: ["d786072", "社区内容互动-查看回答详情"],
        registration: ["d786070", "社区内容互动-站内活动报名"],
        externalRegistration: ["d786071", "社区内容互动-站外活动报名"],
        activityPage: ["d786066", "社区内容互动-前往活动专题"],
        activityQr: ["d786065", "社区内容互动-查看直播二维码"],
      },
    },
    editor: {
      code: "c514179",
      name: "社区发布与报名",
      actions: {
        article: ["d786074", "社区发布与报名-提交文章"],
        question: ["d786078", "社区发布与报名-提交问题"],
        answer: ["d786077", "社区发布与报名-提交回答"],
        comment: ["d786080", "社区发布与报名-提交评论回复"],
        profile: ["d786079", "社区发布与报名-保存资料"],
        registration: ["d786076", "社区发布与报名-提交报名"],
        delete: ["d786075", "社区发布与报名-确认删除"],
      },
    },
    mine: {
      code: "c514176",
      name: "社区个人内容",
      actions: {
        profile: ["d786082", "社区个人内容-编辑资料"],
        qa: ["d786085", "社区个人内容-我的问答"],
        articles: ["d786081", "社区个人内容-我的文章"],
        activities: ["d786083", "社区个人内容-我的活动"],
        scope: ["d786089", "社区个人内容-筛选问答"],
        detail: ["d786084", "社区个人内容-查看内容"],
        review: ["d786088", "社区个人内容-查看审核状态"],
        edit: ["d786087", "社区个人内容-编辑内容"],
        delete: ["d786086", "社区个人内容-删除内容"],
      },
    },
    share: {
      code: "c514178",
      name: "社区分享面板",
      actions: {
        save: ["d786090", "社区分享面板-保存图片"],
        copy: ["d786091", "社区分享面板-复制链接"],
      },
    },
    mobileLogin: {
      code: "c514180",
      name: "社区移动登录引导",
      actions: {
        open: ["d786092", "社区移动登录引导-打开支付宝"],
        cancel: ["d786093", "社区移动登录引导-继续网页登录"],
      },
    },
  };
function s(t, e = "") {
  const i = c[t];
  if (!e)
    return {
      "data-aspm": i.code,
      "data-aspm-desc": i.name,
      "data-aspm-expo": "true",
    };
  const [a, n] = i.actions[e];
  return { "data-aspm-click": i.code + "." + a, "data-aspm-desc": n };
}
function p(t, e) {
  return Object.entries(s(t, e))
    .map(([i, a]) => i + '="' + a + '"')
    .join(" ");
}
function u(t) {
  for (const e of t.querySelectorAll("[data-aspm-expo]"))
    window.Tracert?.call("expoCheck", e);
}
export { l as D, o as P, d as S, r as a, p as c, u as r };
