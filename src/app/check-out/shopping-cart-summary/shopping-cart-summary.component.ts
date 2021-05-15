import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared-component/navbar/interface/shopping-cart';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  shoppingCartItemCount: number
  cart$;
  ProductsArray;
  productIds;
  totalPrice;
  cart;
  totalLength: number;
  constructor(private shoppingCartService: ShoppingCartService,) { }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
      this.cart$.subscribe((cart:ShoppingCart)=>{
      this.cart = cart
      this.totalLength=Object.keys(this.cart.items).length
      this.shoppingCartItemCount=0;
      this.totalPrice=0
      for(let productId in cart.items){
        this.ProductsArray=cart.items
        this.productIds=Object.keys(cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity
        this.totalPrice += cart.items[productId].quantity*cart.items[productId].product.price
      }
    });
  }

}
