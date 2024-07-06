import { NgModule } from "@angular/core";
import { CheckoutComponent } from "./checkout.component";
import { CommonModule } from "@angular/common";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [CheckoutComponent],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        SharedModule
    ]
})
export class CheckoutModule { }