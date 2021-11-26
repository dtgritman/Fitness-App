<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="notification">
            <button class="delete is-medium" @click="$emit('close')">
                <i class="fas fa-times" />
            </button>
            <div class="card">
                <div class="card-content">
                    <input
                        class="input"
                        type="text"
                        v-model="newPic"
                        placeholder="New profile image link"
                    />
                    <img :src="newPic" />
                </div>
                <div class="card-footer">
                    <a class="card-footer-item" @click="submit">
                        Update
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
        pic: String,
    },
    data: () => ({
        newPic: "",
    }),
    methods: {
        submit() {
            if (this.newPic != "") {
                this.$emit('update', this.newPic);
                this.$emit('close');
            }
        }
    },
};
</script>

<style>
</style>