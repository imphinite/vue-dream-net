import Vue from 'vue';
import axios from 'axios';

const namespaced = true;
const namespace = 'post';

const state = {
    postFormActive: null
};

const getters = {};

const actions = {
    showPostForm ({ commit }) {
        commit('SET_POST_FORM_ACTIVE', true);
    },
    createDreamPost ({ commit }, { content }) {
        return new Promise((resolve, reject) => {
            const baseAPI = process.env.BASE_API;
            const params = {
                content
            };

            axios.post(`${baseAPI}/posts`, params).then(response => {
                console.log(response);
                resolve(response);
            }).catch(err => {
                reject(err);
            })
        })
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
