<template>
    <div>
        <activity-info v-if="pastView" :activitiesInfo="pastView" />
        <br />
        <div class="card" v-if:="activitiesInfo.length > 0">
            <header class="card-header">
                <p class="card-header-title">Past Activity</p>
            </header>
            <div class="card-content">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(activities, i) in activitiesInfo" :key="i">
                            <td>{{ $moment(activities.date).format("LL") }}</td>
                            <td>
                                <button class="button" @click="viewPast(i)">
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ActivityInfo from './ActivityInfo.vue';

export default {
    components: {
        ActivityInfo,
    },
    props: {
        activitiesInfo: Array,
    },
    data: () => ({
        pastView: null,
    }),
    methods: {
        viewPast(pastIndex) {
            this.pastView = this.activitiesInfo[pastIndex];
        },
    },
};
</script>

<style>
</style>