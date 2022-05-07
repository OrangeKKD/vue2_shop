import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'
import common from '@/utils/commonFn'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(common)
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
