<template>
    <form class="modal" :class="{ 'is-active': isActive }" @submit.prevent="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add Exercise</p>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <p class="control">
                        Exercise
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
                        Info
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
                        Time
                        <input
                            class="input"
                            type="number"
                            v-model="newActivity.time"
                            placeholder="Time (in minutes)"
                        />
                    </p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="addActivity">
                    Add
                </button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </form>
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