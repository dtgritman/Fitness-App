<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link class="navbar-item navbar-logo" to="/">
                    <img src="../assets/logo.png" />
                </router-link>

                <a class="navbar-burger" @click="navActive = !navActive" :class="{ 'is-active': navActive }">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': navActive }">
                <div v-if="session.user" class="navbar-start">
                    <router-link class="navbar-item" to="/myprofile">
                        My Profile
                    </router-link>
                </div>
                <div class="navbar-end">
                    <login-badge />
                </div>
            </div>
        </nav>

        <nav class="tabs is-medium is-centered" v-if="session.user">
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
import session from "../services/session";
import LoginBadge from "./LoginBadge";

export default {
    components: {
        LoginBadge,
    },
    data: () => ({
        session,
        navActive: false,
    }),
};
</script>

<style>
.navbar {
    background-color: inherit;
}

.navbar-burger.is-active,
.navbar-menu.is-active {
    background-color: #bbbbbb;
}

a.router-link-active.navbar-logo {
    background-color: inherit;
}

.navbar-dropdown,
a.navbar-item:hover,
a.navbar-item:active,
a.navbar-item:focus,
a.router-link-active {
    background-color: #c5c5c5;
    color: inherit;
}
</style>
