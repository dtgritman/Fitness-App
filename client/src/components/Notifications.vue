<template>
    <div class="notifications">
        
    </div>
</template>

<script>
import session from "../services/session";

export default {
    data: () => ({
        notifications: session.notifications,
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