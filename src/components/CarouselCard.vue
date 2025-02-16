<template>
  <div class="carousel-card">
    <div class="carousel-card__header">
      <h2>{{ $t('carouselCard.title') }}</h2>
      <Button
        :label="$t('carouselCard.button')"
        class="p-button-primary"
        @click="goToBestSellers"
      />
    </div>
    <div class="carousel-card__items">
      <Carousel
        v-if="!isMobile"
        :value="bestSellingBooks"
        :num-visible="3"
        :num-scroll="3"
        :show-indicators="false"
      >
        <template #item="{ data }">
          <BookCard :book="data" />
        </template>
      </Carousel>
      <div v-else>
        <BookCard
          v-for="book in bestSellingBooks"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, watch, ref } from 'vue';
import { useBookStore } from '../stores/bookStore';
import BookCard from './BookCard.vue';
import { useRoute, useRouter } from 'vue-router';
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';

export default {
  components: {
    BookCard,
    Carousel,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  setup() {
    const bookStore = useBookStore();
    const books = computed(() => bookStore.books);
    const route = useRoute();
    const router = useRouter();
    const category = computed(() => route.params.category as string);

    const bestSellingBooks = computed(() => {
      return books.value
        .filter((book) => book.tags.includes('Mais Vendidos'))
        .slice(0, 9);
    });

    const loadBooks = async () => {
      await bookStore.loadBooks();
    };

    onMounted(loadBooks);
    watch(category, loadBooks);

    const isMobile = ref(window.innerWidth <= 768);
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    const goToBestSellers = () => {
      router.push('/category/Mais%2520Vendidos');
    };

    window.addEventListener('resize', handleResize);
    onMounted(() => {
      handleResize();
    });

    return {
      bestSellingBooks,
      isMobile,
      goToBestSellers,
    };
  },
};
</script>

<style scoped lang="scss">
.carousel-card {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 50px;
  }

  &__items {
    margin: 0px 0 40px;

    .book-card {
      height: 100%;
      padding: 0 12px;
    }
  }

  .p-button-primary {
    background: #000;
    border: 1px solid #000;
    border-radius: 20px;
    color: #fff;
    &:hover {
      background: #000;
      color: #fff;
      border: 1px solid #000;
    }
  }

  @media screen and (max-width: 768px) {
    .carousel-card {
      &__items {
        margin: 0 40px;

        .book-card {
          padding-bottom: 24px;
        }
      }
    }
  }
}
</style>
