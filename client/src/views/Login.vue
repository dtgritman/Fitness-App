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
            if (this.username.charAt(0) != '@')
                this.username = '@' + this.username;
            try {
                this.session.login(this.username, this.password);
            } catch (e) {
                if (e.code == 401) {
                    session.notifications.push({ message: e.message, type: "danger" });
                } 
                else
                    throw e;
            }
        },
    },
};
</script>

<style>
</style>