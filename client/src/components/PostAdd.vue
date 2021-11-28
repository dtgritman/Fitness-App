<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Create Post</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <form class="modal-card-body" @submit.prevent="submit">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>Info</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(activity, i) in activities" :key="i">
                            <td>{{ activity.name }}</td>
                            <td>{{ activity.info }}</td>
                            <td>{{ activity.time }} mins</td>
                        </tr>
                    </tbody>
                </table>
                <div class="field">
                    <p class="control">
                        <label class="label">Post Caption</label>
                    </p>
                    <input
                        class="input"
                        type="text"
                        v-model="caption"
                        placeholder="Add a caption to your post"
                        required
                    />
                </div>
                <div class="field buttons is-centered">
                    <p class="control">
                        <input
                            class="button is-success"
                            type="submit"
                            value="Submit Post"
                        />
                    </p>
                </div>
            </form>
            <footer class="modal-card-foot buttons is-centered">
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
import session from "../services/session";
import { add } from "../services/posts";

export default {
    props: {
        isActive: Boolean,
        activities: Array,
    },
    data: () => ({
        caption: "",
    }),
    methods: {
        async submit() {
            if (!this.caption || this.caption == "") {
                session.error({ msg: "You must add a caption to the post!" });
                return;
            }
            const post = await add({
                handle: session.user.handle,
                activities: this.activities,
                caption: this.caption,
            });
            if (post._id) {
                this.$emit("close");
                session.notify("Post has been made.");
                this.caption = "";
            } else {
                session.error({ msg: "Post failed!" });
            }
        },
    },
};
</script>

<style>
</style>