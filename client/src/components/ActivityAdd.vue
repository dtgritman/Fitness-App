<template>
    <form
        class="modal"
        v-on:submit.prevent="addActivity"
        :class="{ 'is-active': modalAdd }"
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
                            v-model="newActivity.exercise"
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
                            type="text"
                            v-model="newActivity.time"
                            placeholder="Time (in minutes)"
                        />
                    </p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="field">
                    <p class="control">
                        <button class="button is-success">Add</button>
                    </p>
                </div>
                <button class="button" @click="modalAdd = false">Cancel</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    data: () => ({
        modalAdd: false,
    }),
    props: {
        //modalAdd: Object,
        activity: Object,
    }
};
</script>

<style>
</style>