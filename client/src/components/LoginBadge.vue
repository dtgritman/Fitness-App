<template>
    <div class="buttons" v-if="!session.user">
        <router-link class="navbar-item" to="/login">Login</router-link>
        <router-link class="navbar-item" to="/signup">Sign Up</router-link>
    </div>
    <div class="buttons" v-else>
        <p class="navbar-item">Hello, {{ name }}</p>
        <a class="navbar-item" @click="logout">Logout</a>
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
