import { NgModel } from "@angular/forms";
import { StoreComponent } from "./store.component";
import { ProductItemsComponent } from "./product-items/product-items.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { StoreRoutingModule } from "./store-routing.module";

@NgModule({
    declarations:[
        StoreComponent,
        ProductItemsComponent,
        ProductDetailsComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        StoreRoutingModule
    ]
})

export class StoreModule{}