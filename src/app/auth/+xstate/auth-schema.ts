import { User } from 'src/app/shared/api/types';

export interface AuthStateSchema {
    states: {
        loggedOut: {};
        loggedIn: {};
        requestErr: {};
        loading: {};
    };
}

export type AuthEvent =
    | { type: 'SUBMIT', username: string, password: string }
    | { type: 'SUCCESS', userInfo: User }
    | { type: 'FAILURE', error: Error };

