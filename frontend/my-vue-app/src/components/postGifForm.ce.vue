<template>
    <div class="col mx-auto border border-dark rounded shadow">
        <h2 class>Publier un gif</h2>
        <form id="form" class="mt-5" @submit.prevent="postGif()" enctype="multipart/form-data">
            <div class="mx-auto w-50 mb-3">
                <label for="statusText" class="form-label">Statut :</label>
                <input
                    type="statusText"
                    class="form-control"
                    id="statusText"
                    placeholder="Exemple: Quand on fait ceci..."
                />
            </div>
            <div class="w-50 mx-auto mb-3">
                <label for="gif" class="form-label pr-1">Gif :</label>
                <input
                    type="file"
                    class="form-control-file mx-auto"
                    id="gif"
                    name="gif"
                    ref="gif"
                    v-on:change="handleFileUpload()"
                />
            </div>
            <button type="submit" class="btn btn-primary mb-3" @click.prevent="postGif">Publier</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "postGifForm",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            statusText: "",
            imageUrl: "",
            gif: "",
            token: localStorage.getItem('token')
        }
    },
    methods: {
        handleFileUpload() {
            this.gif = this.$refs.gif.files[0];
            this.imageUrl = URL.createObjectURL(this.gif)
        },
        postGif() {
            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem('userId')))
            formData.append("statusText", document.getElementById('statusText').value)
            formData.append("gif", this.gif)
            axios
                .post('http://localhost:3001/api/gifs',
                    formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
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