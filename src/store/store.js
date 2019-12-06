import Vue from 'vue';
import Vuex from 'vuex';
import feed from './modules/feed';
import navigation from './modules/navigation';
import search from './modules/search';

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
        navigation,
        search
    }
});

export default store;
