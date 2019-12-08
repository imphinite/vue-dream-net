/**
 * Constant routes.
 * Routes that exist by default for every user/role.
 * Loaded at start.
 */
export const constantRoutes = [
    {
        path: '/',
        name: 'home',
        meta: {
            public: true,
            transition: 'fade-in-up',
        },
        component: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            '@/pages/Home'
        )
    },
    {
        path: '/403',
        name: 'statusPage403',
        meta: {
            public: true,
            transition: 'fade-in-up',
        },
        component: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            '@/pages/status/statusPage403.vue'
        )
    },
    {
        path: '/404',
        name: 'statusPage404',
        meta: {
            public: true,
            transition: 'overlay-left-right',
            // transition: {
            //     name: 'slide-left'
            // },
        },
        component: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            '@/pages/status/statusPage404.vue'
        )
    },
    {
        path: '/500',
        name: 'statusPage500',
        meta: {
            public: true,
            transition: 'fade-in-up',
        },
        component: () => import(
            /* webpackChunkName: "routes" */
            /* webpackMode: "lazy" */
            '@/pages/status/statusPage500.vue'
        )
    },
    {
        path: '*',
        meta: {
            public: true,
            transition: 'fade',
        },
        redirect: {
            path: '/404'
        }
    },
];

/**
 * Async routes.
 * Generated based on certain user/roles.
 * Generated at runtime after authentication.
 */
export const asyncRoutes = [];
