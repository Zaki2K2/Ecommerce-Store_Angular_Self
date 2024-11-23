// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient for services
import { routes } from './app.routes'; // Import your routes from app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // Ensures HttpClient is available globally
    provideRouter(routes, withComponentInputBinding()), // Provide the router configuration with input binding
  ],
};
