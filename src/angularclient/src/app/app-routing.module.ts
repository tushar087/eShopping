import { RouterModule, Routes } from "@angular/router";
import { SigninRedirectCallbackComponent } from "./account/signin-redirect-callback/signin-redirect-callback.component";
import { SignoutRedirectCallbackComponent } from "./account/signout-redirect-callback/signout-redirect-callback.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { UnAuthenticatedComponent } from "./core/un-authenticated/un-authenticated.component";
import { ServerErrorComponent } from "./core/server-error/server-error.component";

const routes: Routes=[
    {path:'',component: HomeComponent,data:{breadcrumb:'Home'}},
    {path:'not-found',component: NotFoundComponent},
    {path:'un-authenticated',component: UnAuthenticatedComponent},
    {path:'server-error',component:ServerErrorComponent},
    {path:'store',loadChildren:()=>import('./store/store.module').then(m=>m.StoreModule),data:({breadcrumb:'Store'})},
    {path:'signin-callback',component:SigninRedirectCallbackComponent},
    {path:'signout-callback',component:SignoutRedirectCallbackComponent},
    {path:'basket',loadChildren:()=>import('./basket/basket.module').then(m=>m.BasketModule),data:({breadcrumb:'Basket'})},
    {path:'checkout',loadChildren:()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule),data:({breadcrumb:'Checkout'})},
    {path:'account',loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule),data:({breadcrumb:'Account'})},
    {path:'**',redirectTo:'not-found',pathMatch:'full'}
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)],
        exports:[RouterModule]
})

export class AppRoutingModule{}