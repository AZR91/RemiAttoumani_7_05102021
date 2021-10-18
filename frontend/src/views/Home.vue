<template>
    <div id="home" class="row">
        <div class="col col-md-6 mx-auto border border-dark rounded shadow bg-light">
            <h2 class="h4 mt-3">Connexion</h2>
            <loginForm />
            <br />
            <div class="mb-3">
                <router-link
                    to="/signup"
                >Pas encore inscrit ? Cliquez ici pour rejoindre vos collègues !</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import loginForm from '../components/loginForm.ce.vue'
export default {
    name: "Home",
    components: {
        loginForm,
    }, 
    data() {
        return {
            userId: localStorage.getItem("userId")
        }
    },
    methods: {
        
        
    }
}
</script>

<style>
</style>