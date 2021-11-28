<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Users Found</p>
                <button
                    class="delete is-large"
                    @click="$emit('close')"
                ></button>
            </header>
            <section class="modal-card-body">
                <div v-if="!users.length" class="card">
                    <div class="card-content">
                        No users found with a handle like "{{ q }}".
                    </div>
                </div>
                <div class="card" v-for="(user, i) in users" :key="i">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure>
                                    <p class="image is-128x128 is-square">
                                        <img
                                            :src="user.pic"
                                            onerror="this.src='/imgs/default-avatar.png'"
                                        />
                                    </p>
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-6">{{ user.handle }}</p>
                                <p class="subtitle is-6">
                                    ({{ user.firstName + " " + user.lastName }})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-item">
                            <button
                                v-if="
                                    friends.findIndex(
                                        (friend) => friend.handle == user.handle
                                    ) > -1
                                "
                                class="button"
                                @click="
                                    $emit(
                                        'remove',
                                        friends.findIndex(
                                            (friend) =>
                                                friend.handle == user.handle
                                        )
                                    )
                                "
                            >
                                Remove Friend
                            </button>
                            <button
                                v-else
                                class="button"
                                @click="$emit('add', user)"
                            >
                                Add Friend
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot buttons is-centered">
                <button class="button" @click="$emit('close')">Close</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: Boolean,
        q: String,
        friends: Array,
        users: Object,
    },
};
</script>

<style>
</style>