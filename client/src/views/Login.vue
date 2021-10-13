<template>
    <section class="section">
        <form class="box column is-offset-3 is-6" @submit.prevent="login()">
            <div class="field">
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        required
                        v-model="email"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="password"
                        placeholder="Password"
                        required
                        v-model="password"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-text-centered">
                    <button class="button is-success">Login</button>
                </p>
            </div>
        </form>
    </section>
</template>

<script>
import Session from "../services/session";

export default {
    data: () => ({
        email: null,
        password: null,
        Session,
    }),
    methods: {
        login() {
            this.Session.Login(this.email, this.password);
            this.$router.push("/");
        },
    },
};
</script>

<style>
</style>