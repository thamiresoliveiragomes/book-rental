<template>
  <div class="book-list">
    <h1 class="book-list__title">{{ title }}</h1>
    <div class="book-list__controls">
      <Dropdown
        id="sort"
        v-model="sortOrder"
        :options="sortOptions"
        option-label="label"
        option-value="value"
        :placeholder="$t('filter.sort')"
      />
    </div>
    <div class="book-list__items">
      <BookCard v-for="book in paginatedBooks" :key="book.id" :book="book" />
    </div>
    <Paginator
      v-if="filteredBooks.length > rowsPerPage"
      :rows="rowsPerPage"
      :total-records="filteredBooks.length"
      :page="currentPage"
      class="book-list__paginator"
      @page="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useBookStore } from '../stores/bookStore';
import BookCard from './BookCard.vue';
import { useRoute } from 'vue-router';
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    BookCard,
    Paginator,
    Dropdown,
  },
  setup() {
    const { t } = useI18n();
    const bookStore = useBookStore();
    const books = computed(() => bookStore.books);
    const route = useRoute();
    const category = computed(() => route.params.category as string);

    const title = computed(() => {
      const decodedCategory = category.value
        ? decodeURIComponent(category.value)
        : 'Home';
      return t(`categories.${decodedCategory}`).toLocaleUpperCase();
    });

    const filteredBooks = computed(() => {
      if (category.value) {
        const decodedCategory = decodeURIComponent(category.value);
        if (
          decodedCategory === 'Mais Vendidos' ||
          decodedCategory === 'Lançamentos'
        ) {
          return books.value.filter((book) =>
            book.tags.includes(decodedCategory)
          );
        } else if (decodedCategory === 'Ver Todos') {
          return books.value;
        } else {
          return books.value.filter((book) =>
            book.categories.includes(decodedCategory)
          );
        }
      }
      return books.value;
    });

    const rowsPerPage = ref(12);
    const currentPage = ref(0);
    const sortOrder = ref('');

    const lowHigh = t('filter.lowHigh');
    const highLow = t('filter.highLow');

    const sortOptions = [
      { label: 'a-z', value: 'a-z' },
      { label: 'z-a', value: 'z-a' },
      { label: lowHigh, value: 'low-high' },
      { label: highLow, value: 'high-low' },
    ];

    const sortedBooks = computed(() => {
      if (!sortOrder.value) {
        return filteredBooks.value;
      }
      return [...filteredBooks.value].sort((a, b) => {
        switch (sortOrder.value) {
          case 'a-z':
            return a.title.localeCompare(b.title);
          case 'z-a':
            return b.title.localeCompare(a.title);
          case 'low-high':
            return a.rentalPricePerWeek - b.rentalPricePerWeek;
          case 'high-low':
            return b.rentalPricePerWeek - a.rentalPricePerWeek;
          default:
            return 0;
        }
      });
    });

    const paginatedBooks = computed(() => {
      const start = currentPage.value * rowsPerPage.value;
      const end = start + rowsPerPage.value;
      return sortedBooks.value.slice(start, end);
    });

    const onPageChange = (event: { page: number }) => {
      currentPage.value = event.page;
    };

    const loadBooks = async () => {
      await bookStore.loadBooks();
    };

    onMounted(loadBooks);

    watch(category, loadBooks);

    watch(route, () => {
      sortOrder.value = '';
      currentPage.value = 0;
    });

    return {
      title,
      sortOrder,
      sortOptions,
      paginatedBooks,
      filteredBooks,
      rowsPerPage,
      currentPage,
      onPageChange,
    };
  },
};
</script>

<style scoped lang="scss">
.book-list {
  &__title {
    margin: 30px;
  }

  &__controls {
    margin: 20px 80px;
    display: flex;
    justify-content: end;
    align-items: center;

    .p-select {
      border: 1px solid #000;
      border-radius: 20px;

      &.p-focus {
        border-color: #000;
        outline-color: #000;
      }
    }
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

    &__controls {
      margin: 20px 48px;
    }

    ::v-deep(.p-paginator-pages) {
      gap: 0;
    }
  }
}
</style>
