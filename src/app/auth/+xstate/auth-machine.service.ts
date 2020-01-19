import { fromEventPattern, of } from 'rxjs';
import {
  interpret,
  Machine,
  MachineOptions,
  State,
  assign,
  EventObject
} from 'xstate';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { authMachineConfig } from './auth-machine.config';
import { AuthSchema, AuthContext } from './auth-machine.schema';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginSuccess, AuthEvent, LoginFail, UserSuccess, UserFail } from './auth-machine.events';

@Injectable()
export class AuthMachine {
  authMachineOptions: Partial<MachineOptions<AuthContext, AuthEvent>> = {
    services: {
      requestLogin: (_, event) =>
        this.authService
          .login({ email: event.username, password: event.password })
          .pipe(
            map(user => new LoginSuccess(user)),
            catchError(result => of(new LoginFail(result.error.errors)))
          ),
      requestUser: (_, event) =>
        this.authService
          .user()
          .pipe(
            map(user => new UserSuccess(user)),
            catchError(result => of(new UserFail(result.error.errors)))
          )
    },
    guards: {
      isLoggedOut: () => !localStorage.getItem('jwtToken')
    },
    actions: {
      assignUser: assign<AuthContext, LoginSuccess>((_, event) => ({
        user: event.user
      })),
      assignErrors: assign<AuthContext, LoginFail>((_, event) => ({
        errors: Object.keys(event.errors || {}).map(
          key => `${key} ${event.errors[key]}`
        )
      })),
      loginSuccess: (ctx, _) => {
        localStorage.setItem('jwtToken', ctx.user.token);
        this.router.navigateByUrl('');
      }
    }
  };

  private _authMachine = Machine<AuthContext, AuthSchema, AuthEvent>(
    authMachineConfig
  ).withConfig(this.authMachineOptions);
  private service = interpret(this._authMachine, { devTools: true }).start();

  authState$ = fromEventPattern<[State<AuthContext, AuthEvent>, EventObject]>(
    handler => {
      return this.service.onTransition(handler);
    },
    (_, service) => service.stop()
  ).pipe(map(([state, _]) => state));

  send(event: AuthEvent) {
    this.service.send(event);
  }

  constructor(private authService: AuthService, private router: Router) {}
}
