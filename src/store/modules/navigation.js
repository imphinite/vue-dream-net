import Vue from 'vue';

const namespaced = true;
const namespace = 'navigation';

const state = {
    drawer: null
};

const getters = {};

const actions = {
    toggleDrawer ({ commit }) {
        commit('SET_DRAWER_ACTIVE', !state.drawer);
    }
};

const mutations = {
    SET_DRAWER_ACTIVE (state, active) {
        Vue.set(state, 'drawer', active);
    }
};

export default {
    namespaced,
    namespace,
    state,
    getters,
    actions,
    mutations,
};
