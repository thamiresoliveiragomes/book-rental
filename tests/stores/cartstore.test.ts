import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../../src/stores/cartStore';

describe('useCartStore', () => {
  let cartStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    cartStore = useCartStore();
    localStorage.clear();
  });

  it('should add a book to the cart', () => {
    const book = { id: 1, title: 'Test Book', rentalPricePerWeek: 10 };
    cartStore.addToCart(book, 7, 10);

    expect(cartStore.cart).toHaveLength(1);
    expect(cartStore.cart[0]).toEqual({
      book,
      rentalDays: 7,
      rentalPrice: 10,
    });
  });

  it('should remove a book from the cart', () => {
    const book = { id: 1, title: 'Test Book', rentalPricePerWeek: 10 };
    cartStore.addToCart(book, 7, 10);
    cartStore.removeFromCart(1);

    expect(cartStore.cart).toHaveLength(0);
  });

  it('should clear the cart', () => {
    const book = { id: 1, title: 'Test Book', rentalPricePerWeek: 10 };
    cartStore.addToCart(book, 7, 10);
    cartStore.clearCart();

    expect(cartStore.cart).toHaveLength(0);
  });

  it('should update rental duration and price', () => {
    const book = { id: 1, title: 'Test Book', rentalPricePerWeek: 10 };
    cartStore.addToCart(book, 7, 10);
    cartStore.updateRentalDuration(1, 15);

    expect(cartStore.cart[0].rentalDays).toBe(15);
    expect(cartStore.cart[0].rentalPrice).toBe(20);
  });

  it('should calculate total cart price', () => {
    const book1 = { id: 1, title: 'Test Book 1', rentalPricePerWeek: 10 };
    const book2 = { id: 2, title: 'Test Book 2', rentalPricePerWeek: 15 };
    cartStore.addToCart(book1, 7, 10);
    cartStore.addToCart(book2, 7, 15);

    expect(cartStore.totalCartPrice).toBe(25);
  });

  it('should calculate cart item count', () => {
    const book1 = { id: 1, title: 'Test Book 1', rentalPricePerWeek: 10 };
    const book2 = { id: 2, title: 'Test Book 2', rentalPricePerWeek: 15 };
    cartStore.addToCart(book1, 7, 10);
    cartStore.addToCart(book2, 7, 15);

    expect(cartStore.cartItemCount).toBe(2);
  });
});
