import Vue from 'vue';

const namespaced = true;
const namespace = 'post';

const state = {
    postFormActive: null
};

const getters = {};

const actions = {
    showPostForm ({ commit }) {
        commit('SET_POST_FORM_ACTIVE', true);
    }
};

const mutations = {
    SET_POST_FORM_ACTIVE (state, active) {
        Vue.set(state, 'postFormActive', active);
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
