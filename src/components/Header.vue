<template>
    <header>
        <div class="mobile-nav" :class="{ mobileDisplayed: isMobileMenuDisplayed }">
            <router-link style="text-decoration: none;" to="/" @click.native="toggleMobileNav()">Home</router-link>
            <router-link style="text-decoration: none;" to="/connexion" @click.native="toggleMobileNav()">Connexion</router-link>
            <router-link style="text-decoration: none;" to="/inscription" @click.native="toggleMobileNav()">Inscription</router-link>
        </div>
        <div class="logo">
            <img :src="logo" alt="Logo de l'entreprise Groupomania" />
        </div>
        <nav :class="{ displayed: isMenuDisplayed }">
            <router-link style="text-decoration: none;" to="/">Home</router-link> |
            <router-link style="text-decoration: none;" to="/connexion">Connexion</router-link> |
            <router-link style="text-decoration: none;" to="/inscription">Inscription</router-link>
        </nav>
        <a class="account-icon" :class="{ displayed: isAccountDisplayed }" @click.prevent="toggleAccountMenu()">
            <i class="fas fa-user-circle"></i>
        </a>
        <div class="account-menu" :class="{ accountMenuDisplayed: isAccountMenuDisplayed }">
            <a>Voir ses messages</a>
            <a @click="signOut()">Désinscription</a>
            <a @click="logOut()">Déconnexion</a>
        </div>
        <a class="mobile-icon" :class="{ displayed: isMobileDisplayed }" @click.prevent="toggleMobileNav()">
            <i class="fas fa-bars"></i>
        </a>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMenuDisplayed: true,
            isMobileDisplayed: false,
            isMobileMenuDisplayed: false,
            isAccountDisplayed: false,
            isAccountMenuDisplayed: false,
            logo: require("../assets/images/icon-above-font.png"),
        };
    },
    methods: {
        toggleMobileNav() {
            this.isMobileMenuDisplayed = !this.isMobileMenuDisplayed;
        },
        toggleAccountMenu() {
            this.isAccountMenuDisplayed = !this.isAccountMenuDisplayed;
        },
        logOut() {
            sessionStorage.clear();
            location.reload();
        },
        signOut() {
            if (confirm("Êtes vous sûr de vouloir supprimer votre compte ? Toutes les données associés seront perdus !")) {
                fetch("http://localhost:3000/users/deleteAccount/" + sessionStorage.getItem("userId"), {
                    method: "DELETE",
                }).then((response) => {
                    response.text().then((response) => {
                        console.log(JSON.parse(response));
                        sessionStorage.clear();
                        location.reload();
                    });
                });
            }
        },
    },
    created() {
        // USER LOGIN ?
        if (sessionStorage.getItem("password")) {
            this.isMenuDisplayed = false;
            this.isAccountDisplayed = true;
        } else {
            if (window.innerWidth < 492) {
                this.isMenuDisplayed = false;
                this.isMobileDisplayed = true;
                this.logo = require("../assets/images/icon-left-font.png");
            }
            window.addEventListener("resize", () => {
                if (window.innerWidth < 492) {
                    this.isMenuDisplayed = false;
                    this.isMobileDisplayed = true;
                    this.logo = require("../assets/images/icon-left-font.png");
                }
                if (window.innerWidth > 492) {
                    this.isMenuDisplayed = true;
                    this.isMobileDisplayed = false;
                    this.logo = require("../assets/images/icon-above-font.png");
                }
            });
        }
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
    box-shadow: 10px 7px 20px -9px rgba(0, 0, 0, 0.72);
    background: white;
    z-index: 1;
}
@media (max-width: 490px) {
    header {
        padding: 0;
    }
}

.logo {
    text-align: left;
    flex: 1;
    height: 9vh;
    padding-left: 2rem;
    overflow: hidden;
    & img {
        width: 120px;
        height: 120px;
        position: relative;
        top: -15px;
    }
}
@media (max-width: 490px) {
    .logo {
        padding-left: 0.5rem;
    }
}

nav {
    display: none;
    padding-right: 2rem;
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
    margin-right: 1rem;
    cursor: pointer;
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
    cursor: pointer;
}

.account-icon {
    display: none;
    font-size: 2rem;
    color: #2c3e50;
    margin-right: 0.5rem;
    padding-right: 2rem;
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
