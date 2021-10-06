<template>
<div class="border border-dark rounded mb-3">
    <div class="d-flex align-items-center justify-content-around">
    <router-link to="/gifs" class="text-decoration-none text-danger">
        Publications
        <i class="fas fa-film"></i>
    </router-link>
    <router-link to="/profile" class="text-decoration-none text-danger">
        Profil
        <i class="fas fa-user"></i>
    </router-link>
    <span v-if="isAdmin === 'true'">
        <router-link to="/admin" class="text-decoration-none text-danger">
        Administration
        <i class="fas fa-cog"></i>
        </router-link>
    </span>
    <router-link to="/logout" class="text-decoration-none text-danger">
        Déconnexion
        <i class="fas fa-sign-out-alt"></i>
    </router-link>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
    isAdmin: localStorage.getItem('isAdmin')
    }
}
}
</script>

<style>
</style>