import rootComponent from "@/views/index.vue";
import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory("/sist_bus/"),
  routes: [
    {
      path: "/",
      component: rootComponent,
    },
    {
      path: "/archive",
      component: defineAsyncComponent(
        () => import("@/views/archive/index.vue")
      ),
    },
    {
      path: "/archive/:yyyy",
      component: defineAsyncComponent(() => import("@/views/archive/yyyy.vue")),
    },
  ],
});
export default router;
