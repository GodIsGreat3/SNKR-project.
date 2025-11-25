import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Cart from '../pages/Cart.vue'  
import Registration from '@/pages/Registration.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart',         
    name: 'Cart.vue',
    component: Cart
  },
  {
    path: '/register-page',
    name: 'Registration.vue',
    component: Registration
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
