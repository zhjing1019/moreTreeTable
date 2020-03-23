import Vue from 'vue'
import App from './App.vue'
import install from "./components/index.js"; // EgMessage
Vue.use(install);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
