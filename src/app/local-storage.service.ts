import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  // Save contact data to local storage
  saveToLocalStorage(data: any): void {
    const currentData = this.getFromLocalStorage() || [];
    currentData.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(currentData));
  }

  // Retrieve data from local storage
  getFromLocalStorage(): any {
    const storedData = localStorage.getItem('contactMessages');
    return storedData ? JSON.parse(storedData) : [];
  }
}
