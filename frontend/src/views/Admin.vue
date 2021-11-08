<template>
    <navBar></navBar>
    <div class="row">
        <div class="col">
            <h2 class="text-danger">Administration</h2>
            <h3 class="h6">Cliquer sur le bouton pour afficher la section correspondante</h3>
            <div class="d-flex flex-column">
                <button class="btn btn-primary mt-3 mb-3" @click="profileIsShow = !profileIsShow">
                    Profils
                    <i class="fas fa-users"></i>
                </button>
                <div v-if="profileIsShow">
                    <div
                        id="allProfiles"
                        v-for="user in users"
                        v-bind:key="user"
                        class="col d-flex flex-column mx-auto"
                    >
                        <allProfiles v-bind="user"></allProfiles>
                    </div>
                </div>

                <button class="btn btn-primary mb-3" @click="gifIsShow = !gifIsShow">
                    Gifs
                    <i class="fas fa-film"></i>
                </button>
                <div v-if="gifIsShow" id="allgifs" class="col-10 d-flex flex-column mx-auto">
                    <div
                        class="col mx-auto border border-dark rounded shadow mt-3"
                        v-for="gif in gifs.slice().reverse()"
                        :key="gif.id"
                    >
                        <figure class="mw-75">
                            <figcaption class="h4 text-primary">{{ gif.statusText }}</figcaption>
                            <p
                                v-for="(user) in users.filter((user) => { return user.id == gif.userId })"
                            v-bind:key="user.userId">
                                publié par
                                <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                            </p>
                            <img class="mw-75" :src="gif.imageUrl" alt="image" />
                        </figure>
                        <button
                            class="mb-3 btn btn-secondary rounded"
                            v-bind="gif"
                            @click.prevent="adminDeleteGif(gif.id)"
                        >Supprimer le gif</button>
                        <div v-if="comments">
                            <div
                                v-for="(comment) in comments.filter((comment) => { return comment.gifId == gif.id })"
                                :key="comment.id"
                                class="bg-light rounded"
                            >
                                <p class="mb-2">
                                    {{ comment.content }}
                                    <span
                                        v-for="(user) in users.filter((user) => { return user.id == comment.userId })"
                                     :key="user.userId">
                                        par
                                        <strong>{{ user.firstName }} {{ user.lastName }}</strong>
                                    </span>
                                </p>
                                <button
                                    class="mb-3 btn btn-secondary rounded"
                                    @click.prevent="adminDeleteComment(comment.id)"
                                >Effacer le commentaire</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary mb-3" @click="commentIsShow = !commentIsShow">
                    Commentaires
                    <i class="fas fa-quote-right"></i>
                </button>
                <div v-if="commentIsShow" id="allComments">
                    <allComments></allComments>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import navBar from '../components/NavBar.ce.vue'
import allProfiles from '../components/allProfiles.ce.vue'
import allComments from '../components/allComments.ce.vue'
export default {
    name: "admin",
    components: {
        navBar,
        allProfiles,
        allComments
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
            gifIsShow: false,
            commentIsShow: false,
            profileIsShow: false,
            gifs: [],
            gif: {},
            comments: [],
            comment: {},
            content: {},
            users: [],
            user: {},
            token: localStorage.getItem('token')
        }
    },
    methods: {
        adminDeleteGif(id) {
            axios
                .delete(`http://localhost:3001/api/gifs/admin/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        },
        adminDeleteComment(id) {
            axios
                .delete(`http://localhost:3001/api/comments/admin/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        },
    },
}
</script>

<style>
</style>