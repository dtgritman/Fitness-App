<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    <img src="../assets/logo.png" />
                </router-link>

                <a class="navbar-burger" @click="navActive = !navActive" :class="{ 'is-active': navActive }">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': navActive }">
                <div class="navbar-start">
                    <router-link class="navbar-item" to="/myprofile" v-if="Session.user">
                        My Profile
                    </router-link>
                </div>
                <div class="navbar-end">
                    <login-badge />
                </div>
            </div>
        </nav>

        <nav class="tabs is-medium is-centered" v-if="Session.user">
            <ul>
                <li>
                    <router-link class="navbar-item" to="/activity">Activity</router-link>
                </li>
                <li>
                    <router-link class="navbar-item" to="/feed">Feed</router-link>
                </li>
                <li>
                    <router-link class="navbar-item" to="/friends">Friends</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import LoginBadge from "./LoginBadge";
import Session from "../services/session";

export default {
    data: () => ({
        navActive: false,
        Session,
    }),
    components: {
        LoginBadge,
    },
};
</script>

<style>
body {
    background-color: #b5b5b5;
}

nav .is-active {
    background-color: #bbbbbb;
}

.navbar {
    background-color: inherit;
}

a.navbar-item:hover,
a.navbar-link:hover {
    background-color: #c5c5c5;
    color: inherit;
}

.navbar a.button:hover {
    background-color: #929292;
    color: #f2f2f2;
}

.navbar a.button,
.navbar .button {
    background-color: #c5c5c5;
    color: inherit;
}

.navbar a.is-primary {
    background-color: #b43030;
    color: #f2f2f2;
}

.navbar-dropdown {
    background-color: #c5c5c5;
}
</style>
