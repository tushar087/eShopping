import { Component, OnInit } from '@angular/core';
import { AcntService } from '../../app/account/acnt.service';
import { IBasketItem } from '../../app/shared/models/basket';
import { BasketService } from '../../app/basket/basket.service';

@Component({
  
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(public basketService:BasketService,private acntSerice:AcntService){}

  ngOnInit(): void {
    this.acntSerice.currentUser$.subscribe({
      next:(res)=>{
        this.isUserAuthenticated=res;
        console.log(this.isUserAuthenticated);
      },error:(err)=>{
        console.log('An error occurred while checking user authentication');
        console.log(err);
      }
    })
  }

  public isUserAuthenticated: boolean =false;

  getBasketCount(items:IBasketItem[]){
    return items.reduce((sum,item)=> sum + item.quantity,0);
  }

  public login=()=>this.acntSerice.login();

  public logout=()=>this.acntSerice.logout();
}
