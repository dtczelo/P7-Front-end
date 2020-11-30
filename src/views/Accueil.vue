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
                    v-model="formTitle"
                ></textarea>
                <label for="image">Insérer une image</label>
                <input name="image" type="file" id="image" />
                <button @click.prevent="postData()">Publier</button>
            </form>
        </div>

        <div class="posts-container">
            <div v-for="post in postsToDisplayed" :key="post.id">
                <Post :author="post.author" :id="post.id" :user_id="post.user_id" :date="post.date" :title="post.title"></Post>
            </div>
        </div>
    </main>
</template>

<script>
import Post from "../components/Post.vue";
export default {
    name: "Accueil",
    components: { Post },
    data() {
        return {
            postsToDisplayed: [],
            isFormDisplayed: false,
            formTitle: this.title,
        };
    },
    methods: {
        toggleForm() {
            this.isFormDisplayed = !this.isFormDisplayed;
        },
        postData() {
            var form = {
                user_id: 2,
                title: this.formTitle
                // image: this.image,
            };
            fetch("http://localhost:3000/posts/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                });
            });
        },
    },
    beforeMount() {
        // GET ALL POSTS
        fetch("http://localhost:3000/posts/", {
            method: "GET"
        }).then((response) => {
            response.text().then((response) => {
                this.postsToDisplayed = JSON.parse(response).results;
            });
        });
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
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 5vh;
    background: white;
    border-radius: 10px;
    box-shadow: 15px 10px 38px -9px rgba(0, 0, 0, 0.75);
}
</style>
