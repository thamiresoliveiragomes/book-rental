import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import SearchResultsView from '../../src/views/SearchResultsView.vue';
import DefaultLayout from '../../src/layouts/DefaultLayout.vue';
import SearchResults from '../../src/components/SearchResults.vue';
import PrimeVue from 'primevue/config';
import router from '../../src/router';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
});

describe('SearchResultsView.vue', () => {
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
    wrapper = mount(SearchResultsView, {
      global: {
        plugins: [createPinia(), i18n, PrimeVue, router],
      },
    });
  });

  it('should render the default layout and search results component', () => {
    expect(wrapper.findComponent(DefaultLayout).exists()).toBe(true);
    expect(wrapper.findComponent(SearchResults).exists()).toBe(true);
  });
});
