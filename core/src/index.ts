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
      path: '/',
      meta:meta({
        title:()=>"SIST バスの時刻表示",
        description:()=>"SIST 静岡理工科大学の交通アクセス。バス時刻をリアルタイムに表示します。個人用。2022年1月、2月、4月、5月...に対応します。"
      }),
      component: rootComponent
    },
    {
      path: '/list/:yyyy',
      meta:meta({
        title:(to:RouteLocationNormalized)=>{
          return `【過去データ】${to.params.yyyy}年のSISTバス時刻`;
        },
        description:(to:RouteLocationNormalized)=>{
          return `【過去データ】SIST 静岡理工科大学${to.params.yyyy}年の時刻表を表示します。`;
        }
      }),
      component:defineAsyncComponent(()=> import("./routes/list.vue"))
    }
  ]
});
setMetaData(router);
app.use(router);
app.mount("#app");