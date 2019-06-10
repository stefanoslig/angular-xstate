import { MachineConfig, assign } from 'xstate';
import { AuthSchema, AuthContext } from './auth-schema';
import { AuthEvent } from './auth.events';

export const context: AuthContext = {
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: ''
  },
  errors: []
};

export const authMachineConfig: MachineConfig<AuthContext, AuthSchema, AuthEvent> = {
  id: 'login',
  context,
  initial: 'boot',
  states: {
    boot: {
      on: {
        '': [
          {target: 'loggedOut', cond: 'isLoggedOut'},
          {target: 'loggedIn'}
        ]
      }
    },
    loggedOut: {
      on: {
        SUBMIT: [
          {
            target: 'loading'
          }
        ]
      }
    },
    loggedIn: {
      type: 'final'
    },
    requestErr: {
      on: {
        SUBMIT: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'login',
        src: 'requestLogin'
      },
      on: {
        SUCCESS: {
          target: 'loggedIn',
          actions: ['assignUser', 'loginSuccess']
        },
        FAILURE: {
          target: 'requestErr',
          actions: ['assignErrors']
        }
      }
    }
  }
};
