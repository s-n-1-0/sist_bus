import { createRouter,createWebHashHistory, RouteLocationNormalized } from "vue-router";
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
  history:createWebHashHistory('/sist_bus/'),
  routes:[
    {
      path: '/',
      meta:meta({
        title:()=>"SIST バスの時刻表示"
      }),
      component: rootComponent
    },
    {
      path: '/archive',
      meta:meta({
        title:(to:RouteLocationNormalized)=>{
          return `【年別過去データ】SISTバス時刻`;
        }
      }),
      component:defineAsyncComponent(()=> import("./routes/archive/index.vue"))
    },
    {
      path: '/archive/:yyyy',
      meta:meta({
        title:(to:RouteLocationNormalized)=>{
          return `【過去データ】${encodeURIComponent(to.params.yyyy as string)}年のSISTバス時刻`;
        }
      }),
      component:defineAsyncComponent(()=> import("./routes/archive/yyyy.vue"))
    }
  ]
});
setMetaData(router);
app.use(router);
app.mount("#app");