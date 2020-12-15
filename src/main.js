import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import toastr from 'toastr';

Vue.config.productionTip = false;

// TOASTR CONFIG
Object.defineProperty(Vue.prototype, '$toastr', { value: toastr });
toastr.options = {
  positionClass: "toast-bottom-right",
};

// EVENT BUS
export const bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
