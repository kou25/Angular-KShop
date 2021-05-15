import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrderDetailsComponent } from './admin-orders/admin-order-details/admin-order-details.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { ProductFormComponent } from './admin-products/product-form/product-form.component';

const routes: Routes = [
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },
  { path: 'products', component: AdminProductsComponent },
  { path: 'orders', component: AdminOrdersComponent },
  {path: 'orders/:id', component: AdminOrderDetailsComponent},
  { path: '',   redirectTo: '/admin/products', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
