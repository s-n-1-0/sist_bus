import { Router,RouteMeta,RouteLocationNormalized } from "vue-router";

export interface Meta extends RouteMeta{
    title?:(to:RouteLocationNormalized)=>string,
    description?:(to:RouteLocationNormalized)=>string,
    canonicalHref?:(to:RouteLocationNormalized)=>string
}
export function meta(meta:Meta){
    return meta;
}
export function setMetaData(router:Router){
    router.beforeEach((to,from,next)=>{
        to
        let meta:Meta = to.meta;
        if(meta.title)setTitle(meta.title(to));
        if(meta.description)setDescription(meta.description(to));
        if(meta.canonicalHref)setCanonical(meta.canonicalHref(to));
        next();
    });
}
function setTitle(title:string){
    if(title == "") return;
    window.document.title = title;
  };

export function setDescription(description:string) {
    if(description == "") return;
    var el = document
    .querySelector("meta[name='description']");
    var newEl = null;
    if(!el){
        newEl = document.createElement("meta");
        newEl.setAttribute("name","description");
        el = newEl
    }
    el?.setAttribute('content', description);
    if(newEl) document.head.appendChild(newEl);
};
export function setCanonical(canonicalHref:string){
    if(canonicalHref == "") return;
    var el = document
    .querySelector("link[rel='canonical']");
    var newEl = null;
    if(!el){
        newEl = document.createElement("link");
        newEl.setAttribute("rel","canonical");
        el = newEl
    }
    el?.setAttribute('href', canonicalHref);
    if(newEl) document.head.appendChild(newEl);
}