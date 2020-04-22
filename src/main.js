import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
import '@progress/kendo-theme-default/dist/all.css'

//main
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'


//bootstrap
import { BootstrapVue } from 'bootstrap-vue'

//kendo widgets native and wrappers
import { Grid } from '@progress/kendo-vue-grid';
import '@progress/kendo-ui';
import { ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper';
import { NumericTextBox } from '@progress/kendo-vue-inputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-vue-dialogs';
import { PopupsInstaller } from '@progress/kendo-popups-vue-wrapper';


//Vue.config.productionTip = 

Vue.use(BootstrapVue);
Vue.use(VueResource);

Vue.component('Grid', Grid);
Vue.component('numerictextbox', NumericTextBox);
Vue.component('k-dialog', Dialog);
Vue.component('dialog-actions-bar', DialogActionsBar);

Vue.use(ButtonsInstaller);
Vue.use(PopupsInstaller);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


