import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgIf, NgFor],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  cartItems: any[] = []; // Array to store items added to the cart

  constructor(private http: HttpClient, private router: Router) {}

  @Input() product!: {
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    category: string;
  };

  ngOnInit(): void {
    this.http.get('https://dummyjson.com/products').subscribe(
      (response: any) => {
        console.log('Products:', response.products);
        this.products = response.products;
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );

    // Initialize cart from local storage when the component loads
    this.loadCart();
  }

  goToDetails(productId: number): void {
    this.router.navigate(['/item-details', productId]);
  }

  addToCart(product: any): void {
    // Get existing cart items from local storage or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Find the product by ID to ensure it’s added correctly
    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (existingProduct) {
      // If the product exists, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product doesn't exist, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cartItems array in the component
    this.loadCart();

    console.log('Product added to cart:', product);
    alert(`${product.title} has been added to your cart.`);
  }

  // Method to load items from localStorage into the cartItems array
  loadCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('Cart items:', this.cartItems);
  }
}
