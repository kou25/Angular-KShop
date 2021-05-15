import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  id;
  product$;
  totalPrice:number;
  
  constructor(
    route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  async ngOnInit(){
    this.product$ = await this.orderService.getSingleOrder(this.id).pipe(take(1));
    this.product$.subscribe((cart)=>{
      this.totalPrice=0
      for(let id in cart.items){
        this.totalPrice+=cart.items[id].totalPrice
      }
    }
    )
  }

}
