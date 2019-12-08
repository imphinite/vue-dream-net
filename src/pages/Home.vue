<template>
    <v-layout>
        <v-flex>
            <Header />
            <NavDrawer />
            <v-content>
                <Feed />
            </v-content>
        </v-flex>
    </v-layout>
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
