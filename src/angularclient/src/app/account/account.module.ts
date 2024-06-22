import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";
import { NgModule } from "@angular/core";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        CommonModule,
        AccountRoutingModule
    ]
})

export class AccountModule{}