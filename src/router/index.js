/* globals NProgress */
import Vue from 'vue'
import Router from 'vue-router';
import { constantRoutes } from './paths';
// import store from '../store'
import NProgress from 'nprogress';

Vue.use(Router);

/**
 * Create router.
 * Wrapped for dynamically generating routes bases on user/roles.
 */
const createRouter = () => new Router({
    base: '/',
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

// router gards
router.beforeEach((to, from, next) => {
    // Start progress animaiton
    NProgress.start();
    // let state = store.state
    // // debugger // eslint-disable-line
    // /*
    //     Initialize app in first route
    // */
    // if (!state.initialized) {
    //     store.dispatch('init');
    // }

    /*
      If page is not public, and the user is not authenticated
      save redirect and prompt login;
    if (to.matched.some(record => !record.meta.public) && !state.dt.user.authenticated) {

    } */
    /*
    if (to.matched.some(record => !record.meta.public)) {
    }
    */
    next();
});

router.afterEach((to, from) => {
    // End progress animation
    NProgress.done();
});

export default router;
