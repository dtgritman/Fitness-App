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
                <small> {{ likes }} Likes </small>
                <br />
                <small>
                    <a v-if="userHandle != post.handle" @click="likePost()">{{
                        likeStatus
                    }}</a>
                    · {{ postTime }}
                </small>
            </div>
        </div>
        <div v-if="userHandle == post.handle" class="card-footer">
            <a class="card-footer-item" @click="removeActive = true">
                Remove
            </a>
            <remove-confirm
                :isActive="removeActive"
                :title="'Remove Post'"
                :msg="'Are you sure you would like to remove this post?'"
                @close="removeActive = false"
                @remove="removePost"
            />
        </div>
    </div>
</template>

<script>
import RemoveConfirm from "./RemoveConfirm.vue";

export default {
    components: {
        RemoveConfirm,
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
        removePost() {
            this.removeActive = false;
            this.$emit('remove');
        },
        likePost() {
            this.post.updateLiked(!this.liked);
        },
    },
    computed: {
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