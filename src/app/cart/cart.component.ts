import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalAmount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  // Load cart items from localStorage
  loadCart(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);  // Parse the cart data from localStorage
      this.calculateTotal();  // Recalculate the total price
    }
  }

  // Calculate total price of all items in the cart
  calculateTotal(): void {
    this.totalAmount = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Remove item from the cart
  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);  // Remove the item from the cart array
    localStorage.setItem('cart', JSON.stringify(this.cart));  // Save the updated cart in localStorage
    this.calculateTotal();  // Recalculate the total price
  }

  // Update quantity of an item in the cart
  updateQuantity(productId: number, quantity: number): void {
    const product = this.cart.find(item => item.id === productId);
    if (product) {
      // If the product exists in the cart, update its quantity
      product.quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.cart));  // Update the cart in localStorage
      this.calculateTotal();  // Recalculate the total price
    }
  }

  // Clear all items from the cart
  clearCart(): void {
    this.cart = [];  // Clear the cart array
    localStorage.removeItem('cart');  // Remove the cart data from localStorage
    this.calculateTotal();  // Recalculate the total price
  }

  // Proceed to checkout (optional, you can navigate to a checkout page)
  checkout(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty! Please add items to the cart.');
    } else {
      alert('Proceeding to checkout');
      // You can implement navigation to a checkout page here if needed
    }
  }
}
