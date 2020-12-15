<template>
    <div>
        <div v-if="loading" class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div v-else>
            <main class="home">
                <a class="create-post" v-if="isFormButtonDisplayed" @click="toggleForm()">
                    <i class="fas fa-plus-circle"></i><span>Publier</span>
                </a>
                <transition name="formTranslate">
                    <div v-if="isFormDisplayed" class="form-container">
                        <i class="fas fa-times" @click="toggleForm()"></i>
                        <form>
                            <label for="title">Titre</label>
                            <textarea
                                name="titre"
                                id="titre"
                                cols="35"
                                rows="5"
                                placeholder="Titre (max= 255 caractères)"
                                maxlength="255"
                                autofocus
                                ref="postInput"
                                v-model="formTitle"
                            ></textarea>
                            <div v-if="!imagePreview" class="image-preview">
                                <label for="image">Selectionnez une image</label>
                                <input name="image" type="file" id="image" @change="onFileChange" />
                            </div>
                            <div v-else class="image-preview">
                                <img :src="imagePreview" width="100" height="60" />
                                <button class="post__button" @click="removeImage()">Changez d'image</button>
                            </div>
                            <button class="post__button" v-if="formForPublish === true" @click.prevent="postData()">Publier</button>
                            <button class="post__button" v-else @click.prevent="modifyData()">Modifier</button>
                        </form>
                    </div>
                </transition>

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
                            @post-update-after-delete="postUpdateAfterDelete"
                        ></Post>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import Post from "../components/Post.vue";
export default {
    name: "Accueil",
    components: { Post },
    data() {
        return {
            loading: true,
            formForPublish: true,
            postsToDisplayed: [],
            isFormButtonDisplayed: false,
            isFormDisplayed: false,
            formTitle: this.title,
            postTomodify_id: 0,
            image: "",
            imagePreview: "",
        };
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            this.image = files[0];
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage() {
            this.image = "";
            this.imagePreview = "";
        },
        toggleForm() {
            this.formForPublish = true;
            this.isFormDisplayed = !this.isFormDisplayed;
            if (this.isFormDisplayed) {
                this.$nextTick(() => {
                    this.$refs.postInput.focus();
                });
            }
        },
        formChek() {
            if (!this.formTitle) {
                this.$toastr.warning("Veuillez choisir un titre !", "Attention");
                return false;
            } else if (!this.image) {
                this.$toastr.warning("Veuillez choisir une image !", "Attention");
                return false;
            } else {
                return true;
            }
        },
        postData() {
            var formChek = this.formChek();
            if (formChek) {
                var form = new FormData();
                form.append("user_id", sessionStorage.getItem("userId"));
                form.append("title", this.formTitle);
                form.append("file", this.image);
                fetch("http://localhost:3000/posts/", {
                    method: "POST",
                    headers: {
                        authorization: sessionStorage.getItem("token"),
                    },
                    body: form,
                }).then((response) => {
                    response.text().then((response) => {
                        this.toggleForm();
                        this.postsToDisplayed = [];
                        this.getAllPosts();
                        this.$toastr.success("", JSON.parse(response).message);
                    });
                });
            }
        },
        modifyData() {
            var formChek = this.formChek();
            if (formChek) {
                var form = new FormData();
                form.append("user_id", sessionStorage.getItem("userId"));
                form.append("title", this.formTitle);
                form.append("file", this.image);
                fetch("http://localhost:3000/posts/" + this.postTomodify_id, {
                    method: "PUT",
                    headers: {
                        authorization: sessionStorage.getItem("token"),
                    },
                    body: form,
                }).then((response) => {
                    response.text().then((response) => {
                        this.toggleForm();
                        this.postsToDisplayed = [];
                        this.getAllPosts();
                        this.$toastr.success("", JSON.parse(response).message);
                    });
                });
            }
        },
        modifyPost(payload) {
            this.toggleForm();
            this.formForPublish = false;
            this.formTitle = payload.title;
            this.postTomodify_id = payload.id;
            this.image = payload.imageUrl;
            this.imagePreview = payload.imageUrl;
        },
        postUpdateAfterDelete(payload) {
            const newPostsArray = this.postsToDisplayed.filter((post) => post.id !== payload.id);
            this.postsToDisplayed = newPostsArray;
            this.$toastr.success("", payload.message);
        },
        getAllPosts() {
            fetch("http://localhost:3000/posts/", {
                method: "GET",
            }).then((response) => {
                response.text().then((response) => {
                    for (var post of JSON.parse(response).results) {
                        post.date = new Date(post.date).toLocaleString();
                        this.postsToDisplayed.push(post);
                    }
                    this.loading = false;
                });
            });
        },
    },
    created() {
        this.loading = true;
        // USER LOGIN ?
        if (sessionStorage.getItem("password")) {
            this.isFormButtonDisplayed = true;
        }
        this.getAllPosts();
    },
};
</script>

<style lang="scss">
// LOADER

.lds-ring {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    transform: translate(-50%, -50%);
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

// HOME

.home {
    min-height: 70vh;
    display: flex;
    justify-content: space-around;
    padding: 90px 10rem 90px 10rem;
    opacity: 0.99;
}
@media (max-width: 1060px) {
    .home {
        padding: 90px 2rem 90px 2rem;
    }
}
@media (max-width: 490px) {
    .home {
        padding: 90px 0.5rem 90px 0.5rem;
    }
}

.create-post {
    position: fixed;
    height: auto;
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem 0;
    background: white;
    line-height: 1.1rem;
    color: #2c3e50;
    font-size: 0.9rem;
    text-decoration: none;
    border-radius: 0 0 10px 10px;
    border-left: solid 2px black;
    border-bottom: solid 2px black;
    border-right: solid 2px black;
    box-shadow: 3px 17px 21px -2px rgba(0, 0, 0, 0.37);
    cursor: pointer;
    z-index: 1;
    & span {
        margin-top: 0.2rem;
        font-weight: bold;
    }
    &:hover span {
        display: block;
    }
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
    & .image-preview {
        display: flex;
        flex-direction: column;
        text-align: left;
        & :nth-child(1) {
            margin-bottom: 1.7rem;
        }
    }
    & label {
        font-weight: bold;
    }
    & i {
        position: absolute;
        top: 5%;
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
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 5vh;
}
@media (max-width: 1440px) {
    .posts-container {
        width: 70%;
    }
}
@media (max-width: 1060px) {
    .posts-container {
        width: 75%;
    }
}
@media (max-width: 764px) {
    .posts-container {
        width: 85%;
    }
}
@media (max-width: 490px) {
    .posts-container {
        width: 100%;
        padding: 5px;
    }
}

.formTranslate-enter-active,
.formTranslate-leave-active {
    transition: transform 0.3s ease-in-out;
}
.formTranslate-enter,
.formTranslate-leave-to {
    transform: translateY(-100%);
}
</style>
