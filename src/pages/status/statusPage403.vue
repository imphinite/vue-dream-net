<template>
    <v-app
        id="403"
        class="error error-code-403"
    >
        <v-container
            fluid
            fill-height
        >
            <v-layout
                align-center
                justify-center
            >
                <div class="text-md-center">
                    <h1>403</h1>
                    <h2 class="my-3 headline ">
                        Sorry, access denied.
                    </h2>
                    <div>
                        <v-btn
                            color="primary"
                            @click="goHome"
                        >
                            Go Home
                        </v-btn>
                    </div>
                </div>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: 'StatusPage403',
    methods: {
        goHome () {
            this.$router.push({ path: '/' });
        }
    }
};
</script>
