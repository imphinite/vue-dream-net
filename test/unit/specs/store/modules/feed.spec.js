import '@babel/polyfill';
import feed from '@/store/modules/feed';
import moxios from 'moxios';

describe('modules/feed', () => {
    describe('actions', () => {
        const { actions } = feed;
        let commit;

        beforeEach(() => {
            commit = jest.fn();
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        test('actions.getDreamPosts', async () => {
            const baseAPI = process.env.BASE_API;
            moxios.stubRequest(`${baseAPI}/users/1/posts`, {
                status: 200,
                response: [{}, {}]
            });
            await actions.getDreamPosts({ commit });
            expect(commit).toHaveBeenCalledWith('SET_DREAM_POSTS', [{}, {}]);
        });
    });

    describe('mutations', () => {
        const { mutations } = feed;
        let state;

        beforeEach(() => {
            state = {
                data: [],
                pagination: {
                    total: 0,
                    current: 1,
                    previous: null,
                    next: null,
                    last: null
                }
            }
        });

        test('mutations.SET_DREAM_POSTS', () => {
            const data = [{ id: 1 }, { id: 2 }];
            mutations.SET_DREAM_POSTS(state, data);
            expect(state.data.length).toBe(2);
        });

        test('mutations.SET_PAGINATION', () => {
            const pagination = { current: 2 };
            mutations.SET_PAGINATION(state, pagination);
            expect(state.pagination.current).toBe(2);
        });
    });
});

