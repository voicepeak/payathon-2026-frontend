import{r as k}from"./telemetry.BUQSN-xI.js";const L=`attribute vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}`,F=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 resolution;
uniform vec2 cssSize;
uniform float progress;
uniform float reverse;
uniform float drift;
uniform float scrollPhase;
uniform vec2 splitOffset;
uniform vec4 forwardColour;
uniform vec4 backwardColour;
uniform sampler2D atlas;
float glyph(vec2 p,float density,float variation){
  float index=clamp(floor(density*9.)+variation,0.,8.);
  if(density>=.9)index=9.;
  return texture2D(atlas,vec2((index+p.x+.5)/10.,p.y+.5)).a*smoothstep(0.,.05,density);
}
float surface(vec2 uv){
  // Fixed 16 CSS-pixel cells, without screen-door noise or scanline jitter.
  vec2 original=uv*cssSize;
  float column=floor(original.x/16.);
  float envelope=smoothstep(0.,32.,original.y)*(1.-smoothstep(cssSize.y-32.,cssSize.y,original.y));
  float offset=floor(drift*(.7+.3*sin(column*.47))*envelope+.5);
  vec2 pixel=vec2(floor(original.x)+.5,floor(original.y-offset)+.5);
  vec2 id=floor(pixel/16.);
  vec2 p=fract(pixel/16.)-.5;
  float row=(id.y+.5)*16./cssSize.y;
  float x=(id.x+.5)*16./cssSize.x;
  float edge=mix(.62,.4,progress)+.06*sin(x*9.)+.025*sin(x*23.);
  float density=smoothstep(edge-88./cssSize.y,edge+88./cssSize.y,row);
  // Both directions show dark glyphs against the white side of the boundary.
  // Stagger symbol changes by cell; phase advances only with actual scroll.
  float phase=floor(scrollPhase+mod(id.x*3.+id.y*5.,12.)/12.);
  float variation=mod(phase+id.x*7.+id.y*13.,5.)-2.;
  float ink=glyph(p,mix(1.-density,density,reverse),variation);
  float mask=mix(1.-ink,ink,reverse);
  if(original.y<16.)mask=0.;
  if(original.y>cssSize.y-16.)mask=1.;
  return mask;
}
void main(){
  vec2 uv=vec2(gl_FragCoord.x/resolution.x,1.-gl_FragCoord.y/resolution.y);
  float mask=surface(uv);
  vec3 dark=vec3(16.,20.,27.)/255.;
  vec3 target=mix(vec3(1.),dark,reverse);
  // Composite the two lagged silhouettes here, avoiding CSS canvas filters.
  float front=surface(uv-vec2(0.,splitOffset.x/cssSize.y))*forwardColour.a;
  float back=surface(uv-vec2(0.,splitOffset.y/cssSize.y))*backwardColour.a;
  vec4 trails=vec4(forwardColour.rgb*front+backwardColour.rgb*back*(1.-front),front+back*(1.-front));
  gl_FragColor=vec4(target*mask,mask)+trails*(1.-mask);
}`;function I(r,b){const e=r.getContext("webgl",{alpha:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"low-power"});if(!e)return null;const f=document.createElement("canvas").getContext("2d"),u=getComputedStyle(r),m=(l,t)=>(f.clearRect(0,0,1,1),f.fillStyle=t,f.fillStyle=u.getPropertyValue(l).trim()||t,f.fillRect(0,0,1,1),[...f.getImageData(0,0,1,1).data].map(n=>n/255)),p=m("--payathon-split-forward-svg","#21b8ffe6"),v=m("--payathon-split-backward-svg","#ff8623e6");let s,g,h,i,T=!1;function A(){h&&e.deleteTexture(h),h=null,g&&e.deleteBuffer(g),s&&e.deleteProgram(s),g=null,s=null}function x(){const l=[];try{for(const[a,o]of[[e.VERTEX_SHADER,L],[e.FRAGMENT_SHADER,F]]){const c=e.createShader(a);if(l.push(c),e.shaderSource(c,o),e.compileShader(c),!e.getShaderParameter(c,e.COMPILE_STATUS))throw new Error(e.getShaderInfoLog(c))}if(s=e.createProgram(),l.forEach(a=>e.attachShader(s,a)),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(s));g=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const t=document.createElement("canvas");t.width=160,t.height=16;const n=t.getContext("2d"),d=[["00000","00000","00000","00000","00000","00100","00100"],["00000","00100","00100","00000","00100","00100","00000"],["00000","00000","00000","11111","00000","00000","00000"],["00000","00000","11111","00000","11111","00000","00000"],["00000","00100","00100","11111","00100","00100","00000"],["00000","10101","01110","11111","01110","10101","00000"],["01010","01010","11111","01010","11111","01010","01010"],["11001","11010","00100","00100","01000","10110","00110"],["01110","10001","10111","10101","10111","10000","01111"]];n.fillStyle="#fff",d.forEach((a,o)=>a.forEach((c,y)=>[...c].forEach((E,w)=>{E==="1"&&n.fillRect(o*16+3+w*2,1+y*2,2,2)}))),n.fillRect(144,0,16,16),h=e.createTexture(),e.bindTexture(e.TEXTURE_2D,h),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);for(const a of[e.TEXTURE_MIN_FILTER,e.TEXTURE_MAG_FILTER])e.texParameteri(e.TEXTURE_2D,a,e.NEAREST);for(const a of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T])e.texParameteri(e.TEXTURE_2D,a,e.CLAMP_TO_EDGE);i={position:e.getAttribLocation(s,"position")};for(const a of["resolution","cssSize","progress","reverse","atlas","drift","scrollPhase","splitOffset","forwardColour","backwardColour"])i[a]=e.getUniformLocation(s,a);return!0}catch(t){return k("ascii_gpu_error",t),A(),console.warn("ASCII transition shader unavailable:",t),!1}finally{l.forEach(t=>e.deleteShader(t))}}if(!x())return null;const R=l=>{l.preventDefault(),T=!0,delete r.dataset.ready},M=()=>{T=!x(),T||b()};return r.addEventListener("webglcontextlost",R),r.addEventListener("webglcontextrestored",M),{draw(l,t,n,d,a=0,o=0,c=0,y=0){if(T||!l||!t)return;const E=Math.min(devicePixelRatio||1,2,4096/l,768/t,Math.sqrt(2e6/(l*t))),w=Math.max(1,Math.round(l*E)),S=Math.max(1,Math.round(t*E));(r.width!==w||r.height!==S)&&(r.width=w,r.height=S),e.viewport(0,0,w,S),e.useProgram(s),e.bindBuffer(e.ARRAY_BUFFER,g),e.enableVertexAttribArray(i.position),e.vertexAttribPointer(i.position,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,h),e.uniform1i(i.atlas,0),e.uniform2f(i.resolution,w,S),e.uniform2f(i.cssSize,l,t),e.uniform2f(i.splitOffset,c,y),e.uniform4fv(i.forwardColour,p),e.uniform4fv(i.backwardColour,v),e.uniform1f(i.scrollPhase,o),e.uniform1f(i.drift,a),e.uniform1f(i.progress,n),e.uniform1f(i.reverse,d?1:0),e.drawArrays(e.TRIANGLES,0,3),r.dataset.ready=""},dispose(){r.removeEventListener("webglcontextlost",R),r.removeEventListener("webglcontextrestored",M),A(),delete r.dataset.ready}}}let _;function C(){_?.();const r=[...document.querySelectorAll("[data-ascii-transition]")].map(t=>({layer:t,stage:t.querySelector(".ascii-stage"),visible:!1,canvas:t.querySelector("canvas"),gpu:null,attempted:!1,last:"",reverse:t.classList.contains("ascii-section-transition--exit")})),b=new AbortController,e=matchMedia("(prefers-reduced-motion: reduce)");let f=0,u=0,m=0,p=0,v=0,s=0,g=scrollY,h=performance.now();function i(){u=m=p=v=s=0}const T=t=>Math.max(0,Math.min(1,t));function A(t){if(f=0,document.hidden||e.matches||!r.some(o=>o.visible)){i();return}const n=s?Math.min(.05,(t-s)/1e3):1/60;s=t,u*=Math.exp(-n/.08),m+=(u-m)*(1-Math.exp(-n/.045)),p+=(-u-p)*(1-Math.exp(-n/.12)),v+=(u*.55-v)*(1-Math.exp(-n/.07));const d=Math.max(Math.abs(u),Math.abs(m),Math.abs(p),Math.abs(v))>.02;d||(u=m=p=v=0);const a=r.filter(o=>o.visible).map(o=>{const c=innerHeight*.35,y=innerHeight*.85,E=e.matches?1:T((y-o.stage.getBoundingClientRect().top)/Math.max(1,c));return{scene:o,progress:E,width:o.stage.clientWidth,height:o.stage.clientHeight}});for(const{scene:o,progress:c,width:y,height:E}of a){if(e.matches)continue;o.attempted||(o.attempted=!0,o.gpu=I(o.canvas,()=>{o.last="",x()}));const w=(scrollY/12%4096+4096)%4096,S=`${y}:${E}:${c.toFixed(4)}:${devicePixelRatio}:${Math.round(v)}:${w.toFixed(3)}:${m.toFixed(2)}:${p.toFixed(2)}`;o.gpu&&S!==o.last&&(o.gpu.draw(y,E,c,o.reverse,Math.round(v),w,m,p),o.last=S)}d&&r.some(o=>o.visible&&o.gpu)?x():s=0}function x(){!f&&!document.hidden&&(f=requestAnimationFrame(A))}const R=new IntersectionObserver(t=>{for(const n of t){const d=r.find(a=>a.stage===n.target);d&&(d.visible=n.isIntersecting)}x()});r.forEach(t=>R.observe(t.stage));function M(){const t=performance.now(),n=scrollY-g,d=Math.max(8,Math.min(64,t-h));g=scrollY,h=t,!document.hidden&&!e.matches&&r.some(a=>a.visible)&&(u=Math.max(-48,Math.min(48,n/d*18))),x()}window.addEventListener("scroll",M,{passive:!0,signal:b.signal}),window.addEventListener("resize",x,{signal:b.signal});function l(){cancelAnimationFrame(f),f=0,i(),g=scrollY,h=performance.now(),x()}document.addEventListener("visibilitychange",l,{signal:b.signal}),e.addEventListener("change",l,{signal:b.signal}),_=()=>{cancelAnimationFrame(f),i(),R.disconnect(),b.abort(),r.forEach(t=>t.gpu?.dispose())}}const P=()=>_?.(),U=r=>{r.persisted&&C()};C();document.addEventListener("astro:page-load",C);document.addEventListener("astro:before-swap",P);window.addEventListener("pagehide",P);window.addEventListener("pageshow",U);
