import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from './api/api.module';
import { ListErrorsComponent } from './list-errors/list-errors.component';

@NgModule({
    declarations: [ListErrorsComponent],
    imports: [
        CommonModule,
        ApiModule
    ],
    exports: [ListErrorsComponent]
})
export class SharedModule { }
