import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import HomeView from '../../src/views/HomeView.vue';
import DefaultLayout from '../../src/layouts/DefaultLayout.vue';
import CarouselImage from '../../src/components/CarouselImage.vue';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router';
import ToastService from 'primevue/toastservice';

const messages = {
  en: { bookList: 'Book List' },
  pt: { bookList: 'Lista de Livros' },
};

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
});

describe('HomeView.vue', () => {
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
    wrapper = mount(HomeView, {
      global: {
        plugins: [createPinia(), i18n, PrimeVue, router, ToastService],
      },
    });
  });

  it('should render the default layout and book list component', () => {
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true);
    expect(wrapper.findComponent(CarouselImage).exists()).toBe(true);
  });
});
