<template>
  <header class="header">
    <div class="header__logo" @click="goToHome">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
    <div class="searchbar">
      <SearchBar />
    </div>
    <div class="cart-icon" @click="goToCart">
      <i class="pi pi-shopping-cart"></i>
      <Badge
        v-if="cartItemCount > 0"
        :value="cartItemCount"
        class="cart-badge"
      />
    </div>
  </header>
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

    const cartItemCount = computed(() => cartStore.cart.length);

    return {
      goToHome,
      goToCart,
      cartItemCount,
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
}

@media screen and (max-width: 768px) {
  .searchbar {
    display: none;
  }
}
</style>
