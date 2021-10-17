<template>
    <section class="section">
        <div v-for="(post, postid) in posts" :key="postid">
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
                                    {{ post.firstname }}
                                    {{ post.lastname }}
                                </strong>
                                <br />
                                {{ post.info }}
                                <br />
                                <small>{{ post.likes }} Likes </small>
                                <br />
                                <small>
                                    <a>Like</a> · <a>Reply</a> ·
                                    {{ post.datetime }}
                                </small>
                            </p>
                        </div>

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
                                        <small>
                                            {{ postComment.likes }} Likes
                                        </small>
                                        <br />
                                        <small>
                                            <a>Like</a> ·
                                            {{ postComment.datetime }}
                                        </small>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </article>
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
            </div>
            <br />
        </div>
    </section>
</template>

<script>
//import Posts from "../services/posts";

export default {
    data: () => ({
        posts: {
            182: {
                userid: 9309,
                firstname: "Person",
                lastname: "Random",
                info: "post information",
                likes: 20,
                datetime: "10-10-2021 10:42:03",
                comments: [
                    {
                        userid: "2817",
                        firstname: "Person",
                        lastname: "2817",
                        comment: "great exercise",
                        likes: 4,
                        datetime: "10-10-2021 11:06:12",
                    },
                    {
                        userid: "2811",
                        firstname: "Person",
                        lastname: "2811",
                        comment: "awesome work",
                        likes: 2,
                        datetime: "10-10-2021 11:11:36",
                    },
                ],
            },
            183: {
                userid: 2817,
                firstname: "Random",
                lastname: "Person",
                info: "post information",
                likes: 4,
                datetime: "10-10-2021 13:32:41",
                comments: [
                    {
                        userid: "2817",
                        firstname: "Person",
                        lastname: "2817",
                        comment: "awesome",
                        likes: 1,
                        datetime: "10-10-2021 14:27:56",
                    },
                ],
            },
        },
    }),
};
</script>

<style>
</style>
