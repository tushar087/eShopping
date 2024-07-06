import { Component, OnInit } from '@angular/core';
import { AcntService } from './account/acnt.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'eShopping';

  constructor(private basketService:BasketService,private acntService:AcntService){}
  ngOnInit(): void {
    const bucket_username = localStorage.getItem('bucket_username');

    if (bucket_username) {
     this.basketService.getBasket(bucket_username);
    }
  }
}
