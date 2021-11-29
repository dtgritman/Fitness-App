<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{ title }}</p>
        </header>
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
                        v-for="(activity, i) in activitiesInfo.activities"
                        :key="i"
                    >
                        <td>{{ activity.name }}</td>
                        <td>{{ activity.info }}</td>
                        <td>{{ activity.time }} mins</td>
                        <td v-if="title == 'Today'" width="2em">
                            <button class="button" @click="removeActive = true">
                                <i class="fas fa-times" />
                            </button>
                            <confirm
                                :isActive="removeActive"
                                :title="'Remove Exercise'"
                                :msg="'Are you sure you would like to remove this exercise?'"
                                @confirmed="$emit('remove', i)"
                                @close="removeActive = false"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <footer class="card-footer">
            <div class="card-footer-item buttons">
                <button
                    v-if="title == 'Today'"
                    class="button"
                    @click="addActive = true"
                >
                    Add
                </button>
                <button
                    v-if="activitiesInfo.activities.length > 0"
                    class="button"
                    @click="postActive = true"
                >
                    Create Post
                </button>
            </div>
        </footer>
        <activity-add
            :isActive="addActive"
            @add="addExercise"
            @close="addActive = false"
        />
        <post-add
            :isActive="postActive"
            :activities="activitiesInfo.activities"
            @close="postActive = false"
        />
    </div>
</template>

<script>
import ActivityAdd from "./ActivityAdd.vue";
import PostAdd from "./PostAdd.vue";
import Confirm from "./Confirm.vue";

export default {
    components: {
        ActivityAdd,
        PostAdd,
        Confirm,
    },
    props: {
        activitiesInfo: Object,
    },
    data: () => ({
        postActive: false,
        addActive: false,
        removeActive: false,
    }),
    computed: {
        title() {
            if (this.$moment(new Date()).isSame(this.activitiesInfo.date, "day")) {
                return "Today";
            }
            return this.$moment(this.activitiesInfo.date).format('LL');
        },
    },
    methods: {
        async addExercise(exercise) {
            return await this.$emit("add", exercise);
        },
    },
};
</script>

<style>
</style> 