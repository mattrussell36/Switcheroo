import Vue from 'vue';
import App from './App.vue';

const app = new Vue({
  el: '#root',
  render(createElement) {
    return createElement(App)
  }
})
