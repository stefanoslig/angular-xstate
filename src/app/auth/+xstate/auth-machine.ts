import { MachineConfig } from 'xstate';
import { AuthStateSchema, AuthEvent } from './auth-schema';

export const authMachineConfig: MachineConfig<{}, AuthStateSchema, AuthEvent> = {
    id: 'login',
    initial: 'loggedOut',
    states: {
        loggedOut: {
            on: {
                SUBMIT: [
                    {
                        target: 'loading'
                    }
                ],
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
                    target: 'loggedIn'
                },
                FAILURE: {
                    target: 'requestErr'
                }
            }
        }
    }
};
