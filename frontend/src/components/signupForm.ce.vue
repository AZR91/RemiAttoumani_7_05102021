<template>
    <div class>
        <form id="form" class="mt-5" @submit.prevent="signup()" method="post">
            <div class="mx-auto w-50 mb-3">
                <label for="firstName" class="form-label d-flex justify-content-start">Prénom :</label>
                <input type="firstName" class="form-control" name="firstName" id="firstName" />
            </div>
            <div class="mx-auto w-50 mb-3">
                <label for="lastName" class="form-label d-flex justify-content-start">Nom :</label>
                <input type="lastName" class="form-control" name="lastName" id="lastName" />
            </div>
            <div class="mx-auto w-50 mb-3">
                <label
                    for="email"
                    class="form-label d-flex justify-content-start"
                >Adresse mail (pro):</label>
                <input type="email" class="form-control" name="email" id="email" />
            </div>
            <div class="mx-auto w-50 mb-3">
                <label for="password" class="form-label d-flex justify-content-start">Mot de passe :</label>
                <input type="password" class="form-control" name="password" id="password" />
            </div>
            <button
                type="submit"
                class="btn btn-primary mb-3"
                @click.prevent="signup"
            >Enregistrer les informations</button>
        </form>
        <!-- Affichage des messages -->
        <div :class="{'help is-danger': isAlert, 'help is-success': !isAlert}" v-if="errorMessage.length != 0">
            <div>
                <div class="input-errors" v-for="error in errorMessage" :key="error.message">
                                          <div class="help is-danger">{{ error.message }}</div>
                                        </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'signup',
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errorMessage: ""
        }
    },
    methods: {
        signup() {
            this.errorMessage = "";
            this.errorAlert = false;
            axios.post('http://localhost:3001/api/users/signup', {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
                .then(() => {
                
                    this.$router.push('/registered');
                })
                .catch((error) => {
                    this.errorMessage = error.response.data.error.errors;
                    console.log(error.response.data.error);
                    this.errorAlert = true;
                })
        }
    }
}
</script>
<style>
</style>