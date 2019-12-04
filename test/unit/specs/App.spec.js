import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import VuePageTransition from 'vue-page-transition';
import App from '@/App';

const localVue = createLocalVue();

Vue.use(Vuex);
Vue.use(VuePageTransition);

describe('App.vue', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            actions: {
                getScreenWidth: jest.fn(),
            }
        });
        wrapper = shallowMount(App, {
            localVue,
            store,
            stubs: ['router-link', 'router-view']
        });
    });

    test('App is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
})
