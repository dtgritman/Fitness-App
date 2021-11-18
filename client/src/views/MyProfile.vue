<template>
    <section class="section">
        <div class="card">
            <div class="card-header">
                <p class="title is-3">{{ name }}</p>
            </div>
            <div class="card-content">
                <div class="level is-mobile">
                    <div class="level-item">
                        <div class="has-text-centered">
                            <p class="title is-4">Sex</p>
                            <p>{{ sex }}</p>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="has-text-centered">
                            <p class="title is-4">Age</p>
                            <p>{{ age }}</p>
                        </div>
                    </div>
                </div>
                <div class="level is-mobile">
                    <div class="level-item">
                        <div class="has-text-centered">
                            <p class="title is-4">Height</p>
                            <p>{{ heightString }}</p>
                            <a
                                class="card-footer-item"
                                @click="modalHeight = true"
                                >Update
                            </a>
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="has-text-centered">
                            <p class="title is-4">Weight</p>
                            <p>{{ weightString }}</p>
                            <a
                                class="card-footer-item"
                                @click="modalWeight = true"
                                >Update
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" :class="{ 'is-active': modalHeight }">
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update Height</p>
                </header>
                <section class="modal-card-body">
                    <input
                        class="input"
                        type="number"
                        v-model="newHeight"
                        placeholder="new height in inches"
                    />in.
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="submitHeight()">
                        Update
                    </button>
                    <button class="button" @click="modalHeight = false">
                        Cancel
                    </button>
                </footer>
            </div>
        </div>

        <div
            id="weightModal"
            class="modal"
            :class="{ 'is-active': modalWeight }"
        >
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Update Weight</p>
                </header>
                <section class="modal-card-body">
                    <input
                        class="input"
                        type="number"
                        v-model="newWeight"
                        placeholder="new weight in pounds"
                    />lbs.
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="submitWeight()">
                        Update
                    </button>
                    <button class="button" @click="modalWeight = false">
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import moment from "moment";
import session from "../services/session";

export default {
    name: "MyProfile",
    data: () => ({
        modalHeight: false,
        modalWeight: false,
        newHeight: null,
        newWeight: null,
    }),
    methods: {
        submitHeight() {
            session.user.profile.height = this.newHeight;
            this.modalHeight = false;
        },
        submitWeight() {
            session.user.profile.weight = this.newWeight;
            this.modalWeight = false;
        },
    },
    computed: {
        sex() {
            return session.user.profile.sex;
        },
        name() {
            return session.user.firstName + " " + session.user.lastName;
        },
        age() {
            /*
            let today = new Date();
            let bday = new Date(session.user.profile.birthday);
            let age = today.getFullYear() - bday.getFullYear();
            let m = today.getMonth() - bday.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
                age--;
            }
            return age;
            */
            return moment().diff(moment(session.user.profile.birthday), "years");
        },
        heightString() {
            return (
                Math.floor(session.user.profile.height / 12) +
                "' " +
                (session.user.profile.height % 12) +
                '"'
            );
        },
        weightString() {
            return session.user.profile.weight + " lbs.";
        },
    },
};
</script>

<style>
</style>