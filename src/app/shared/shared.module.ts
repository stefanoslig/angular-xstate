import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ApiModule } from './api/api.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        ApiModule
    ],
    exports: [HeaderComponent]
})
export class SharedModule { }
