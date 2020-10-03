<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <Login></Login>
    <Sign_Up></Sign_Up>
  </div>
</template>

<script>
import Login from './components/Login'
import Sign_Up from './components/Sign_Up'

export default {
  components: {
    Login,
    Sign_Up,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(-16deg, #1461E4, #87E077);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 760) {
  #app {
    display: flex;
    flex-direction: column;
  }
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
