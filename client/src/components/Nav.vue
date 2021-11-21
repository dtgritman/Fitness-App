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
                    <router-link class="navbar-item is-tab" to="/myprofile" v-if=session.user>
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
                    <router-link class="navbar-item is-tab" to="/activity">Activity</router-link>
                </li>
                <li>
                    <router-link class="navbar-item is-tab" to="/feed">Feed</router-link>
                </li>
                <li>
                    <router-link class="navbar-item is-tab" to="/friends">Friends</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import session from "../services/session";
import LoginBadge from "./LoginBadge";

export default {
    data: () => ({
        session,
        navActive: false,
    }),
    components: {
        LoginBadge,
    },
};
</script>

<style>
.navbar {
    background-color: inherit;
}

a.navbar-item:hover,
a.navbar-link:hover {
    background-color: #c5c5c5;
    color: inherit;
}

.navbar-item .is-tab:active {
    background-color: #bbbbbb;
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
