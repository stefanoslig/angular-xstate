import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthMachine } from './+xstate/auth-machine.service';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthCanLoad } from './auth-can-load.service';
import { AuthMachineFacade } from './+xstate/auth-machine.facade';
import { TokenInterceptorService } from './token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, SharedModule],
  providers: [
    AuthMachine,
    AuthService,
    AuthCanLoad,
    AuthMachineFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class AuthModule {}
