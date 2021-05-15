import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/service/products/product.service';
import { Product } from '../interface/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterProducts: any[];
  subsription: Subscription;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subsription = this.productService.getAll().subscribe(
        (products:any) => (this.filterProducts = this.products = products)
      );
  }
  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
  filter(query: string) {
    this.filterProducts = query
      ? this.products.filter((p) => p.payload.val().title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }
}
