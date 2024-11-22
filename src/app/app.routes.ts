  // src/app/app.routes.ts

  import { Routes } from '@angular/router';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { ContactComponent } from './contact/contact.component';

  export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'contact', component: ContactComponent }
  ];
