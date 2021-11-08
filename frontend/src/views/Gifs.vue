<template>
    <navBar></navBar>
    <div class="row d-flex flex-column">
        <postGifForm></postGifForm>
        <gif></gif>
    </div>
</template>

<script>
import navBar from '../components/NavBar.ce.vue'
import gif from '../components/gif.ce.vue'
import postGifForm from '../components/postGifForm.ce.vue'
export default {
    created(){
        if(localStorage.getItem("userId") == null) {
            this.$router.push('/');
        }
    },
    name: 'Gifs',
    components: {
        postGifForm,
        gif,
        navBar,
    },
    data() {
        return {
        }
    },
}
</script>


<style>
</style>