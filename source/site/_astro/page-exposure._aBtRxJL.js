(function () {
  const PAGE_EXPOSURE_CODE = 1001;
  const YUYAN_MONITOR_ID = "180020010001292425";
  const YUYAN_MONITOR_UMD_URL = "/assets/media/8e00b3153da65873a591.js";

  function normalizeLogText(value) {
    return String(value ?? "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 200);
  }

  function reportPageExposure(monitor) {
    if (window.__aipayOfficialPageExposureReported) return;
    if (!monitor || typeof monitor.log !== "function") return;

    window.__aipayOfficialPageExposureReported = true;
    const report = () => {
      try {
        window.yuyanMonitor.log({
          code: PAGE_EXPOSURE_CODE,
          msg: "page_exposure",
          d1: normalizeLogText(window.location.pathname || "/"),
          d2: normalizeLogText(document.title || ""),
        });
      } catch {}
    };
    window.__aipayMonitorContext.accountReady.then(report, report);
  }

  function initPageExposure() {
    if (window.__aipayOfficialPageExposureReported) return;

    if (window.yuyanMonitor && typeof window.yuyanMonitor.log === "function") {
      reportPageExposure(window.yuyanMonitor);
      return;
    }

    if (typeof window.YuyanMonitor === "function") {
      window.yuyanMonitor = new window.YuyanMonitor({
        yuyanId: YUYAN_MONITOR_ID,
        ...window.__aipayMonitorContext.getMonitorConfig(),
      });
      reportPageExposure(window.yuyanMonitor);
      return;
    }

    const script = document.createElement("script");
    script.src = YUYAN_MONITOR_UMD_URL;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if (typeof window.YuyanMonitor !== "function") return;
      window.yuyanMonitor = new window.YuyanMonitor({
        yuyanId: YUYAN_MONITOR_ID,
        ...window.__aipayMonitorContext.getMonitorConfig(),
      });
      reportPageExposure(window.yuyanMonitor);
    };
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", initPageExposure, {
    once: true,
  });
})();
