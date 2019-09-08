import {
    LOGGING_IN,
    LOGGED_IN,
    LOGGING_OUT,
    CLIENT_DID_LOAD
} from '../actions'

const initialState = {
    user: null,
    loading: false,
    client_loaded: false
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
        case CLIENT_DID_LOAD: {
            return {
                ...state,
                client_loaded: true,
                loading: action.loading
            }
        }
        default:
            return state;
    }
}
export default auth;
