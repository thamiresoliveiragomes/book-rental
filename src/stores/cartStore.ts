import { defineStore } from 'pinia';
import { type Book } from '../models/Book';

interface CartItem {
  book: Book;
  rentalDays: number;
  rentalPrice: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  }),

  actions: {
    addToCart(book: Book, rentalDays: number, rentalPrice: number) {
      const existingItem = this.cart.find((item) => item.book.id === book.id);
      if (existingItem) {
        existingItem.rentalDays = rentalDays;
        existingItem.rentalPrice = rentalPrice;
      } else {
        this.cart.push({ book, rentalDays, rentalPrice });
      }

      this.saveCart();
    },

    removeFromCart(bookId: number) {
      const index = this.cart.findIndex((item) => item.book.id === bookId);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }

      this.saveCart();
    },

    clearCart() {
      this.cart.splice(0, this.cart.length);
      this.saveCart();
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

    updateRentalDuration(bookId: number, duration: number) {
      const item = this.cart.find((item) => item.book.id === bookId);
      if (item) {
        item.rentalDays = duration;
        switch (duration) {
          case 15:
            item.rentalPrice = item.book.rentalPricePerWeek * 2;
            break;
          case 30:
            item.rentalPrice = item.book.rentalPricePerWeek * 4;
            break;
          default:
            item.rentalPrice = item.book.rentalPricePerWeek;
        }
      }
    },
  },

  getters: {
    totalCartPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.rentalPrice, 0),
    cartItemCount: (state) => state.cart.length,
  },
});
