<template>
    <section class="section">
        <div class="has-text-centered">
            <p>Welcome to Fit Track!</p>
            <p v-if="!session.user">
                To begin tracking your fitness and connecting with friends,
                please <router-link  to="/login">login</router-link> or
                <router-link to="/signup">sign up</router-link>!
            </p>
        </div>
    </section>
</template>

<script>
import session from "../services/session";

export default {
    name: "Home",
    data: () => ({
        session,
    }),
};
</script>
