import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import MenuBar from '../src/components/MenuBar.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useBookStore } from '../src/stores/bookStore';

describe('MenuBar.vue', () => {
  let i18n;
  let router;
  let bookStore;

  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    setActivePinia(createPinia());

    i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          categories: {
            categories: 'Categories',
            bestSellers: 'Best Sellers',
            newReleases: 'New Releases',
            viewAll: 'View All',
            'Category One': 'Category One',
            'Category Two': 'Category Two',
          },
        },
        pt: {
          categories: {
            categories: 'Categorias',
            bestSellers: 'Mais Vendidos',
            newReleases: 'Lançamentos',
            viewAll: 'Ver Todos',
            'Category One': 'Categoria Um',
            'Category Two': 'Categoria Dois',
          },
        },
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/category/:category',
          name: 'Category',
          component: { template: '<div>Category Page</div>' },
        },
      ],
    });

    bookStore = useBookStore();
    bookStore.$patch({
      allCategories: ['Category One', 'Category Two'],
    });
  });

  it('renders the menu bar', () => {
    const wrapper = mount(MenuBar, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });
    expect(wrapper.find('.p-menubar').exists()).toBe(true);
  });
});
