import{G as _,aq as f,ar as r,b as d,as as I,a7 as m,at as b,au as h,s as p}from"./index-c0461d2d.js";const P=i=>Array.isArray(i)?i:i==null?[]:[i],q=(i,o)=>o.reduce((e,t)=>({...e,[t]:P(e[t])}),i),y=i=>{const o=q(i,["invoice_position","customer"]),e=o.invoice_position;return{...o,total_price:e.reduce((t,n)=>t+n.price,0),invoice_position:e.sort((t,n)=>new Date(t.service_date)-new Date(n.service_date)).map(t=>({...t,unit_quantity:m.safeParse(t.unit_quantity).success?m.parse(t.unit_quantity):"Stunde"}))}},E=()=>{const i=x();return{nextInvoiceNumber:_(()=>{var n;const e=((n=i.data)==null?void 0:n.value)??[];return Math.max(...e.map(a=>a.invoice_number))+1}),...i}},Q=i=>f(["invoice",i],async()=>{const{data:o,error:e}=await r.from("invoice").select(`
          *,
          invoice_position (
            *
          ),
          customer (
            *
          )
        `).eq("id",d(i));if(e)throw e;return y(o[0])},{enabled:_(()=>!!d(i))}),x=()=>f("invoice",async()=>{const{data:i,error:o}=await r.from("invoice").select(`
      *,
      invoice_position (
        *
      ),
      customer (
        *
      )
    `).order("created_at",{ascending:!1});if(o)throw o;return i.map(y)}),U=()=>I(async i=>{const o=await h(),e=p.omit(i,"invoice_position"),{data:t,error:n}=await r.from("invoice").upsert({...e.id?e:p.omit(e,"id"),user_id:o}).select("id");if(n)throw n;const[{id:a}]=t,c=i.invoice_position.map(s=>({...s,user_id:o,invoice_id:a})),l=c.filter(s=>!!s.id),{error:u}=await r.from("invoice_position").upsert(l);if(u)throw u;const w=c.filter(s=>!s.id),{error:v}=await r.from("invoice_position").insert(w);if(v)throw v;return{invoiceId:a}},{onSuccess:()=>{b.invalidateQueries({queryKey:"invoice"})}});export{Q as a,E as b,U as c,x as u};
