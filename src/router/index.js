import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Update from '../views/Update.vue'
import Personage from '../views/Personage.vue'
import Agreement from '../views/Agreement.vue'
import Mylv from '../views/Mylv.vue'
import Vip from '../views/Vip.vue'
import KeepDiary from '../views/KeepDiary.vue'
import Tag from '../views/Tag.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Update',
    name: 'Update',
    component: () => import(/* webpackChunkName: "Update" */ '../views/Update.vue')
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import(/* webpackChunkName: "vip" */ '../views/Vip.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "tag" */ '../views/Tag.vue')
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component: () => import(/* webpackChunkName: "agreement" */ '../views/Agreement.vue')
  },
  {
    path: '/mylv/:aid',
    name: 'Mylv',
    component: () => import(/* webpackChunkName: "mylv" */ '../views/Mylv.vue')
  },
  {
    path: '/personage',
    name: 'Personage',
    component: () => import(/* webpackChunkName: "personage" */ '../views/Personage.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/keepdiary',
    name: 'KeepDiary',
    component: () => import(/* webpackChunkName: "keepdiary" */ '../views/KeepDiary.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
