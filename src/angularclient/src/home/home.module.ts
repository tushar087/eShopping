import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';;
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        HomeComponent
    ],
    exports: [HomeComponent,SharedModule]
})
export class HomeModiule{}