import VueRouter, { Route } from "vue-router";
import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $https: any;
    $urls: any;
    $Message: any;
    $Modal: any;
  }
}