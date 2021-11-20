<template>
    <form
        class="modal"
        :class="{ 'is-active': isActive }"
        @submit.prevent="$emit('close')"
    >
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Update Profile</p>
            </header>
            <div class="modal-card-body">
                Sex:
                <input
                    class="input"
                    type="text"
                    name="sex"
                    v-model="newProfile.sex"
                />
                <br />
                <br />
                Birthday:
                <input
                    class="input"
                    type="date"
                    name="birthday"
                    v-model="newProfile.birthday"
                />
                <br />
                <br />
                Height:
                <input
                    class="input"
                    type="number"
                    name="height"
                    v-model="newProfile.height"
                    placeholder="new height in inches(in.)"
                />in.
                <br />
                <br />
                Weight:
                <input
                    class="input"
                    type="number"
                    name="weight"
                    v-model="newProfile.weight"
                    placeholder="new weight in pounds(lbs.)"
                />lbs.
            </div>
            <footer class="modal-card-foot">
                <button
                    class="button is-success"
                    @click="$emit('update', newProfile)"
                >
                    Update
                </button>
                <button class="button">Cancel</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
        profile: Object,
    },
    data() {
        return {
            newProfile: {
                sex: this.profile.sex,
                birthday: this.profile.birthday ? this.$moment(this.profile.birthday).format(
                    "YYYY-MM-DD"
                ) : this.profile.birthday,
                height: this.profile.height,
                weight: this.profile.weight,
            },
        };
    },
};
</script>

<style>
</style>