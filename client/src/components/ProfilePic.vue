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
            <section class="modal-card-body">
                New Image Link:
                <input
                    class="input"
                    type="text"
                    v-model="newPic"
                    placeholder="New profile image link"
                />
                <br />
                <br />
                <div class="has-text-centered">
                    <figure class="is-inline-block">
                        <p class="image is-128x128">
                            <img :src="newPic" />
                        </p>
                    </figure>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="submit">
                    Update
                </button>
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