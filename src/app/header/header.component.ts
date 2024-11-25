import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [FormsModule, NgIf],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isFormVisible = false;
  totalItems: number = 0;

  private cartSubscription!: Subscription;
  private cartUpdateInterval: any;


  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.updateCartCount();

    this.cartSubscription = this.cartService.getCartUpdates().subscribe(count => {

      // Update the total items count whenever cart is updated

      this.totalItems = count;
    });


    //cartService.set

    // Update cart count every 3 seconds
    // this.cartUpdateInterval = setInterval(() => {
    //   this.updateCartCount();
    // }, 1000);
  }

  // Method to open the contact form
  openForm(event: Event) {
    event.preventDefault();
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }

  submitForm() {
    const formData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    // Save the form data to localStorage
    localStorage.setItem('contactFormData', JSON.stringify(formData));

    console.log('Form submitted with data:', formData);
    alert('Form submitted and data saved to localStorage!');

    // Clear form fields
    this.name = '';
    this.email = '';
    this.message = '';

    this.closeForm();
  }

  // Method to update the cart count
  updateCartCount(): void {
    // Get the current cart count from CartService
    this.totalItems = this.cartService.getCartCount();
  }

  // Method to navigate to the Cart page
  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  // Clean up interval and subscription on component destroy
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
    if (this.cartUpdateInterval) {
      clearInterval(this.cartUpdateInterval); // Clear interval to avoid memory leaks
    }
  }
}
