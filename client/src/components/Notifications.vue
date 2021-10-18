<template>
    <div class="notifications">
        <div
            class="notification"
            :class="`is-${notification.type}`"
            v-for="(notification, key) in notifications"
            :key="key"
        >
            <button class="delete" @click.prevent="remove(key)"></button>
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
import session from "../services/session";

export default {
    data: () => ({
        notifications: session.messages,
    }),
    methods: {
        remove(i) {
            this.notifications.splice(i, 1);
        },
    },
};
</script>

<style>
</style>