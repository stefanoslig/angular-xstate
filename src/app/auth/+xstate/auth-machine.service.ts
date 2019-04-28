import { fromEventPattern, of, Observable } from 'rxjs';
import { interpret, Machine, MachineOptions, State, assign } from 'xstate';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { authMachineConfig } from './auth-machine.config';
import { AuthEvent, AuthStateSchema, AuthContext } from './auth-schema';
import { map, catchError, startWith, tap } from 'rxjs/operators';
import { StateListener } from 'xstate/lib/interpreter';
import { Router } from '@angular/router';

@Injectable()
export class AuthMachineService {
  authMachineOptions: Partial<MachineOptions<AuthContext, AuthEvent>> = {
    services: {
      requestLogin: (ctx, event) => (callback, onEvent) => {
        const subscription = this.authService
          .login({ email: event.username, password: event.password })
          .pipe(
            map(user => callback({ type: 'SUCCESS', user })),
            catchError(error => of(callback({ type: 'FAILURE', error })))
          )
          .subscribe();

        return () => subscription.unsubscribe();
      },
      loginSuccess: (ctx, event) => (callback, onEvent) => {
        localStorage.setItem('jwtToken', ctx.user.token);
        this.router.navigateByUrl('/');
      }
    },
    guards: {
      isLoggedOut: () => !localStorage.getItem('jwtToken')
    },
    actions: {
      assignUser: assign({
        user: (context, event) => event.user
      }),
      assignErrors: assign({
        errors: (context, event) => event.error.error.errors
      })
    }
  };

  private _authMachine = Machine<AuthContext, AuthStateSchema, AuthEvent>(authMachineConfig, this.authMachineOptions);
  public authMachine = interpret(this._authMachine, { devTools: true }).start();

  public authState$: Observable<State<AuthContext, AuthEvent>> = fromEventPattern(
    (handler: StateListener<AuthContext, AuthEvent>) => this.authMachine.onTransition(handler)
  ).pipe(
    startWith([this.authMachine.initialState, {}] as any),
    map(([state, _]) => state)
  );

  constructor(private authService: AuthService, private router: Router) {}
}
