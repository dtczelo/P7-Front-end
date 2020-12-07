<template>
    <div class="comment">
        <p class="comment__author">Par "{{ author }}" <span class="dot-centered">·</span> {{ date }}</p>
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
        font-size: 1vw;
        color: #2c3e50;
    }
    &__message {
        font-size: 1.5vw;
    }
}
@media (max-width: 1060px) {
    .comment {
        flex-direction: column;
        &__author {
            font-size: 1.7vw;
        }
        &__message {
            font-size: 3vw;
        }
    }
}
@media (max-width: 764px) {
    .comment {
        flex-direction: column;
        &__author {
            font-size: 2.6vw;
        }
        &__message {
            font-size: 3.6vw;
        }
    }
}
@media (max-width: 490px) {
    .comment {
        flex-direction: column;
        padding: 10px;
        &__author {
            font-size: 3.4vw;
        }
        &__message {
            font-size: 4.4vw;
        }
    }
}
</style>
