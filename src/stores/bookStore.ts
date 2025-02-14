import { defineStore } from 'pinia';
import { type Book } from '../models/Book';
import { fetchBooks } from '../services/api';

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
    selectedBook: null as Book | null | undefined,
  }),
  actions: {
    async loadBooks() {
      try {
        this.books = await fetchBooks();
      } catch (error) {
        console.error('Erro ao carregar os livros:', error);
      }
    },
  },
  getters: {
    hasBooks: (state) => state.books.length > 0,
    allCategories: (state) => {
      const categoriesSet = new Set<string>();
      state.books.forEach((book) => {
        book.categories.forEach((category) => categoriesSet.add(category));
      });
      return Array.from(categoriesSet);
    },
  },
});
