<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="notification">
            People Found:
            <button class="delete is-medium" @click="$emit('close')">
                <i class="fas fa-times" />
            </button>
            <div class="card" v-for="(user, i) in users" :key="i">
                <div class="card-content">
                    <div class="level is-mobile">
                        <div class="level-item">
                            <p class="title is-6">User Handle:</p>
                            <p>
                                {{ user.handle }}
                            </p>
                        </div>
                        <div v-if="friends.findIndex(friend => friend.handle == user.handle) > -1" class="level-item">
                            <button class="button" @click="$emit('remove', friends.findIndex(friend => friend.handle == user.handle))">
                                <i class="fas fa-minus" />
                            </button>
                        </div>
                        <div v-else class="level-item">
                            <button class="button" @click="$emit('add', user)">
                                <i class="fas fa-plus" />
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
        friends: Array,
        users: Object,
    },
};
</script>

<style>
</style>