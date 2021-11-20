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
import { getFeed, addLike, removeLike } from "../services/posts";

export default {
    name: "Feed",
    components: { Post },
    data: () => ({
        posts: [],
    }),
    async mounted() {
        this.posts = await getFeed(session.user.handle);
        for (let post of this.posts) {
            post.updateLiked = async (liked) => {
                if (liked) {
                    if (!post.liked.includes(session.user.handle)) {
                        const response = await addLike(
                            post._id,
                            session.user._id
                        );
                        if (response.liked) {
                            post.liked = response.liked;
                        }
                    }
                } else {
                    const response = await removeLike(
                        post._id,
                        session.user._id
                    );
                    if (response.liked) {
                        post.liked = response.liked;
                    }
                }
            };
        }
    },
};
</script>

<style>
</style>
