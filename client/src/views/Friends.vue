<template>
    <section class="section">
        <form class="has-text-centered" @submit.prevent="search">
            Find Friends:
            <input
                class="input"
                type="text"
                v-model="qHandle"
                placeholder="search for users by handle"
            />
            <button class="button">Search</button>
        </form>
        <br />
        <div v-for="(friend, i) in friends" :key="i">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title is-centered">
                        {{ friend.handle }}
                        ({{ friend.firstName }} {{ friend.lastName }})
                    </p>
                </div>
                <div class="card-content">
                    <div class="level is-mobile">
                        <div class="level-item">
                            <img :src=friend.pic onerror="this.src='/imgs/default-avatar.png'" />
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <a class="card-footer-item" @click="removeFriend(i)">
                        Remove
                    </a>
                </div>
            </div>
            <br />
        </div>
        <friends-find
            :isActive="findActive"
            :q="qHandle"
            :friends="friends"
            :users="findResults"
            @add="addFriend"
            @remove="removeFriend"
            @close="findActive = false"
        />
    </section>
</template>

<script>
import session from "../services/session";
import { get, add, remove, find } from "../services/friends";
import FriendsFind from "../components/FriendsFind.vue";

export default {
    components: { FriendsFind },
    name: "Friends",
    data: () => ({
        friends: [],
        qHandle: "",
        findActive: false,
        findResults: [],
    }),
    async mounted() {
        this.friends = await get(session.user.handle);
    },
    methods: {
        async search() {
            if (this.qHandle) {
                this.findResults = (await find(this.qHandle)).filter(
                    (user) => user.handle != session.user.handle
                );
                this.findActive = true;
            }
        },
        async addFriend(user) {
            const response = await add(session.user.handle, user.handle);
            if (response.success) {
                this.friends.push(user);
                const msg = user.handle + " was added as a friend!";
                session.notify(msg);
            }
        },
        async removeFriend(friendIndex) {
            const response = await remove(
                session.user.handle,
                this.friends[friendIndex].handle
            );
            if (response.success) {
                const user = this.friends.splice(friendIndex, 1)[0];
                session.notify(user.handle + " was removed from your friends!");
            }
        },
    },
};
</script>

<style>
</style>