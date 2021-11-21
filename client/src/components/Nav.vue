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
                    <router-link class="navbar-item" to="/myprofile" v-if=Session.user>
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
</style>
