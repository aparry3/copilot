import {
    LOGGING_IN,
    LOGGED_IN,
    LOGGING_OUT,
    AUTH_CLIENT_DID_LOAD,
    ADD_CLIENT
} from '../actions'

import {actions as auth_actions} from '../actions/auth'

const initialState = {
    user: null,
    loading: false,
    client_loaded: false,
    is_authenticated: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case auth_actions.LOGGING_IN: {
            return {
                ...state,
                loading: true
            }
        }
        case auth_actions.RECIEVE_USER: {
            console.log(action)
            return {
                ...state,
                user: action.user,
                loading: false
            }
        }
        case AUTH_CLIENT_DID_LOAD: {
            return {
                ...state,
                client_loaded: true,
                loading: action.loading
            }
        }
        case auth_actions.RECIEVE_AUTH_USER: {
            return {
                ...state,
                auth_user: action.auth_user
            }
        }
        case ADD_CLIENT: {
            return {
                ...state,
                user: {
                    ...state.user,
                    clients: [...state.user.clients, action.client]
                }
            }
        }
        default:
            return state;
    }
}
export default auth;
