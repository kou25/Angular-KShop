import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../admin/interface/product';
import { CategoryService } from '../service/categories/category.service';
import { ProductService } from '../service/products/product.service';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product;
  filterProducts: Product[];
  categories$;
  category: string;
  shoppingCart;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService.getAll().subscribe((products: any) => {
      this.products = products;

      route.queryParamMap.subscribe((params) => {
        this.category = params.get('category');
        this.filterProducts = this.category
          ? this.products.filter(
              (p) => p.payload.val().category === this.category
            )
          : this.products;
      });
    });

    this.categories$ = categoryService.getCategories();
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  removeFromCart(product: Product){
    this.cartService.removeFromCart(product);
  }

  getQuantity(key) {
    if (!this.cart) return 0;
    let item = this.cart.items[key];
    return item ? item.quantity : 0;
    
  }
}
