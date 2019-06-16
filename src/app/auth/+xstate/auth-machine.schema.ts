import { User } from 'src/app/shared/api/types';

export interface AuthSchema {
  states: {
    boot: {};
    loggedOut: {};
    loggedIn: {};
    requestErr: {};
    loading: {};
  };
}

export interface AuthContext {
  user: User;
  errors: string[];
}
