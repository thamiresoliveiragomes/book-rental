<template>
  <header class="header">
    <div class="header__logo" @click="goToHome">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
    <div class="searchbar">
      <SearchBar />
    </div>
    <div class="header__icons">
      <div class="orders-icon" @click="goToOrders">
        <img src="/meus-pedidos.png" alt="icon" />
      </div>
      <div class="cart-icon" @click="goToCart">
        <i class="pi pi-shopping-cart"></i>
        <Badge
          v-if="cartItemCount > 0"
          :value="cartItemCount"
          class="cart-badge"
        />
      </div>
    </div>
  </header>
  <div class="searchbar-mobile">
    <SearchBar />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from './SearchBar.vue';
import { useCartStore } from '../stores/cartStore';
import Badge from 'primevue/badge';

export default defineComponent({
  name: 'HeaderApp',
  components: {
    SearchBar,
    Badge,
  },
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();

    const goToHome = () => {
      router.push('/');
    };

    const goToCart = () => {
      router.push('/cart');
    };

    const goToOrders = () => {
      router.push('/order-history');
    };

    const cartItemCount = computed(() => cartStore.cart.length);

    return {
      goToHome,
      goToCart,
      cartItemCount,
      goToOrders,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;

  &__logo img {
    height: 40px;
    cursor: pointer;
  }

  &__icons {
    display: flex;
    display: flex;
    align-items: center;
  }
}

.cart-icon {
  position: relative;
  font-size: 24px;
  cursor: pointer;

  i {
    font-size: 32px;
    color: #000;
    transition: color 0.3s ease-in-out;
  }
}

.orders-icon img {
  width: 38px;
  margin-right: 16px;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #000;
  color: white;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 50%;
}

.searchbar {
  width: 100%;

  input {
    width: 300px;
    padding: 5px;
  }

  &-mobile {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .searchbar {
    display: none;

    &-mobile {
      display: flex;

      .searchbar__container {
        border-top: 2px solid;
        padding: 20px 0;
      }
    }
  }
}
</style>
