(function initAipaySpm() {
  if (!window._to || !window._to.spmAPos || !window._to.spmBPos) {
    return;
  }

  window._to.mdata = Object.assign(
    {},
    window._to.mdata,
    window.__aipayMonitorContext.getDeviceInfo(),
    { isMobile: String(window.__aipayMonitorContext.isMobile) },
  );

  if (!window.Tracert) {
    var Tracert = {
      _isInit: true,
      _readyToRun: [],
      _guid: function _guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0;
            var v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          },
        );
      },
      get: function get(key) {
        if (key === "pageId") {
          window._tracert_loader_cfg = window._tracert_loader_cfg || {};
          if (window._tracert_loader_cfg.pageId) {
            return window._tracert_loader_cfg.pageId;
          }

          var meta = document.querySelector("meta[name=data-aspm]");
          var spma =
            (meta && meta.getAttribute("content")) || window._to.spmAPos;
          var spmb =
            (document.body && document.body.getAttribute("data-aspm")) ||
            window._to.spmBPos;
          var pageId =
            spma && spmb
              ? spma + "." + spmb + "_" + Tracert._guid() + "_" + Date.now()
              : "-_" + Tracert._guid() + "_" + Date.now();

          window._tracert_loader_cfg.pageId = pageId;
          return pageId;
        }

        return this[key];
      },
      call: function call() {
        var args = arguments;
        var argsList;
        try {
          argsList = [].slice.call(args, 0);
        } catch (error) {
          argsList = [];
          for (var i = 0; i < args.length; i++) {
            argsList.push(args[i]);
          }
        }

        Tracert.addToRun(function () {
          Tracert.call.apply(Tracert, argsList);
        });
      },
      addToRun: function addToRun(fn) {
        if (typeof fn === "function") {
          fn._logTimer = new Date() - 0;
          Tracert._readyToRun.push(fn);
        }
      },
      createTracert: undefined,
      spmAPos: undefined,
      autoLogPv: undefined,
      autoExpo: undefined,
      bizType: undefined,
      ifRouterNeedPv: undefined,
      enableMicroAppInstance: undefined,
      v: undefined,
    };
    var methodNames = [
      "config",
      "logPv",
      "info",
      "error",
      "click",
      "expo",
      "pageName",
      "pageState",
      "time",
      "timeEnd",
      "parse",
      "expoCheck",
      "stringify",
      "report",
      "set",
      "before",
    ];

    for (var methodIndex = 0; methodIndex < methodNames.length; methodIndex++) {
      (function registerMethod(methodName) {
        Tracert[methodName] = function () {
          var args = arguments;
          var argsList;
          try {
            argsList = [].slice.call(args, 0);
          } catch (error) {
            argsList = [];
            for (var i = 0; i < args.length; i++) {
              argsList.push(args[i]);
            }
          }

          argsList.unshift(methodName);
          Tracert.addToRun(function () {
            Tracert.call.apply(Tracert, argsList);
          });
        };
      })(methodNames[methodIndex]);
    }

    if (window.Proxy) {
      window.Tracert = new window.Proxy(Tracert, {
        get: function get(target, property) {
          if (
            target !== null &&
            Object.prototype.hasOwnProperty.call(target, property)
          ) {
            return target[property];
          }
          return target.call.bind(this, property);
        },
      });
    } else {
      window.Tracert = Tracert;
    }
  }

  // The real SDK consumes window._to when replacing this loader stub. Queuing the
  // same set call would make a pathName update look like an extra SPA navigation.
  if (window.Tracert._isInit !== true) {
    window.Tracert.call("set", window._to);
    window.Tracert.call(
      "pageName",
      window.__aipaySpmPageName || document.title,
    );
  }

  if (!document.querySelector("script[data-aipay-tracert]")) {
    var script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src =
      window.__aipayTracertScriptUrl ||
      "https://ur.alipay.com/tracert_" + window._to.spmAPos + ".js";
    script.setAttribute("data-aipay-tracert", "");
    document.head.appendChild(script);
  }
})();
