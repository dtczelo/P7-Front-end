<template>
    <main class="home">

      <a class="create-post" @click="toggleForm()"><i class="fas fa-plus-circle"></i><br> Publier</a>
      <div v-if="isFormDisplayed" class="form-container">
        <label for="title"></label>
        <input type="text" id="title" placeholder="Titre (max= 255 caractères)" maxlength="255" autofocus>
        <input type="file">
      </div>

        <div class="posts-container">

            <a class="post">
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
            </a>

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
      }
    },
    methods: {
      toggleForm() {
        this.isFormDisplayed = !this.isFormDisplayed;
      }
    }
};
</script>

<style lang="scss">
.home {
    padding: 9vh 2rem 0 2rem;
    display: flex;
    justify-content: space-around;
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
  box-shadow: 3px 17px 21px -2px rgba(0,0,0,0.37);
  cursor: pointer;
}

.form-container {
  width: 80%;
  height: 800px;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: olivedrab;
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
            background-color: #0059A0;
        }
    }
}
</style>
