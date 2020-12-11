<template>
    <div id="app">
        <Header :key="renderHeaderKey"></Header>
        <router-view />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { bus } from "./main";

export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            renderHeaderKey: 0
        };
    },
    updated() {
        bus.$on('reRenderHeader', () => {
            this.renderHeaderKey++;
        });
    }
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
    background-image: url("./assets/images/sunset.jpg");
    background-position: bottom;
    z-index: -2;
}
</style>
