<template>
    <div class="comment">
        <p class="comment__author"><span class="author">{{ author }}</span> le {{ date }}</p>
        <p class="comment__message">{{ message }}</p>
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
        message: String
    },
    data() {
        return {
        }
    }
};
</script>

<style lang="scss">
.comment {
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
@media (max-width: 764px) {
    .comment {
        &__author {
            // font-size: 2.6vw;
        }
        &__message {
            // font-size: 3.6vw;
        }
    }
}
@media (max-width: 490px) {
    .comment {
        padding: 10px;
        &__author {
            // font-size: 3.4vw;
        }
        &__message {
            // font-size: 4.4vw;
        }
    }
}
</style>
