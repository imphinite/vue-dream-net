import Vue from 'vue';
import axios from 'axios';

const namespaced = true;
const namespace = 'feed';

const state = {
    data: [],
    pagination: {
        total: 0,
        current: 1,
        previous: null,
        next: null,
        last: null
    }
};

const getters = {};

const actions = {
    getDreamPosts ({ commit }) {
        return new Promise((resolve, reject) => {
            const baseAPI = process.env.BASE_API;
            axios.get(`${baseAPI}/posts`).then(response => {
                const { data } = response.data;
                commit('SET_DREAM_POSTS', data);
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }
};

const mutations = {
    SET_DREAM_POSTS (state, data) {
        Vue.set(state, 'data', data);
    },
    SET_PAGINATION (state, pagination) {
        Vue.set(state, 'pagination', pagination);
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
