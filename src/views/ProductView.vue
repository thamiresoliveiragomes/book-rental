<template>
  <DefaultLayout>
    <div class="product-view">
      <BookDetails />
    </div>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '../layouts/DefaultLayout.vue';
import BookDetails from '../components/BookDetails.vue';
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
