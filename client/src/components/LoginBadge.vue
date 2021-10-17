<template>
    <div class="buttons" v-if="!Session.user">
        <a class="navbar-item" @click="$router.push('/login')">Login</a>
        <a class="navbar-item" @click="$router.push('/signup')">Sign Up</a>
    </div>
    <div class="buttons" v-else>
        <p class="navbar-item">Hello, {{ name }}</p>
        <a class="navbar-item" @click="logout">Logout</a>
    </div>
</template>

<script>
import Session from "../services/session";

export default {
    data: () => ({
        Session,
    }),
    methods: {
        logout() {
            this.Session.logout();
            this.$router.push("/");
        }
    },
    computed: {
        name() {
            return this.Session.user.firstName + " " + this.Session.user.lastName;
        },
    },
};
</script>

<style>
</style>
