import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiModule } from './api/api.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ListErrorsComponent, FooterComponent, NavbarComponent],
    imports: [
        CommonModule,
        ApiModule,
        RouterModule
    ],
    exports: [ListErrorsComponent, FooterComponent, NavbarComponent]
})
export class SharedModule { }
