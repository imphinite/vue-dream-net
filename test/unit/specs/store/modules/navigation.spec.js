import navigation from '@/store/modules/navigation';

describe('modules/navigation', () => {
    let state;

    beforeEach(() => {
        state = {
            drawer: null
        }
    });

    describe('actions', () => {
        const { actions } = navigation;
        let commit;

        beforeEach(() => {
            commit = jest.fn();
        });

        test('actions.toggleDrawer', () => {
            actions.toggleDrawer({ commit });
            expect(commit).toHaveBeenCalledWith('SET_DRAWER_ACTIVE', true);
        });
    });

    describe('mutations', () => {
        const { mutations } = navigation;

        test('mutations.SET_DRAWER_ACTIVE', () => {
            expect(state.drawer).toBe(null);
            mutations.SET_DRAWER_ACTIVE(state, true);
            expect(state.drawer).toBe(true);
            mutations.SET_DRAWER_ACTIVE(state, false);
            expect(state.drawer).toBe(false);
        });
    });
});

