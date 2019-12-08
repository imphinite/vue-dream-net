<template>
    <v-container>
        <v-card
            class="mx-auto"
            dark
            max-width="600"
        >
            <v-card-title class="p-0">
                <v-flex xs4 offset-xs8 align-end>
                    <v-icon>gesture</v-icon>
                    <span class="font-weight-light">{{ date }}</span>
                </v-flex>
            </v-card-title>

            <v-card-text class="headline font-weight-light">
                {{ content }}
            </v-card-text>

            <v-card-actions>
                <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        :src="imageSrc"
                    ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ author.name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-layout
                        align-center
                        justify-end
                    >
                        <v-icon class="mr-1">favorite_border</v-icon>
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-icon class="mr-1">share</v-icon>
                        <span class="subheading">45</span>
                    </v-layout>
                </v-list-tile>
            </v-card-actions>
        </v-card>
    </v-container>
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
            type: String,
            required: true
        }
    },
    computed: {
        imageSrc () {
            return `https://i.pravatar.cc/300?u=${this.id}@dnet.com`;
        }
    }
}
</script>

<style scoped>
.p-0 {
    padding: 0;
}
</style>
