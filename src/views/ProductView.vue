<template>
  <DefaultLayout>
    <div class="product-view">
      <BookDetails @rent="showToast" />
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import BookDetails from '../components/BookDetails.vue';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const toast = useToast();

const showToast = () => {
  toast.add({
    severity: 'contrast',
    summary: t('bookInfo.successMessageToast'),
    detail: t('bookInfo.successDetailToast'),
    life: 5000,
  });
};
</script>

<style scoped lang="scss">
.product-view {
  display: flex;
  justify-content: center;
  padding: 22px;

  .book-details {
    &__content {
      max-width: 100% !important;
      &-text {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>
