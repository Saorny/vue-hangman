import Vue from 'vue';
import Vuex from 'vuex';
import routes from './routes/';
import store from './vuex/store';

Vue.use(Vuex)

const app = new Vue({
  el: 'body',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  },
  store
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
