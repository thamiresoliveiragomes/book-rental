<template>
  <div v-if="bookSelected" class="book-details">
    <div class="book-details__image">
      <img :src="bookSelected.coverImage" :alt="$t('bookInfo.coverAlt')" />
    </div>
    <div class="book-details__content">
      <div class="book-details__content-text">
        <h2>{{ bookSelected.title }}</h2>
        <h3>{{ bookSelected.author }}</h3>
        <p>{{ bookSelected.description }}</p>
      </div>
      <div class="book-details__content-rental">
        <Button
          :label="'7 ' + $t('bookInfo.days')"
          :class="{ 'p-button-success': rentalDuration === 7 }"
          toggle-button
          @click="setRentalDuration(7)"
        />
        <Button
          :label="'15 ' + $t('bookInfo.days')"
          :class="{ 'p-button-success': rentalDuration === 15 }"
          toggle-button
          @click="setRentalDuration(15)"
        />
        <Button
          :label="'30 ' + $t('bookInfo.days')"
          :class="{ 'p-button-success': rentalDuration === 30 }"
          toggle-button
          @click="setRentalDuration(30)"
        />
      </div>
      <div class="book-details__content-price">
        <p>R${{ rentalPrice.toFixed(2) }}</p>
        <Button
          :label="$t('bookInfo.rentButton')"
          class="book-details__content-button p-button-success"
          @click="addToCart()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useBookStore } from '../stores/bookStore';
import { useCartStore } from '../stores/cartStore';
import { useRoute } from 'vue-router';
import Button from 'primevue/button';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  props: {
    bookId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  emits: { rent: null },
  setup(props, { emit }) {
    const bookStore = useBookStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const id = computed(() => props.bookId ?? (route.params.id as string));
    const bookSelected = computed(() =>
      bookStore.books.find((book) => book.id === Number(id.value))
    );
    const rentalDuration = ref<number>(7);
    const rentalPrice = ref<number>(0);

    const addToCart = () => {
      if (bookSelected.value) {
        cartStore.addToCart(
          bookSelected.value,
          rentalDuration.value,
          rentalPrice.value
        );
      }
      emit('rent');
    };

    const updateRentalPrice = () => {
      if (!bookSelected.value) return;
      switch (rentalDuration.value) {
        case 15:
          rentalPrice.value = bookSelected.value.rentalPricePerWeek * 2;
          break;
        case 30:
          rentalPrice.value = bookSelected.value.rentalPricePerWeek * 4;
          break;
        default:
          rentalPrice.value = bookSelected.value.rentalPricePerWeek;
      }
    };

    const setRentalDuration = (duration: number) => {
      rentalDuration.value = duration;
      updateRentalPrice();
    };

    watch(bookSelected, (newBook) => {
      if (newBook) updateRentalPrice();
    });

    updateRentalPrice();

    return {
      bookSelected,
      rentalDuration,
      rentalPrice,
      addToCart,
      setRentalDuration,
    };
  },
};
</script>

<style scoped lang="scss">
.book-details {
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  &__content {
    max-width: 480px;
    padding-right: 48px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;

    &-text {
      text-align: left;

      h2 {
        font-weight: 700;
        font-size: 40px;
      }

      h3 {
        font-weight: 500;
      }

      p {
        margin: 24px 0;
      }
    }

    &-rental {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    .p-button {
      background: #fff;
      border: 1px solid #000;
      border-radius: 20px;
      color: #000;
      font-size: 22px;
      padding: 8px 24px;

      &.p-button-success,
      &:hover {
        background: #000;
        color: #fff;
        border: 1px solid #000;
      }
    }

    &-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      p {
        margin: 0;
        font-size: 36px;
      }
    }
  }

  &__image {
    padding: 0 48px;
    img {
      width: 180px;
      height: auto;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    &__content {
      padding-right: 0;
      gap: 12px;

      .p-button {
        font-size: 16px;
      }
    }

    &__image {
      width: 145px;
      display: flex;
      justify-content: center;
    }
  }
}

.product-view {
  .book-details {
    &__image {
      img {
        width: 280px;
      }
    }
  }
}
</style>
