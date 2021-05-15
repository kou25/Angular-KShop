import { ShoppingCart } from "src/app/shared-component/navbar/interface/shopping-cart";

export class Order{
    datePlaced: number;
    items:any[];

    constructor(public userId: string, public shipping:any, shoppingCart:ShoppingCart){
        this.datePlaced=new Date().getTime()

        this.items=Object.keys(shoppingCart.items).map(i=>{
            return{
              product: {
                title: shoppingCart.items[i].product.title,
                imageUrl:shoppingCart.items[i].product.imageUrl,
                price: shoppingCart.items[i].product.price
    
              },
              quantity: shoppingCart.items[i].quantity,
              totalPrice:shoppingCart.items[i].quantity * shoppingCart.items[i].product.price
            }
          })
    }
}