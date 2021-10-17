<template>
    <section class="section">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Today</p>
            </header>
            <div class="card-content">
                <table class="table is-fullwidth is-hoverable">
                    <thead>
                        <th>Exercise</th>
                        <th>Info</th>
                        <th>Time</th>
                    </thead>
                    <tbody v-for="activity in today" :key="activity">
                        <td>{{ activity.exercise }}</td>
                        <td>{{ activity.info }}</td>
                        <td>{{ activity.time }} mins</td>
                    </tbody>
                </table>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" @click="modalAdd = true">Add</a>
            </footer>
        </div>
        <br />

        <form
            class="modal"
            v-on:submit.prevent="addActivity"
            :class="{ 'is-active': modalAdd }"
        >
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Exercise</p>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <p class="control">
                            Exercise
                            <input
                                class="input"
                                type="text"
                                v-model="newActivity.exercise"
                                placeholder="Exercise name"
                            />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            Info
                            <input
                                class="input"
                                type="text"
                                v-model="newActivity.info"
                                placeholder="Distance/Weight/Etc."
                            />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            Time
                            <input
                                class="input"
                                type="text"
                                v-model="newActivity.time"
                                placeholder="Time (in minutes)"
                            />
                        </p>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="field">
                        <p class="control">
                            <button class="button is-success">Add</button>
                        </p>
                    </div>
                    <button class="button" @click="modalAdd = false">
                        Cancel
                    </button>
                </footer>
            </div>
        </form>

        <div class="card" :class="{ 'is-hidden': !pastView }">
            <header class="card-header">
                <p class="card-header-title">{{ pastViewDate }}</p>
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

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">Past Activity</p>
            </header>
            <div class="card-content">
                <table class="table is-fullwidth">
                    <thead>
                        <th>Date</th>
                        <th></th>
                    </thead>
                    <tbody v-for="(activities, date) in past" :key="date">
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
    </section>
</template>

<script>
class Activity {
    constructor(exercise, info, time) {
        this.exercise = exercise;
        this.info = info;
        this.time = time;
    }
}
export default {
    name: "Activity",
    data: () => ({
        modalAdd: false,
        today: [
            new Activity("running", "1 mile", 20),
            new Activity("walking", "0.5 mile", 30),
        ],
        past: {
            "10-03-2021": [
                new Activity("walking", "2 miles", 50),
                new Activity("running", "0.5 miles", 4),
            ],
        },
        newActivity: new Activity(null, null, null),
        pastView: null,
        pastViewDate: null,
    }),
    methods: {
        addActivity() {
            if (
                this.newActivity.exercise &&
                this.newActivity.info &&
                this.newActivity.time
            ) {
                this.today.push(this.newActivity);
                this.newActivity = new Activity(null, null, null);
                this.modalAdd = false;
            }
        },
        viewPast(pastDate) {
            this.pastViewDate = pastDate;
            this.pastView = this.past[pastDate];
        },
    },
};
</script>

<style>
</style>