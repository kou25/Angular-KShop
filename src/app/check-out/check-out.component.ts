import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { OrderService } from '../service/order/order.service';
import { ShoppingCartService } from '../service/shopping-cart/shopping-cart.service';
import { Order } from './interface/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = { name: '', address1: '', address2: '', city: '' };
  cart;
  userId;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}
  

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription=this.authService.user$.subscribe((user) => (this.userId = user.uid));
    console.log(this.cart,'cart')
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/orders-success', result.key])
  }

}
