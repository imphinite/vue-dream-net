import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/vuetify';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// Page transitions
import VuePageTransition from 'vue-page-transition';

Vue.config.productionTip = false;

// Page transitions
Vue.use(VuePageTransition);
Object.defineProperty(Vue.prototype, '$progress', {
    value: NProgress
});

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
