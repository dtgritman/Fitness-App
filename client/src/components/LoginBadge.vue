<template>
    <div v-if="!session.user">
        <router-link class="navbar-item is-inline-block py-3" to="/login">Login</router-link>
        <router-link class="navbar-item is-inline-block py-3" to="/signup">Sign Up</router-link>
    </div>
    <div v-else>
        <p class="navbar-item is-inline-block py-3">Hello, {{ name }}</p>
        <a class="navbar-item is-inline-block py-3" @click="logout">Logout</a>
    </div>
</template>

<script>
import session from "../services/session";

export default {
    data: () => ({
        session,
    }),
    methods: {
        logout() {
            this.session.logout();
            this.$router.push("/");
        }
    },
    computed: {
        name() {
            return this.session.user.firstName + " " + this.session.user.lastName;
        },
    },
};
</script>

<style>
</style>
