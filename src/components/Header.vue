<template>
    <header>
        <div class="mobile-nav" :class="{ mobileDisplayed: isMobileMenuDisplayed }">
            <router-link style="text-decoration: none;" to="/">Home</router-link>
            <router-link style="text-decoration: none;" to="/connexion">Connexion</router-link>
            <router-link style="text-decoration: none;" to="/inscription">Inscription</router-link>
        </div>
        <div class="logo">
            <img src="../assets/images/icon-above-font.png" width="120" height="120" alt="Logo de l'entreprise Groupomania" />
        </div>
        <nav :class="{ displayed: isMenuDisplayed }">
            <router-link style="text-decoration: none;" to="/">Home</router-link> |
            <router-link style="text-decoration: none;" to="/connexion">Connexion</router-link> |
            <router-link style="text-decoration: none;" to="/inscription">Inscription</router-link>
        </nav>
        <a class="account-icon" :class="{ displayed: isAccountDisplayed }" @click.prevent="toggleAccountMenu()"><i class="fas fa-user-circle"></i></a>
        <div class="account-menu" :class="{ accountMenuDisplayed: isAccountMenuDisplayed }">
            <a>Voir ses messages</a>
            <a>Désinscription</a>
            <a>Déconnexion</a>
        </div>
        <a class="mobile-icon" @click.prevent="toggleMobileNav()"><i class="fas fa-bars"></i></a>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuDisplayed: true,
            isMobileMenuDisplayed: false,
            isAccountDisplayed: false,
            isAccountMenuDisplayed: false,
        };
    },
    methods: {
        toggleMobileNav() {
            this.isMobileMenuDisplayed = !this.isMobileMenuDisplayed;
        },
        toggleAccountMenu() {
            this.isAccountMenuDisplayed = !this.isAccountMenuDisplayed;
        },
    },
    created() {
        if (window.innerWidth < 492) {
            this.isMenuDisplayed = false;
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth < 492) {
                this.isMenuDisplayed = false;
            }
            if (window.innerWidth > 492) {
                this.isMenuDisplayed = true;
            }
        });
    },
};
</script>

<style lang="scss">
header {
    position: fixed;
    width: 100%;
    height: 9vh;
    display: flex;
    align-items: center;
    padding: 0 2rem 0 2rem;
    box-shadow: 10px 7px 20px -9px rgba(0, 0, 0, 0.72);
    background: white;
    z-index: 1;
}

.logo {
    text-align: left;
    flex: 1;
    height: 9vh;
    overflow: hidden;
}

.logo img {
    position: relative;
    top: -15px;
}

nav {
    display: none;
}
@media (max-width: 492px) {
    nav {
        display: none;
    }
}

nav a,
.mobile-nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active,
a:hover {
    color: #fd2d01;
}

// MOBILE MENU

.mobile-nav {
    width: 100%;
    height: 70vh;
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 1;
    background: white;
    font-size: 2rem;
    transform: translateY(-200%);
    transition: transform 350ms ease-in-out;
}

.mobile-icon {
    display: none;
    font-size: 2rem;
    color: #2c3e50;
    margin-left: 1rem;
    cursor: pointer;
}
@media (max-width: 492px) {
    .mobile-icon {
        display: block;
    }
}

// ACCOUNT MENU

.account-menu {
    position: absolute;
    top: 9vh;
    right: 0;
    width: 10rem;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: white;
    box-shadow: 10px 7px 20px -9px rgba(0, 0, 0, 0.72);
    transform: translateX(100%);
    transition: transform 200ms ease-in-out;
}

.account-menu a {
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;
}

.account-icon {
    display: none;
    font-size: 2rem;
    color: #2c3e50;
    margin-right: 2rem;
    cursor: pointer;
}

// BINDED CLASS

.mobileDisplayed {
    transform: translateY(0);
}

.displayed {
    display: block;
}

.accountMenuDisplayed {
    transform: translateX(0);
}
</style>
