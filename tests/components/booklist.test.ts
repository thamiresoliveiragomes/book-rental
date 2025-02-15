import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import BookList from '../../src/components/BookList.vue';
import { useBookStore } from '../../src/stores/bookStore';
import { useRouter } from 'vue-router';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';

vi.mock('../../src/stores/bookStore');
vi.mock('vue-router', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useRoute: vi.fn(() => ({
      params: vi.fn(),
    })),
  };
});

vi.mock('primevue/dropdown', () => ({
  default: { name: 'Dropdown', props: ['options', 'v-model', 'placeholder'] },
}));

vi.mock('primevue/paginator', () => ({
  default: { name: 'Paginator', props: ['rows', 'total-records', 'page'] },
}));

vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(() => ({
    add: vi.fn(),
  })),
}));

describe('BookList.vue', () => {
  let wrapper;
  const mockBooks = [
    {
      id: 1,
      title: 'Book 1',
      rentalPricePerWeek: 10.0,
      categories: ['Category A'],
      tags: ['Mais Vendidos'],
    },
    {
      id: 2,
      title: 'Book 2',
      rentalPricePerWeek: 15.0,
      categories: ['Category B'],
      tags: ['Lançamentos'],
    },
  ];

  let bookStore;

  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        categories: {
          'Mais Vendidos': 'Bestsellers',
          Lançamentos: 'New Releases',
          'Ver Todos': 'See All',
        },
      },
    },
  });

  let route;

  beforeEach(() => {
    route = { params: {} };
    bookStore = {
      books: mockBooks,
      selectedBook: null,
      hasBooks: vi.fn(() => true),
      loadBooks: vi.fn(),
      $state: {},
    };
    vi.mocked(useBookStore).mockReturnValue(bookStore);
    vi.mocked(useRouter).mockReturnValue(route);
    wrapper = mount(BookList, {
      global: {
        plugins: [i18n],
        stubs: {
          Dropdown,
          Paginator,
        },
      },
    });
  });

  it('renders book list correctly', async () => {
    expect(wrapper.findAll('.book-list__items .book-card').length).toBe(
      mockBooks.length
    );
  });

  it('filters books by category', async () => {
    route = { params: { category: 'Mais Vendidos' } };
    vi.mocked(useRouter).mockReturnValue(route);

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.book-list__items .book-card').length).toBe(2);
  });

  it('sorts books by selected option', async () => {
    route = { params: { category: 'Ver Todos' } };
    vi.mocked(useRouter).mockReturnValue(route);

    await wrapper.findComponent(Dropdown).vm.$emit('update:modelValue', 'a-z');
    await wrapper.vm.$nextTick();

    const sortedBooks = wrapper.findAll('.book-list__items .book-card');
    expect(sortedBooks[0].text()).toContain('Book 1');
    expect(sortedBooks[1].text()).toContain('Book 2');
  });

  it('calls loadBooks when mounted', async () => {
    expect(bookStore.loadBooks).toHaveBeenCalled();
  });
});
