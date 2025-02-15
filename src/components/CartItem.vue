<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="item.book.coverImage" :alt="$t('bookInfo.coverAlt')" />
    </div>
    <div class="cart-item__content">
      <div class="cart-item__content-header">
        <div class="cart-item__content-title">
          <h2>{{ item.book.title }}</h2>
          <div class="cart-icon" @click="removeFromCart">
            <i class="pi pi-trash"></i>
          </div>
        </div>
        <div class="cart-item__content-author">
          <p>{{ item.book.author }}</p>
        </div>
      </div>
      <div class="cart-item__content-rental">
        <div class="cart-item__content-rental-buttons">
          <Button
            :label="'7 ' + $t('bookInfo.days')"
            :class="{ 'p-button-success': item.rentalDays === 7 }"
            toggle-button
            @click="updateRentalDuration(7)"
          />
          <Button
            :label="'15 ' + $t('bookInfo.days')"
            :class="{ 'p-button-success': item.rentalDays === 15 }"
            toggle-button
            @click="updateRentalDuration(15)"
          />
          <Button
            :label="'30 ' + $t('bookInfo.days')"
            :class="{ 'p-button-success': item.rentalDays === 30 }"
            toggle-button
            @click="updateRentalDuration(30)"
          />
        </div>
        <p>R$ {{ item.rentalPrice.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from 'primevue/button';
import { useCartStore } from '../stores/cartStore';
import { type Book } from '../models/Book';

interface CartItem {
  book: Book;
  rentalDays: number;
  rentalPrice: number;
}

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  props: {
    item: {
      type: Object as () => CartItem,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();

    const removeFromCart = () => {
      cartStore.removeFromCart(props.item.book.id);
    };

    const updateRentalDuration = (duration: number) => {
      cartStore.updateRentalDuration(props.item.book.id, duration);
    };

    return {
      removeFromCart,
      updateRentalDuration,
    };
  },
};
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  justify-content: space-between;
  gap: 48px;
  border-bottom: 2px solid;
  padding: 24px;

  &__image {
    max-width: 150px;
    img {
      width: 100%;
    }
  }
  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &-title,
    &-author,
    &-rental {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      margin-bottom: 12px;
      h2 {
        font-size: 40px;
        text-align: left;
      }
      .cart-icon i {
        font-size: 32px;
      }
    }

    &-rental {
      font-size: 32px;
      &-buttons {
        display: flex;
        gap: 10px;

        .p-button {
          background: #fff;
          border: 1px solid #000;
          border-radius: 20px;
          color: #000;
          &:hover {
            background: #000;
            color: #fff;
            border: 1px solid #000;
          }

          &.p-button-success {
            background: #000;
            color: #fff;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 24px;

    &__content {
      gap: 12px;
      &-rental {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;

        &-buttons {
          gap: 30px;
          width: 100%;

          .p-button {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
