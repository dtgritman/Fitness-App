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
</style>

<script>
import Nav from "./components/Nav";

export default {
    components: {
        Nav,
    },
};
</script>
