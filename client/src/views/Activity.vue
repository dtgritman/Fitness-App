<template>
    <section class="section">
        <activity-info :title="'Today'" :activitiesInfo="today" @add="addActivity" />
        <br />
        <activity-past :activitiesInfo="past" />
    </section>
</template>

<script>
import session from "../services/session";
import { get, add, update } from "../services/activity";
import ActivityInfo from "../components/ActivityInfo.vue";
import ActivityPast from "../components/ActivityPast.vue";

export default {
    name: "Activity",
    components: {
        ActivityInfo,
        ActivityPast,
    },
    data() {
        return {
            today: { handle: session.user.handle, date: new Date().toISOString(), activities: [] },
            past: [],
        }
    },
    async mounted() {
        const activities = await get(session.user.handle);
        if (activities.length > 0 && this.$moment(this.today.date).isSame(activities[0].date, "day")) {
            this.today = activities.shift();
        }
        this.past = activities;
    },
    methods: {
        async addActivity(activity) {
            this.today.activities.push(activity);
            if (!this.today._id) {
                const response = await add(this.today);
                if (response) {
                    this.today = response;
                }
            }
            else {
                this.today = await update(this.today);
            }
        },
    },
};
</script>

<style>
</style>