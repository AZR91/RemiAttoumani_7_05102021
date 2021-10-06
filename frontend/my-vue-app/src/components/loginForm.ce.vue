<template>
    <div class="loginForm">
        <form id="form" class="mt-5" @submit.prevent="login()" method="post" novalidate="true">
            <div class="mx-auto w-50 mb-3">
                <label for="email" class="form-label d-flex justify-content-start">Adresse mail:</label>
                <input type="email" class="form-control" name="email" id="email" />
            </div>
            <div class="mx-auto w-50 mb-3">
                <label for="password" class="form-label d-flex justify-content-start">Mot de passe :</label>
                <input type="password" class="form-control" name="password" id="password" />
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="login">Se connecter</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            this.errorAlert = false;
            axios.post('http://localhost:3001/api/users/login', {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    localStorage.setItem("isAdmin", res.data.isAdmin)
                    this.$router.push('/gifs');
                })
                .catch(() => {
                    this.errorAlert = true
                })
        }
    }
}
</script>
<style>
</style>