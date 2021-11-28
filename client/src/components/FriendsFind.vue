<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="notification">
            Users Found:
            <button class="delete is-medium" @click="$emit('close')">
                <i class="fas fa-times" />
            </button>
            <div v-if="!users.length" class="card">
                <div class="card-content">
                    No users found with a handle like "{{ q }}".
                </div>
            </div>
            <div class="card" v-for="(user, i) in users" :key="i">
                <div class="card-content">
                    <div class="level">
                        <div class="level-item">
                            <figure>
                                <p class="image is-128x128 is-square">
                                    <img
                                        :src="user.pic"
                                        onerror="this.src='/imgs/default-avatar.png'"
                                    />
                                </p>
                            </figure>
                        </div>
                        <div class="level-item">
                            <p class="title is-6">{{ user.handle }}</p>
                        </div>
                        <div class="level-item">
                            <p>({{ user.firstName + " " + user.lastName }})</p>
                        </div>
                        <div
                            v-if="
                                friends.findIndex(
                                    (friend) => friend.handle == user.handle
                                ) > -1
                            "
                            class="level-item"
                        >
                            <button
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
                        </div>
                        <div v-else class="level-item">
                            <button class="button" @click="$emit('add', user)">
                                Add Friend
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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