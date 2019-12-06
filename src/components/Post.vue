<template>
    <v-list-tile
        avatar
    >
        <v-list-tile-avatar>
            <img :src="imageSrc">
        </v-list-tile-avatar>

        <v-list-tile-content>
            {{ post.content }}
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
    name: 'Post',
    props: {
        id: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: Object,
            default: () => {
                return {
                    name: 'anonymous',
                    avatar: `https://i.pravatar.cc/300?u=anonymous@dnet.com`
                }
            }
        },
        date: {
            type: Date,
            required: true
        }
    },
    computed: {
        imageSrc () {
            return `https://i.pravatar.cc/300?u=${this.id}`;
        }
    }
}
</script>
