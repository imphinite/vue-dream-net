<template>
    <v-app
        id="dnet-container"
        dark
    >
        <vue-page-transition name="fade-in-right">
            <router-view />
        </vue-page-transition>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    watch: {
        $route: function (to, from) {
            // TODO solidify transition logic and
            // cleanup.
            //
            // Set default transition value
            // this.transitionName = null;
            // console.log(to, from)
            // Set the transition value from the route, if it's defined.
            // let transformed = _.get(to, 'meta.transition.name');
            // if (typeof transformed !== 'undefined') {
            //     this.transitionName = to.meta.transition.name;
            // }
        }
    },
};
</script>
