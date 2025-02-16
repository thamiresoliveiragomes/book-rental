<template>
  <div class="carousel-container">
    <p-carousel
      :value="items"
      :num-visible="1"
      :num-scroll="1"
      circular
      :autoplay-interval="3000"
      :show-navigators="false"
      :show-indicators="true"
    >
      <template #item="slotProps">
        <div class="carousel-item" @click="goToPage(slotProps.data.route)">
          <img
            :src="slotProps.data.coverImage"
            class="carousel-image"
            alt="Imagem do Carrossel"
          />
        </div>
      </template>
    </p-carousel>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import PCarousel from 'primevue/carousel';

const router = useRouter();

defineProps<{ items: { coverImage: string; route: string }[] }>();

const goToPage = (route: string) => {
  router.push(route);
};
</script>

<style lang="scss" scoped>
.carousel {
  &-container {
    width: 100%;
    margin: auto;
  }

  &-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
  }

  &-image {
    width: 100%;
    height: auto;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
