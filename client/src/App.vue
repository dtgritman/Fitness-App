<template>
    <div class="container">
        <Nav />
        <router-view />
    </div>
</template>

<style lang="scss">
body {
    background-color: #b5b5b5;
}

nav .is-active {
    background-color: #bbbbbb;
}

.navbar {
    background-color: inherit;
}

a.navbar-item:hover,
a.navbar-link:hover {
    background-color: #c5c5c5;
    color: inherit;
}

.navbar a.button:hover {
    background-color: #929292;
    color: #f2f2f2;
}

.navbar a.button,
.navbar .button {
    background-color: #c5c5c5;
    color: inherit;
}

.navbar a.is-primary {
    background-color: #b43030;
    color: #f2f2f2;
}

.navbar-dropdown {
    background-color: #c5c5c5;
}
</style>

<script>
import Nav from "./components/Nav";

export default {
    components: {
        Nav,
    },
};
</script>
