import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import CartView from '../../src/views/CartView.vue';
import DefaultLayout from '../../src/layouts/DefaultLayout.vue';
import CartApp from '../../src/components/CartApp.vue';

const messages = {
  en: { cart: 'Cart', checkout: 'Checkout' },
  pt: { cart: 'Carrinho', checkout: 'Finalizar Compra' },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('CartView.vue', () => {
  let wrapper;
  beforeEach(() => {
    setActivePinia(createPinia());
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    wrapper = mount(CartView, {
      global: {
        plugins: [createPinia(), i18n, PrimeVue],
      },
    });
  });

  it('should render the default layout and cart component', () => {
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true);
    expect(wrapper.findComponent(CartApp).exists()).toBe(true);
  });

  it('should display translated text', () => {
    expect(wrapper.html()).toContain(messages.en.cart);
  });
});
