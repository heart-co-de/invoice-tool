import{G as N,y as O,b as U,an as x,ao as D,z as R,a0 as k,ap as z,M as v,a3 as F}from"./index-c0461d2d.js";var B;const G=typeof window<"u",_=n=>typeof n=="function",j=n=>typeof n=="string",q=()=>{};G&&((B=window==null?void 0:window.navigator)!=null&&B.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function l(n){return typeof n=="function"?n():U(n)}function P(n,r=!1,o="Timeout"){return new Promise((f,p)=>{setTimeout(r?()=>p(o):f,n)})}function E(n){return n}function H(n){return x()?(z(n),!0):!1}function J(n){return typeof n=="function"?N(n):O(n)}function K(n,r=!0){D()?R(n):r?n():k(n)}function h(n,r=!1){function o(e,{flush:t="sync",deep:i=!1,timeout:u,throwOnTimeout:d}={}){let s=null;const w=[new Promise(m=>{s=v(n,c=>{e(c)!==r&&(s==null||s(),m(c))},{flush:t,deep:i,immediate:!0})})];return u!=null&&w.push(P(u,d).then(()=>l(n)).finally(()=>s==null?void 0:s())),Promise.race(w)}function f(e,t){if(!F(e))return o(c=>c===e,t);const{flush:i="sync",deep:u=!1,timeout:d,throwOnTimeout:s}=t??{};let a=null;const m=[new Promise(c=>{a=v([n,e],([T,b])=>{r!==(T===b)&&(a==null||a(),c(T))},{flush:i,deep:u,immediate:!0})})];return d!=null&&m.push(P(d,s).then(()=>l(n)).finally(()=>(a==null||a(),l(n)))),Promise.race(m)}function p(e){return o(t=>Boolean(t),e)}function A(e){return f(null,e)}function C(e){return f(void 0,e)}function M(e){return o(Number.isNaN,e)}function S(e,t){return o(i=>{const u=Array.from(i);return u.includes(e)||u.includes(l(e))},t)}function g(e){return y(1,e)}function y(e=1,t){let i=-1;return o(()=>(i+=1,i>=e),t)}return Array.isArray(l(n))?{toMatch:o,toContains:S,changed:g,changedTimes:y,get not(){return h(n,!r)}}:{toMatch:o,toBe:f,toBeTruthy:p,toBeNull:A,toBeNaN:M,toBeUndefined:C,changed:g,changedTimes:y,get not(){return h(n,!r)}}}function L(n){return h(n)}export{j as a,l as b,_ as c,E as d,K as e,G as i,q as n,J as r,H as t,L as u};
