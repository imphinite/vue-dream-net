import Vue from 'vue';
import Vuex from 'vuex';
import feed from './modules/feed';
import navigation from './modules/navigation';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    strict: process.env.APP_ENV !== 'production',
    namespaced: true,
    modules: {
        feed,
        navigation
    }
});

export default store;
