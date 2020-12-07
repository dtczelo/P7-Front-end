<template>
    <div class="post">
        <div class="post__contents">
            <p class="post__author">Par "{{ author }}" <span class="dot-centered">·</span> {{ date }}</p>
            <p class="post__title">{{ title }}</p>
            <div class="post__img" :class="{ imgZoom: isImgZoom }">
                <img :src="imageUrl" @click="zoom()" />
            </div>
            <div class="post__buttons">
                <a class="post__button post__button--user" :class="{ displayed: isEditButtonUserDisplayed }" @click="emitModifyPost()"
                    >Modifier</a
                >
                <a class="post__button post__button--user" :class="{ displayed: isEditButtonUserDisplayed }" @click="deletePost()"
                    >Supprimer</a
                >
                <a class="post__button post__button--comments" @click="toggleComments()">Commentaires</a>
            </div>
        </div>
        <div class="post__comments" :class="{ displayed: isCommentsDisplayed }">
            <h5>Commentaires</h5>
            <div class="comments-container">
                <div v-for="comment in commentsToDisplayed" :key="comment.id">
                    <Comments
                        :id="comment.id"
                        :user_id="comment.user_id"
                        :post_id="comment.post_id"
                        :author="comment.author"
                        :date="comment.date"
                        :message="comment.message"
                    ></Comments>
                </div>
            </div>
            <form @keyup.enter="postComment()">
                <textarea
                    name="formComment"
                    id=""
                    cols="auto"
                    rows="2"
                    placeholder="Tapez votre commentaires ici..."
                    v-model="formComment"
                ></textarea>
                <button class="post__button" @click="postComment()">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import Comments from "../components/Comments";

export default {
    name: "Post",
    components: { Comments },
    props: {
        id: Number,
        user_id: Number,
        author: String,
        date: String,
        title: String,
        imageUrl: String,
    },
    data() {
        return {
            isEditButtonUserDisplayed: false,
            isCommentsDisplayed: false,
            formComment: this.message,
            commentsToDisplayed: [],
            isImgZoom: false,
        };
    },
    methods: {
        toggleComments() {
            this.isCommentsDisplayed = !this.isCommentsDisplayed;
        },
        postComment() {
            var form = {
                user_id: sessionStorage.getItem("userId"),
                post_id: this.id,
                message: this.formComment,
            };
            fetch("http://localhost:3000/comments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("token"),
                },
                body: JSON.stringify(form),
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                    this.$forceUpdate;
                });
            });
        },
        emitModifyPost() {
            this.$emit("modify-post", { id: this.id, title: this.title, imageUrl: this.imageUrl });
        },
        deletePost() {
            fetch("http://localhost:3000/posts/" + this.id, {
                method: "DELETE",
                headers: {
                    "authorization": sessionStorage.getItem("token"),
                },
            }).then((response) => {
                response.text().then((response) => {
                    console.log(JSON.parse(response));
                    alert("Post Supprimé !");
                });
            });
        },
        zoom() {
            this.isImgZoom = !this.isImgZoom;
        },
    },
    beforeMount() {
        // USER LOGIN ?
        if (parseInt(sessionStorage.getItem("userId")) === this.user_id) {
            this.isEditButtonUserDisplayed = true;
        }
        // GET ALL COMMENTS
        fetch("http://localhost:3000/comments/" + this.id, {
            method: "GET",
        }).then((response) => {
            response.text().then((response) => {
                this.commentsToDisplayed = JSON.parse(response).results;
            });
        });
    },
};
</script>

<style lang="scss">
.post {
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    &__contents {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    &__author {
        font-size: 13px;
        color: #2c3e50;
    }
    &__title {
        text-align: left;
        font-size: 16px;
    }
    &__img {
        width: 100%;
        height: auto;
        & img {
            width: 100%;
            height: auto;
            object-fit: fill;
        }
    }
    &__buttons {
        width: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    &__button {
        border: none;
        border-radius: 28px;
        cursor: pointer;
        color: #2c3e50;
        background-color: #fff;
        font-family: Arial;
        font-size: 14px;
        padding: 4px 8px;
        margin-right: 5px;
        text-decoration: none;
        box-shadow: 9px 5px 15px -9px rgba(0, 0, 0, 0.75);
        transition: all 250ms ease-in-out;
        &--user {
            display: none;
        }
        &:hover {
            background-color: #2c3e50;
            color: #fff;
        }
        &:active {
            position: relative;
            top: 1px;
        }
    }
    &__comments {
        display: none;
        padding: 15px;
        flex: 1;
        & form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        & textarea {
            width: 100%;
        }
    }
}
// @media (max-width: 1060px) {
//     .post {
//         &__author {
//             font-size: 1.7vw;
//         }
//         &__title {
//             font-size: 3vw;
//         }
//         &__button {
//             font-size: 1.7vw;
//         }
//     }
// }
// @media (max-width: 764px) {
//     .post {
//         &__author {
//             font-size: 2.6vw;
//         }
//         &__title {
//             font-size: 3.6vw;
//         }
//         &__button {
//             font-size: 2.6vw;
//         }
//     }
// }
@media (max-width: 490px) {
    .post {
        padding: 10px;
        // &__author {
        //     font-size: 4vw;
        // }
        // &__title {
        //     font-size: 5vw;
        // }
        &__img {
            padding: 5px;
        }
        // &__button {
        //     font-size: 3.8vw;
        // }
    }
}

.comments-container {
    max-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 5px;
    border: solid 1px black;
    overflow-y: auto;
    scroll-behavior: auto;
}

.dot-centered {
    font-weight: 1000;
}

.displayed {
    display: block;
}

.imgZoom {
    position: absolute;
    width: 90vw;
    top: 20%;
    left: -10vw;
    z-index: 5;
}
</style>
