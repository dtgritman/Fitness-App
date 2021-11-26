<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{ title }}</p>
        </header>
        <div class="card-content">
            <table class="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Info</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(activity, i) in activitiesInfo.activities"
                        :key="i"
                    >
                        <td>{{ activity.name }}</td>
                        <td>{{ activity.info }}</td>
                        <td>{{ activity.time }} mins</td>
                        <td v-if="title == 'Today'" width="2em">
                            <button class="button" @click="$emit('remove', i)">
                                <i class="fas fa-times" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="card-footer">
            <a
                v-if="title == 'Today'"
                class="card-footer-item"
                @click="addActive = true"
                >Add
            </a>
            <a class="card-footer-item"
                @click="postActive = true"
                >Create Post
            </a>
        </footer>
        <activity-add
            :isActive="addActive"
            @add="addActivity"
            @close="addActive = false"
        />
        <post-add
            :isActive="postActive"
            @add="addPost"
            @close="postActive = false"
        />
    </div>
</template>

<script>
import session from "../services/session";
import { add } from "../services/posts";
import ActivityAdd from "./ActivityAdd.vue";
import PostAdd from './PostAdd.vue';

export default {
    components: { ActivityAdd, PostAdd },
    props: {
        title: String,
        activitiesInfo: Object,
    },
    data: () => ({
        postActive: false,
        addActive: false,
    }),
    methods: {
        async addActivity(activity) {
            return await this.$emit("add", activity);
        },
        async addPost(caption) {
            const post = await add({
                handle: session.user.userHandle,
                activities: this.activitiesInfo,
                caption: caption
            });
            if (post._id) {
                session.notify("Post has been made.")
            }
            else {
                session.notify("Post failed!")
            }
        },
    },
};
</script>

<style>
</style> 