<template>
    <div :class="[$style.main, $style.center]">
        <div :class="[$style.box, $style.center]">
            <div :class="[$style.icon, $style.center]">
                <i class="far fa-user"></i>
            </div>
            <h1>Inscription</h1>
            <form id="formSignup">
                <div>
                    <p>Nom:</p>
                    <input type="text" placeholder="Entrez votre nom" v-model="lastname" />
                </div>
                <div>
                    <p>Prénom:</p>
                    <input type="text" placeholder="Entrez votre prénom" v-model="firstname" />
                </div>
                <div>
                    <p>Email:</p>
                    <input type="email" placeholder="Entrez votre email" v-model="email" />
                </div>
                <div>
                    <p>Password:</p>
                    <input type="password" placeholder="Entrez votre mot de passe" v-model="password" />
                </div>
                <button type="submit" :class="$style.btn" @click.prevent="signUp">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
        };
    },
    methods: {
        signUp() {
            var form = {
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                password: this.password,
            };
            var myInit = {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            };
            fetch("http://localhost:3000/signup", myInit).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                });
            });
        },
    },
};
</script>

<style lang="scss" module>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    width: 18em;
    height: 620px;
    background: white;
    color: black;
    margin: 0 20px;
    overflow: hidden;
    flex-direction: column;
    position: relative;
    box-shadow: 15px 10px 38px -9px rgba(0, 0, 0, 0.75);
}

.box div {
    margin: 5px 0;
}

.box p {
    text-align: left;
    margin-bottom: 5px;
}

.box div input {
    position: unset;
    width: 220px;
    height: 30px;
    margin-top: 5px;
    background: none;
    border: none;
    outline: none;
    color: black;
    border-bottom: 1px solid rgba(0, 0, 0, 0.609);
    cursor: pointer;
    transition: border-bottom 300ms;
}

.box div input:focus {
    border-bottom: 2px solid #b20a2c;
}

.box h1 {
    margin: 60px 0 20px 0;
}

.box .icon {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 100px;
    border-radius: 0 0 50% 50%;
    background: linear-gradient(120deg, #b20a2c, #fffbd5);
    box-shadow: 0px 0px 20px rgb(144, 144, 144);
    align-items: flex-end;
}

.box .icon i {
    color: white;
    margin-bottom: 10px;
    font-size: 2rem;
}

.btn {
    width: 220px;
    height: 30px;
    margin-top: 20px;
    background: none;
    border: none;
    outline: none;
    background: linear-gradient(120deg, #b20a2c, #fffbd5);
    color: white;
    font-size: large;
    border-radius: 10px;
}
</style>
