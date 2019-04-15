import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
// import 'lib-flexible/flexible'

import ElementUI from "element-ui";
import service from "./utils/https";
import urls from "./utils/urls"
Vue.config.productionTip = false

Vue.prototype.$https = service
Vue.prototype.$urls = urls

Vue.use(ElementUI,{size:'mini'})
Vue.use(VueSimplemde)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
