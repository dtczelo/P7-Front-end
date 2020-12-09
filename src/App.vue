<template>
    <div id="app">
        <Header></Header>
        <router-view />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
    components: {
        Header,
        Footer
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
    box-sizing: content-box;
}

#app {
    height: auto;
    min-height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-attachment: fixed;
    background-image: radial-gradient(circle at 17% 77%, rgba(17, 17, 17,0.04) 0%, rgba(17, 17, 17,0.04) 50%,rgba(197, 197, 197,0.04) 50%, rgba(197, 197, 197,0.04) 100%),radial-gradient(circle at 26% 17%, rgba(64, 64, 64,0.04) 0%, rgba(64, 64, 64,0.04) 50%,rgba(244, 244, 244,0.04) 50%, rgba(244, 244, 244,0.04) 100%),radial-gradient(circle at 44% 60%, rgba(177, 177, 177,0.04) 0%, rgba(177, 177, 177,0.04) 50%,rgba(187, 187, 187,0.04) 50%, rgba(187, 187, 187,0.04) 100%),linear-gradient(19deg, rgb(19,66,143),rgb(29,102,219));
    z-index: -2;
}
</style>
