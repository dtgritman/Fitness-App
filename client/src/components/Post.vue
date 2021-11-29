<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x128 is-square">
                        <img
                            :src="post.user.pic"
                            onerror="this.src='/imgs/default-avatar.png'"
                        />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ post.handle }}</p>
                    <p class="subtitle is-6">{{ name }}</p>
                </div>
            </div>
            <div class="content">
                <div class="is-full-width has-text-centered">
                    <strong>{{ post.caption }}</strong>
                </div>
                <br />
                <table class="table is-fullwidth">
                    <thead>
                        <th>Exercise</th>
                        <th>Info</th>
                        <th>Time</th>
                    </thead>
                    <tbody>
                        <tr v-for="(activity, i) in post.activities" :key="i">
                            <td>{{ activity.name }}</td>
                            <td>{{ activity.info }}</td>
                            <td>{{ activity.time }} mins</td>
                        </tr>
                    </tbody>
                </table>
                <small> {{ likes }} Like{{ likes == 1 ? "" : "s" }} </small>
                <br />
                <small>
                    <a v-if="!isUsersPost" @click="likePost()">{{
                        likeStatus
                    }}</a>
                    · {{ postTime }}
                </small>
            </div>
        </div>
        <footer v-if="isUsersPost" class="card-footer">
            <div class="card-footer-item buttons">
                <button class="button" @click="removeActive = true">
                    Remove
                </button>
            </div>
        </footer>
        <confirm
            v-if="isUsersPost"
            :isActive="removeActive"
            :title="'Remove Post'"
            :msg="'Are you sure you would like to remove this post?'"
            @confirmed="$emit('remove')"
            @close="removeActive = false"
        />
    </div>
</template>

<script>
import Confirm from "./Confirm.vue";

export default {
    components: {
        Confirm,
    },
    props: {
        userHandle: String,
        post: Object,
    },
    data() {
        return {
            removeActive: false,
        };
    },
    methods: {
        likePost() {
            this.post.updateLiked(!this.liked);
        },
    },
    computed: {
        isUsersPost() {
            return this.userHandle == this.post.handle;
        },
        name() {
            return this.post.user.firstName + " " + this.post.user.lastName;
        },
        liked() {
            return this.post.liked.includes(this.userHandle);
        },
        likeStatus() {
            return this.liked ? "Unlike" : "Like";
        },
        likes() {
            return this.post.liked.length;
        },
        postTime() {
            return this.$moment(new Date(this.post.time)).fromNow();
        },
    },
};
</script>

<style>
</style>