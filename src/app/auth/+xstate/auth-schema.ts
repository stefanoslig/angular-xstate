import { User } from 'src/app/shared/api/types';

export interface AuthStateSchema {
  states: {
    boot: {};
    loggedOut: {};
    loggedIn: {};
    requestErr: {};
    loading: {};
  };
}

export type AuthEvent =
  | { type: 'INIT' }
  | { type: 'SUBMIT'; username: string; password: string }
  | { type: 'SUCCESS'; userInfo: User }
  | { type: 'FAILURE'; error: Error };

export interface AuthContext {
  user: User;
  errors: string[];
}
