<template>
    <div
        class="col mx-auto border border-dark rounded shadow mt-3"
        v-for="gif in gifs.slice().reverse()"
        :key="gif.id"
    >
        <figure class="mw-75">
            <figcaption class="h4 text-danger">{{ gif.statusText }}</figcaption>
            <p v-for="(user) in users.filter((user) => { return user.id == gif.userId })">
                publié par
                <strong>{{ user.firstName }} {{ user.lastName }}</strong>
            </p>
            <img class="mw-75" :src="gif.imageUrl" alt="gif" />
        </figure>
        <span v-if="userId == gif.userId">
            <button
                class="mb-3 btn btn-secondary rounded"
                v-bind="gif"
                @click.prevent="deleteGif(gif.id)"
            >Supprimer le gif</button>
        </span>
        <div v-if="comments">
            <div
                v-for="(comment) in comments.filter((comment) => { return comment.gifId == gif.id })"
                :key="comment.id"
                class="bg-light rounded"
            >
                <p class="mb-2">
                    "{{ comment.content }}"
                    <span
                        v-for="(user) in users.filter((user) => { return user.id == comment.userId })"
                    >
                        par
                        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                    </span>
                </p>
                <span v-if="userId == comment.userId">
                    <button
                        class="mb-3 btn btn-secondary rounded"
                        @click.prevent="deleteComment(comment.id)"
                    >Effacer le commentaire</button>
                </span>
            </div>
        </div>
        <postComment v-bind="gif"></postComment>
    </div>
</template>

<script>
import axios from 'axios'
import postComment from '../components/postComment.ce.vue'
export default {
    name: 'gif',
    components: {
        postComment
    },
    created() {
        axios
            .get('http://localhost:3001/api/gifs',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.gifs = res.data.gifs })
            .catch(err => {
                console.log(err + "Utilisateur inconnu ou Posts indisponibles");
            });
        axios
            .get('http://localhost:3001/api/comments',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.comments = res.data })
            .catch(err => {
                console.log(err + "Utilisateur inconnu ou commentaires indisponibles");
            });
        axios
            .get('http://localhost:3001/api/users',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.users = res.data.users })
            .catch(err => {
                console.log(err + "Utilisateur inconnu ou profils indisponibles");
            });
    },
    data() {
        return {
            gifs: [],
            gif: {},
            comments: [],
            comment: {},
            content: {},
            userId: localStorage.getItem('userId'),
            users: [],
            user: {
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin')
            },
            token: localStorage.getItem('token')
        }
    },
    methods: {
        deleteGif(id) {
            axios
                .delete(`http://localhost:3001/api/gifs/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        },
        deleteComment(id) {
            axios
                .delete(`http://localhost:3001/api/comments/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        }
    }
}
</script>
    
<style>
</style>