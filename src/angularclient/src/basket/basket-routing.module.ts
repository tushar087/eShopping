import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BasketComponent } from "./basket.component";

const routes:Routes=[

    {path:'basket',component:BasketComponent}
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