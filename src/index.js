import Vue from 'vue';
import App from './components/App/App.vue';

const app = new Vue({
  el: '#root',
  render(createElement) {
    return createElement(App);
  },
});
