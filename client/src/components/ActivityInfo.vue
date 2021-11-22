<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{ title }}</p>
        </header>
        <div class="card-content">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <th>Exercise</th>
                    <th>Info</th>
                    <th>Time</th>
                </thead>
                <tbody
                    v-for="activity in activitiesInfo.activities"
                    :key="activity.name"
                >
                    <td>{{ activity.name }}</td>
                    <td>{{ activity.info }}</td>
                    <td>{{ activity.time }} mins</td>
                </tbody>
            </table>
        </div>
        <footer class="card-footer">
            <a
                v-if="title == 'Today'"
                class="card-footer-item"
                @click="addActive = true"
                >Add
            </a>
        </footer>
        <activity-add :isActive="addActive" @add="addActivity" @close="addActive = false" />
    </div>
</template>

<script>
import ActivityAdd from './ActivityAdd.vue';

export default {
    components: { ActivityAdd },
    props: {
        title: String,
        activitiesInfo: Object,
    },
    data() {
        return {
            addActive: false,
        };
    },
    methods: {
        addActivity(activity) {
            this.$emit('add', activity);
        }
    }
};
</script>

<style>
</style> 