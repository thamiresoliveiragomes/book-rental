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

<script lang="ts">
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import CartItem from './CartItem.vue';
import { useI18n } from 'vue-i18n';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    CartItem,
  },
  setup() {
    const { t } = useI18n();
    const cartStore = useCartStore();
    const router = useRouter();
    const { cart, totalCartPrice } = storeToRefs(cartStore);

    const finalizeOrder = () => {
      router.push('/checkout');
    };

    return {
      t,
      cart,
      totalCartPrice,
      cartStore,
      finalizeOrder,
    };
  },
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
      font-weight: 700;
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

  @media screen and (max-width: 768px) {
    &__checkout {
      flex-direction: column;
      gap: 12px;

      &-buttons {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
}
</style>
