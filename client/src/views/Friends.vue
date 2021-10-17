<template>
    <section class="section">
        <div>
            <!--TODO: Find Friends-->
        </div>
        <div v-for="(friend, index) in friends" :key="index">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title is-centered">
                        {{ friend.firstname }} {{ friend.lastname }}
                    </p>
                </div>
                <div class="card-content">
                    <div class="level is-mobile">
                        <div class="level-item">
                            <div class="">
                                <p class="title is-5">Sex</p>
                                <p class="has-text-centered">
                                    {{ friend.sex }}
                                </p>
                            </div>
                        </div>
                        <div class="level-item">
                            <div class="">
                                <p class="title is-5">Age</p>
                                <p class="has-text-centered">
                                    {{ friend.age }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    </section>
</template>

<script>
export default {
    data: () => ({
        friends: [
            {
                userid: 9309,
                firstname: "Random",
                lastname: "Person",
                age: 20,
                sex: "Male",
            },
            {
                userid: 2817,
                firstname: "Person",
                lastname: "Random",
                age: 20,
                sex: "Female",
            },
        ],
    }),
    methods: {},
};
</script>

<style>
</style>