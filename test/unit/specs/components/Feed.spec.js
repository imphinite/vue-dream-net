import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import VuePageTransition from 'vue-page-transition';
import Feed from '@/components/Feed';

const localVue = createLocalVue();

Vue.use(Vuex);
Vue.use(VuePageTransition);

describe('Feed.vue', () => {
    let wrapper;
    let store;
    let feedModule;

    beforeEach(() => {
        feedModule = {
            namespaced: true,
            actions: {
                getDreamPosts: jest.fn()
            }
        }

        store = new Vuex.Store({
            modules: {
                feed: feedModule
            }
        });
        wrapper = shallowMount(Feed, {
            localVue,
            store
        });
    });

    test('Feed is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('mounted() calls feed.getDreamPosts()', () => {
        expect(feedModule.actions.getDreamPosts).toHaveBeenCalled();
    });

    test('methods.imageSrc', () => {
        const id = 'anId';
        const src = wrapper.vm.imageSrc(id);
        expect(src).toBe('https://i.pravatar.cc/300?u=anId');
    });
})
