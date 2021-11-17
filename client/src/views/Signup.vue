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
                        v-model="form.firstName"
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
                        v-model="form.lastName"
                        required
                    />
                </p>
            </div>
            <div class="field">
                <p>Handle</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="text"
                        placeholder="Handle"
                        v-model="form.handle"
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
                        v-model="form.password"
                        required
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Email</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="email"
                        placeholder="Email"
                        v-model="form.email"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Phone #</p>
                <p class="control has-icons-left">
                    <input
                        class="input"
                        type="tel"
                        placeholder="Phone #"
                        v-model="form.phone"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-phone"></i>
                    </span>
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
import router from '../router';
import { add as register } from '../services/users';

export default {
    name: "Signup",
    data: () => ({
        form: {
            firstName: null,
            lastName: null,
            handle: null,
            password: null,
            email: null,
            phone: null,
        }
    }),
    methods: {
        async signup() {
            const response = await register(this.form);
            if (response) {
                // on success go to login page
                router.push('/login');
            }
        },
    },
};
</script>

<style>
</style>