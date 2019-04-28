import { MachineConfig, assign } from 'xstate';
import { AuthStateSchema, AuthEvent, AuthContext } from './auth-schema';

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

export const authMachineConfig: MachineConfig<AuthContext, AuthStateSchema, AuthEvent> = {
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
      type: 'final',
      invoke: {
        id: 'success',
        src: 'loginSuccess'
      }
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
          actions: ['assignUser']
        },
        FAILURE: {
          target: 'requestErr',
          actions: ['assignErrors']
        }
      }
    }
  }
};
