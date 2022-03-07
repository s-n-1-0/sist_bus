import { createRouter,createWebHistory, RouteLocationNormalized } from "vue-router";
import {createApp,defineAsyncComponent}from "vue";
import rootComponent from "./routes/index.vue";
import { setMetaData,meta } from "./meta";
let app = createApp({
    setup(){
        return {
           
        }
    }
})
const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path: '/sist_bus',
      meta:meta({
        title:()=>"SIST バスの時刻表示",
        description:()=>"SIST 静岡理工科大学の交通アクセス。バス時刻をリアルタイムに表示します。個人用。2022年1月、2月、4月、5月...に対応します。",
        canonicalHref:()=>"https://s-n-1-0.github.io/sist_bus/"
      }),
      component: rootComponent
    },
    {
      path: '/sist_bus/list/:yyyy',
      meta:meta({
        title:(to:RouteLocationNormalized)=>{
          return `【過去データ】${encodeURIComponent(to.params.yyyy as string)}年のSISTバス時刻`;
        },
        description:(to:RouteLocationNormalized)=>{
          return `【過去データ】SIST 静岡理工科大学${encodeURIComponent(to.params.yyyy as string)}年の時刻表を表示します。`;
        },
        canonicalHref:(to:RouteLocationNormalized)=>`https://s-n-1-0.github.io/sist_bus/list/${encodeURIComponent(to.params.yyyy as string)}`
      }),
      component:defineAsyncComponent(()=> import("./routes/list.vue"))
    }
  ]
});
setMetaData(router);
app.use(router);
app.mount("#app");