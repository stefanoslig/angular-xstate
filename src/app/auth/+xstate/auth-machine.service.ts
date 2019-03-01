import { fromEventPattern, of } from 'rxjs';
import { interpret, Machine, MachineOptions } from 'xstate';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { authMachineConfig } from './auth-machine';
import { AuthEvent, AuthStateSchema } from './auth-schema';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthMachineService {

    constructor(private authService: AuthService) {}

    authMachineOptions: MachineOptions<{}, AuthEvent> = {
        services: {
            'requestLogin': (ctx, event) => (callback, onEvent) => {
                const subscription = this.authService.login({ email: event.username, password: event.password }).pipe(
                    map(user => callback({type: 'SUCCESS', user})),
                    catchError(error => of(callback({type: 'FAILURE', error}))
                )).subscribe();

                return () => subscription.unsubscribe();
            }
        }
    };

    public _authMachine = Machine<{}, AuthStateSchema, AuthEvent>(authMachineConfig, this.authMachineOptions);
    public authMachine = interpret(this._authMachine).start();

    public authState$ = fromEventPattern((callback: any) => {
        this.authMachine.onTransition(callback);
    });
}
