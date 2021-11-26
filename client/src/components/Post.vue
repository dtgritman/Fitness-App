<template>
    <div class="card">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="/imgs/default-avatar.png" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong> {{ post.handle }} </strong>
                        <br />
                        {{ post.caption }}
                        <br />
                        <table class="table is-fullwidth">
                            <thead>
                                <th>Exercise</th>
                                <th>Info</th>
                                <th>Time</th>
                            </thead>
                            <tbody
                                v-for="(activity, i) in post.activities"
                                :key="i"
                            >
                                <td>{{ activity.name }}</td>
                                <td>{{ activity.info }}</td>
                                <td>{{ activity.time }} mins</td>
                            </tbody>
                        </table>
                        <br />
                        <small> {{ likes }} Likes </small>
                        <br />
                        <small>
                            <a @click="likePost()">{{ likeStatus }}</a>
                            · {{ postTime }}
                        </small>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: {
        userHandle: String,
        post: Object,
    },
    methods: {
        likePost() {
            this.post.updateLiked(!this.liked);
        },
    },
    computed: {
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