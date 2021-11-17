<template>
    <section class="section">
        <form class="box column is-offset-3 is-6" @submit.prevent="login()">
            <div class="field">
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        placeholder="Handle"
                        required
                        v-model="username"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
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
import session from "../services/session";

export default {
    name: "Login",
    data: () => ({
        username: null,
        password: null,
        session,
    }),
    methods: {
        login() {
            let handle = this.username;
            if (handle.charAt(0) != '@')
                handle = '@' + handle;

            this.session.login(handle, this.password);
        },
    },
};
</script>

<style>
</style>