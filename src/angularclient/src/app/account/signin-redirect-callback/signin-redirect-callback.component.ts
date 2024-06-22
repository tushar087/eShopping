import { Component, OnInit } from '@angular/core';
import { AcntService } from '../acnt.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})
export class SigninRedirectCallbackComponent implements OnInit {

constructor(private _router: Router,private acntService:AcntService,private activatedRoute: ActivatedRoute) { }

ngOnInit() :void {
  this.acntService.finishlogin().then(_ => {
    this._router.navigate(['/checkout'],{replaceUrl:true});
  });

}

}
