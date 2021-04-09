// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here

import Viewer from '@/components/Viewer'
import FAQ from '@/components/FAQ'
import store from './store.js'
import App from './App'
import vueSlider from 'vue-slider-component'

Vue.config.productionTip = false

Vue.use(VueMaterial)

// register
Vue.component('vue-slider', vueSlider)
Vue.component('viewer', Viewer)
Vue.component('faq', FAQ)

const truncate = function(text, length, clamp){
    clamp = clamp || '...';
    const node = document.createElement('div');
    node.innerHTML = text;
    const content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', truncate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    store: store,
    router: router
  },
  template: '<App/>',
  components: {App}
})
