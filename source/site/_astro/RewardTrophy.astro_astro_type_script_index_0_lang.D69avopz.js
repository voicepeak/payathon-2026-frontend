import { r as k } from "./telemetry.BUQSN-xI.js";
function W() {
  const d = [],
    e = (l, o, t) => {
      const r = o.map((c, f) => c - l[f]),
        s = t.map((c, f) => c - l[f]),
        i = [
          r[1] * s[2] - r[2] * s[1],
          r[2] * s[0] - r[0] * s[2],
          r[0] * s[1] - r[1] * s[0],
        ],
        u = Math.hypot(...i) || 1;
      for (const c of [l, o, t]) d.push(...c, ...i.map((f) => f / u));
    },
    v = (l, o, t, r) => {
      (e(l, o, t), e(l, t, r));
    },
    p = (l, o, t, r, s) => {
      for (let i = 0; i < s; i++) {
        const u = (i / s) * Math.PI * 2,
          c = ((i + 1) / s) * Math.PI * 2,
          f = (y, R, T) => [Math.cos(y) * R, T, Math.sin(y) * R];
        (v(f(u, t, l), f(c, t, l), f(c, r, o), f(u, r, o)),
          e([0, o, 0], f(u, r, o), f(c, r, o)));
      }
    };
  (p(-1.78, -1.64, 0.76, 0.76, 8),
    p(-1.64, -1.39, 0.68, 0.59, 8),
    p(-1.39, -1.3, 0.62, 0.62, 8),
    p(-1.3, -1.19, 0.3, 0.19, 8),
    p(-1.19, -0.57, 0.19, 0.17, 8),
    p(-0.57, -0.43, 0.17, 0.29, 8));
  const b = [
      [-0.43, 0.26],
      [-0.3, 0.48],
      [-0.05, 0.69],
      [0.3, 0.86],
      [0.75, 0.97],
      [1.22, 1.02],
      [1.29, 1.07],
      [1.38, 1.07],
      [1.4, 0.95],
      [1.25, 0.92],
      [0.76, 0.87],
      [0.32, 0.76],
      [-0.02, 0.58],
      [-0.2, 0.35],
      [-0.23, 0],
    ],
    g = 32;
  for (let l = 0; l < b.length - 1; l++) {
    const [o, t] = b[l],
      [r, s] = b[l + 1];
    for (let i = 0; i < g; i++) {
      const u = (i / g) * Math.PI * 2,
        c = ((i + 1) / g) * Math.PI * 2;
      v(
        [Math.cos(u) * t, o, Math.sin(u) * t],
        [Math.cos(c) * t, o, Math.sin(c) * t],
        [Math.cos(c) * s, r, Math.sin(c) * s],
        [Math.cos(u) * s, r, Math.sin(u) * s],
      );
    }
  }
  for (const l of [-1, 1]) {
    const o = (t) => {
      const r = 1 - t,
        s =
          r * r * r * 0.96 +
          3 * r * r * t * 1.88 +
          3 * r * t * t * 1.83 +
          t * t * t * 0.57,
        i =
          r * r * r * 1.13 +
          3 * r * r * t * 1.4 +
          3 * r * t * t * -0.22 +
          t * t * t * -0.16,
        u =
          3 * r * r * (1.88 - 0.96) +
          6 * r * t * (1.83 - 1.88) +
          3 * t * t * (0.57 - 1.83),
        c =
          3 * r * r * (1.4 - 1.13) +
          6 * r * t * (-0.22 - 1.4) +
          3 * t * t * (-0.16 + 0.22),
        f = Math.hypot(u, c);
      return Array.from({ length: 8 }, (y, R) => {
        const T = (R / 8) * Math.PI * 2,
          _ = Math.cos(T) * 0.115;
        return [l * (s - (c / f) * _), i + (u / f) * _, Math.sin(T) * 0.115];
      });
    };
    for (let t = 0; t < 24; t++) {
      const r = o(t / 24),
        s = o((t + 1) / 24);
      for (let i = 0; i < 8; i++) v(r[i], r[(i + 1) % 8], s[(i + 1) % 8], s[i]);
    }
  }
  return new Float32Array(d);
}
function z(d) {
  const e = d.getContext("webgl", {
    alpha: !0,
    antialias: !1,
    premultipliedAlpha: !0,
  });
  if (!e) return null;
  const v = [],
    p = [],
    b = [],
    g = [],
    l = (a, A) => {
      const E = e.createProgram();
      p.push(E);
      for (const [F, n] of [
        [e.VERTEX_SHADER, a],
        [e.FRAGMENT_SHADER, A],
      ]) {
        const w = e.createShader(F);
        if (
          (v.push(w),
          e.shaderSource(w, n),
          e.compileShader(w),
          !e.getShaderParameter(w, e.COMPILE_STATUS))
        )
          throw Error(e.getShaderInfoLog(w));
        e.attachShader(E, w);
      }
      if ((e.linkProgram(E), !e.getProgramParameter(E, e.LINK_STATUS)))
        throw Error(e.getProgramInfoLog(E));
      return E;
    },
    o = l(
      `attribute vec3 position;attribute vec3 normal;uniform float angle;uniform float aspect;varying vec3 n;varying vec3 world;
    void main(){float c=cos(angle),s=sin(angle);mat3 turn=mat3(c,0.,-s,0.,1.,0.,s,0.,c);mat3 tilt=mat3(1.,0.,0.,0.,.985,.174,0.,-.174,.985);vec3 p=tilt*turn*position;n=tilt*turn*normal;world=p;float framing=max(2.05,1.85/aspect);gl_Position=vec4(p.x/(framing*aspect),p.y/framing,-p.z*.15,1.);}`,
      "precision mediump float;varying vec3 n;varying vec3 world;void main(){vec3 normal=normalize(n);if(!gl_FrontFacing)normal=-normal;vec3 light=normalize(vec3(-.8,1.2,1.4));float diffuse=max(0.,dot(normal,light));float rim=pow(1.-abs(normal.z),2.);float spec=pow(max(0.,dot(reflect(-light,normal),vec3(0.,0.,1.))),18.);float value=clamp(.18+.53*diffuse+.18*rim+.3*spec,0.,1.);gl_FragColor=vec4(vec3(value),1.);}",
    ),
    t = l(
      `attribute vec4 position;attribute float energy;uniform vec2 viewport;uniform float dpr;varying vec2 home;varying float activation;
    void main(){home=position.zw;activation=energy;gl_Position=vec4(position.x/viewport.x*2.-1.,1.-position.y/viewport.y*2.,0.,1.);gl_PointSize=32.*dpr;}`,
      `precision mediump float;varying vec2 home;varying float activation;uniform sampler2D scene;uniform sampler2D atlas;uniform vec3 accent;
    void main(){vec4 sampleValue=texture2D(scene,home);if(sampleValue.a<.5)discard;float value=sampleValue.r;float glyph=min(9.,floor(value*10.));float ink=texture2D(atlas,vec2((glyph+gl_PointCoord.x)/10.,gl_PointCoord.y)).a;vec3 color=mix(mix(vec3(.48,.53,.61),accent,.58),accent,activation);gl_FragColor=vec4(color,ink*max(.3*(.32+.68*value),activation*.98));}`,
    ),
    r = W(),
    s = e.createBuffer();
  (b.push(s),
    e.bindBuffer(e.ARRAY_BUFFER, s),
    e.bufferData(e.ARRAY_BUFFER, r, e.STATIC_DRAW));
  const i = e.createBuffer();
  b.push(i);
  const u = () => {
      const a = e.createTexture();
      (g.push(a), e.bindTexture(e.TEXTURE_2D, a));
      for (const A of [e.TEXTURE_MIN_FILTER, e.TEXTURE_MAG_FILTER])
        e.texParameteri(e.TEXTURE_2D, A, e.NEAREST);
      for (const A of [e.TEXTURE_WRAP_S, e.TEXTURE_WRAP_T])
        e.texParameteri(e.TEXTURE_2D, A, e.CLAMP_TO_EDGE);
      return a;
    },
    c = u(),
    f = u(),
    y = document.createElement("canvas");
  ((y.width = 640), (y.height = 64));
  const R = y.getContext("2d");
  ((R.fillStyle = "#fff"),
    (R.font = "600 28px 'Courier New', monospace"),
    (R.textAlign = "center"),
    (R.textBaseline = "middle"),
    [...".:-=+*01#█"].forEach((a, A) => R.fillText(a, A * 64 + 32, 32)),
    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, y));
  const T = e.createFramebuffer(),
    _ = e.createRenderbuffer(),
    m = (a, A) => e.getUniformLocation(a, A),
    h = {
      angle: m(o, "angle"),
      aspect: m(o, "aspect"),
      position: e.getAttribLocation(o, "position"),
      normal: e.getAttribLocation(o, "normal"),
    },
    x = {
      scene: m(t, "scene"),
      atlas: m(t, "atlas"),
      viewport: m(t, "viewport"),
      dpr: m(t, "dpr"),
      energy: e.getAttribLocation(t, "energy"),
      accent: m(t, "accent"),
      position: e.getAttribLocation(t, "position"),
    };
  let P = 1,
    B = 1,
    M = 1,
    U = 1,
    I = 1,
    L = [],
    N = new Float32Array(0);
  const X = () => {
      ((P = d.clientWidth),
        (B = d.clientHeight),
        (I = Math.min(devicePixelRatio || 1, 2)),
        (d.width = Math.round(P * I)),
        (d.height = Math.round(B * I)),
        (M = Math.max(1, Math.ceil(P / 16))),
        (U = Math.max(1, Math.ceil(B / 20))),
        (L = Array.from({ length: M * U }, (a, A) => {
          const E = (((A % M) + 0.5) * P) / M,
            F = ((Math.floor(A / M) + 0.5) * B) / U;
          return {
            x: E,
            y: F,
            homeX: E,
            homeY: F,
            vx: 0,
            vy: 0,
            energy: 0,
            quiet: 0,
            armed: !0,
          };
        })),
        (N = new Float32Array(L.length * 5)),
        e.bindBuffer(e.ARRAY_BUFFER, i),
        e.bufferData(e.ARRAY_BUFFER, N.byteLength, e.DYNAMIC_DRAW),
        e.bindTexture(e.TEXTURE_2D, c),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA,
          M,
          U,
          0,
          e.RGBA,
          e.UNSIGNED_BYTE,
          null,
        ),
        e.bindFramebuffer(e.FRAMEBUFFER, T),
        e.framebufferTexture2D(
          e.FRAMEBUFFER,
          e.COLOR_ATTACHMENT0,
          e.TEXTURE_2D,
          c,
          0,
        ),
        e.bindRenderbuffer(e.RENDERBUFFER, _),
        e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, M, U),
        e.framebufferRenderbuffer(
          e.FRAMEBUFFER,
          e.DEPTH_ATTACHMENT,
          e.RENDERBUFFER,
          _,
        ));
    },
    G = (a, A, E, F) => {
      (L.forEach((n, w) => {
        if (E) {
          ((n.vx += (n.homeX - n.x) * 35 * E),
            (n.vy += (n.homeY - n.y) * 35 * E),
            (n.vx *= Math.exp(-E * 8)),
            (n.vy *= Math.exp(-E * 8)),
            (n.x += n.vx * E),
            (n.y += n.vy * E),
            (n.energy *= Math.exp(-E * 9)));
          const Y = F ? n.x - F.x : 0,
            H = F ? n.y - F.y : 0,
            D = F ? Math.hypot(Y, H) : 1 / 0;
          if (D < 60) {
            const S = 60 - D,
              V = D > 0.01 ? Y / D : 1,
              q = D > 0.01 ? H / D : 0;
            ((n.x += V * S),
              (n.y += q * S),
              (n.vx += V * S * 3),
              (n.vy += q * S * 3),
              n.armed && S > 1 && ((n.energy = 1), (n.armed = !1)),
              (n.quiet = 0));
          } else ((n.quiet += E), n.quiet > 0.25 && (n.armed = !0));
        }
        N.set([n.x, n.y, n.homeX / P, 1 - n.homeY / B, n.energy], w * 5);
      }),
        e.disable(e.BLEND),
        e.bindFramebuffer(e.FRAMEBUFFER, T),
        e.viewport(0, 0, M, U),
        e.enable(e.DEPTH_TEST),
        e.clearColor(0, 0, 0, 0),
        e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT),
        e.useProgram(o),
        e.bindBuffer(e.ARRAY_BUFFER, s),
        e.enableVertexAttribArray(h.position),
        e.vertexAttribPointer(h.position, 3, e.FLOAT, !1, 24, 0),
        e.enableVertexAttribArray(h.normal),
        e.vertexAttribPointer(h.normal, 3, e.FLOAT, !1, 24, 12),
        e.uniform1f(h.angle, a * 0.3 + 0.45),
        e.uniform1f(h.aspect, P / B),
        e.drawArrays(e.TRIANGLES, 0, r.length / 6),
        e.disableVertexAttribArray(h.position),
        e.disableVertexAttribArray(h.normal),
        e.bindFramebuffer(e.FRAMEBUFFER, null),
        e.viewport(0, 0, d.width, d.height),
        e.disable(e.DEPTH_TEST),
        e.clear(e.COLOR_BUFFER_BIT),
        e.useProgram(t),
        e.bindBuffer(e.ARRAY_BUFFER, i),
        e.enableVertexAttribArray(x.position),
        e.bufferSubData(e.ARRAY_BUFFER, 0, N),
        e.vertexAttribPointer(x.position, 4, e.FLOAT, !1, 20, 0),
        e.enableVertexAttribArray(x.energy),
        e.vertexAttribPointer(x.energy, 1, e.FLOAT, !1, 20, 16),
        e.activeTexture(e.TEXTURE0),
        e.bindTexture(e.TEXTURE_2D, c),
        e.uniform1i(x.scene, 0),
        e.activeTexture(e.TEXTURE1),
        e.bindTexture(e.TEXTURE_2D, f),
        e.uniform1i(x.atlas, 1),
        e.uniform2f(x.viewport, P, B),
        e.uniform1f(x.dpr, I),
        e.uniform3fv(x.accent, A),
        e.enable(e.BLEND),
        e.blendFuncSeparate(
          e.SRC_ALPHA,
          e.ONE_MINUS_SRC_ALPHA,
          e.ONE,
          e.ONE_MINUS_SRC_ALPHA,
        ),
        e.drawArrays(e.POINTS, 0, L.length),
        e.disableVertexAttribArray(x.position),
        e.disableVertexAttribArray(x.energy));
    };
  return (
    X(),
    (d.dataset.renderer = "webgl"),
    {
      resize: X,
      draw: G,
      reset() {
        for (const a of L)
          ((a.x = a.homeX),
            (a.y = a.homeY),
            (a.vx = a.vy = a.energy = a.quiet = 0),
            (a.armed = !0));
      },
      dispose() {
        (b.forEach((a) => e.deleteBuffer(a)),
          g.forEach((a) => e.deleteTexture(a)),
          p.forEach((a) => e.deleteProgram(a)),
          v.forEach((a) => e.deleteShader(a)),
          e.deleteFramebuffer(T),
          e.deleteRenderbuffer(_));
      },
    }
  );
}
let C;
function O() {
  C?.();
  const d = document.querySelector("[data-reward-trophy]");
  if (!d) return;
  const e = d.querySelector("canvas"),
    v = new AbortController(),
    p = matchMedia("(prefers-reduced-motion:reduce)");
  let b = null,
    g = null,
    l = !1,
    o = !1,
    t = 0,
    r = 0,
    s = 0,
    i = [0.7, 0.75, 0.85];
  const u = () => {
      const m = getComputedStyle(d)
        .getPropertyValue("--payathon-accent")
        .trim();
      /^#[\da-f]{6}$/i.test(m) &&
        (i = [1, 3, 5].map((h) => parseInt(m.slice(h, h + 2), 16) / 255));
    },
    c = (m) => {
      if (((t = 0), !g || o || !l || document.hidden)) return;
      const h = r ? Math.min((m - r) / 1e3, 0.05) : 0;
      ((s += h),
        (r = m),
        g.draw(s, i, h, b),
        p.matches || (t = requestAnimationFrame(c)));
    },
    f = () => {
      (cancelAnimationFrame(t),
        (t = 0),
        (r = 0),
        (!l || document.hidden || p.matches) && ((b = null), g?.reset()),
        l && !document.hidden && !o && g && (t = requestAnimationFrame(c)));
    },
    y = new IntersectionObserver((m) => {
      if (((l = m[0].isIntersecting), l && !g && !o))
        try {
          ((g = z(e)), u());
        } catch (h) {
          (k("reward_trophy_error", h),
            console.warn("Reward trophy unavailable", h));
        }
      f();
    });
  y.observe(d);
  const R = new ResizeObserver(() => {
    (g?.resize(), u(), f());
  });
  R.observe(d);
  const T = () => {
    b = null;
  };
  (d.parentElement.addEventListener(
    "pointermove",
    (m) => {
      if (p.matches || m.pointerType === "touch") return;
      const h = d.getBoundingClientRect();
      b = { x: m.clientX - h.left, y: m.clientY - h.top };
    },
    { passive: !0, signal: v.signal },
  ),
    d.parentElement.addEventListener("pointerleave", T, { signal: v.signal }),
    window.addEventListener("scroll", T, { passive: !0, signal: v.signal }));
  const _ = new MutationObserver(u);
  (_.observe(document.body, { attributes: !0, attributeFilter: ["style"] }),
    document.addEventListener("visibilitychange", f, { signal: v.signal }),
    p.addEventListener("change", f, { signal: v.signal }),
    e.addEventListener(
      "webglcontextlost",
      (m) => {
        (m.preventDefault(), (o = !0), f());
      },
      { signal: v.signal },
    ),
    e.addEventListener(
      "webglcontextrestored",
      () => {
        ((o = !1), g?.dispose(), (g = z(e)), u(), f());
      },
      { signal: v.signal },
    ),
    (C = () => {
      (v.abort(),
        _.disconnect(),
        y.disconnect(),
        R.disconnect(),
        cancelAnimationFrame(t),
        g?.dispose());
    }));
}
O();
document.addEventListener("astro:page-load", O);
document.addEventListener("astro:before-swap", () => C?.());
window.addEventListener("pagehide", () => C?.());
window.addEventListener("pageshow", (d) => {
  d.persisted && O();
});
