<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="notification">
            <button class="delete is-medium" @click="$emit('close')">
                <i class="fas fa-times" />
            </button>
            <div class="card">
                <div class="card-content">
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Info</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(activity, i) in activities"
                                :key="i"
                            >
                                <td>{{ activity.name }}</td>
                                <td>{{ activity.info }}</td>
                                <td>{{ activity.time }} mins</td>
                            </tr>
                        </tbody>
                    </table>

                    Post Caption:
                    <input
                        class="input"
                        type="text"
                        v-model="caption"
                        placeholder="Add a caption to your post"
                    />
                </div>
                <div class="card-footer">
                    <a class="card-footer-item" @click="submit">
                        Submit Post
                    </a>
                </div>
            </div>
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
            if (!this.caption || this.caption == "")
                session.error({ msg: "You must add a caption to the post!" });
            const post = await add({
                handle: session.user.userHandle,
                activities: this.activities,
                caption: this.caption,
            });
            if (post._id) {
                session.notify("Post has been made.");
                this.caption = "";
            } else {
                session.notify("Post failed!");
            }
        },
    },
};
</script>

<style>
</style>