import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Variable to manage the visibility of the form
  isFormVisible = false;

  // Form fields for the contact form
  name: string = '';
  email: string = '';
  message: string = '';

  // Method to open the contact form
  openForm(event: Event) {
    event.preventDefault();  // Prevent default link behavior (navigation)
    this.isFormVisible = true;  // Set form visibility to true
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

    localStorage.setItem('contactFormData', JSON.stringify(formData));

    console.log('Form submitted with data:', formData);

    alert('Form submitted and data saved to localStorage!');

    this.name = '';
    this.email = '';
    this.message = '';

    this.closeForm();
  }
}
