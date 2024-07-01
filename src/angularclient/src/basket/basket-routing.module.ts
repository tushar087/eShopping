import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasketComponent } from "./basket.component";
import { AuthGuard } from "../core/guards/auth.guard";

const routes:Routes=[

    {
        path:'basket',
        component:BasketComponent,
        canActivate: [AuthGuard]}
]
@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class BasketRoutingModule{}