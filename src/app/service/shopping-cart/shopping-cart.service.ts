import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'src/app/admin/interface/product';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

   async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+ cartId).valueChanges();
  }

  async addToCart(product: Product,productId?:string){
    this.updateItemQuantity(product,1,productId)
}

async removeFromCart(product: Product,productId?:string){
  this.updateItemQuantity(product,-1,productId)
}


async clearCart(){
  let cartId = await this.getOrCreateCartId()
  return this.db.object('/shopping-carts/'+ cartId + '/items').remove();
}

  private getItem(cartId: string, productId: string){
    return this.db.object<any>('/shopping-carts/' + cartId + '/items/' + productId);
}

  private async getOrCreateCartId(): Promise<string>{
    let cardId = localStorage.getItem('cartId');
    if (!cardId) {
      let result = await this.create()
      localStorage.setItem('cartId', result.key)
      return result.key
    }
      return cardId
  }


private async updateItemQuantity(product: Product, change: number,productId?:string){
  let key= product.key !==undefined ? product.key : productId
  let updatedProduct=product.product===undefined ? product.payload.val() : product.product
  let cartId = await this.getOrCreateCartId();
  let item$ = this.getItem(cartId, key);
  item$.valueChanges().pipe(take(1)).subscribe((item:any) => {
    if (item != null) {
      item$.update({ product: updatedProduct, quantity:(item.quantity || 0) + change });
    }
    else{
      item$.set( {product: updatedProduct, quantity:1}); 
    }
  });
}



}

