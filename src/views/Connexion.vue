<template>
    <div class="connexion-screen">
        <Login></Login>
    </div>
</template>

<script>
import Login from '../components/Login'

export default {
    components: {
        Login
    }
}
</script>

<style lang="scss">

.connexion-screen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>