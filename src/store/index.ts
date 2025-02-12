import { defineStore } from 'pinia';

interface Book {
  id: number;
  title: string;
}

export const useBookStore = defineStore('book', {
  state: () => ({
    books: [] as Book[],
  }),
  actions: {
    fetchBooks() {
      this.books = [{ id: 1, title: 'Livro Exemplo' }];
    },
  },
});
