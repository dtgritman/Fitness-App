<template>
    <div>
        <div class="card" :class="{ 'is-hidden': !pastDate }">
            <header class="card-header">
                <p class="card-header-title">{{ pastDate }}</p>
            </header>
            <div class="card-content">
                <table class="table is-fullwidth">
                    <thead>
                        <th>Exercise</th>
                        <th>Info</th>
                        <th>Time</th>
                    </thead>
                    <tbody v-for="activity in pastView" :key="activity">
                        <td>{{ activity.exercise }}</td>
                        <td>{{ activity.info }}</td>
                        <td>{{ activity.time }} mins</td>
                    </tbody>
                </table>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="editPast">Edit</a>
            </footer>
        </div>
        <br />
        <div class="card" v-if:="past">
            <header class="card-header">
                <p class="card-header-title">Past Activity</p>
            </header>
            <div class="card-content">
                <table class="table is-fullwidth">
                    <thead>
                        <th>Date</th>
                        <th></th>
                    </thead>
                    <tbody v-for="(info, date) in past" :key="date">
                        <td>{{ date }}</td>
                        <td>
                            <button class="button" @click="viewPast(date)">
                                View
                            </button>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        past: Object,
    },
    data: () => ({
        pastDate: null,
        pastView: null,
    }),
    methods: {
        viewPast(pastDate) {
            this.pastDate = pastDate;
            this.pastInfo = this.past[pastDate];
        },
    },
};
</script>

<style>
</style>