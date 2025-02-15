<template>
  <div class="book-list">
    <h1 class="book-list__title">
      {{ $t('search.title').toLocaleUpperCase() }} "{{
        typeof searchQuery === 'string' ? searchQuery.toUpperCase() : ''
      }}"
    </h1>
    <div v-if="filteredBooks.length === 0">
      {{ $t('search.noResults') }}
    </div>
    <div v-else class="book-list__items">
      <BookCard v-for="book in filteredBooks" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '../stores/bookStore';
import BookCard from './BookCard.vue';

export default {
  components: {
    BookCard,
  },
  setup() {
    const bookStore = useBookStore();
    const route = useRoute();
    const searchQuery = ref(route.query.q || '');

    onMounted(async () => {
      await bookStore.loadBooks();
    });

    watch(
      () => route.query.q,
      (newQuery) => {
        searchQuery.value = newQuery || '';
      }
    );

    const filteredBooks = computed(() => {
      if (!searchQuery.value) return [];

      const query = searchQuery.value.toString().toLowerCase();

      return bookStore.books.filter((book) =>
        [book.title, book.author, ...book.categories]
          .map((field) => field.toLowerCase())
          .some((text) => text.includes(query))
      );
    });

    return {
      searchQuery,
      filteredBooks,
    };
  },
};
</script>

<style scoped lang="scss">
.book-list {
  &__title {
    margin: 30px;
  }

  &__items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 75px;
    margin: 0px 80px 40px;
  }

  &__paginator {
    margin-bottom: 20px;
  }

  ::v-deep(.p-paginator-page) {
    color: #000;
  }

  ::v-deep(
    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover
  ) {
    color: #000;
    background: #efefef;
  }

  ::v-deep(.p-paginator-page-selected) {
    background: #000;
    color: #fff;
  }

  ::v-deep(.p-paginator-pages) {
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
    &__items {
      margin: 0px 48px 40px;
    }
  }
}
</style>
