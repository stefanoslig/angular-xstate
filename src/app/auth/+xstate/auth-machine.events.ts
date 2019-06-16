import { User } from 'src/app/shared/api/types';

export class Init {
  readonly type = 'INIT';
}
export class LoginSubmit {
  readonly type = 'SUBMIT';
  constructor(public username: string, public password: string) {}
}

export class LoginFail {
  readonly type = 'FAILURE';
  constructor(public errors: Errors) {}
}

export class LoginSuccess {
  readonly type = 'SUCCESS';
  constructor(public userInfo: User) {}
}

export type AuthEvent = Init | LoginSubmit | LoginSuccess | LoginFail;

export interface Errors {
  [key: string]: string;
}
