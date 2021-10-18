<template>
    <div
        class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow bg-white"
        v-bind="user"
    >
        <p>
            <strong>Prénom:</strong>
            {{ user.firstName }}
        </p>
        <p>
            <strong>Nom:</strong>
            {{ user.lastName }}
        </p>
        <p>
            <strong>Email:</strong>
            {{ user.email }}
        </p>
        <p v-if="user.isAdmin === true">
            <strong>Rôle:</strong> Admin
        </p>
        <p v-else>
            <strong>Rôle:</strong> Utilisateur
        </p>
        <div class="w-50 mx-auto mb-3">
            <img class="mw-100" :src="user.avatarUrl" alt="avatar" />
        </div>
    </div>
    <div
        v-if="userId == user.id"
        class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow mt-3"
    >
        <form id="form" class="mt-5" enctype="multipart/form-data" @submit.prevent="modifyAvatar()">
            <div class="mx-auto w-50 mb-3">
                <label for="avatar" class="form-label">Changer d'avatar</label>
                <input
                    type="file"
                    class="form-control-file"
                    name="image"
                    id="image"
                    ref="image"
                    v-on:change="handleFileUpload()"
                />
                <button
                    type="submit"
                    class="form-control btn btn-primary"
                    name="submitAvatar"
                    id="submitAvatar"
                    @click.prevent="modifyAvatar"
                >Modifier</button>
            </div>
        </form>
        <span>
            <button
                class="bg-light mb-3"
                v-bind="user"
                @click.prevent="deleteUser(user.id)"
            >Supprimer votre compte</button>
        </span>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "profile",
    props: {
        user: {}
    },
    created() {
        axios.
            get(`http://localhost:3001/api/users/${this.userId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + this.token,
                    }
                })
            .then(res => { this.user = res.data.user })
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            user: {},
            image: "",
            token: localStorage.getItem('token')
        }
    },
    methods: {
        handleFileUpload() {
            this.image = this.$refs.image.files[0];
            this.imageUrl = URL.createObjectURL(this.image)
        },
        modifyAvatar() {
            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem('userId')))
            formData.append("image", this.image)
            axios
                .put(`http://localhost:3001/api/users/${this.userId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        },
        deleteUser(id) {
            axios
                .delete(`http://localhost:3001/api/users/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.push('/logout'))
        }
    }
}
</script>

<style>
</style>