<template>
    <div class="comment">
        <p class="comment__author">
            <span class="author">{{ author }}</span> le {{ date }}
        </p>
        <p class="comment__message">{{ message }}</p>
        <a v-if="isDeleteCommentDisplayed" class="comment__button comment__button--delete" @click.prevent="deleteComment()">Supprimer</a>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        user_id: Number,
        post_id: Number,
        author: String,
        date: String,
        message: String,
    },
    data() {
        return {
            isDeleteCommentDisplayed: false,
        };
    },
    methods: {
        deleteComment() {
            fetch("http://localhost:3000/comments/" + this.id, {
                method: "DELETE",
                headers: {
                    authorization: sessionStorage.getItem("token"),
                },
            }).then((response) => {
                if (response.ok) {
                    response.text().then((response) => {
                        this.$emit("comment-update-after-delete", { id: this.id, message: JSON.parse(response).message });
                    });
                } else {
                    response.text().then((response) => {
                        this.$toastr.error("", JSON.parse(response).alert);
                    });
                }
            });
        },
    },
    beforeMount() {
        // USER's COMMENTS OR ADMIN ?
        if (parseInt(sessionStorage.getItem("userId")) === this.user_id || sessionStorage.getItem("role") === "ADM") {
            this.isDeleteCommentDisplayed = true;
        }
    },
};
</script>

<style lang="scss">
.comment {
    position: relative;
    width: 100%;
    text-align: left;
    &__author {
        margin-bottom: 2px;
        font-size: 0.9rem;
        color: #2c3e50;
        font-style: italic;
    }
    &__message {
        margin: 0.5rem 0 0.7rem 0;
        font-size: 1.2rem;
    }
    &__button {
        border: none;
        border-radius: 28px;
        cursor: pointer;
        color: white;
        background-color: #2f6ccc;
        font-family: Arial;
        font-size: 0.7rem;
        padding: 3px 14px;
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
    }
}
@media (max-width: 1060px) {
    .comment {
        &__author {
            font-size: 1rem;
        }
        &__message {
            font-size: 1.4rem;
        }
    }
}
@media (max-width: 490px) {
    .comment {
        padding: 10px;
    }
}
</style>
