<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Add Exercise</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <form class="modal-card-body" @submit.prevent="addActivity">
                <div class="field">
                    <p class="control">
                        <label class="label">Exercise</label>
                        <input
                            class="input"
                            type="text"
                            v-model="newActivity.name"
                            placeholder="Exercise name"
                        />
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <label class="label">Info</label>
                        <input
                            class="input"
                            type="text"
                            v-model="newActivity.info"
                            placeholder="Distance/Weight/Etc."
                        />
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <label class="label">Time</label>
                        <input
                            class="input"
                            type="number"
                            v-model="newActivity.time"
                            placeholder="Time (in minutes)"
                        />
                    </p>
                </div>
                <div class="field buttons is-centered">
                    <p class="control">
                        <input
                            class="button is-success"
                            type="submit"
                            value="Submit"
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
export default {
    props: {
        isActive: Boolean,
    },
    data: () => ({
        newActivity: { name: undefined, info: undefined, time: undefined },
    }),
    methods: {
        async addActivity() {
            if (
                this.newActivity.name &&
                this.newActivity.info &&
                this.newActivity.time
            ) {
                await this.$emit("add", this.newActivity);

                this.newActivity = {
                    name: undefined,
                    info: undefined,
                    time: undefined,
                };
                this.$emit("close");
            }
        },
    },
};
</script>

<style>
</style>