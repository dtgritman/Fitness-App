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

        <activity-past :past="past" />
    </section>
</template>

<script>
//import session from "../services/session";
//import { get } from "../services/activity";
import ActivityPast from "../components/ActivityPast.vue";

class Activity {
    constructor(exercise, info, time) {
        this.exercise = exercise;
        this.info = info;
        this.time = time;
    }
}
export default {
    name: "Activity",
    components: {
        ActivityPast,
    },
    data: () => ({
        activities: [],
        pastView: null,
        pastViewDate: null,
        modalAdd: false,
        newActivity: new Activity(null, null, null),

        today: [
            new Activity("running", "1 mile", 20),
            new Activity("walking", "0.5 mile", 30),
        ],
        past: {
            "10-03-2021": [
                new Activity("walking", "2 miles", 50),
                new Activity("running", "0.5 miles", 4),
            ],
            "10-12-2021": [
                new Activity("walking", "3 miles", 100),
                new Activity("dead lifts", "150 lbs", 15),
                new Activity("jogging", "1.5 miles", 25),
            ],
        },
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
    },
};
</script>

<style>
</style>