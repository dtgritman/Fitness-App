<template>
    <section class="section">
        <div v-for="(post, postid) in posts" :key="postid">
            <post :userHandle="userHandle" :post="post" @remove="removePost(postid)" />
            <br />
        </div>
    </section>
</template>

<script>
import Post from "../components/Post.vue";
import session from "../services/session";
import { getWall, remove, } from "../services/posts";

export default {
    name: "Wall",
    components: { Post },
    data: () => ({
        userHandle: session.user.handle,
        posts: [],
    }),
    methods: {
        async removePost(postIndex) {
            const response = await remove(this.posts[postIndex]._id);
            if (response && response.deleted == "success") {
                session.notify("Post has been removed!")
                this.posts.splice(postIndex, 1);
            }
            else {
                session.notify("Post removal failed!")
            }
        }
    },
    async mounted() {
        this.posts = await getWall(this.userHandle);
    },
};
</script>

<style>
</style>
