import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import BookDetails from '../../src/components/BookDetails.vue';
import { useBookStore } from '../../src/stores/bookStore';
import { useCartStore } from '../../src/stores/cartStore';
import { useRoute } from 'vue-router';

vi.mock('../../src/stores/bookStore');
vi.mock('../../src/stores/cartStore');
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('BookDetails.vue', () => {
  let wrapper;
  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    description: 'Test Description',
    coverImage: 'test-cover.jpg',
    rentalPricePerWeek: 10.0,
    categories: ['Fiction'],
    available: true,
    tags: ['New'],
  };

  let bookStore;
  let cartStore;
  let route;

  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        bookInfo: {
          coverAlt: 'Book Cover Image',
          rentButton: 'Rent Book',
        },
      },
    },
  });

  beforeEach(() => {
    route = { params: { id: 1 } };
    bookStore = {
      books: [mockBook],
      selectedBook: mockBook,
      hasBooks: vi.fn(() => true),
      allCategories: vi.fn(() => ['Fiction']),
      $state: {},
      $patch: vi.fn(),
      $reset: vi.fn(),
      $subscribe: vi.fn(),
    };
    cartStore = {
      addToCart: vi.fn(),
      totalCartPrice: vi.fn(() => 0),
      cartItemCount: vi.fn(() => 0),
    };
    vi.mocked(useBookStore).mockReturnValue(bookStore);
    vi.mocked(useCartStore).mockReturnValue(cartStore);
    vi.mocked(useRoute).mockReturnValue(route);
    wrapper = mount(BookDetails, {
      props: { bookId: 1 },
      global: {
        plugins: [i18n],
      },
    });
  });

  it('renders book details correctly', () => {
    expect(wrapper.find('h1').text()).toBe(mockBook.title);
    expect(wrapper.find('p').text()).toBe(mockBook.author);
    expect(
      wrapper.find('.book-details__content-text p:nth-child(3)').text()
    ).toBe(mockBook.description);
  });

  it('updates rental price correctly', async () => {
    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.vm.rentalPrice).toBe(20);

    await wrapper.findAll('button')[2].trigger('click');
    expect(wrapper.vm.rentalPrice).toBe(40);
  });

  it('adds book to cart correctly', async () => {
    await wrapper.find('.book-details__content-button').trigger('click');
    expect(cartStore.addToCart).toHaveBeenCalledWith(mockBook, 7, 10);
  });

  it('displays correct alt text for the book cover using i18n', () => {
    expect(wrapper.find('img').attributes('alt')).toBe('Book Cover Image');
  });
});
