import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout/index.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      children: [{
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
      },{
        path: 'edit',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "about" */ './views/Edit.vue')
      },{
        path: 'article',
        name: 'Article',
        component: () => import(/* webpackChunkName: "about" */ './views/Article.vue')
      }]
    }
  ]
})
