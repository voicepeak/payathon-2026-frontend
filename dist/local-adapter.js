/* Local study adapter. The captured visual/interaction modules live in assets/site/. */
(() => {
  'use strict';
  const eventRoot = '/community/events/payathon-2026';
  const nativeFetch = window.fetch.bind(window);
  if (!new URLSearchParams(location.search).has('preview')) {
    const previewURL = new URL(location.href);
    previewURL.searchParams.set('preview', '1');
    history.replaceState(null, '', previewURL.href);
  }
  const diagnostics = { errors: [], blockedRequests: [], startedAt: new Date().toISOString() };
  window.__LOCAL_PREVIEW__ = { source: 'https://aipay.alipay.com/community/events/payathon-2026', diagnostics };
  window.__aipayMonitorContext = {
    setAccountInfo() {}, getDeviceInfo: () => ({}),
    getMonitorConfig: () => ({}), isMobile: () => /Android|iPhone|iPad/i.test(navigator.userAgent),
  };
  window.fetch = async (input, options) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, location.href);
    if (url.origin === location.origin && !url.pathname.startsWith('/api/')) return nativeFetch(input, options);
    diagnostics.blockedRequests.push(url.origin + url.pathname);
    return new Response(JSON.stringify({success:false,errorCode:'LOCAL_PREVIEW_ONLY',errorMsg:'本地预览未连接官方服务，请使用页面内的独立预览模式。'}),{status:503,headers:{'Content-Type':'application/json'}});
  };
  addEventListener('error', e => diagnostics.errors.push({message:e.message,source:e.filename,line:e.lineno}));
  addEventListener('unhandledrejection', e => diagnostics.errors.push({message:String(e.reason?.stack || e.reason)}));
  document.addEventListener('click', e => {
    const a = e.target.closest?.('a[href]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.origin === location.origin && url.pathname.startsWith(eventRoot)) {
      url.searchParams.set('preview','1'); a.href = url.href;
    } else if (url.origin === location.origin && !a.getAttribute('href').startsWith('#') && !url.pathname.startsWith('/assets/')) {
      a.href = 'https://aipay.alipay.com' + url.pathname + url.search + url.hash;
      a.target = '_blank'; a.rel = 'noopener noreferrer';
    }
  }, true);
  // This only reports to the local development server, when it is running.
  if (['localhost', '127.0.0.1', '::1'].includes(location.hostname)) setTimeout(() => nativeFetch('/__local_diagnostics', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify({...diagnostics,url:location.href,resources:performance.getEntriesByType('resource').map(r=>r.name)}),
  }).catch(()=>{}), 12000);
})();
