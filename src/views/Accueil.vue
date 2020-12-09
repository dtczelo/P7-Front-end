<template>
    <main class="home">
        <a class="create-post" :class="{ displayed: isFormButtonDisplayed }" @click="toggleForm()"
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
                <button class="post__button" v-if="formForPublish === true" @click.prevent="postData()">Publier</button>
                <button class="post__button" v-else @click="modifyData()">Modifier</button>
            </form>
        </div>

        <div class="posts-container">
            <div v-for="post in postsToDisplayed" :key="post.id">
                <Post
                    :author="post.author"
                    :id="post.id"
                    :user_id="post.user_id"
                    :date="post.date"
                    :title="post.title"
                    :imageUrl="post.image_url"
                    @modify-post="modifyPost"
                ></Post>
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
            formForPublish: true,
            postsToDisplayed: [],
            isFormButtonDisplayed: false,
            isFormDisplayed: false,
            formTitle: this.title,
            postTomodify_id: 0,
        };
    },
    methods: {
        toggleForm() {
            this.formForPublish = true;
            this.isFormDisplayed = !this.isFormDisplayed;
        },
        postData() {
            var form = new FormData();
            form.append("user_id", sessionStorage.getItem("userId"));
            form.append("title", this.formTitle);
            form.append("file", document.getElementById("image").files[0]);
            fetch("http://localhost:3000/posts/", {
                method: "POST",
                headers: {
                    authorization: sessionStorage.getItem("token"),
                },
                body: form,
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                });
            });
        },
        modifyData() {
            var form = new FormData();
            form.append("user_id", sessionStorage.getItem("userId"));
            form.append("title", this.formTitle);
            form.append("file", document.getElementById("image").files[0]);
            fetch("http://localhost:3000/posts/" + this.postTomodify_id, {
                method: "PUT",
                headers: {
                    authorization: sessionStorage.getItem("token"),
                },
                body: form,
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                    this.toggleForm();
                });
            });
        },
        modifyPost(payload) {
            this.toggleForm();
            this.formForPublish = false;
            this.formTitle = payload.title;
            this.postTomodify_id = payload.id;
        },
    },
    beforeMount() {
        // USER LOGIN ?
        if (sessionStorage.getItem("password")) {
            this.isFormButtonDisplayed = true;
        }
        // GET ALL POSTS
        fetch("http://localhost:3000/posts/", {
            method: "GET",
        }).then((response) => {
            response.text().then((response) => {
                for (var post of JSON.parse(response).results) {
                    post.date = new Date(post.date).toLocaleString();
                    this.postsToDisplayed.push(post);
                }
            });
        });
    },
};
</script>

<style lang="scss">
.home {
    min-height: 70vh;
    display: flex;
    justify-content: space-around;
    padding: 9vh 10rem 18vh 10rem;
    opacity: 0.99;
}
@media (max-width: 1060px) {
    .home {
        padding: 9vh 2rem 0 2rem;
    }
}
@media (max-width: 490px) {
    .home {
        padding: 9vh 0.5rem 0 0.5rem;
    }
}

.create-post {
    display: none;
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
    width: 40%;
    height: 300px;
    position: fixed;
    padding: 40px;
    background: rgb(243, 243, 243);
    box-shadow: 10px 7px 20px -9px rgba(0, 0, 0, 0.72);
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
@media (max-width: 764px) {
    .form-container {
        width: 90%;
        padding: 20px;
        & label {
            font-weight: bold;
        }
    }
}

.posts-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 5vh;
}
@media (max-width: 1060px) {
    .posts-container {
        width: 70%;
    }
}
@media (max-width: 764px) {
    .posts-container {
        width: 80%;
    }
}
@media (max-width: 490px) {
    .posts-container {
        width: 100%;
        padding: 5px;
    }
}

.displayed {
    display: block;
}
</style>
