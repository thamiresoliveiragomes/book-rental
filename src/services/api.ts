import { booksData } from '../mocks/booksData';
import { type Book } from '../models/Book';

export const fetchBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(booksData);
    }, 100);
  });
};
