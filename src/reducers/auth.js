import {
    LOGGING_IN,
    LOGGED_IN,
    LOGGING_OUT,
    AUTH_CLIENT_DID_LOAD,
    ADD_CLIENT
} from '../actions'

const initialState = {
    user: null,
    loading: false,
    client_loaded: false,
    is_authenticated: false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGGING_IN: {
            return {
                ...state,
                loading: true
            }
        }
        case LOGGED_IN: {
            console.log(`user: ${action.user}`)
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
