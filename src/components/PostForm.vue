<template>
    <v-container class="post-form-container">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-textarea
                v-model="content"
                :counter="2000"
                :rules="contentRules"
                label="Your Dream"
                auto-grow
                required
            />

            <v-btn
                :disabled="!valid"
                light
                block
                @click="handleSubmit"
            >
                Post
            </v-btn>
            <v-btn
                dark
                block
                @click="handleRouting"
            >
                Back
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'PostForm',
    data () {
        return {
            valid: true,
            content: '',
            contentRules: [
                v => !!v || 'Content is required',
                v => (v && v.length <= 2000) || 'Content must be less than 2000 characters'
            ],
        }
    },
    methods: {
        ...mapActions('post', [
            'createDreamPost'
        ]),
        handleRouting () {
            this.$router.push('/');
        },
        handleSubmit () {
            if (this.$refs.form.validate()) {
                this.createDreamPost({
                    content: this.content
                }).then(() => {
                    this.$router.push('/');
                });
            }
        }
    }
}
</script>

