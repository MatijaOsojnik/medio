import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import {
  TiptapVuetifyPlugin
} from "tiptap-vuetify";

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: 'mdi'
});


import moment from 'moment'

Vue.filter('formatStoryDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMM D')
  }
})

Vue.filter('formatUserDate', function (value) {
  if (value) {
    return moment(String(value)).format('MMMM YYYY')
  }
})

Vue.filter('shortString', function (str) {
    if (str.length <= 50) {
      return str
    }
    return str.slice(0, 50) + '...'
  }
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')