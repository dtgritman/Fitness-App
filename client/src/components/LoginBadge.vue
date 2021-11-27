<template>
    <div class="buttons" v-if="!session.user">
        <a class="navbar-item" @click="$router.push('/login')">Login</a>
        <a class="navbar-item" @click="$router.push('/signup')">Sign Up</a>
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
