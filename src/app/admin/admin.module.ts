import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './admin-products/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminOrderDetailsComponent } from './admin-orders/admin-order-details/admin-order-details.component';

@NgModule({
  declarations: [ProductFormComponent, AdminOrderDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    NgxDatatableModule
  ]
})
export class AdminModule { }
