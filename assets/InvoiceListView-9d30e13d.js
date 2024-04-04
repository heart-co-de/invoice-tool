import{u as l}from"./useInvoice-87759295.js";import{d,c as o,f as e,F as m,h as _,b as r,o as a,g as n,i as u,j as h,U as x,t as s,E as p,C as f,k as g,l as y,m as k}from"./index-bca75412.js";const v={class:"mt-4 overflow-hidden bg-white shadow sm:rounded-md"},w={role:"list",class:"divide-y divide-gray-200"},C={class:"flex items-center px-4 py-4 sm:px-6"},b={class:"flex items-center flex-1 min-w-0"},I={class:"flex-shrink-0"},B=["src"],E={class:"flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4"},L={class:"text-sm font-medium text-indigo-600 truncate"},V={class:"flex items-center mt-2 text-sm text-gray-500"},F={class:"truncate"},N={class:"hidden md:block"},U={class:"text-sm text-gray-900"},j={class:"flex items-center mt-2 text-sm text-gray-500"},q=d({__name:"InvoiceListView",setup(D){const{data:c}=l();return(R,S)=>{const i=k("router-link");return a(),o("div",v,[e("ul",w,[(a(!0),o(m,null,_(r(c),t=>(a(),o("li",{key:t.id},[n(i,{to:`/invoice/${t.id}`,class:"block hover:bg-gray-50"},{default:u(()=>[e("div",C,[e("div",b,[e("div",I,[t.customer[0].image_url?(a(),o("img",{key:1,src:t.customer[0].image_url,alt:"",class:"h-12 w-12 rounded-full"},null,8,B)):(a(),h(r(x),{key:0,class:"h-12 w-12 text-gray-300","aria-hidden":"true"}))]),e("div",E,[e("div",null,[e("p",L,s(t.invoice_number)+" - "+s(t.customer[0].name),1),e("p",V,[n(r(p),{class:"mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400","aria-hidden":"true"}),e("span",F,s(t.for_month)+"."+s(t.for_year),1)])]),e("div",N,[e("div",null,[e("p",U," For Customer: "+s(t.customer[0].name),1),e("p",j,[n(r(f),{class:"mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400","aria-hidden":"true"}),g(" "+s(t.total_price),1)])])])])]),e("div",null,[n(r(y),{class:"w-5 h-5 text-gray-400","aria-hidden":"true"})])])]),_:2},1032,["to"])]))),128))])])}}});export{q as default};
