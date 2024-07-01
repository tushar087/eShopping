import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()

export class ErrorIntercepotor implements HttpInterceptor{

    constructor (private router : Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(req).pipe(
        catchError((error)=>{
            if(error){
                if(error.status==404){
                    this.router.navigateByUrl('/not-found');
                }
                if(error.status==500){
                    this.router.navigateByUrl('/server-error');
                }
                if(error.status==401){
                    this.router.navigateByUrl('/un-authenticated');
                }
            }
            return throwError(()=>new Error(error));
        })
       )
    }  
} 