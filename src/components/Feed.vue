<template>
    <v-card>
        <v-list v-if="feed.data" two-line>
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
        ])
    }
}
</script>
