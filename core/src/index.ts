import { createRouter,createWebHashHistory } from "vue-router";
import {createApp}from "vue";
import rootComponent from "./routes/index.vue";
let app = createApp({
    setup(){
        return {
           
        }
    }
})
app.use(createRouter({
    history:createWebHashHistory(),
    routes:[
      {
        path: '/',
        component: rootComponent
      }
    ]
}));
app.mount("#app");