import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import router from './routes'
import store from './store';


import { MdCard,MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdField);
Vue.use(VueRouter);
Vue.use(VueResource)
Vue.http.options.root = "http://ec2-13-234-50-124.ap-south-1.compute.amazonaws.com:7070/",

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
