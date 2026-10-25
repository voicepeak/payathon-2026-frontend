import { r as $ } from "./telemetry.BUQSN-xI.js";
const j = `#version 300 es
in vec2 position;
out vec2 uv;
void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`,
  G = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 result;
uniform sampler2D a;
uniform sampler2D b;
uniform sampler2D c;
uniform vec2 texel;
uniform float dt;
uniform float time;
uniform float seed;
vec4 linearSample(sampler2D field,vec2 p){
  vec2 cell=clamp(p,texel*.5,1.-texel*.5)/texel-.5;
  vec2 f=fract(cell),base=(floor(cell)+.5)*texel;
  return mix(mix(texture(field,base),texture(field,base+vec2(texel.x,0.)),f.x),
    mix(texture(field,base+vec2(0.,texel.y)),texture(field,base+texel),f.x),f.y);
}
vec2 wheelPoint(vec2 p){return p*vec2(400.,400.)-vec2(200.,130.);}
float seamDistance(vec2 p){
  vec2 q=abs(wheelPoint(p))-vec2(88.,10.);
  return length(max(q,0.))+min(max(q.x,q.y),0.);
}
vec2 outwardNormal(vec2 p){
  vec2 local=wheelPoint(p);
  vec2 outside=local-clamp(local,vec2(-88.,-10.),vec2(88.,10.));
  if(length(outside)>.01)return normalize(outside);
  vec2 gap=vec2(88.,10.)-abs(local);
  return gap.x<gap.y?vec2(sign(local.x),0.):vec2(0.,sign(local.y));
}
float outletRandom(float n){return fract(sin(n*127.1+seed*31.7)*43758.5453);}
float source(vec2 p){
  vec2 local=wheelPoint(p);
  float amount=0.;
  float dominant=floor(outletRandom(29.)*7.);
  // Unequal leaks, seeded once per overload. No periodic ring of identical jets.
  for(int i=0;i<7;i++){
    float id=float(i);
    float r=outletRandom(id+1.),r2=outletRandom(id+11.);
    vec2 centre;
    if(i<3)centre=vec2(-76.+(id+r)*50.,10.);
    else if(i<5)centre=vec2(-64.+(id-3.+r)*68.,-10.);
    else centre=vec2(i==5?-88.:88.,(r-.5)*15.);
    float along=7.+r2*r2*22.;
    vec2 radius=i<5?vec2(along,3.+r*2.):vec2(3.+r*2.,along*.55);
    vec2 q=(local-centre)/radius;
    float delay=outletRandom(id+41.)*.55;
    float duration=2.05+outletRandom(id+51.)*1.4;
    float pulse=smoothstep(delay,delay+.35,time)
      *(1.-smoothstep(delay+duration,delay+duration+.65,time));
    float strength=id==dominant?1.15:.12+.48*r2*r2;
    amount+=exp(-dot(q,q)*1.3)*pulse*strength;
  }
  return amount;
}

`,
  W = {
    advect: `
void main(){
  vec2 v=texture(a,uv).xy;
  vec2 p=uv-v*dt*texel;
  result=linearSample(b,p)*exp(-dt*.13);
}`,
    curl: `
void main(){
  float l=texture(a,uv-vec2(texel.x,0.)).y;
  float r=texture(a,uv+vec2(texel.x,0.)).y;
  float d=texture(a,uv-vec2(0.,texel.y)).x;
  float u=texture(a,uv+vec2(0.,texel.y)).x;
  result=vec4((r-l-u+d)*.5,0.,0.,1.);
}`,
    force: `
