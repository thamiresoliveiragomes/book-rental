<template>
  <div class="book-card" @click="selectBook(book)">
    <Card class="book-card__container">
      <template #header>
        <img
          :src="book.coverImage"
          :alt="$t('bookInfo.coverAlt')"
          class="book-card__image"
        />
        <div class="book-card__container-text">
          <h2>{{ book.title }}</h2>
          <p>{{ book.author }}</p>
        </div>
      </template>
      <template #content>
        <div class="book-card__container-price">
          <p>{{ $t('bookInfo.from') }}</p>
          <p>R${{ book.rentalPricePerWeek.toFixed(2) }}</p>
        </div>
      </template>
      <template #footer>
        <Button
          :label="$t('bookInfo.rentButton')"
          class="book-card__button"
          @click.stop="openModal"
        />
      </template>
    </Card>
    <Dialog v-model:visible="isModalVisible" modal class="book-card__dialog">
      <BookDetails :book-id="book.id" @rent="closeModal" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Card, Dialog } from 'primevue';
import BookDetails from './BookDetails.vue';
import { type Book } from '../models/Book';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Card,
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    BookDetails,
  },
  props: {
    book: {
      type: Object as () => Book,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const isModalVisible = ref(false);
    const toast = useToast();

    const openModal = () => {
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
      toast.add({
        severity: 'success',
        summary: t('bookInfo.successMessageToast'),
        detail: t('bookInfo.successDetailToast'),
        life: 5000,
      });
    };

    const selectBook = (book: Book) => {
      router.push(`/product/${book.id}`);
    };

    return {
      t,
      isModalVisible,
      openModal,
      closeModal,
      selectBook,
    };
  },
};
</script>

<style scoped lang="scss">
.book-card {
  cursor: pointer;

  &__container {
    color: #000;
    background: #fff;
    border: 2px solid #000;
    border-radius: 45px;
    height: 100%;
    justify-content: space-between;

    &-text {
      margin: 4px 24px;
      p {
        margin: 4px;
      }
    }

    &-price {
      margin-top: 12px;
      margin-bottom: 8px;
      p {
        margin: 0;
      }
    }
  }

  &__image {
    width: 45%;
    height: auto;
    margin-top: 16px;
  }

  &__button {
    width: 100%;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 8px;
    border: 1px solid #000;

    .p-button-label {
      font-size: 24px;
    }

    &:hover,
    &:focus,
    &:active {
      background: #fff !important;
      border: 1px solid #000 !important;
      color: #000 !important;
    }
  }

  ::v-deep(.p-card-body) {
    padding-top: 0 !important;
  }
}
</style>
