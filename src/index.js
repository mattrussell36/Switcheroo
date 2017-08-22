import Vue from 'vue';
import App from './App.vue';
import { EventBus } from './EventBus';

const app = new Vue({
  el: '#root',
  components: {
      App,
  },
  render(createElement) {
    return createElement(App)
  }
})
