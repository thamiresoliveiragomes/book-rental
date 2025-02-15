<template>
  <div id="app">
    <Toast />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { Toast } from 'primevue';
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
}
</style>
