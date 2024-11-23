import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true, // Standalone component
  imports: [FormsModule], // Import necessary Angular modules
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // Corrected the property name
})
export class FooterComponent {
  isFormVisible = false;
  openForm(event: Event) {
    event.preventDefault();
    this.isFormVisible = true;
  }

}
