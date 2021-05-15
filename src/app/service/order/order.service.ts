import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async storeOrder(order){
    let result = await this.db.list('/orders').push(order)
    this.shoppingCartService.clearCart()
    return result;
  }
  getOrders() { 
    return this.db.list('/orders').snapshotChanges();
  }

  getSingleOrder(id) {
    return this.db.object('/orders/' + id).valueChanges();
  }
 
    // getOrdersByUser(userId: string) {
    //   console.log(this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges(),'value')
    // return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
    // }
}
