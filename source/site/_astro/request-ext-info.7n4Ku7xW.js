const c = new Set(["chinfo", "bd_vid", "sem_scene"]);
function s(o = window.location.search) {
  const e = window.__aipayMonitorContext.getDeviceInfo();
  for (const [n, t] of new URLSearchParams(o)) c.has(n) && (e[n] = t);
  return Object.keys(e).length ? e : null;
}
export { s as g };
