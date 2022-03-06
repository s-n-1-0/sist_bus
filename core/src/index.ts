import { createRouter,createWebHistory } from "vue-router";
import {createApp}from "vue";
import rootComponent from "./routes/index.vue";
import listComponent from "./routes/list.vue";
let app = createApp({
    setup(){
        return {
           
        }
    }
})
app.use(createRouter({
    history:createWebHistory(),
    routes:[
      {
        path: '/',
        component: rootComponent
      },
      {
        path: '/list/:yyyy',
        component:listComponent
      }
    ]
}));
app.mount("#app");