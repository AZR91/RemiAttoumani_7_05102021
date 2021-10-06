<template>
    <div
        v-bind="$attrs"
        class="col col-md-8 mx-auto mt-2 mb-2 border border-dark rounded shadow bg-light"
    >
        <h3 class="h5">Commenter ce gif</h3>
        <form class="mt-3">
            <div class="mx-auto w-75 h-50 mb-3">
                <label for="content" class="form-label">Commentaire :</label>
                <textarea
                    v-bind="$attrs"
                    class="form-control content"
                    name="content"
                    ref="content"
                    placeholder="Tapez ici votre commentaire !"
                ></textarea>
            </div>
            <button
                v-bind="$attrs"
                type="submit"
                class="btn btn-primary mb-3"
                @click="postComment($attrs)"
                ref="comment"
            >Publier</button>
        </form>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: "postComment",
    data() {
        return {
            gif: {},
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            gifId: "",
            content: ""
        }
    },
    methods: {
        postComment($attrs) {
            axios
                .post('http://localhost:3001/api/comments', {
                    gifId: this.$refs.comment.id,
                    userId: localStorage.getItem('userId'),
                    content: this.$refs.content.value,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => this.$router.go())
        },
    }
}
</script>
<style>
</style>