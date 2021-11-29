<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">{{ title }}</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <section class="modal-card-body">
                <p>{{ msg }}</p>
            </section>
            <footer class="modal-card-foot buttons is-centered">
                <button class="button" @click="confirm">Confirm</button>
                <button class="button" @click="$emit('close')">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
        title: String,
        msg: String,
    },
    methods: {
        confirm() {
            this.$emit('confirmed');
            this.$emit('close');
        },
    },
};
</script>

<style>
</style>