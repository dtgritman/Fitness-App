<template>
    <section class="section">
        <div v-for="(post, postid) in posts" :key="postid">
            <Post :post="post" />
            <br />
        </div>
    </section>
</template>

<script>
import Post from "../components/Post.vue";
import session from "../services/session";
import { getWall } from "../services/posts";

export default {
    name: "Feed",
    components: { Post },
    data: () => ({
        session,
        posts: getWall(session.user.handle),
        /*
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
        */
    }),
};
</script>

<style>
</style>
