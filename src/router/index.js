import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'
import Registration from '@/pages/Registration.vue'
import Authorisation from '@/pages/Authorisation.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'Cart.vue',
    component: Cart,
  },
  {
    path: '/register-page',
    name: 'Registration.vue',
    component: Registration,
  },
  {
    path: '/auth-page',
    name: 'Authorisation.vue',
    component: Authorisation,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
