<template>
    <v-card>
        <v-list
            v-if="feed.data"
            two-line
            class="feed-container"
        >
            <template v-for="(post, index) in feed.data">
                <Post
                    :id="post.id"
                    :key="index"
                    :content="post.content"
                    :author="post.author.data"
                    :date="post.date"
                />
            </template>
        </v-list>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Post from '@/components/Post';

export default {
    name: 'Feed',
    components: {
        Post
    },
    computed: {
        ...mapState(['feed'])
    },
    mounted () {
        this.getDreamPosts();
    },
    methods: {
        ...mapActions('feed', [
            'getDreamPosts'
        ]),
    }
}
</script>

<style scoped>
.feed-container {
    background-color: #616161;
}
</style>
