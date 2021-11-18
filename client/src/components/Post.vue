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
                        <img :src="post.src">
                        {{ post.caption }}
                        <br />
                        <small>{{ likes }} Likes </small>
                        <br />
                        <small>
                            <a>Like</a> · <!-- <a>Reply</a> · -->
                            {{ post.time }}
                        </small>
                    </p>
                </div>
                <!--
                <article
                    class="media"
                    v-for="(postComment, index) in post.comments"
                    :key="index"
                >
                    <figure class="media-left">
                        <p class="image is-48x48">
                            <img src="/imgs/default-avatar.png" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>
                                    {{ postComment.firstname }}
                                    {{ postComment.lastname }}
                                </strong>
                                <br />
                                {{ postComment.comment }}
                                <br />
                                <small> {{ postComment.likes }} Likes </small>
                                <br />
                                <small>
                                    <a>Like</a> ·
                                    {{ postComment.datetime }}
                                </small>
                            </p>
                        </div>
                    </div>
                </article>
                -->
            </div>
        </article>
        <!--
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img src="/imgs/default-avatar.png" />
                </p>
            </figure>
            <div class="media-content">
                <div class="field">
                    <p class="control">
                        <textarea
                            class="textarea"
                            placeholder="Write a comment..."
                        ></textarea>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button">Post comment</button>
                    </p>
                </div>
                <br />
            </div>
        </article>
        -->
    </div>
</template>

<script>
export default {
    props: {
        post: Object
    },
    computed: {
        likes() {
            return(this.post.liked.length);
        }
    }
};
</script>

<style>
</style>