import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
import '@progress/kendo-theme-default/dist/all.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Grid } from '@progress/kendo-vue-grid'

// import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = 

// Vue.use(BootstrapVue)
Vue.component('Grid', Grid);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

