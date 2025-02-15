import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import { createRouter, createWebHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import SearchResults from '../../src/components/SearchResults.vue';
import BookCard from '../../src/components/BookCard.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useBookStore } from '../../src/stores/bookStore';

describe('SearchResults.vue', () => {
  let i18n;
  let router;
  let bookStore;
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    i18n = createI18n({
      locale: 'en',
      messages: {
        en: {
          search: { title: 'Search Results', noResults: 'No results found' },
        },
        pt: {
          search: {
            title: 'Resultados da Pesquisa',
            noResults: 'Nenhum resultado encontrado',
          },
        },
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/search', component: { template: '<div>Search Page</div>' } },
      ],
    });

    bookStore = useBookStore();
    bookStore.books = [
      {
        id: 1,
        title: 'Book One',
        author: 'Author One',
        categories: ['Category One'],
        rentalPricePerWeek: 10.0,
      },
      {
        id: 2,
        title: 'Book Two',
        author: 'Author Two',
        categories: ['Category Two'],
        rentalPricePerWeek: 15.0,
      },
    ];

    wrapper = mount(SearchResults, {
      global: {
        plugins: [router, i18n, PrimeVue, ToastService],
      },
    });
  });

  it('renders the search results title', () => {
    expect(wrapper.find('.book-list__title').text()).toContain(
      'SEARCH RESULTS'
    );
  });

  it('displays no results message when no books match the search query', async () => {
    router.push({ path: '/search', query: { q: 'nonexistent' } });
    await router.isReady();

    expect(wrapper.find('.book-list__items').exists()).toBe(false);
    expect(wrapper.find('.book-list').text()).toContain('No results found');
  });

  it('displays book cards when books match the search query', async () => {
    router.push({ path: '/search', query: { q: 'Book' } });
    await router.isReady();

    expect(wrapper.findAllComponents(BookCard).length).toBe(2);
  });
});
