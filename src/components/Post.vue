<template>
    <div class="post">
        <div class="post__contents">
            <p class="post__author">
                <span class="author">{{ author }}</span
                ><br />Publié le {{ date }}
            </p>
            <p class="post__title">{{ title }}</p>
            <div class="post__img" :class="{ imgZoom: isImgZoom }">
                <img :src="imageUrl" @click="zoom()" />
            </div>
            <div class="post__buttons">
                <a class="post__button post__button--modify" v-if="isEditButtonUserDisplayed" @click="emitModifyPost()">Modifier</a>
                <a class="post__button post__button--delete" v-if="isEditButtonUserDisplayed" @click.prevent="deletePost()"
                    ><i class="far fa-trash-alt"></i
                ></a>
                <a class="post__button post__button--comments" @click="toggleComments()"><i class="far fa-comment-alt"></i></a>
            </div>
        </div>
        <div class="post__comments" v-if="isCommentsDisplayed">
            <div class="comments-container">
                <div v-for="comment in commentsToDisplayed" :key="comment.id">
                    <Comments
                        :id="comment.id"
                        :user_id="comment.user_id"
                        :post_id="comment.post_id"
                        :author="comment.author"
                        :date="comment.date"
                        :message="comment.message"
                        @comment-update-after-delete="commentUpdateAfterDelete"
                    ></Comments>
                </div>
            </div>
            <form v-if="isPostCommentDisplayed" @keyup.enter="postComment()">
                <textarea
                    name="formComment"
                    id=""
                    cols="auto"
                    rows="2"
                    placeholder="Tapez votre commentaires ici..."
                    ref="commentInput"
                    v-model="formComment"
                ></textarea>
                <button class="post__button" @click.prevent="postComment()"><i class="fas fa-share"></i></button>
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
            isPostCommentDisplayed: false,
        };
    },
    methods: {
        toggleComments() {
            this.isCommentsDisplayed = !this.isCommentsDisplayed;
            if (this.isCommentsDisplayed && sessionStorage.getItem("password")) {
                this.$nextTick(() => {
                    this.$refs.commentInput.focus();
                });
            }
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
                    authorization: sessionStorage.getItem("token"),
                },
                body: JSON.stringify(form),
            }).then((response) => {
                response.text().then((response) => {
                    this.formComment = "";
                    this.commentsToDisplayed = [];
                    this.getAllComments();
                    this.$toastr.success("", JSON.parse(response).message);
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
                    authorization: sessionStorage.getItem("token"),
                },
            }).then((response) => {
                if (response.ok) {
                    response.text().then((response) => {
                        this.$emit("post-update-after-delete", { id: this.id, message: JSON.parse(response).message });
                    });
                } else {
                    response.text().then((response) => {
                        this.$toastr.error("", JSON.parse(response).alert);
                    });
                }
            });
        },
        zoom() {
            this.isImgZoom = !this.isImgZoom;
        },
        getAllComments() {
            fetch("http://localhost:3000/comments/" + this.id, {
                method: "GET",
            }).then((response) => {
                response.text().then((response) => {
                    for (var comment of JSON.parse(response).results) {
                        comment.date = new Date(comment.date).toLocaleString();
                        this.commentsToDisplayed.push(comment);
                    }
                });
            });
        },
        commentUpdateAfterDelete(payload) {
            const newCommentsArray = this.commentsToDisplayed.filter((comment) => comment.id !== payload.id);
            this.commentsToDisplayed = newCommentsArray;
            this.$toastr.success("", payload.message);
        },
    },
    beforeMount() {
        this.getAllComments();
        // USER LOGIN
        if (sessionStorage.getItem("password")) {
            this.isPostCommentDisplayed = true;
            this.$nextTick(() => {
                this.isCommentsDisplayed = false;
            });
        }
        // USER's POSTS OR ADMIN ?
        if (parseInt(sessionStorage.getItem("userId")) === this.user_id || sessionStorage.getItem("role") === "ADM") {
            this.isEditButtonUserDisplayed = true;
            this.isCommentsDisplayed = true;
        }
    },
};
</script>

<style lang="scss">
.post {
    position: relative;
    height: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    background: white;
    box-shadow: 15px 10px 38px -9px rgba(0, 0, 0, 0.75);
    &__contents {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    &__author {
        text-align: left;
        font-size: 0.9rem;
        color: #2c3e50;
        line-height: 1.2rem;
        font-style: italic;
    }
    &__title {
        text-align: left;
        font-size: 1.4rem;
        font-weight: bold;
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
        width: 35%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }
    &__button {
        border: none;
        border-radius: 28px;
        cursor: pointer;
        color: white;
        background-color: #2f6ccc;
        font-family: Arial;
        font-size: 1rem;
        padding: 8px 16px;
        margin-right: 10px;
        text-decoration: none;
        box-shadow: 9px 5px 15px -9px rgba(0, 0, 0, 0.75);
        transition: all 250ms ease-in-out;
        &--delete {
            background-color: #fd2d01;
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
    & form {
        margin-top: 20px;
    }
    &__comments {
        padding: 5px;
        flex: 1;
        & form {
            display: flex;
            justify-content: space-between;
        }
        & button {
            margin-left: 1rem;
        }
        & textarea {
            flex: 1;
            padding: 5px;
            border-radius: 4px;
            &:focus {
                border: 2px solid #2f6bca;
                outline: none;
            }
        }
    }
}
@media (max-width: 1060px) {
    .post {
        &__author {
            font-size: 1rem;
        }
        &__title {
            font-size: 1.6rem;
        }
        &__button {
            font-size: 0.8rem;
        }
    }
}
@media (max-width: 490px) {
    .post {
        padding: 10px;
        &__img {
            padding: 5px;
        }
    }
}

.comments-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.author {
    color: #2f6bca;
}

.imgZoom {
    position: absolute;
    width: 90vw;
    top: 20%;
    left: -10vw;
    z-index: 5;
}
</style>