void main(){
  float l=abs(texture(b,uv-vec2(texel.x,0.)).r);
  float r=abs(texture(b,uv+vec2(texel.x,0.)).r);
  float d=abs(texture(b,uv-vec2(0.,texel.y)).r);
  float u=abs(texture(b,uv+vec2(0.,texel.y)).r);
  vec2 grad=vec2(r-l,u-d)*.5;
  grad/=length(grad)+.0001;
  float spin=texture(b,uv).r;
  vec2 confinement=vec2(grad.y,-grad.x)*spin*2.8;
  float density=texture(c,uv).r;
  vec2 v=texture(a,uv).xy;
  vec2 outward=outwardNormal(uv);
  vec2 tangent=vec2(-outward.y,outward.x);
  float distanceFromSeam=max(seamDistance(uv),0.);
  float burst=1.-smoothstep(15.,95.,distanceFromSeam);
  vec2 local=wheelPoint(uv);
  float side=local.x<0.?-1.:1.;
  float under=1.-smoothstep(-8.,2.,local.y);
  float turn=smoothstep(76.,104.,abs(local.x));
  vec2 lowerFlow=normalize(vec2(side*(1.-turn),turn+.001));
  vec2 upperFlow=normalize(vec2(outward.x*.65,max(outward.y,0.)+.8));
  vec2 direction=normalize(mix(upperFlow,lowerFlow,under));
  // Bottom smoke follows the casing; outside the corners buoyancy takes over.
  float lift=mix(70.,0.,under*(1.-turn));
  v+=dt*(confinement+density*(direction*burst*90.+vec2(0.,lift)));
  float emission=source(uv);
  float churn=sin(time*1.8+uv.x*17.+uv.y*11.+seed);
  v+=dt*emission*(direction*490.+tangent*churn*35.);
  v+=dt*density*tangent*10.*sin(time*1.2+uv.y*17.-uv.x*13.);
  if(uv.x<texel.x||uv.x>1.-texel.x)v.x=0.;
  if(uv.y<texel.y)v.y=max(v.y,0.);
  result=vec4(clamp(v,vec2(-140.),vec2(140.)),0.,1.);
}`,
    divergence: `
void main(){
  vec2 v=texture(a,uv).xy;
  float l=uv.x<texel.x?-v.x:texture(a,uv-vec2(texel.x,0.)).x;
  float r=uv.x>1.-texel.x?-v.x:texture(a,uv+vec2(texel.x,0.)).x;
  float d=uv.y<texel.y?-v.y:texture(a,uv-vec2(0.,texel.y)).y;
  float u=texture(a,uv+vec2(0.,texel.y)).y;
  result=vec4((r-l+u-d)*.5,0.,0.,1.);
}`,
    pressure: `
void main(){
  float l=texture(a,uv-vec2(texel.x,0.)).r;
  float r=texture(a,uv+vec2(texel.x,0.)).r;
  float d=texture(a,uv-vec2(0.,texel.y)).r;
  float u=texture(a,uv+vec2(0.,texel.y)).r;
  result=vec4((l+r+d+u-texture(b,uv).r)*.25,0.,0.,1.);
}`,
    project: `
void main(){
  float l=texture(b,uv-vec2(texel.x,0.)).r;
  float r=texture(b,uv+vec2(texel.x,0.)).r;
  float d=texture(b,uv-vec2(0.,texel.y)).r;
  float u=texture(b,uv+vec2(0.,texel.y)).r;
  vec2 v=texture(a,uv).xy-vec2(r-l,u-d)*.5;
  vec2 local=wheelPoint(uv);
  float side=local.x<0.?-1.:1.;
  float turn=smoothstep(76.,104.,abs(local.x));
  // Keep the underside stream beside the bottom seam, then round each end.
  float underside=(1.-smoothstep(-8.,0.,local.y))
    *(1.-smoothstep(104.,124.,abs(local.x)))
    *exp(-pow((local.y+16.)/23.,2.));
  vec2 along=vec2(side*38.*(1.-turn),40.*turn
    +clamp((-16.-local.y)*1.2,-8.,8.)*(1.-turn));
  v=mix(v,along,underside*(1.-exp(-dt*9.)));
  // No flow into the metal face: the smoke must go around the wheel.
  float wall=1.-smoothstep(0.,4.,abs(seamDistance(uv)));
  vec2 normal=outwardNormal(uv);
  v-=normal*min(dot(v,normal),0.)*wall;
  result=vec4(v,0.,1.);
}`,
    emit: `
void main(){
  float density=texture(a,uv).r;
  // Small, time-scaled mixing lets the advected plume soften and broaden.
  float neighbours=(texture(a,uv-vec2(texel.x,0.)).r+texture(a,uv+vec2(texel.x,0.)).r
    +texture(a,uv-vec2(0.,texel.y)).r+texture(a,uv+vec2(0.,texel.y)).r)*.25;
  density=mix(density,neighbours,1.-exp(-dt*6.));
  float emission=source(uv)*(1.-smoothstep(3.1,3.55,time));
  result=vec4(min(3.,density+emission*dt*18.),0.,0.,1.);
}`,
    render: `
