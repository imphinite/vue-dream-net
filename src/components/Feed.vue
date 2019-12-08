<template>
    <v-card>
        <v-list
            v-if="feed.data"
            two-line
            class="feed-container"
        >
            <template v-for="(post, index) in feed.data">
                <Post
                    :key="index"
                    :id="post.id"
                    :content="post.content"
                    :author="post.author.data"
                    :date="post.date"
                />
            </template>
        </v-list>
        <v-btn
            class="create-dream-post-btn"
            dark
            fab
            @click="showPostForm"
        >
            <v-icon>add</v-icon>
        </v-btn>
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
    data () {
        return {
            subheader: 'Today'
        }
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
        ...mapActions('post', [
            'showPostForm'
        ])
    }
}
</script>

<style scoped>
.feed-container {
    background-color: #616161;
}
.create-dream-post-btn {
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 99;
}
</style>
