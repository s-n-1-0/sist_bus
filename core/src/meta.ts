import { Router,RouteMeta,RouteLocationNormalized } from "vue-router";

export interface Meta extends RouteMeta{
    title?:(to:RouteLocationNormalized)=>string
}
export function meta(meta:Meta){
    return meta;
}
export function setMetaData(router:Router){
    router.beforeEach((to,from,next)=>{
        to
        let meta:Meta = to.meta;
        if(meta.title)setTitle(meta.title(to));
        next();
    });
}
function setTitle(title:string){
    if(title == "") return;
    window.document.title = title;
  };