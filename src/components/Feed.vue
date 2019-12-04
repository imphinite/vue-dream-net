<template>
    <v-card dark>
        <v-list two-line>
            <v-subheader
                v-if="subheader"
                :key="subheader"
            >
                {{ subheader }}
            </v-subheader>
            <template v-for="(post, index) in feed.data">
                <v-list-tile
                    :key="index"
                    avatar
                >
                    <v-list-tile-avatar>
                        <img :src="imageSrc(post.id)">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="post.content" />
                        <v-list-tile-sub-title v-html="post.subtitle" />
                    </v-list-tile-content>
                    <v-divider :inset="true" />
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Feed',
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
        imageSrc (id) {
            return `https://i.pravatar.cc/300?u=${id}`;
        }
    }
}
</script>
