import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useBookStore } from '../../src/stores/bookStore';
import { fetchBooks } from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  fetchBooks: vi.fn(),
}));

describe('useBookStore', () => {
  let bookStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    bookStore = useBookStore();
  });

  it('should load books', async () => {
    const books = [
      {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        rentalPricePerWeek: 10,
        coverImage: 'cover1.jpg',
        categories: ['Fiction'],
        available: true,
        tags: [],
      },
      {
        id: 2,
        title: 'Book 2',
        author: 'Author 2',
        description: 'Description 2',
        rentalPricePerWeek: 15,
        coverImage: 'cover2.jpg',
        categories: ['Non-Fiction'],
        available: true,
        tags: [],
      },
    ];
    vi.mocked(fetchBooks).mockResolvedValue(books);

    await bookStore.loadBooks();

    expect(bookStore.books).toEqual(books);
  });

  it('should handle error when loading books', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    vi.mocked(fetchBooks).mockRejectedValue(new Error('Failed to fetch books'));

    await bookStore.loadBooks();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erro ao carregar os livros:',
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });

  it('should return true if there are books', () => {
    bookStore.books = [{ id: 1, title: 'Book 1', categories: ['Fiction'] }];

    expect(bookStore.hasBooks).toBe(true);
  });

  it('should return false if there are no books', () => {
    bookStore.books = [];

    expect(bookStore.hasBooks).toBe(false);
  });

  it('should return all unique categories', () => {
    bookStore.books = [
      { id: 1, title: 'Book 1', categories: ['Fiction', 'Adventure'] },
      { id: 2, title: 'Book 2', categories: ['Non-Fiction', 'Adventure'] },
    ];

    expect(bookStore.allCategories).toEqual([
      'Fiction',
      'Adventure',
      'Non-Fiction',
    ]);
  });
});
