import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

import 'common/style/index.scss'
fastclick.attach(document.body);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./common/image/default.png'),
    loading: require('./common/image/default.png'),
    attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
