import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';  // Import LocalStorageService
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [FormsModule],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';

  ngOnInit(): void {
    debugger
  }
  submitForm() {
    // Handle form submission and store data in local storage
    const formData = { name: this.name, email: this.email, message: this.message };
    localStorage.setItem('contactForm', JSON.stringify(formData));
    alert('Form submitted successfully!');
  }
}
