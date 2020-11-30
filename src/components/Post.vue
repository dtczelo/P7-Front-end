<template>
    <div class="post">
        <div class="post__contents">
            <p class="post__author">Par "{{ author }}" <span class="dot-centered">·</span> {{ date }}</p>
            <p class="post__title">{{ title }}</p>
            <div class="post__img">
                <img src="../assets/images/icon-left-font.png" />
            </div>
            <div class="post__buttons">
                <button class="post__button post__button--modify">Modifier</button>
                <button class="post__button post__button--delete">Supprimer</button>
            </div>
        </div>
        <div class="post__comments">
            <h5>Commentaires</h5>
            <div class="comments-container">
                <div v-for="comment in commentsToDisplayed" :key="comment.id">
                    <Comments :id="comment.id" :user_id="comment.user_id" :post_id="comment.post_id" :author="comment.author" :date="comment.date" :message="comment.message"></Comments>
                </div>
            </div>
            <form>
                <textarea name="formComment" id="" cols="40" rows="2" placeholder="Tapez votre commentaires ici..." v-model="formComment"></textarea>
                <button @click="postComment()">Envoyer</button>
            </form>
        </div>
    </div>
</template>

<script>
import Comments from "../components/Comments";

export default {
    components: { Comments },
    props: {
        id: Number,
        user_id: Number,
        author: String,
        date: String,
        title: String,
        // imageUrl: String,
    },
    data() {
        return {
            formComment: this.message,
            commentsToDisplayed: []
        };
    },
    methods: {
        postComment() {
            var form = {
                user_id: 2,
                post_id: this.id,
                message: this.formComment
            };
            fetch("http://localhost:3000/comments/", {
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
        // GET ALL COMMENTS
        fetch("http://localhost:3000/comments/" + this.id, {
            method: "GET"
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
    height: auto;
    display: flex;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    &__contents {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    &__author {
        font-size: 1vw;
        color: #2c3e50;
    }
    &__title {
        text-align: left;
        font-size: 2vw;
    }
    &__img {
        flex: 1;
        width: 100%;
        max-height: 500px;
        & img {
            // width: 100%;
            max-height: 500px;
            object-fit: contain;
        }
    }
    &__buttons {
        width: 50%;
        display: flex;
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
        padding: 4px 8px;
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
    }
    &__comments {
        padding: 15px;
        flex: 1;
    }
}

.comments-container {
    max-height: 500px;
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
</style>
