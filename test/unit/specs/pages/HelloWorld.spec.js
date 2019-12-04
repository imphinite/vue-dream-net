import { shallowMount, createLocalVue } from '@vue/test-utils';
import HelloWorld from '@/pages/HelloWorld';

const localVue = createLocalVue();

describe('HelloWorld.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(HelloWorld, {
            localVue
        });
    });

    test('HelloWorld is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
})
