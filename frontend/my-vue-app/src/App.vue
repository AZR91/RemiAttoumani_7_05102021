<template>
<navBar v-if="userId"></navBar>
<img alt="Groupomania logo" src="./assets/icon-above-font.png" />
<div class="container">
    <router-view />
</div>
</template>

<script>
import navBar from './components/NavBar.ce.vue'
export default {
name: 'App',
components: {
    navBar
},
data() {
    return {
    }
}
}
</script>

<style>
#app {
text-align: center;
}
</style>