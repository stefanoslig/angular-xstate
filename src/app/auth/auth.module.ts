import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthMachineService } from './+xstate/auth-machine.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, SharedModule],
  providers: [AuthMachineService, AuthService, AuthGuardService]
})
export class AuthModule {}
