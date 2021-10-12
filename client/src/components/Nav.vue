<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" @click="$router.push('/')">
                    <img src="../assets/logo.png" />
                </a>

                <a class="navbar-burger" @click="navActive = !navActive" :class="{ 'is-active': navActive }">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': navActive }">
                <div class="navbar-start">
                    <a class="navbar-item" @click="$router.push('/myprofile')" v-if="Session.user">
                        My Profile
                    </a>
                </div>
                <div class="navbar-end">
                    <login-badge />
                </div>
            </div>
        </nav>

        <nav class="tabs is-medium is-centered" v-if="Session.user">
            <ul>
                <li>
                    <a class="navbar-item" @click="$router.push('/activity')">Activity</a>
                </li>
                <li>
                    <a class="navbar-item" @click="$router.push('/feed')">Feed</a>
                </li>
                <li>
                    <a class="navbar-item" @click="$router.push('/friends')">Friends</a>
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
