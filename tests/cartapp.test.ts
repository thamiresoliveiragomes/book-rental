import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Cart from '../src/components/CartApp.vue';
import { createTestingPinia } from '@pinia/testing';
import { useCartStore } from '../src/stores/cartStore';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        clearCart: 'Clear Cart',
        finalizeOrder: 'Finalize Order',
      },
    },
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Cart.vue', () => {
  let wrapper;
  let cartStore;

  beforeEach(() => {
    wrapper = mount(Cart, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), i18n, router],
      },
    });
    cartStore = useCartStore();
    cartStore.cart = [];
    cartStore.totalCartPrice = 0; // Garantir que totalCartPrice esteja definido
  });

  it('renders cart title in uppercase', () => {
    expect(wrapper.find('.cart__title').text()).toBe('SHOPPING CART');
  });

  it('displays empty cart message when cart is empty', () => {
    expect(wrapper.find('.cart__emptyText').text()).toBe('Your cart is empty');
  });

  it('enables buttons when cart has items', async () => {
    cartStore.cart.push({
      book: {
        id: 1,
        title: 'Test Book',
        author: '',
        description: '',
        rentalPricePerWeek: 0,
        categories: [],
        coverImage: '',
        available: false,
        tags: [],
      },
      rentalDays: 1,
      rentalPrice: 0,
    });

    await wrapper.vm.$nextTick();

    const clearCartButton = wrapper.find('.p-button-secondary');
    const finalizeOrderButton = wrapper.find('.p-button-primary');

    expect(clearCartButton.attributes('disabled')).toBeUndefined();
    expect(finalizeOrderButton.attributes('disabled')).toBeUndefined();
  });

  it('navigates to checkout on finalizeOrder click', async () => {
    const push = vi.spyOn(router, 'push');
    cartStore.cart.push({
      book: { id: 1, title: 'Book' },
      rentalDays: 1,
      rentalPrice: 10,
    });

    await wrapper.vm.$nextTick();

    await wrapper.find('.p-button-primary').trigger('click');
    expect(push).toHaveBeenCalledWith('/checkout');
  });
});
