import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.config.productionTip = false
import store from './store';

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
