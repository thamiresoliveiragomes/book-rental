import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import HeaderApp from '../../src/components/HeaderApp.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '../../src/stores/cartStore';

describe('HeaderApp.vue', () => {
  let router;
  let cartStore;
  let i18n;

  beforeEach(() => {
    setActivePinia(createPinia());

    i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          header: {
            home: 'Home',
            cart: 'Cart',
          },
        },
        pt: {
          header: {
            home: 'Início',
            cart: 'Carrinho',
          },
        },
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home Page</div>' } },
        { path: '/cart', component: { template: '<div>Cart Page</div>' } },
      ],
    });

    cartStore = useCartStore();
    cartStore.$patch({
      cart: [
        { id: 1, title: 'Book One' },
        { id: 2, title: 'Book Two' },
      ],
    });
  });

  it('renders the header', () => {
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });
    expect(wrapper.find('.header').exists()).toBe(true);
  });

  it('navigates to home page on logo click', async () => {
    const push = vi.spyOn(router, 'push');
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });

    await wrapper.find('.logo').trigger('click');
    expect(push).toHaveBeenCalledWith('/');
  });

  it('navigates to cart page on cart icon click', async () => {
    const push = vi.spyOn(router, 'push');
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });

    await wrapper.find('.cart-icon').trigger('click');
    expect(push).toHaveBeenCalledWith('/cart');
  });

  it('displays the correct number of items in the cart', () => {
    const wrapper = mount(HeaderApp, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });
    expect(wrapper.find('.cart-badge').text()).toBe('2');
  });
});
