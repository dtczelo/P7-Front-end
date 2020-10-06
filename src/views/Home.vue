<template>
  <div class="home" :class="$mq">
    <Login></Login>
    <Sign_Up></Sign_Up>
  </div>


</template>

<script>
// @ is an alias to /src
import Login from '../components/Login'
import Sign_Up from '../components/Sign_Up'

export default {
  name: 'Home',
  components: {
    Login,
    Sign_Up
  }
}
</script>


<style lang="scss" scoped>

.home {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  &.mobile {
    flex-direction: column;
  }
}

</style>