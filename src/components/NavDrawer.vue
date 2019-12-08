<template>
    <v-navigation-drawer
        v-model="navigation.drawer"
        dark
        absolute
        temporary
    >
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">
                        DreamNet
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-divider />
        <v-list
            dense
            class="pt-0"
        >
            <v-list-tile
                v-for="page in pages"
                :key="page.title"
                @click="handleRouting(page.path)"
            >
                <v-list-tile-action>
                    <v-icon>{{ page.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ page.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NavDrawer',
    data () {
        return {
            pages: [
                { title: 'Home', icon: 'dashboard', path: '/' },
                { title: 'About', icon: 'question_answer', path: '/about' }
            ]
        }
    },
    computed: {
        ...mapState(['navigation'])
    },
    methods: {
        ...mapActions('navigation', [
            'toggleDrawer'
        ]),
        handleRouting (path) {
            this.toggleDrawer();
            this.$router.push(path);
        }
    }
}
</script>
