<template>
  <DefaultLayout>
    <CarouselImage :items="carouselItems" />
    <CarouselCard />
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import CarouselImage from '../components/CarouselImage.vue';
import CarouselCard from '../components/CarouselCard.vue';

const carouselItems = [
  { coverImage: './src/assets/banner/nosferatu.png', route: '/product/8' },
  {
    coverImage: './src/assets/banner/lançamentos.png',
    route: '/category/Lan%25C3%25A7amentos',
  },
  {
    coverImage: './src/assets/banner/hobbity.png',
    route: '/product/6',
  },
];
</script>
