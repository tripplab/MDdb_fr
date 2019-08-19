import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import usersRoutes from './users_routes'
import store from '@/store/index'

Vue.use(VueRouter)

const authenticate = (to, from, next) => {
  if (store.getters.loggedIn) {
    next()
    return
  }
  next('/login')
}

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Dashboard, beforeEnter: authenticate },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: authenticate },
    { path: '/login', name: 'login', component: Login, meta: { layout: 'empty' } },
    { path: '/logout',
      beforeEnter (to, from, next) {
        store.commit('logout')
        next('/login')
      }
    }
  ]
    .concat(usersRoutes.map(route => { return { ...route, ...{ beforeEnter: authenticate } } }))
})
