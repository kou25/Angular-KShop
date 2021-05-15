import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCartService } from 'src/app/service/shopping-cart/shopping-cart.service';
import { AuthService } from '../../service/auth/auth.service';
import { ShoppingCart } from './interface/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
   
  }
async ngOnInit(){
  this.auth.appUser$.subscribe(appUser=>this.appUser=appUser)
  let cart$= await this.shoppingCartService.getCart();
  cart$.subscribe((cart:ShoppingCart)=>{
    this.shoppingCartItemCount=0;
    for(let productId in cart.items){
      this.shoppingCartItemCount += cart.items[productId].quantity
    }
  });
}
  //logout function
  logout(){
    this.auth.logout()
  }
}
