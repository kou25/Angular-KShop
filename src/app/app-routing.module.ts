import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminAuthGuardService } from './service/admin-auth-guard/admin-auth-guard.service';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [

  //anonymous user
  { path: '', component: ProductsComponent },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  //normal user
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'orders-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService],
  },
  
  //admin user
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
