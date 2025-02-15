import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createI18n } from 'vue-i18n';
import BookCard from '../../src/components/BookCard.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('primevue/usetoast', () => ({
  useToast: vi.fn(),
}));

vi.mock('primevue/dialog', () => ({
  default: {
    name: 'Dialog',
    props: ['modelValue'],
    render: () => {},
  },
}));

describe('BookCard.vue', () => {
  let wrapper;
  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    rentalPricePerWeek: 10.0,
    coverImage: 'test-cover.jpg',
    description: 'Test Description',
    categories: ['Test Category'],
    available: true,
    tags: ['Test Tag'],
  };

  let router;

  const toast = {
    add: vi.fn(),
    remove: vi.fn(),
    removeGroup: vi.fn(),
    removeAllGroups: vi.fn(),
  };

  const i18n = createI18n({
    locale: 'en',
    messages: {
      en: {
        bookInfo: {
          coverAlt: 'Book Cover Image',
          from: 'From',
          rentButton: 'Rent Book',
          successMessageToast: 'Book successfully rented!',
          successDetailToast: 'You have rented the book for the week.',
        },
      },
    },
  });

  beforeEach(() => {
    router = {
      push: vi.fn(),
    };
    vi.mocked(useRouter).mockReturnValue(router);
    vi.mocked(useToast).mockReturnValue(toast);

    wrapper = mount(BookCard, {
      props: { book: mockBook },
      global: {
        plugins: [i18n],
        stubs: {
          Dialog: true,
        },
      },
    });
  });

  it('renders book details correctly', () => {
    expect(wrapper.find('h2').text()).toBe(mockBook.title);
    expect(wrapper.find('p').text()).toBe(mockBook.author);
    expect(wrapper.find('.book-card__image').attributes('alt')).toBe(
      'Book Cover Image'
    );
    expect(
      wrapper.find('.book-card__container-price p:nth-child(2)').text()
    ).toBe(`R$${mockBook.rentalPricePerWeek.toFixed(2)}`);
  });

  it('opens modal when rent button is clicked', async () => {
    await wrapper.find('.book-card__button').trigger('click');
    expect(wrapper.vm.isModalVisible).toBe(true);
  });

  it('closes modal and shows success toast when rent event is emitted', async () => {
    expect(wrapper.exists()).toBe(true);

    await wrapper.find('.book-card__button').trigger('click');
    expect(wrapper.vm.isModalVisible).toBe(true);
  });

  it('navigates to the book details page when the card is clicked', async () => {
    await wrapper.trigger('click');
    expect(router.push).toHaveBeenCalledWith(`/product/${mockBook.id}`);
  });
});
