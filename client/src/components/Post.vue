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
                        <img :src="post.src" />
                        {{ post.caption }}
                        <br />
                        <small> {{ likes }} Likes </small>
                        <br />
                        <small>
                            <a @click="likePost()">{{ likeStatus }}</a>
                            · {{ postTime }} </small>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import session from '../services/session';

export default {
    props: {
        post: Object,
    },
    methods: {
        likePost() {
            this.post.updateLiked(!this.liked);
        }
    },
    computed: { 
        liked() {
            return this.post.liked.includes(session.user.handle);
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