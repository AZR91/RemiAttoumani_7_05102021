<template>
    <div class="row">
        <div class="col col-md-6 mx-auto border border-dark rounded shadow">
            <h2>Inscription réussie</h2>
            <p>Vous allez être redirigé(e) vers la page d'accueil dans 5 secondes pour pouvoir vous connecter.</p>
        </div>
    </div>
</template> 

<script>
export default {
    created() {
        setTimeout(() => this.$router.push({ path: '/' }), 5000);
    }
}
</script>

<style>
</style>