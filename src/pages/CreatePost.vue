<template>
    <v-layout>
        <v-flex>
            <Header />
            <NavDrawer />
            <v-content>
                <PostForm />
            </v-content>
        </v-flex>
    </v-layout>
</template>

<script>
import Header from '@/components/Header';
import NavDrawer from '@/components/NavDrawer';
import PostForm from '@/components/PostForm';

export default {
    components: {
        Header,
        NavDrawer,
        PostForm
    },
};
</script>
