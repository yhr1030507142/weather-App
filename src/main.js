// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'

// import MintUi from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import 'mint-ui/lib/index'
import $ from 'jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import './assets/font-awesome/scss/font-awesome.scss'
Vue.config.productionTip = false
Vue.prototype.axios =axios;
Vue.prototype.$http= axios;
// Vue.use(MintUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
