<template>
    <section class="section">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title is-centered">{{ name }}</p>
            </div>
            <div class="card-content">
                <div class="level is-mobile">
                    <div class="level-item">
                        <div class="has-text-centered">
                            <div class="card-image">
                                <figure class="image is-128x128">
                                    <img
                                        class="is-rounded"
                                        :src="userPic"
                                        onerror="this.src='/imgs/default-avatar.png'"
                                    />
                                </figure>
                            </div>
                            <br />
                            <a @click="picActive = true">Update</a>
                        </div>
                    </div>
                </div>
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
                        </div>
                    </div>
                    <div class="level-item">
                        <div class="has-text-centered">
                            <p class="title is-4">Weight</p>
                            <p>{{ weightString }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <a class="card-footer-item" @click="editActive = true">
                    Edit
                </a>
            </div>
        </div>

        <profile-pic
            :isActive="picActive"
            :pic="userPic"
            @update="submitPic"
            @close="picActive = false"
        />
        <profile-edit
            :isActive="editActive"
            :profile="profile"
            @update="submitUpdate"
            @close="editActive = false"
        />
    </section>
</template>

<script>
import session from "../services/session";
import { updatePic, updateProfile } from "../services/users";
import ProfileEdit from "../components/ProfileEdit.vue";
import ProfilePic from "../components/ProfilePic.vue";

export default {
    name: "MyProfile",
    components: {
        ProfileEdit,
        ProfilePic,
    },
    data: () => ({
        userPic: session.user.pic,
        profile: session.user.profile,
        editActive: false,
        picActive: false,
    }),
    computed: {
        name() {
            return session.user.firstName + " " + session.user.lastName;
        },
        sex() {
            return this.profile.sex;
        },
        age() {
            return this.$moment().diff(
                this.$moment(this.profile.birthday),
                "years"
            );
        },
        heightString() {
            return (
                Math.floor(this.profile.height / 12) +
                "' " +
                (this.profile.height % 12) +
                '"'
            );
        },
        weightString() {
            return this.profile.weight + " lbs.";
        },
    },
    methods: {
        async submitUpdate(newProfile) {
            const response = await updateProfile(session.user._id, newProfile);
            if (response.profile) {
                this.profile = response.profile;
                return this.profile;
            }
        },
        async submitPic(newPic) {
            const response = await updatePic(session.user._id, newPic);
            if (response) {
                this.userPic = response.pic;
            }
        },
    },
};
</script>

<style>
</style>