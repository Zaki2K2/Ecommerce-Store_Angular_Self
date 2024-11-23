import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent }

];
