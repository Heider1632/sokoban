import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import es from './translate/es';
import en from './translate/en';

Vue.config.productionTip = false
axios.defaults.baseURL='https://b-sokoban.herokuapp.com/api/'
//axios.defaults.baseURL='http://localhost:3000/api';
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'es',
  messages:{
    es,
    en
  }
})

export default i18n

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
