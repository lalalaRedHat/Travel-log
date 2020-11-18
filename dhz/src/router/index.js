import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Personage from '../views/Personage.vue'
import Agreement from '../views/Agreement.vue'
import Mylv from '../views/Mylv.vue'
import Vip from '../views/Vip.vue'
import KeepDiary from '../views/KeepDiary.vue'
import Tag from '../views/Tag.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/vip',
    name: 'Vip',
    component:Vip
  },
  {
    path: '/tag',
    name: 'Tag',
    component:Tag
  },
  {
    path: '/agreement',
    name: 'Agreement',
    component:Agreement
  },
  {
    path: '/mylv/:id',
    name: 'Mylv',
    component:Mylv
  },
  {
    path: '/personage',
    name: 'Personage',
    component: Personage
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/keepdiary',
    name: 'KeepDiary',
    component: KeepDiary
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
