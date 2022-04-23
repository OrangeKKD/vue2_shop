import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login_index.vue'
import Home from '@/views/Home_index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }

]

const router = new VueRouter({
  routes
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
