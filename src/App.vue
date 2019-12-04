<template>
    <v-app
        id="dnet-container"
        dark
    >
        <Header />
        <NavDrawer />
        <v-content>
            <Feed />
        </v-content>
    </v-app>
</template>

<script>
import Header from '@/components/Header';
import NavDrawer from '@/components/NavDrawer';
import Feed from '@/components/Feed';

export default {
    name: 'App',
    components: {
        Header,
        NavDrawer,
        Feed
    },
};
</script>