float segmentDistance(vec2 p,vec2 a0,vec2 b0){
  vec2 d=b0-a0;
  return length(p-a0-d*clamp(dot(p-a0,d)/dot(d,d),0.,1.));
}
vec2 smokeArcs(vec2 p){
  float core=0.,halo=0.;
  for(int j=0;j<2;j++){
    float id=float(j);
    float clock=time-id*.57-.35;
    float cycle=floor(clock/1.4);
    float phase=fract(clock/1.4)*1.4;
    float flash=(1.-smoothstep(.065,.16,phase))*step(0.,clock);
    float key=cycle*13.+id*7.;
    float r=outletRandom(key+81.);
    vec2 start=vec2((r-.5)*175.,12.+outletRandom(key+82.)*42.);
    float direction=r>.5?-1.:1.;
    vec2 previous=start;
    for(int k=1;k<=5;k++){
      float n=float(k);
      vec2 next=start+vec2(direction*n*6.+(outletRandom(key+90.+n)-.5)*16.,n*7.);
      float distance=segmentDistance(p,previous,next);
      core+=exp(-distance*distance/0.32)*flash;
      halo+=exp(-distance*distance/16.)*flash;
      previous=next;
    }
  }
  return vec2(core,halo);
}
void main(){
  float density=linearSample(a,uv).r;
  float above=linearSample(a,uv+vec2(-.009,.00975)).r;
  float below=linearSample(a,uv+vec2(.009,-.00975)).r;
  float distanceFromSeam=max(seamDistance(uv),0.);
  float spread=smoothstep(3.,72.,distanceFromSeam);
  float dilution=1.-smoothstep(.15,1.5,density);
  // Soot-dark at the outlet; dilute, dispersed smoke catches more light.
  float tone=mix(.18,.40,spread)+dilution*spread*.11;
  float light=clamp(tone+(below-above)*mix(.045,.13,spread),.14,.54);
  // Only the canvas boundary and end of the effect fade; no rising reveal mask.
  float edge=smoothstep(0.,.10,uv.x)*(1.-smoothstep(.90,1.,uv.x))
    *smoothstep(0.,.078,uv.y)*(1.-smoothstep(.80,1.,uv.y));
  // Keep the metal face legible while smoke leaks out around its perimeter.
  edge*=smoothstep(-5.,1.,seamDistance(uv));
  float opacityScale=mix(2.8,1.15,spread);
  float alpha=(1.-exp(-density*opacityScale))*mix(1.,.72,spread)
    *edge*(1.-smoothstep(3.65,4.,time));
  // Density gates the arcs; thick smoke obscures their cores and catches the glow.
  vec2 arcs=smokeArcs(wheelPoint(uv));
  float smokePresence=smoothstep(.045,.24,density)*edge
    *(1.-smoothstep(3.65,4.,time));
  float spark=clamp((arcs.x*.9+arcs.y*.08)*smokePresence*exp(-density*.45),0.,.85);
  vec3 electric=mix(vec3(.25,.55,.8),vec3(.82,.94,1.),clamp(arcs.x,0.,1.));
  result=vec4(vec3(light)*alpha*(1.-spark)+electric*spark,alpha+spark*(1.-alpha));
}`,
  };
function z(o) {
  let e,
    F,
    x,
    s,
    u,
    m,
    T,
    c,
    g = [],
    d = 0,
    h = 0,
    f = 0,
    E = 0,
    b = !1,
    R = !1,
    P = !1;
  const A = () => {
      ((b = !1),
        cancelAnimationFrame(d),
        (d = 0),
        e &&
          !e.isContextLost() &&
          (e.bindFramebuffer(e.FRAMEBUFFER, null),
          e.clearColor(0, 0, 0, 0),
          e.clear(e.COLOR_BUFFER_BIT)));
    },
    k = () => {
      if (e && !e.isContextLost()) {
        for (const t of g)
          (e.deleteTexture(t.texture), e.deleteFramebuffer(t.framebuffer));
        for (const t of Object.values(x || {})) e.deleteProgram(t.program);
        F && e.deleteBuffer(F);
      }
      ((g = []), (x = null), (F = null));
    },
    L = (t, a) => {
      const n = e.createShader(t);
      if (
        (e.shaderSource(n, a),
        e.compileShader(n),
        !e.getShaderParameter(n, e.COMPILE_STATUS))
      ) {
        const l = e.getShaderInfoLog(n);
        throw (e.deleteShader(n), new Error(l));
      }
      return n;
    },
    r = (t) => {
      let a, n, l;
      try {
        if (
          ((a = L(e.VERTEX_SHADER, j)),
          (n = L(e.FRAGMENT_SHADER, G + t)),
          (l = e.createProgram()),
          e.attachShader(l, a),
          e.attachShader(l, n),
          e.bindAttribLocation(l, 0, "position"),
          e.linkProgram(l),
          !e.getProgramParameter(l, e.LINK_STATUS))
        )
          throw new Error(e.getProgramInfoLog(l));
        return {
          program: l,
          uniforms: Object.fromEntries(
            ["a", "b", "c", "texel", "dt", "time", "seed"].map((w) => [
              w,
              e.getUniformLocation(l, w),
            ]),
          ),
        };
      } catch (w) {
        throw (l && e.deleteProgram(l), w);
      } finally {
        (a && e.deleteShader(a), n && e.deleteShader(n));
      }
    },
    S = () => {
      const t = e.createTexture(),
        a = e.createFramebuffer(),
        n = { texture: t, framebuffer: a };
      if (
        (g.push(n),
        e.bindTexture(e.TEXTURE_2D, t),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        e.texImage2D(
          e.TEXTURE_2D,
          0,
          e.RGBA16F,
          200,
          200,
          0,
          e.RGBA,
          e.HALF_FLOAT,
          null,
        ),
        e.bindFramebuffer(e.FRAMEBUFFER, a),
        e.framebufferTexture2D(
          e.FRAMEBUFFER,
          e.COLOR_ATTACHMENT0,
          e.TEXTURE_2D,
          t,
          0,
        ),
        e.checkFramebufferStatus(e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE)
      )
        throw new Error("Smoke fluid framebuffer unavailable");
      return n;
    },
    y = () => ({
      read: S(),
      write: S(),
      swap() {
        [this.read, this.write] = [this.write, this.read];
      },
    }),
    U = () => {
      if (x) return !0;
      if (P || R) return !1;
      try {
        if (
          ((e = o.getContext("webgl2", {
            alpha: !0,
            premultipliedAlpha: !0,
            antialias: !1,
            depth: !1,
            stencil: !1,
          })),
          !e || !e.getExtension("EXT_color_buffer_float"))
        )
          throw new Error("Smoke fluid requires WebGL2 float render targets");
        x = {};
        for (const [a, n] of Object.entries(W)) x[a] = r(n);
        ((F = e.createBuffer()),
          e.bindBuffer(e.ARRAY_BUFFER, F),
          e.bufferData(
            e.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            e.STATIC_DRAW,
          ),
          e.enableVertexAttribArray(0),
          e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, 0),
          (s = y()),
          (u = y()),
          (m = y()),
          (T = S()),
          (c = S()));
        const t = Math.min(window.devicePixelRatio || 1, 1.5);
        return (
          (o.width = Math.round(400 * t)),
          (o.height = Math.round(400 * t)),
          !0
        );
      } catch (t) {
        return (
          $("wheel_smoke_error", t),
          console.warn("[Payathon smoke]", t),
          k(),
          (P = !0),
          !1
        );
      }
    },
    v = (t, a, n, l, w) => {
      const { program: O, uniforms: D } = x[t];
      (e.useProgram(O),
        e.bindFramebuffer(e.FRAMEBUFFER, a?.framebuffer || null),
        e.viewport(0, 0, a ? 200 : o.width, a ? 200 : o.height),
        n.forEach((N, B) => {
          (e.activeTexture(e.TEXTURE0 + B),
            e.bindTexture(e.TEXTURE_2D, N.texture),
            e.uniform1i(D[["a", "b", "c"][B]], B));
        }),
        e.uniform2f(D.texel, 1 / 200, 1 / 200),
        e.uniform1f(D.dt, l),
        e.uniform1f(D.time, w),
        e.uniform1f(D.seed, E),
        e.drawArrays(e.TRIANGLES, 0, 6));
    },
    _ = (t, a) => {
      (v("advect", s.write, [s.read, s.read], t, a),
        s.swap(),
        v("curl", T, [s.read], t, a),
        v("force", s.write, [s.read, T, u.read], t, a),
        s.swap(),
        v("divergence", c, [s.read], t, a));
      for (let n = 0; n < 14; n++)
        (v("pressure", m.write, [m.read, c], t, a), m.swap());
      (v("project", s.write, [s.read, m.read], t, a),
        s.swap(),
        v("advect", u.write, [s.read, u.read], t, a),
        u.swap(),
        v("emit", u.write, [u.read], t, a),
        u.swap());
    },
    M = (t) => {
      if (((d = 0), !b || R || !x)) return;
      const a = (t - h) / 1e3;
      if (a >= 4) {
        A();
        return;
      }
      const n = Math.min((t - f) / 1e3, 1 / 30);
      f = t;
      const l = Math.max(1, Math.ceil(n * 60));
      for (let w = 0; w < l; w++) _(n / l, a - n + ((w + 1) * n) / l);
      (v("render", null, [u.read], n, a), (d = requestAnimationFrame(M)));
    },
    q = (t) => {
      (t.preventDefault(), A(), k());
    },
    I = () => {
      P = !1;
    };
  return (
    o.addEventListener("webglcontextlost", q),
    o.addEventListener("webglcontextrestored", I),
    {
      start() {
        if (U()) {
          (A(), e.clearColor(0, 0, 0, 0));
          for (const t of g)
            (e.bindFramebuffer(e.FRAMEBUFFER, t.framebuffer),
              e.clear(e.COLOR_BUFFER_BIT));
          (e.bindFramebuffer(e.FRAMEBUFFER, null),
            (E = Math.random() * 50),
            (h = f = performance.now()));
        }
      },
      setRunning(t) {
        if (!t) {
          b && A();
          return;
        }
        !x ||
          R ||
          b ||
          ((b = !0), (f = performance.now()), (d = requestAnimationFrame(M)));
      },
      stop: A,
      dispose() {
        (A(),
          (R = !0),
          o.removeEventListener("webglcontextlost", q),
          o.removeEventListener("webglcontextrestored", I),
          k(),
          e?.getExtension("WEBGL_lose_context")?.loseContext());
      },
    }
  );
}
let C;
function X() {
  C?.();
  const o = document.querySelector(".race-partners");
  if (!o) return;
  const p = o.querySelector(".race-partners-speed"),
    i = p.querySelector("input"),
    e = o.querySelector(".race-partners-track"),
    F = o.querySelector(".race-partners-wheel-glint"),
    x = o.querySelector(".race-partners-error"),
    s = z(o.querySelector(".race-partners-smoke")),
    u = matchMedia("(prefers-reduced-motion:reduce)"),
    m = new AbortController();
  let T = !1,
    c = Number(i.value),
    g,
    d,
    h = 0;
  o.setAttribute("data-ready", "");
  const f = e.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
    { duration: 11e4, iterations: 1 / 0, easing: "linear" },
  );
  (f.pause(), (f.currentTime = 11e4));
  const E = () => {
    const r = T && !document.hidden && !u.matches && c !== 0;
    (o.toggleAttribute("data-running", r),
      s.setRunning(r && o.hasAttribute("data-error")),
      (p.hidden = u.matches),
      c !== 0 && f.updatePlaybackRate(-c),
      r
        ? (c > 0 && Number(f.currentTime) <= 0 && (f.currentTime = 11e4),
          f.play())
        : f.pause(),
      (u.matches || document.hidden || !T) && g?.cancel());
  };
  f.onfinish = () => {
    c > 0 && ((f.currentTime = 11e4), E());
  };
  const b = () => {
      const r = c;
      return (
        (c = Number(i.value)),
        i.setAttribute(
          "aria-valuetext",
          c === 0
            ? "停止"
            : `向${c < 0 ? "左" : "右"} ${Math.abs(c).toFixed(1)} 倍速`,
        ),
        p.style.setProperty("--wheel-position", `${((c + 3) / 6) * 100}%`),
        p.style.setProperty("--wheel-offset", `${(c + 1) * 64}px`),
        E(),
        c >= r ? 1 : -1
      );
    },
    R = () => {
      const r = d?.id;
      ((d = void 0),
        r !== void 0 && i.blur(),
        i.parentElement.removeAttribute("data-dragging"),
        p.removeAttribute("data-straining"),
        p.style.removeProperty("--wheel-shake"),
        p.style.removeProperty("--wheel-tilt"),
        r !== void 0 && !h && b(),
        r !== void 0 && i.hasPointerCapture(r) && i.releasePointerCapture(r));
    },
    P = () => {
      (clearTimeout(h),
        (h = 0),
        o.removeAttribute("data-error"),
        (x.textContent = ""),
        (i.disabled = !1),
        (i.value = "-1.5"),
        b());
    },
    A = (r) => {
      (R(),
        g?.cancel(),
        o.setAttribute("data-error", ""),
        s.start(),
        (i.disabled = !0),
        (c = r * 6),
        (x.textContent = "ERROR"),
        i.setAttribute(
          "aria-valuetext",
          `故障，向${r < 0 ? "左" : "右"} 6 倍速，4 秒后恢复`,
        ),
        E(),
        (h = setTimeout(P, 4e3)));
    },
    k = () => {
      if (h) return;
      const r = b();
      (g?.cancel(),
        T &&
          !u.matches &&
          !document.hidden &&
          (g = F.animate(
            [
              { opacity: 0, transform: `translateX(${-12 * r}px)` },
              { opacity: 0.85, offset: 0.18, transform: "translateX(0)" },
              { opacity: 0, transform: `translateX(${20 * r}px)` },
            ],
            { duration: 420, easing: "ease-out" },
          )));
    };
  (i.addEventListener("input", k, { signal: m.signal }),
    i.addEventListener(
      "pointerdown",
      (r) => {
        !r.isPrimary ||
          r.button !== 0 ||
          h ||
          (r.preventDefault(),
          i.parentElement.setAttribute("data-dragging", ""),
          i.focus({ preventScroll: !0 }),
          (d = {
            id: r.pointerId,
            x: r.clientX,
            speed: Number(i.value),
            width: i.getBoundingClientRect().width,
            moved: !1,
          }),
          i.setPointerCapture(r.pointerId));
      },
      { signal: m.signal },
    ),
    i.addEventListener(
      "pointermove",
      (r) => {
        if (!d || r.pointerId !== d.id || h) return;
        const S = r.clientX - d.x;
        if (!d.moved && Math.abs(S) < 3) return;
        d.moved = !0;
        const y = d.speed + (S / Math.max(1, d.width)) * 6;
        if (Math.abs(y) >= 5.25) {
          A(Math.sign(y));
          return;
        }
        const U = Math.round(Math.max(-3, Math.min(3, y)) * 10) / 10;
        U !== Number(i.value) && ((i.value = String(U)), k());
        const v = Math.max(0, Math.abs(y) - 3),
          _ = Math.min(1, v / 2.25),
          M = v > 0 ? Math.sign(y) * (3 + v / (1 + v)) : y;
        (p.toggleAttribute("data-straining", v > 0),
          p.style.setProperty("--wheel-shake", `${4 * _ * _}px`),
          p.style.setProperty("--wheel-tilt", `${9 * _ * _}deg`),
          p.style.setProperty("--wheel-position", `${((M + 3) / 6) * 100}%`),
          p.style.setProperty("--wheel-offset", `${(M + 1) * 64}px`));
      },
      { signal: m.signal },
    ));
  for (const r of ["pointerup", "pointercancel", "lostpointercapture"])
    i.addEventListener(r, R, { signal: m.signal });
  (window.addEventListener("blur", R, { signal: m.signal }),
    i.addEventListener("click", (r) => r.preventDefault(), {
      signal: m.signal,
    }),
    document.addEventListener("visibilitychange", E, { signal: m.signal }),
    u.addEventListener(
      "change",
      () => {
        u.matches && h ? P() : E();
      },
      { signal: m.signal },
    ));
  const L = new IntersectionObserver((r) => {
    ((T = r[0].isIntersecting), E());
  });
  (L.observe(o),
    b(),
    (C = () => {
      (R(),
        clearTimeout(h),
        (f.onfinish = null),
        f.cancel(),
        g?.cancel(),
        s.dispose(),
        L.disconnect(),
        m.abort(),
        o.removeAttribute("data-running"),
        o.removeAttribute("data-ready"),
        o.removeAttribute("data-error"),
        (x.textContent = ""),
        (i.disabled = !1),
        (i.value = "-1.5"),
        (p.hidden = !0));
    }));
}
X();
document.addEventListener("astro:page-load", X);
document.addEventListener("astro:before-swap", () => C?.());
window.addEventListener("pagehide", () => C?.());
window.addEventListener("pageshow", (o) => {
  o.persisted && X();
});
