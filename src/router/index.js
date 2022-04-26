import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login_index.vue'
import Home from '@/views/Home_index.vue'
import User from '@/views/user/UserManage.vue'
import Welcome from '@/views/WelcomeIndex.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [{
      path: 'welcome', component: Welcome
    }, {
      path: 'users', component: User
    }]
  }
  // { path: '/users', component: User }

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
