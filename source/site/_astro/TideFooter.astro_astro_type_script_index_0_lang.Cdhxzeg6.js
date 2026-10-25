function $(i, M) {
  const e = i.getContext("webgl", {
    alpha: !1,
    antialias: !1,
    depth: !1,
    stencil: !1,
  });
  if (!e) return null;
  let a,
    v,
    b,
    s,
    x = !1,
    c = new Float32Array(0),
    l = 0;
  const y = document.createElement("canvas");
  ((y.width = 256), (y.height = 64));
  const h = y.getContext("2d");
  ((h.font = "600 28px 'Courier New', monospace"),
    (h.textBaseline = "top"),
    (h.fillStyle = "#fff"),
    ["≈", "~", "·"].forEach((f, A) => h.fillText(f, A * 64 + 16, 8)));
  const U = () => {
    const f = (p, X) => {
        const w = e.createShader(p);
        if (
          (e.shaderSource(w, X),
          e.compileShader(w),
          !e.getShaderParameter(w, e.COMPILE_STATUS))
        ) {
          const L = e.getShaderInfoLog(w);
          throw (e.deleteShader(w), new Error(L));
        }
        return w;
      },
      A = f(
        e.VERTEX_SHADER,
        `attribute vec4 position;attribute vec4 effect;
      uniform vec2 viewport;uniform float dpr;uniform float time;
      varying vec3 tint;varying float opacity;varying float glyph;
      uniform vec3 accent;
      float swell(float x,float y,float clock,float offset){
        float cycle=clock+offset;
        float progress=fract(cycle);
        float bend=.065*sin(x*.007+time*.38+offset*9.)+.028*sin(x*.019-time*.23);
        float front=1.24-1.6*progress+bend;
        float distance=y-front;
        float width=distance<0.?.035:.105;
        float crest=exp(-pow(distance/width,2.));
        float wake=.26*exp(-pow((distance-.14)/.13,2.));
        float envelope=smoothstep(0.,.12,progress)*(1.-smoothstep(.84,1.,progress));
        float strength=.72+.2*sin(floor(cycle)*2.39+offset*5.);
        float patches=.78+.22*sin(x*.011+time*.44+sin(x*.004-time*.2));
        return (crest+wake)*envelope*strength*patches;
      }
      void main(){
        gl_Position=vec4(position.x/viewport.x*2.-1.,1.-position.y/viewport.y*2.,0.,1.);
        gl_PointSize=32.*dpr;glyph=effect.x;
        float y=position.z/viewport.y;
        float wave=swell(effect.z,y,time*.13+.035*sin(time*.65),.16);
        wave+=.48*swell(effect.z,y,time*.157+.026*sin(time*.51),.63);
        wave=min(wave,.92);
        float edge=40.+22.*sin(effect.z*.009-time*.45)+12.*sin(effect.z*.017+time*.3);
        float fade=smoothstep(edge,edge+32.,position.z);
        float active=max(wave*.72,effect.y*.98)*fade;
        float base=.18*fade*(1.-active);opacity=active+base;
        tint=(vec3(.466667,.505882,.560784)*base+accent*active)/max(opacity,.00001);
      }`,
      ),
      m = f(
        e.FRAGMENT_SHADER,
        `precision mediump float;uniform sampler2D atlas;
      varying vec3 tint;varying float opacity;varying float glyph;
      void main(){float ink=texture2D(atlas,vec2((gl_PointCoord.x+glyph)/4.,gl_PointCoord.y)).a;gl_FragColor=vec4(tint,opacity*ink);}`,
      );
    if (
      ((a = e.createProgram()),
      e.attachShader(a, A),
      e.attachShader(a, m),
      e.linkProgram(a),
      e.deleteShader(A),
      e.deleteShader(m),
      !e.getProgramParameter(a, e.LINK_STATUS))
    )
      throw new Error(e.getProgramInfoLog(a));
    ((v = e.createBuffer()),
      (b = e.createTexture()),
      e.bindTexture(e.TEXTURE_2D, b),
      e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, y));
    for (const p of [e.TEXTURE_MIN_FILTER, e.TEXTURE_MAG_FILTER])
      e.texParameteri(e.TEXTURE_2D, p, e.LINEAR);
    for (const p of [e.TEXTURE_WRAP_S, e.TEXTURE_WRAP_T])
      e.texParameteri(e.TEXTURE_2D, p, e.CLAMP_TO_EDGE);
    s = {};
    for (const p of ["viewport", "dpr", "time", "accent", "atlas"])
      s[p] = e.getUniformLocation(a, p);
    ((s.position = e.getAttribLocation(a, "position")),
      (s.effect = e.getAttribLocation(a, "effect")),
      e.bindBuffer(e.ARRAY_BUFFER, v),
      e.bufferData(e.ARRAY_BUFFER, c.byteLength, e.DYNAMIC_DRAW),
      (i.dataset.renderer = "webgl"));
  };
  U();
  const C = (f) => {
      (f.preventDefault(), (x = !0));
    },
    _ = () => {
      ((x = !1), U(), M());
    };
  return (
    i.addEventListener("webglcontextlost", C),
    i.addEventListener("webglcontextrestored", _),
    {
      resize(f) {
        ((l = f.length),
          c.length !== l * 8 &&
            ((c = new Float32Array(l * 8)),
            x ||
              (e.bindBuffer(e.ARRAY_BUFFER, v),
              e.bufferData(e.ARRAY_BUFFER, c.byteLength, e.DYNAMIC_DRAW))));
      },
      draw(f, A, m, p, X, w) {
        if (!(x || !A || !m)) {
          for (let L = 0; L < l; L++) {
            const R = f[L],
              T = L * 8;
            ((c[T] = R.x + 8),
              (c[T + 1] = R.y + 12),
              (c[T + 2] = R.homeY),
              (c[T + 3] = R.curve),
              (c[T + 4] = R.glyph),
              (c[T + 5] = R.energy),
              (c[T + 6] = R.homeX));
          }
          (e.viewport(0, 0, i.width, i.height),
            e.clearColor(16 / 255, 20 / 255, 27 / 255, 1),
            e.clear(e.COLOR_BUFFER_BIT),
            e.useProgram(a),
            e.bindBuffer(e.ARRAY_BUFFER, v),
            e.bufferSubData(e.ARRAY_BUFFER, 0, c),
            e.enableVertexAttribArray(s.position),
            e.vertexAttribPointer(s.position, 4, e.FLOAT, !1, 32, 0),
            e.enableVertexAttribArray(s.effect),
            e.vertexAttribPointer(s.effect, 4, e.FLOAT, !1, 32, 16),
            e.activeTexture(e.TEXTURE0),
            e.bindTexture(e.TEXTURE_2D, b),
            e.uniform1i(s.atlas, 0),
            e.uniform2f(s.viewport, A, m),
            e.uniform1f(s.dpr, p),
            e.uniform1f(s.time, X),
            e.uniform3fv(s.accent, w),
            e.enable(e.BLEND),
            e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA),
            e.drawArrays(e.POINTS, 0, l));
        }
      },
      dispose() {
        (i.removeEventListener("webglcontextlost", C),
          i.removeEventListener("webglcontextrestored", _),
          e.deleteBuffer(v),
          e.deleteTexture(b),
          e.deleteProgram(a));
      },
    }
  );
}
let N;
function O() {
  N?.();
  const i = document.querySelector("[data-tide-footer]");
  if (!i) return;
  const M = i.querySelector("canvas"),
    e = $(M, () => {
      (q(), D());
    }),
    a = e ? null : M.getContext("2d", { alpha: !1 });
  if (!e && !a) return;
  a && (M.dataset.renderer = "canvas2d");
  const v = matchMedia("(prefers-reduced-motion:reduce)"),
    b = document.createElement("canvas");
  ((b.width = 64), (b.height = 48));
  const s = b.getContext("2d");
  let x = 0,
    c = 0,
    l = 0,
    y = 0,
    h = 0,
    U = !1,
    C = !1,
    _ = null,
    f = 1,
    A = [0.5255, 0.9176, 1];
  const m = [];
  let p = [];
  const X = () => {
      const o = i.getBoundingClientRect();
      p = [...i.querySelectorAll("[data-tide-logo] path")].map((t) => {
        const n = t.getBBox(),
          r = t.ownerSVGElement,
          g = r.getBoundingClientRect(),
          B = g.width / r.viewBox.baseVal.width,
          I = g.height / r.viewBox.baseVal.height;
        return {
          left: g.left - o.left + n.x * B - 14,
          right: g.left - o.left + (n.x + n.width) * B + 14,
          top: g.top - o.top + n.y * I - 16,
          bottom: g.top - o.top + (n.y + n.height) * I + 16,
        };
      });
    },
    w = (o) => {
      if (v.matches || o.pointerType === "touch") return;
      const t = i.getBoundingClientRect();
      _ = { x: o.clientX - t.left, y: o.clientY - t.top };
    },
    L = () => {
      _ = null;
    },
    R = (o, t, n) => {
      const r = Math.max(0, Math.min(1, (n - o) / (t - o)));
      return r * r * (3 - 2 * r);
    },
    T = (o, t, n, r) => {
      const g = n + r,
        B = g - Math.floor(g),
        I =
          0.065 * Math.sin(o * 0.007 + l * 0.38 + r * 9) +
          0.028 * Math.sin(o * 0.019 - l * 0.23),
        d = t - (1.24 - 1.6 * B + I),
        S = d < 0 ? 0.035 : 0.105,
        u = Math.exp(-Math.pow(d / S, 2)),
        E = 0.26 * Math.exp(-Math.pow((d - 0.14) / 0.13, 2)),
        F = R(0, 0.12, B) * (1 - R(0.84, 1, B)),
        P = 0.72 + 0.2 * Math.sin(Math.floor(g) * 2.39 + r * 5),
        Y =
          0.78 +
          0.22 * Math.sin(o * 0.011 + l * 0.44 + Math.sin(o * 0.004 - l * 0.2));
      return (u + E) * F * P * Y;
    },
    k = (o = 0) => {
      a && ((a.fillStyle = "#10141b"), a.fillRect(0, 0, y, h));
      for (const t of m) {
        if (o)
          if (
            ((t.vx += (t.homeX - t.x) * 35 * o),
            (t.vy += (t.homeY - t.y) * 35 * o),
            (t.vx *= Math.exp(-o * 8)),
            (t.vy *= Math.exp(-o * 8)),
            (t.x += t.vx * o),
            (t.y += t.vy * o),
            (t.energy *= Math.exp(-o * 9)),
            _)
          ) {
            const d = t.x - _.x,
              S = t.y - _.y,
              u = Math.hypot(d, S);
            if (u < 60) {
              const E = 60 - u,
                F = u > 0.01 ? d / u : 1,
                P = u > 0.01 ? S / u : 0;
              ((t.x += F * E),
                (t.y += P * E),
                (t.vx += F * E * 3),
                (t.vy += P * E * 3),
                t.armed && E > 1 && ((t.energy = 1), (t.armed = !1)),
                (t.quiet = 0));
            } else ((t.quiet += o), t.quiet > 0.25 && (t.armed = !0));
          } else ((t.quiet += o), t.quiet > 0.25 && (t.armed = !0));
        for (const d of p) {
          const S = t.x + 8,
            u = t.y + 7;
          if (S <= d.left || S >= d.right || u <= d.top || u >= d.bottom)
            continue;
          const E = S - d.left,
            F = d.right - S,
            P = u - d.top,
            Y = d.bottom - u,
            z = Math.min(E, F, P, Y);
          z === E
            ? ((t.x -= E), (t.vx = Math.min(0, t.vx)))
            : z === F
              ? ((t.x += F), (t.vx = Math.max(0, t.vx)))
              : z === P
                ? ((t.y -= P), (t.vy = Math.min(0, t.vy)))
                : ((t.y += Y), (t.vy = Math.max(0, t.vy)));
        }
        if (e) continue;
        const n =
            40 +
            22 * Math.sin(t.homeX * 0.009 - l * 0.45) +
            12 * Math.sin(t.homeX * 0.017 + l * 0.3),
          r = Math.max(0, Math.min(1, (t.homeY - n) / 32)),
          g = r * r * (3 - 2 * r),
          B = Math.min(
            0.92,
            T(
              t.homeX,
              t.homeY / h,
              l * 0.13 + 0.035 * Math.sin(l * 0.65),
              0.16,
            ) +
              0.48 *
                T(
                  t.homeX,
                  t.homeY / h,
                  l * 0.157 + 0.026 * Math.sin(l * 0.51),
                  0.63,
                ),
          ),
          I = Math.max(B * 0.72, t.energy * 0.98);
        ((a.globalAlpha = 0.18 * g),
          a.drawImage(b, t.glyph * 16, 0, 16, 24, t.x, t.y, 16, 24),
          (a.globalAlpha = I * g),
          a.drawImage(b, t.glyph * 16, 24, 16, 24, t.x, t.y, 16, 24));
      }
      e ? e.draw(m, y, h, f, l, A) : (a.globalAlpha = 1);
    },
    G = (o) => {
      if (((x = 0), C || !U || document.hidden || v.matches)) return;
      const t = c ? Math.min((o - c) / 1e3, 0.05) : 0;
      ((l += t), (c = o), k(t), (x = requestAnimationFrame(G)));
    },
    D = () => {
      if (
        (cancelAnimationFrame(x),
        (x = 0),
        (c = 0),
        !U || document.hidden || v.matches)
      ) {
        _ = null;
        for (const o of m)
          ((o.x = o.homeX),
            (o.y = o.homeY),
            (o.vx = o.vy = o.energy = o.quiet = 0),
            (o.armed = !0));
      }
      !U ||
        document.hidden ||
        C ||
        (v.matches ? k() : (x = requestAnimationFrame(G)));
    },
    q = () => {
      const o = i.getBoundingClientRect();
      if (
        ((y = o.width),
        (h = o.height),
        !m.length || M.dataset.grid !== `${y}:${h}`)
      ) {
        ((m.length = 0), (M.dataset.grid = `${y}:${h}`));
        for (let n = 0; n < y; n += 16)
          for (let r = 0; r < h; r += 20)
            m.push({
              homeX: n,
              homeY: r,
              x: n,
              y: r,
              curve: Math.sin(n * 0.009) * 0.45 + Math.sin(n * 0.018) * 0.18,
              vx: 0,
              vy: 0,
              energy: 0,
              armed: !0,
              quiet: 0,
              glyph:
                (n / 16 + r / 20) % 13 === 0
                  ? 2
                  : (n / 16 + r / 20) % 4 === 0
                    ? 1
                    : 0,
            });
      }
      ((f = Math.min(devicePixelRatio || 1, 2)),
        (M.width = Math.round(y * f)),
        (M.height = Math.round(h * f)),
        a?.setTransform(f, 0, 0, f, 0, 0),
        e?.resize(m),
        X(),
        s.clearRect(0, 0, 64, 48),
        (s.font = "600 14px 'Courier New', monospace"),
        (s.textBaseline = "top"),
        (s.fillStyle = "#77818f"),
        ["≈", "~", "·"].forEach((n, r) => s.fillText(n, r * 16, 0)),
        (s.fillStyle =
          getComputedStyle(i).getPropertyValue("--payathon-accent").trim() ||
          "#86eaff"),
        ["≈", "~", "·"].forEach((n, r) => s.fillText(n, r * 16, 24)));
      const t = s.fillStyle;
      ((A = [1, 3, 5].map((n) => parseInt(t.slice(n, n + 2), 16) / 255)), k());
    },
    V = new IntersectionObserver(([o]) => {
      ((U = o.isIntersecting), D());
    });
  V.observe(i);
  const H = new ResizeObserver(q);
  H.observe(i);
  const W = new MutationObserver(q);
  (W.observe(document.body, { attributes: !0, attributeFilter: ["style"] }),
    document.addEventListener("visibilitychange", D),
    v.addEventListener("change", D),
    i.addEventListener("pointermove", w, { passive: !0 }),
    i.addEventListener("pointerleave", L),
    (N = () => {
      ((C = !0),
        cancelAnimationFrame(x),
        e?.dispose(),
        V.disconnect(),
        H.disconnect(),
        W.disconnect(),
        i.removeEventListener("pointermove", w),
        i.removeEventListener("pointerleave", L),
        document.removeEventListener("visibilitychange", D),
        v.removeEventListener("change", D));
    }));
}
O();
document.addEventListener("astro:page-load", O);
document.addEventListener("astro:before-swap", () => N?.());
window.addEventListener("pagehide", () => N?.());
window.addEventListener("pageshow", (i) => {
  i.persisted && O();
});
