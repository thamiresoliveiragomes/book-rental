import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import SearchBar from '../../src/components/SearchBar.vue';
import { createRouter, createWebHistory } from 'vue-router';

describe('SearchBar.vue', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/search', component: { template: '<div>Search Page</div>' } },
    ],
  });

  let i18n;
  let wrapper;

  beforeEach(() => {
    i18n = createI18n({
      locale: 'en',
      messages: {
        en: { search: { placeholder: 'Search for books' } },
        pt: { search: { placeholder: 'Procurar livros' } },
      },
    });
    wrapper = mount(SearchBar, {
      global: {
        plugins: [router, i18n, PrimeVue],
      },
    });
  });

  it('renders the search bar', () => {
    expect(wrapper.find('.searchbar__container').exists()).toBe(true);
  });

  it('updates searchQuery when input changes', async () => {
    const input = wrapper.find('input');
    await input.setValue('test query');
    expect(wrapper.vm.searchQuery).toBe('test query');
  });

  it('navigates to search page on searchBooks call', async () => {
    const push = vi.spyOn(router, 'push');
    wrapper.vm.searchQuery = 'test query';
    await wrapper.vm.searchBooks();
    expect(push).toHaveBeenCalledWith({
      path: '/search',
      query: { q: 'test query' },
    });
  });

  it('does not navigate if searchQuery is empty', async () => {
    const push = vi.spyOn(router, 'push');
    wrapper.vm.searchQuery = '';
    await wrapper.vm.searchBooks();
    expect(push).toHaveBeenCalled();
  });
});
