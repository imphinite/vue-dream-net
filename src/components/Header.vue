<template>
    <v-toolbar
        dark
        justify-center
    >
        <v-toolbar-side-icon @click.stop="toggleDrawer" />
        <Search v-show="search.active" />

        <v-toolbar-title v-show="!search.active">
            DreamNet
        </v-toolbar-title>
        <v-spacer v-show="!search.active" />

        <v-toolbar-items>
            <v-btn
                icon
                @click.stop="toggleSearchInput"
            >
                <v-icon v-if="!search.active">
                    search
                </v-icon>
                <v-icon v-else>
                    close
                </v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Search from '@/components/Search';

export default {
    name: 'Header',
    components: {
        Search
    },
    computed: {
        ...mapState(['search'])
    },
    methods: {
        ...mapActions('navigation', [
            'toggleDrawer'
        ]),
        ...mapActions('search', [
            'toggleSearchInput'
        ])
    }
}
</script>
