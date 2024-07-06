import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { BasketRoutingModule } from "./basket-routing.module";
import { BasketComponent } from "./basket.component";
import { NgModule } from "@angular/core";

@NgModule({
    declarations:[
        BasketComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        BasketRoutingModule
    ]
})

export class BasketModule{}