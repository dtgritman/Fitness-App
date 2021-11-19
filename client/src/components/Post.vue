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
                        <small> <a>Like</a> · {{ postTime }} </small>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        post: Object,
    },
    computed: {
        likes() {
            return this.post.liked.length;
        },
        postTime() {
            return moment(new Date(this.post.time)).fromNow();
        },
    },
};
</script>

<style>
</style>