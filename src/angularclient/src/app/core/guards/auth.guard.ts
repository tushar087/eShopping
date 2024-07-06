import { inject } from "@angular/core";
import { AcntService } from "../../app/account/acnt.service";
import { CanActivateFn, Router } from "@angular/router";
import {  map } from "rxjs";


export const AuthGuard : CanActivateFn= (route,state) => {

    const acntService = inject(AcntService);
    const router=inject(Router);

        return acntService.currentUser$.pipe(
            map(auth=>{
                if(auth) return true;
                else{
                    router.navigate(['/account/login'],{queryParams:{returnUrl:state.url}});
                    return false
                }
            })
        )
    
}