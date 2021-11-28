<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Update Picture</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <form class="modal-card-body" @submit.prevent="submit">
                <div class="field">
                    <p class="control">
                        <label class="label">New Image Link</label>
                        <input
                            class="input"
                            type="text"
                            v-model="newPic"
                            placeholder="New profile image link"
                            required
                        />
                    </p>
                </div>
                <div class="has-text-centered">
                    <figure class="is-inline-block">
                        <p class="image is-128x128">
                            <img :src="newPic" />
                        </p>
                    </figure>
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
        pic: String,
    },
    data: () => ({
        newPic: "",
    }),
    watch: {
        pic: function (pic) {
            if (pic == this.newPic) {
                this.newPic = "";
            }
        },
    },
    methods: {
        submit() {
            if (this.newPic != "") {
                this.$emit("update", this.newPic);
                this.$emit("close");
            }
        },
    },
};
</script>

<style>
</style>