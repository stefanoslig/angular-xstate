import { Injectable } from '@angular/core';
import { LoginSubmit } from './auth-machine.events';
import { AuthMachine } from './auth-machine.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthMachineFacade {

  constructor(private authMachineService: AuthMachine) {}

  loading$ = this.authMachineService.authState$.pipe(
    map(state => state.matches('loading'))
  );

  isLoggedIn$ = this.authMachineService.authState$.pipe(
    map(state => state.matches('loggedIn'))
  );

  user$ = this.authMachineService.authState$.pipe(
    map(state => state.context.user)
  );

  login(email: string, password: string) {
    this.authMachineService.send(
      new LoginSubmit(email, password)
    );
  }
}
