<template>
    <div class="signup-screen" >
        <SignUp></SignUp>
    </div>
</template>

<script>
import SignUp from '../components/SignUp'

export default {
    components: {
        SignUp
    }
}
</script>

<style lang="scss">

.signup-screen {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>