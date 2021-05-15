import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './shared-component/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AuthService } from './service/auth/auth.service';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { UserService } from './service/user/user.service';
import { AdminAuthGuardService } from './service/admin-auth-guard/admin-auth-guard.service';
import { CategoryService } from './service/categories/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './service/products/product.service';
import { CustomFormsModule } from 'ng2-validation'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ShoppingCartService } from './service/shopping-cart/shopping-cart.service';
import { ProductQuantityComponent } from './shared-component/product-quantity/product-quantity.component';
import { OrderService } from './service/order/order.service';
import { ShoppingCartSummaryComponent } from './check-out/shopping-cart-summary/shopping-cart-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
