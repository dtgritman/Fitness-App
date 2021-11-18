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
                        <strong>
                            {{ post.handle }}
                        </strong>
                        <br />
                        <img :src="post.src" />
                        {{ post.caption }}
                        <br />
                        <small>{{ likes }} Likes </small>
                        <br />
                        <small> <a>Like</a> · {{ post.time }} </small>
                    </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    props: {
        post: Object,
    },
    computed: {
        likes() {
            return this.post.liked.length;
        },
    },
};
</script>

<style>
</style>