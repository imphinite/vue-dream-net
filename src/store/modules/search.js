import Vue from 'vue';

const namespaced = true;
const namespace = 'search';

const state = {
    active: null,
};

const getters = {};

const actions = {
    toggleSearchInput ({ commit }) {
        commit('SET_SEARCH_INPUT', !state.active);
    }
};

const mutations = {
    SET_SEARCH_INPUT (state, active) {
        Vue.set(state, 'active', active);
    },
};

export default {
    namespaced,
    namespace,
    state,
    getters,
    actions,
    mutations,
};
