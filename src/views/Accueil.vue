<template>
    <main class="home">
        <a class="create-post" @click="toggleForm()"
            ><i class="fas fa-plus-circle"></i><br />
            Publier</a
        >
        <div v-if="isFormDisplayed" class="form-container">
            <i class="fas fa-times" @click="toggleForm()"></i>
            <form>
                <label for="title">Titre</label>
                <textarea
                    name="titre"
                    id="titre"
                    cols="30"
                    rows="10"
                    placeholder="Titre (max= 255 caractères)"
                    maxlength="255"
                    autofocus
                    v-model="title"
                ></textarea>
                <label for="image">Insérer une image</label>
                <input name="image" type="file" id="image" />
                <button @click.prevent="postData()">Publier</button>
            </form>
        </div>

        <div class="posts-container">
            <div class="post">
                <div class="post__contents">
                    <p class="post__author">Par "bidule" le 28 nov. 2020 18:50</p>
                    <p class="post__title">Une image pour l'exemple blablabla</p>
                    <div class="post__img">
                        <img src="../assets/images/icon-left-font.png" />
                    </div>
                </div>
                <div class="post__buttons">
                    <button class="post__button post__button--modify">Modifier</button>
                    <button class="post__button post__button--delete">Supprimer</button>
                    <button class="post__button post__button--comments">Voir les commentaires</button>
                </div>
            </div>

            <div class="post">
                <div class="post__contents">
                    <p class="post__author">Par "bidule" le 28 nov. 2020 18:50</p>
                    <p class="post__title">Une image pour l'exemple blablabla</p>
                    <div class="post__img">
                        <img src="../assets/images/mushrooms.jpg" />
                    </div>
                </div>
                <div class="post__buttons">
                    <button class="post__button post__button--modify">Modifier</button>
                    <button class="post__button post__button--delete">Supprimer</button>
                    <button class="post__button post__button--comments">Voir les commentaires</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: "Accueil",
    components: {},
    data() {
        return {
            isFormDisplayed: false,
            title: this.title,
        };
    },
    methods: {
        toggleForm() {
            this.isFormDisplayed = !this.isFormDisplayed;
        },
        postData() {
            var form = {
                user_id: 2,
                title: this.title
                // image: this.image,
            };
            fetch("http://localhost:3000/posts/", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                mode: 'no-cors',
                body: JSON.stringify(form),
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                });
            });
        },
    },
};
</script>

<style lang="scss">
.home {
    padding: 9vh 2rem 0 2rem;
    display: flex;
    justify-content: space-around;
    opacity: 0.99;
}

.create-post {
    position: fixed;
    height: 40px;
    width: 100px;
    background: white;
    line-height: 1.1rem;
    color: #2c3e50;
    text-decoration: none;
    border-radius: 0 0 10px 10px;
    border-left: solid 2px black;
    border-bottom: solid 2px black;
    border-right: solid 2px black;
    box-shadow: 3px 17px 21px -2px rgba(0, 0, 0, 0.37);
    cursor: pointer;
    z-index: 1;
}

.form-container {
    width: 80%;
    height: 300px;
    position: fixed;
    padding: 40px;
    background: rgb(243, 243, 243);
    overflow: hidden;
    z-index: 2;
    & form {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }
    & label {
        font-weight: bold;
    }
    & i {
        position: absolute;
        top: 10%;
        right: 10%;
        font-size: 2rem;
        cursor: pointer;
    }
    & input {
        float: left;
    }
}

.posts-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 5vh;
    background: white;
    border-radius: 10px;
    box-shadow: 15px 10px 38px -9px rgba(0, 0, 0, 0.75);
}

.post {
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    &__contents {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    &__author {
        font-size: 1vw;
        color: #2c3e50;
    }
    &__title {
        font-size: 2vw;
    }
    &__img {
        width: 70%;
        max-height: 500px;
        & img {
            width: 100%;
            max-height: 500px;
            object-fit: contain;
        }
    }
    &__buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    &__button {
        border: none;
        border-radius: 28px;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 17px;
        padding: 16px 31px;
        text-decoration: none;
        box-shadow: 9px 5px 15px -9px rgba(0, 0, 0, 0.75);
        &:hover {
            background-color: #5cbf2a;
        }
        &:active {
            position: relative;
            top: 1px;
        }
        &--modify {
            background-color: #ffae00;
        }
        &--delete {
            background-color: #fd2d01;
        }
        &--comments {
            background-color: #0059a0;
        }
    }
}
</style>
