import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  standalone: true,
  imports:[NgIf],
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  product: any;  // This will hold the product details
  cartConfirmationMessage: string | null = null;  // Feedback message for the user

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');  // Get product ID from the route
    if (productId) {
      this.fetchProductDetails(productId);  // Fetch the product details using the ID
    }
  }

  // Fetch product details from the API
  fetchProductDetails(productId: string): void {
    this.http.get(`https://dummyjson.com/products/${productId}`).subscribe(
      (response: any) => {
        this.product = response;  // Assign the fetched product data
      },
      (error) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  // Add the selected product to the cart
  addToCart(): void {
    if (!this.product) {
      console.error('No product details available!');
      return;
    }

    // Get the existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Log the current state of the cart before adding the item
    console.log('Cart before adding product:', cart);

    // Check if the product is already in the cart
    const existingProduct = cart.find((item: any) => item.id === this.product.id);
    if (existingProduct) {
      // If the product is already in the cart, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({ ...this.product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log the updated cart after adding the item
    console.log('Cart after adding product:', cart);

    // Provide feedback to the user
    this.cartConfirmationMessage = `${this.product.title} has been added to your cart.`;

    // Hide the message after 3 seconds
    setTimeout(() => {
      this.cartConfirmationMessage = null;
    }, 3000);
  }

  // Navigate to Dashboard
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
