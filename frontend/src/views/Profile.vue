<template>
    <navBar></navBar>
    <div id="profile" class="row">
        <div class="col mx-auto border border-dark rounded shadow bg-light">
            <h2 class="h4 mt-3">Informations de profil</h2>
            <profileInfos></profileInfos>
            <br />
            <div class="mb-3">
                <router-link to="/gifs">Retour aux publications</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import profileInfos from '../components/profileInfos.ce.vue'
import navBar from '../components/navBar.ce.vue'
export default {
    name: 'profile',
    components: {
        profileInfos,
        navBar,
    },
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
}
</script>


<style>
</style>
