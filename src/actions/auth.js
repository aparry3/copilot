import {auth0_client} from '../auth'

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_OUT = 'LOGGING_OUT';
export const CLIENT_DID_LOAD = 'LOGGING_OUT';

export function login(...p) {
    auth0_client.login(...p)
}
export function loggingIn() {
    return {
        type: LOGGING_IN,
    }
}
export function fetchUser() {
    return async (dispatch) => {
        dispatch(loggingIn())
        await auth0_client.initialize()
        if (await auth0_client.isAuthenticated()) {
            dispatch(clientDidLoad(true));
            const token = await auth0_client.getToken()
            const user = await auth0_client.getUser()
            // fetch('https://localhost:3000', {
            //     method: 'POST',
            //     headers: {
            //         accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`
            //     },
            //     body: {
            //         user: JSON.stringify(user)
            //     }
            // }).then(res => {
            //     return res.json()
            // }).then(user => {
                dispatch(loggedIn(user))
            // })
        } else {
            dispatch(clientDidLoad(false));

        }

    }
}
export function logout(...p) {
    auth0_client.logout();
}


export function loggedIn(user) {
    return {
        type: LOGGED_IN,
        user
    }
}

function clientDidLoad(loading=true) {
    return {
        type: CLIENT_DID_LOAD,
        loading: loading
    }
}
