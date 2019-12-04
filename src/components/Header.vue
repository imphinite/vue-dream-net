<template>
    <v-toolbar
        dark
        justify-center
    >
        <v-toolbar-side-icon @click.stop="toggleDrawer" />
        <v-toolbar-title>DreamNet</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Header',
    methods: {
        ...mapActions('navigation', [
            'toggleDrawer'
        ])
    }
}
</script>
