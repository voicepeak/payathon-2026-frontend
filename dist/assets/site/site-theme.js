/* Runs before first paint in every shell, including same-origin demos/docs. */
(() => {
  if (window.aipayTheme) { window.aipayTheme.refresh(); return; }
  const key = 'aipay-color-mode';
  let preference = 'light';
  try { preference = localStorage.getItem(key) || 'light'; } catch {}
  const valid = value => ['light', 'dark', 'system'].includes(value);
  if (!valid(preference)) preference = 'light';
  const locked = (root = document.documentElement) => root.dataset.themeLock === 'dark';
  // Campaign appearance is not a saved user choice. Legacy system preference
  // uses the site's light default; only an explicit dark choice persists.
  const resolved = (root = document.documentElement) => locked(root) || preference === 'dark' ? 'dark' : 'light';
  const colorProperties = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'fill', 'stroke'];
  let colorAnimations = [];
  const captureColors = () => {
    if (!document.body || matchMedia('(prefers-reduced-motion: reduce)').matches) return [];
    return [...document.querySelectorAll('body, body *')].filter(node => {
      const rect = node.getBoundingClientRect();
      return rect.width && rect.height && rect.bottom >= 0 && rect.top <= innerHeight;
    }).flatMap(node => {
      return [null, '::before', '::after'].flatMap(pseudo => {
        const style = getComputedStyle(node, pseudo);
        if (pseudo && (style.content === 'none' || style.content === 'normal')) return [];
        return [[node, Object.fromEntries(colorProperties.map(key => [key, style[key]])), pseudo]];
      });
    });
  };
  const refresh = () => {
    const theme = resolved();
    const changing = document.documentElement.dataset.theme && document.documentElement.dataset.theme !== theme;
    const before = changing ? captureColors() : [];
    if (changing) { colorAnimations.forEach(animation => animation.cancel()); colorAnimations = []; }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    // Separate color-only effects: never replace transform/opacity transitions
    // or stop the mascot, carousel, scroll and spring animations.
    // Resolve final colors before starting any effects. Sampling children after
    // animating parents reads inherited intermediate colors instead of targets.
    // Finish only CSS color transitions; layout, hover transforms and opacity
    // animations remain owned by their original components.
    const cssColorProperties = new Set(['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'fill', 'stroke']);
    if (before.length) {
      getComputedStyle(document.documentElement).color;
      document.getAnimations().forEach(animation => {
        if (animation instanceof CSSTransition && cssColorProperties.has(animation.transitionProperty)) animation.finish();
      });
    }
    const transitions = before.map(([node, previous, pseudo]) => {
      const style = getComputedStyle(node, pseudo), from = {}, to = {};
      for (const key of colorProperties) if (previous[key] && previous[key] !== style[key]) {
        from[key] = previous[key]; to[key] = style[key];
      }
      return { node, pseudo, from, to };
    });
    transitions.forEach(({node, pseudo, from, to}) => {
      if (Object.keys(to).length) colorAnimations.push(node.animate([from, to], {duration:400, easing:'cubic-bezier(.22,1,.36,1)', ...(pseudo ? {pseudoElement:pseudo} : {})}));
    });
    document.querySelectorAll('[data-site-theme]').forEach(control => { control.value = preference; });
    document.querySelectorAll('[data-site-theme], [data-site-theme-toggle]').forEach(control => { control.disabled = locked(); });
    document.querySelectorAll('[data-site-theme-toggle]').forEach(control => {
      control.setAttribute('aria-checked', String(theme === 'dark'));
      control.dataset.guideMessage = theme === 'dark' ? '切换为浅色模式' : '切换为深色模式';
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', theme === 'dark' ? '#151719' : '#ffffff'));
    window.dispatchEvent(new CustomEvent('aipay:theme-change', { detail: { theme, preference } }));
    document.querySelectorAll('iframe').forEach(frame => {
      try { if (frame.contentWindow?.location.origin === location.origin) frame.contentWindow.aipayTheme?.set(preference, false); } catch {}
    });
  };
  const set = (value, persist = true) => {
    if (!valid(value) || (persist && locked())) return;
    preference = value;
    if (persist) { try { localStorage.setItem(key, value); } catch {} }
    refresh();
  };
  window.aipayTheme = { set, refresh, get preference() { return preference; } };
  document.addEventListener('click', event => {
    const control = event.target instanceof Element ? event.target.closest('[data-site-theme-toggle]') : null;
    if (!control || locked()) return;
    set(resolved() === 'dark' ? 'light' : 'dark');
    document.dispatchEvent(new CustomEvent('aipay:guide-feedback', { detail: {
      target: control, message: resolved() === 'dark' ? '已切换为深色模式' : '已切换为浅色模式',
    } }));
  });
  document.addEventListener('change', event => {
    if (event.target instanceof HTMLSelectElement && event.target.matches('[data-site-theme]')) set(event.target.value);
  });
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) set(event.newValue || 'light', false); });
  document.addEventListener('DOMContentLoaded', refresh, { once: true });
  document.addEventListener('astro:page-load', refresh);
  document.addEventListener('astro:before-swap', event => {
    const root = event.newDocument.documentElement, theme = resolved(root);
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  });
  window.addEventListener('pageshow', refresh);
  try { if (parent !== window && parent.location.origin === location.origin && parent.aipayTheme) preference = parent.aipayTheme.preference; } catch {}
  refresh();
})();
