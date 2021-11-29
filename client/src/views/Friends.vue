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
                    </p>
                </div>
                <div class="card-content">
                    <div class="level">
                        <div class="level-item">
                            <p>{{ friend.firstName }} {{ friend.lastName }}</p>
                        </div>
                    </div>
                    <div class="level">
                        <div class="level-item">
                            <figure>
                                <p class="image is-128x128 is-square">
                                    <img
                                        :src="friend.pic"
                                        onerror="this.src='/imgs/default-avatar.png'"
                                    />
                                </p>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-footer-item buttons is-centered">
                        <button class="button" @click="removeFriend(i)">
                            Remove Friend
                        </button>
                    </div>
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
        <confirm
            :isActive="addActive"
            :title="'Add Friend'"
            :msg="addMsg"
            @confirmed="addSubmit"
            @close="addActive = false"
        />
        <confirm
            :isActive="removeActive"
            :title="'Remove Friend'"
            :msg="removeMsg"
            @confirmed="removeSubmit"
            @close="removeActive = false"
        />
    </section>
</template>

<script>
import session from "../services/session";
import { get, add, remove, find } from "../services/friends";
import FriendsFind from "../components/FriendsFind.vue";
import Confirm from "../components/Confirm.vue";

export default {
    components: {
        FriendsFind,
        Confirm,
    },
    name: "Friends",
    data: () => ({
        qHandle: "",
        friends: [],
        findResults: [],
        findActive: false,
        addActive: false,
        removeActive: false,
        selectedAdd: null,
        selectedRemove: null,
        addMsg: "",
        removeMsg: "",
    }),
    async mounted() {
        this.friends = await get(session.user.handle);
    },
    computed: {},
    methods: {
        async search() {
            if (this.qHandle) {
                this.findResults = (await find(this.qHandle)).filter(
                    (user) => user.handle != session.user.handle
                );
                this.findActive = true;
            }
        },
        addFriend(index) {
            if (!Number.isInteger(index) || index >= this.findResults.length) {
                console.log(index);
                console.log(this.findResults.length);
                return;
            }
            this.addMsg =
                "Are you sure you would like to add " +
                this.findResults[index].handle +
                "(" +
                this.findResults[index].firstName +
                " " +
                this.findResults[index].lastName +
                ") as a friend?";
            this.selectedAdd = index;
            this.addActive = true;
        },
        removeFriend(index) {
            if (!Number.isInteger(index) || index >= this.friends.length) {
                return;
            }
            this.removeMsg =
                "Are you sure you would like to remove " +
                this.friends[index].handle +
                "(" +
                this.friends[index].firstName +
                " " +
                this.friends[index].lastName +
                ") as a friend?";
            this.selectedRemove = index;
            this.removeActive = true;
        },
        async addSubmit() {
            const user = this.findResults[this.selectedAdd];
            if (!user) {
                session.error({ msg: "Friend add error!" });
                return;
            }
            const response = await add(session.user.handle, user.handle);
            if (response.success) {
                this.friends.push(user);
                session.notify(user.handle + " was added as a friend!");
            }
            this.selectedAdd = null;
        },
        async removeSubmit() {
            let user = this.friends[this.selectedRemove];
            if (!user) {
                session.error({ msg: "Friend removal error!" });
                return;
            }
            const response = await remove(
                session.user.handle,
                user.handle
            );
            if (response.success) {
                user = this.friends.splice(this.selectedRemove, 1)[0];
                session.notify(user.handle + " was removed from your friends!");
            }
            this.selectedRemove = null;
        },
    },
};
</script>

<style>
</style>