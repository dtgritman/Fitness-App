<template>
    <section class="section">
        <div>
            <!--TODO: Find Friends-->
        </div>
        <div v-for="(friend, i) in friends" :key="i">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title is-centered">
                        {{ friend.firstName }} {{ friend.lastName }}
                    </p>
                </div>
                <div class="card-content">
                    <div class="level is-mobile">
                        <div class="level-item">
                            <p class="title is-6">User Handle:</p>
                            <p>
                                {{ friend.handle }}
                            </p>
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
    </section>
</template>

<script>
import session from "../services/session";
import { get, remove } from "../services/friends";

export default {
    name: "Friends",
    data: () => ({
        friends: [],
    }),
    async mounted() {
        this.friends = await get(session.user.handle);
    },
    methods: {
        async removeFriend(friendIndex) {
            const response = await remove(
                session.user.handle,
                this.friends[friendIndex].handle
            );
            if (response.success) {
                this.friends.splice(friendIndex, 1);
            }
        },
    },
};
</script>

<style>
</style>