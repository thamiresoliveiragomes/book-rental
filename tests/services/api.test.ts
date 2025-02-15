import { describe, it, expect, vi } from 'vitest';
import { fetchBooks } from '../../src/services/api';
import { booksData } from '../../src/mocks/booksData';

describe('fetchBooks', () => {
  it('should return books data', async () => {
    const books = await fetchBooks();
    expect(books).toEqual(booksData);
  });

  it('should return books data after a delay', async () => {
    vi.useFakeTimers();
    const fetchPromise = fetchBooks();
    vi.advanceTimersByTime(100);
    const books = await fetchPromise;
    expect(books).toEqual(booksData);
    vi.useRealTimers();
  });
});
