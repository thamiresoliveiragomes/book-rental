<template>
  <div class="cart">
    <h1 class="cart__title">{{ $t('cart.title').toLocaleUpperCase() }}</h1>
    <div v-if="cart.length === 0" class="cart__emptyText">
      {{ $t('cart.empty') }}
    </div>
    <div v-else>
      <CartItem v-for="item in cart" :key="item.book.id" :item="item" />
    </div>
    <div class="cart__checkout">
      <p>{{ $t('cart.total') }}: R$ {{ totalCartPrice.toFixed(2) }}</p>
      <div class="cart__checkout-buttons">
        <Button
          :label="$t('cart.clearCart')"
          class="p-button-secondary"
          :disabled="cart.length === 0"
          @click="cartStore.clearCart"
        />
        <Button
          :label="$t('cart.finalizeOrder')"
          class="p-button-primary"
          :disabled="cart.length === 0"
          @click="finalizeOrder"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import CartItem from './CartItem.vue';

const cartStore = useCartStore();
const router = useRouter();
const { cart, totalCartPrice } = storeToRefs(cartStore);

const finalizeOrder = () => {
  router.push('/checkout');
};
</script>

<style scoped lang="scss">
.cart {
  &__title {
    padding: 30px;
    border-bottom: 2px solid;
  }

  &__emptyText {
    font-size: 24px;
    padding: 24px;
    border-bottom: 2px solid;
  }

  &__checkout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;

    p {
      font-size: 36px;
    }

    &-buttons {
      display: flex;
      gap: 10px;

      .p-button {
        font-size: 24px;
        padding: 8px 32px;
      }

      .p-button-secondary {
        background: #fff;
        border: 1px solid #000;
        border-radius: 20px;
        color: #000;
        &:hover {
          background: #fff;
          color: #000;
          border: 1px solid #000;
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
    }
  }
}
</style>
