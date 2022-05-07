import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login_index.vue'
import Home from '@/views/Home_index.vue'
import User from '@/views/user/UserManage.vue'
import Welcome from '@/views/WelcomeIndex.vue'
import Role from '@/views/rights/RoleManage.vue'
import Right from '@/views/rights/RightsManage.vue'
import Goods from '@/views/goods/GoodsList.vue'
import Params from '@/views/goods/CategoryKey.vue'
import Category from '@/views/goods/GoodsCategory.vue'

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
    }, {
      path: 'roles', component: Role
    }, {
      path: 'rights', component: Right
    }, {
      path: 'goods', component: Goods
    },
    { path: 'params', component: Params },
    { path: 'categories', component: Category }]
  }

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
