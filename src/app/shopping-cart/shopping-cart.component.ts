import { Component, OnInit } from '@angular/core';
import { Product } from '../admin/interface/product';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../shared-component/navbar/interface/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount: number
  cart$;
  ProductsArray;
  productIds;
  totalPrice;
  cart;
  totalLength: number;
  
  constructor(private shoppingCartService: ShoppingCartService, private cartService: ShoppingCartService,) { }

  async ngOnInit(){
  
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


  addToCart(product: Product,productId) {
    this.cartService.addToCart(product,productId);
  }
  removeFromCart(product: Product,productId){
    this.cartService.removeFromCart(product,productId);
  }

  getQuantity(key) {
    console.log(key,'key')
    if (!this.cart) return 0;
    let item = this.cart.items[key];
    return item ? item.quantity : 0;
    
  }

  clearCart(){
    this.shoppingCartService.clearCart()
    this.ProductsArray=[]
    this.productIds=[]
    this.totalLength=0
  }

}
