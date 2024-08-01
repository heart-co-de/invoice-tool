import{ao as e,af as u,A as l,aw as y,ax as a,b as _,ay as h,az as P,aA as q,s as b}from"./index-74e51854.js";const g=i=>Array.isArray(i)?i:i==null?[]:[i],x=(i,n)=>n.reduce((t,o)=>({...t,[o]:g(t[o])}),i),f=i=>{const n=x(i,["invoice_position","customer"]),t=n.invoice_position;return{...n,total_price:t.reduce((o,r)=>o+r.price,0),invoice_position:t.sort((o,r)=>new Date(o.service_date)-new Date(r.service_date)).map(o=>({...o,unit_quantity:u.safeParse(o.unit_quantity).success?u.parse(o.unit_quantity):"Stunde"}))}},E=()=>{const i=N();return{nextInvoiceNumber:l(()=>{var r;const t=((r=i.data)==null?void 0:r.value)??[];return Math.max(...t.map(c=>c.invoice_number))+1}),...i}},M=i=>y(["invoice",i],async()=>{const{data:n,error:t}=await a.from("invoice").select(`
          *,
          invoice_position (
            *
          ),
          customer (
            *
          )
        `).eq("id",_(i));if(t)throw t;return f(n[0])},{enabled:l(()=>!!_(i))}),N=()=>y("invoice",async()=>{const{data:i,error:n}=await a.from("invoice").select(`
      *,
      invoice_position (
        *
      ),
      customer (
        *
      )
    `).order("invoice_number",{ascending:!1});if(n)throw n;return i.map(f)}),U=e.object({description:e.string(),price:e.number(),price_per_quantity:e.number(),quantity:e.number(),service_date:e.string().regex(/^\d{4}-\d{2}-\d{2}$/,"Invalid date format, should be YYYY-MM-DD"),unit_quantity:u,created_at:e.string().nullable().optional(),id:e.number().optional(),user_id:e.string().optional(),invoice_id:e.number().optional()}),S=e.object({invoice_number:e.number(),customer_id:e.number(),for_month:e.number(),for_year:e.number(),id:e.number().optional(),invoice_position:e.array(U)}),Q=()=>h(async i=>{console.log({invoiceData:i});const n=S.parse(i),t=await q(),o=b.omit(n,"invoice_position"),{data:r,error:c}=await a.from("invoice").upsert({...o.id?o:b.omit(o,"id"),user_id:t}).select("id");if(c)throw c;const[{id:v}]=r,d=n.invoice_position.map(s=>({...s,user_id:t,invoice_id:v})),I=d.filter(s=>!!s.id),{error:m}=await a.from("invoice_position").upsert(I);if(m)throw m;const w=d.filter(s=>!s.id),{error:p}=await a.from("invoice_position").insert(w);if(p)throw p;return{invoiceId:v}},{onSuccess:()=>{P.invalidateQueries({queryKey:"invoice"})}});export{S as U,M as a,E as b,Q as c,N as u};
