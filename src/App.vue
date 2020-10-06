<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/forum">Forum</router-link>
        </div>
            <router-view />
    </div>
</template>

<script>
export default {
    components: {},
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
    background: linear-gradient(-16deg, #1461e4, #87e077);
}

.views {
  
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
