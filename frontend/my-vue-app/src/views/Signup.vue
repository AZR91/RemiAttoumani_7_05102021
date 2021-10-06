<template>
    <div class="container">
        <div class="row">
            <div class="col col-md-6 mx-auto border border-dark rounded shadow">
                <h2 class="h4 mt-3">Inscription</h2>
                <signupForm />
            </div>
            <router-link to="/">Retour</router-link>
        </div>
    </div>
</template>

<script setup>
import signupForm from '../components/signupForm.ce.vue'
</script>
<style>
</style>