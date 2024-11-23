import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';  // Key for localStorage
  private cartSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);  // To track cart items

  constructor() {
    // Initialize cart if it doesn't exist in localStorage
    if (!localStorage.getItem(this.cartKey)) {
      localStorage.setItem(this.cartKey, JSON.stringify([])); // Empty cart
    }
    this.updateCartCount(); // Set initial cart count
  }

  // Add item to cart
  addItem(item: any): void {
    const cart = this.getCart();
    cart.push(item);
    this.updateCart(cart);
  }

  // Remove item from cart
  removeItem(itemId: number): void {
    const cart = this.getCart();
    const updatedCart = cart.filter((item: any) => item.id !== itemId);
    this.updateCart(updatedCart);
  }

  // Get the current cart items from localStorage
  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  // Get the number of items in the cart
  getCartCount(): number {
    return this.getCart().length;
  }

  // Subscribe to cart updates
  getCartUpdates() {
    return this.cartSubject.asObservable();
  }

  // Update the cart in localStorage and notify subscribers
  private updateCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCartCount(); // Update cart count
  }

  // Update cart item count and emit the new count
  private updateCartCount(): void {
    const count = this.getCartCount();
    this.cartSubject.next(count);  // Emit new count to subscribers
  }
}
