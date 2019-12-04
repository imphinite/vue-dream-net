<template>
    <v-app
        id="500"
        class="error error-code-500 child-view"
    >
        <v-container
            fluid
            fill-height
        >
            <v-layout
                align-center
                justify-center
                row
            >
                <div class="text-md-center">
                    <h1>500</h1>
                    <h2 class="my-3 headline ">
                        Sorry, the server is down.
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
    name: 'StatusPage500',
    methods: {
        goHome: function () {
            this.$router.push({ path: '/' });
        }
    }
};
</script>
