<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="card">
            <button class="delete is-medium" @click="$emit('close')">
                <i class="fas fa-times" />
            </button>
            <div class="card-content">
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
            </div>
            <div class="card-footer">
                <a class="card-footer-item" @click="submit"> Update </a>
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
button.delete {
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>