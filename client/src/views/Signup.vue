<template>
    <section class="section">
        <form class="box">
            <div class="field">
                <p>First Name</p>
                <p class="control">
                    <input class="input" type="text" placeholder="First Name" />
                </p>
            </div>
            <div class="field">
                <p>Last Name</p>
                <p class="control">
                    <input class="input" type="text" placeholder="Last Name" />
                </p>
            </div>
            <div class="field">
                <p>Email</p>
                <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Email" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
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
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p>Phone #</p>
                <p class="control">
                    <input class="input" type="tel" placeholder="Phone #" />
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
    
};
</script>

<style>
</style>