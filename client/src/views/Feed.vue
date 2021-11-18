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
    }),
};
</script>

<style>
</style>
