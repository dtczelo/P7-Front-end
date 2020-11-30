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
</style>
