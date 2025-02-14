<template>
  <div class="layout">
    <Header />
    <MenuBar />
    <main class="content">
      <slot></slot>
    </main>
    <FooterApp />
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/HeaderApp.vue';
import MenuBar from '../components/MenuBar.vue';
import FooterApp from '../components/FooterApp.vue';
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
