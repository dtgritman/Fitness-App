<template>
    <form
        class="modal"
        :class="{ 'is-active': isActive }"
        @submit.prevent="$emit('close')"
    >
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
                            required
                        />
                    </p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="$emit('add', newActivity)">Add</button>
                <button class="button">Cancel</button>
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
        newActivity: { name: null, info: null, time: null },
    }),
};
</script>

<style>
</style>