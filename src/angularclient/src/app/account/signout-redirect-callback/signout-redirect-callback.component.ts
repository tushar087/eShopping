import { Component, OnInit } from '@angular/core';
import { AcntService } from '../acnt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-redirect-callback',
  template: `<div></div>`,
})
export class SignoutRedirectCallbackComponent implements OnInit{
  constructor(private _router: Router,private acntService:AcntService) { }
  ngOnInit(): void {
this.acntService.finishLogout().then(_ => {
  this._router.navigate(['/login'],{replaceUrl:true});
})
  }

}
