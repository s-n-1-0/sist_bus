import { createRouter,createWebHashHistory, RouteLocationNormalized } from "vue-router";
import {createApp,defineAsyncComponent,onMounted}from "vue";
import rootComponent from "./routes/index.vue";
import { setMetaData,meta } from "./meta";
let app = createApp({
    setup(){
        onMounted(()=>{
           //@ts-ignore
           twemoji?.parse(document.body);
        })
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
      path: '/archive/:yyyy',
      meta:meta({
        title:(to:RouteLocationNormalized)=>{
          return `【過去データ】${encodeURIComponent(to.params.yyyy as string)}年のSISTバス時刻`;
        }
      }),
      component:defineAsyncComponent(()=> import("./routes/archive.vue"))
    }
  ]
});
setMetaData(router);
app.use(router);
app.mount("#app");