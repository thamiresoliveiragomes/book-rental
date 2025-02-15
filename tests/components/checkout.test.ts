import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import CheckoutApp from '../../src/components/CheckoutApp.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '../../src/stores/cartStore';

describe('CheckoutApp.vue', () => {
  let i18n;
  let router;
  let cartStore;
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          checkout: {
            title: 'Checkout',
            formTitle: 'Payment Information',
            email: 'Email',
            cardNumber: 'Card Number',
            cardCode: 'Card Code',
            cardExpirationDate: 'Expiration Date',
            cancel: 'Cancel',
            completePurchase: 'Complete Purchase',
          },
          cart: {
            total: 'Total',
          },
        },
        pt: {
          checkout: {
            title: 'Finalizar Compra',
            formTitle: 'Informações de Pagamento',
            email: 'Email',
            cardNumber: 'Número do Cartão',
            cardCode: 'Código do Cartão',
            cardExpirationDate: 'Data de Expiração',
            cancel: 'Cancelar',
            completePurchase: 'Concluir Compra',
          },
          cart: {
            total: 'Total',
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
      totalCartPrice: 100.0,
    });

    wrapper = mount(CheckoutApp, {
      global: {
        plugins: [router, i18n, PrimeVue, ToastService],
      },
    });
  });

  it('renders the checkout title', () => {
    expect(wrapper.find('.checkout__title').text()).toContain('CHECKOUT');
  });

  it('displays the total cart price', () => {
    expect(wrapper.find('.checkout__footer p').text()).toContain(
      'Total: R$ 0.00'
    );
  });

  it('validates email input', async () => {
    const emailInput = wrapper.find('#email');
    await emailInput.setValue('invalid-email');
    expect(wrapper.vm.validateEmail(wrapper.vm.email)).toBe(false);

    await emailInput.setValue('test@example.com');
    expect(wrapper.vm.validateEmail(wrapper.vm.email)).toBe(true);
  });

  it('navigates to cart page on cancel button click', async () => {
    const push = vi.spyOn(router, 'push');

    const cancelButton = wrapper.find('.p-button-secondary');
    await cancelButton.trigger('click');
    expect(push).toHaveBeenCalledWith('/cart');
  });

  it('completes purchase and clears cart', async () => {
    const clearCart = vi.spyOn(cartStore, 'clearCart');

    wrapper.vm.email = 'test@example.com';
    wrapper.vm.cardExpirationDate = '12/34';

    const completePurchaseButton = wrapper.find('.p-button-primary');
    await completePurchaseButton.trigger('click');

    expect(clearCart).not.toHaveBeenCalled();
  });
});
