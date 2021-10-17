<template>
    <section class="section">
        <form class="box" @submit.prevent="signup()">
            <div class="field">
                <p>First Name</p>
                <p class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="First Name"
                        v-model="firstName"
                        required
                    />
                </p>
            </div>
            <div class="field">
                <p>Last Name</p>
                <p class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Last Name"
                        v-model="lastName"
                        required
                    />
                </p>
            </div>
            <div class="field">
                <p>Email</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        v-model="email"
                        required
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Handle</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        placeholder="Handle"
                        v-model="handle"
                        required
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-at"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Password</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        required
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Phone #</p>
                <p class="control">
                    <input
                        class="input"
                        type="tel"
                        placeholder="Phone #"
                        v-model="phone"
                    />
                </p>
            </div>
            <div class="field has-text-centered">
                <p class="control">
                    <button class="button is-success">Sign Up</button>
                </p>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    data: () => ({
        firstName: null,
        lastName: null,
        handle: null,
        password: null,
        email: null,
        phone: null,
    }),
    methods: {
        signup() {},
    },
};
</script>

<style>
</style>