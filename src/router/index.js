import Vue from 'vue'
import VueRouter from 'vue-router'
import Accueil from '../views/Accueil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion')
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import('../views/Inscription')
  },
]

const router = new VueRouter({
  routes
})

export default router
