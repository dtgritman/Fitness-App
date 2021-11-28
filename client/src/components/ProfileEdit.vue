<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Update Profile</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <form class="modal-card-body" @submit.prevent="$emit('update', newProfile)">
                <div class="field">
                    <p class="control">
                        Sex:
                        <input
                            class="input"
                            type="text"
                            name="sex"
                            v-model="newProfile.sex"
                        />
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        Birthday:
                        <input
                            class="input"
                            type="date"
                            name="birthday"
                            v-model="newProfile.birthday"
                        />
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        Height:
                        <input
                            class="input"
                            type="number"
                            name="height"
                            v-model="newProfile.height"
                            placeholder="new height in inches(in.)"
                        />in.
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        Weight:
                        <input
                            class="input"
                            type="number"
                            name="weight"
                            v-model="newProfile.weight"
                            placeholder="new weight in pounds(lbs.)"
                        />lbs.
                    </p>
                </div>
                <div class="field buttons is-centered">
                    <button class="button is-success">
                        Update
                    </button>
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
        profile: Object,
    },
    data() {
        return {
            newProfile: {
                sex: this.profile.sex,
                birthday: this.profile.birthday
                    ? this.$moment(this.profile.birthday).format("YYYY-MM-DD")
                    : this.profile.birthday,
                height: this.profile.height,
                weight: this.profile.weight,
            },
        };
    },
};
</script>

<style>
</style>