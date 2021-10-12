<template>
    <section class="section">
        <div class="has-text-centered">
            <p>Welcome to Fit Track!</p>
            <p v-if="!Session.user">
                To begin tracking your fitness and connecting with friends,
                please <a  @click="$router.push('/login')">login</a> or
                <a @click="$router.push('/signup')">sign up</a>!
            </p>
        </div>
    </section>
</template>

<script>
import Session from "../services/session";

export default {
    name: "Home",
    data: () => ({
        Session,
    }),
};
</script>
