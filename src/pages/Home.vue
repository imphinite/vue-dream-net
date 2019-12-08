<template>
    <v-layout>
        <v-flex>
            <Header />
            <NavDrawer />
            <v-content>
                <Feed />
            </v-content>
            <v-btn
                class="create-dream-post-btn"
                dark
                fab
                @click="handleShowPostForm"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/Header';
import NavDrawer from '@/components/NavDrawer';
import Feed from '@/components/Feed';

export default {
    components: {
        Header,
        NavDrawer,
        Feed
    },
    methods: {
        ...mapActions('post', [
            'showPostForm'
        ]),
        handleShowPostForm () {
            this.$router.push('/create-post');
        }
    },
};
</script>

<style scoped>
.create-dream-post-btn {
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 99;
}
</style>
