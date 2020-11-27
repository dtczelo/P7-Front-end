<template>
    <div id="app">
        <Header></Header>
        <router-view />
    </div>
</template>

<script>
import Header from "./components/Header";

export default {
    components: {
        Header,
    },
    data() {
        return {};
    },
    created() {
        window.addEventListener("resize", this.$store.commit("setWindowWidth"));
    },
};
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    background: #fffbd5;
    background: -webkit-linear-gradient(to right, #b20a2c, #fffbd5);
    background: linear-gradient(to right, #b20a2c, #fffbd5);
}
</style>
