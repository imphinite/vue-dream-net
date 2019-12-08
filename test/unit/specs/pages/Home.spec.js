import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/pages/Home';

const localVue = createLocalVue();

describe('Home.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Home, {
            localVue
        });
    });

    test('Home is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
})
