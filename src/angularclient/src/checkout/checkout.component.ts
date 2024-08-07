import { Component, OnInit } from '@angular/core';
import { AcntService } from '../app/account/acnt.service';
import { IBasket, IBasketItem } from '../app/shared/models/basket';
import { BasketService } from '../app/basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
constructor(public basketService:BasketService,private acntService: AcntService){}

ngOnInit(): void {
  this.acntService.currentUser$.subscribe({
    next:(res)=>{
      this.isUserAuthenticated=res;
      console.log(this.isUserAuthenticated);
    },error:(err)=>{
      console.log(err);
    }
  })
}

public isUserAuthenticated: boolean =false;

removeBasketItem(item:IBasketItem){
  this.basketService.removeItemFromBasket(item);
}

incrementItem(item:IBasketItem){
  this.basketService.incrementItemQuantity(item);
}
decrementItem(item:IBasketItem){
  this.basketService.decrementItemQuantity(item);
}
orderNow(item:IBasket){
  this.basketService.checkoutBasket(item);
}
}
