const i=[{value:"B_STATION",label:"商家平台"},{value:"O_SITE",label:"开放平台"},{value:"A2A_SITE",label:"AI付官网"},{value:"OTHER",label:"其他"}];function l(){if(typeof window>"u")return"A2A_SITE";const n=new URLSearchParams(window.location.search).get("chinfo");return n===null?"A2A_SITE":i.some(e=>e.value===n)?n:"OTHER"}function u(t){return/^1[3-9]\d{9}$/.test(t)}function s(t){if(!t)return null;const n=t.trim().match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);if(n){const[,a,o,r]=n;return new Date(Number(a),Number(o)-1,Number(r),23,59,59,999).getTime()}const e=new Date(t.replace(/[.-]/g,"/")).getTime();return Number.isNaN(e)?null:e}function m(t,n=Date.now()){const e=s(t);return e!==null&&n>e}function d(t){return new Intl.NumberFormat("zh-CN").format(t)}function f(t,n=3e3){let e=document.getElementById("incentive-toast-container");e||(e=document.createElement("div"),e.id="incentive-toast-container",e.style.cssText=`
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      pointer-events: none;
    `,document.body.appendChild(e));const a=document.createElement("div");a.className="incentive-toast",a.textContent=t,a.style.cssText=`
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: fadeInDown 0.3s ease;
  `,e.appendChild(a),setTimeout(()=>{a.style.animation="fadeOutUp 0.3s ease",setTimeout(()=>{a.remove()},300)},n)}function c(){if(document.getElementById("incentive-toast-styles"))return;const t=document.createElement("style");t.id="incentive-toast-styles",t.textContent=`
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOutUp {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-20px);
      }
    }
  `,document.head.appendChild(t)}typeof document<"u"&&c();export{d as f,l as g,m as i,f as s,u as v};
