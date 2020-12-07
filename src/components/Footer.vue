<template>
    <footer class="footer">
        <div class="footer__logo">
            <img src="../assets/images/icon-above-font.png" alt="Logo de l'entreprise Groupomania" />
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 9vh;
    box-shadow: -10px -7px 20px -9px rgba(0, 0, 0, 0.72);
    background: white;
    z-index: 1;
    &__logo {
        text-align: left;
        flex: 1;
        height: 9vh;
        overflow: hidden;
        & img {
            width: 120px;
            height: 120px;
            position: relative;
            top: -15px;
        }
    }
}
</style>
