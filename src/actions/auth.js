import {API_URI} from '../config'
import {auth0_client} from '../auth'
import {getPrograms} from './programs'
import {getUser} from './users'

export const actions = {
    LOGGING_IN: 'LOGGING_IN',
    RECIEVE_USER: 'RECIEVE_USER',
    LOGGING_OUT: 'LOGGING_OUT',
    AUTH_CLIENT_DID_LOAD: 'LOGGING_OUT',
    ADD_CLIENT: 'ADD_CLIENT',
    RECIEVE_AUTH_USER: 'RECIEVE_AUTH_USER'

}

export function authenticated(func) {
    return async function(...args) {
        let token = await auth0_client.getToken()
        return await func(token, ...args)
    }
}

export function login(...p) {
    console.log(p)
    auth0_client.login(...p)
}
export function loggingIn() {
    return {
        type: actions.LOGGING_IN,
    }
}

function recieveAuthUser(user) {
    return {
        type: actions.RECIEVE_AUTH_USER,
        auth_user: user
    }
}

export function fetchUser() {
    return async (dispatch) => {
        dispatch(loggingIn())
        await auth0_client.initialize()
        if (await auth0_client.isAuthenticated()) {
            dispatch(authClientDidLoad(true));
            const token = await auth0_client.getToken();
            const auth_user = await auth0_client.getUser();
            dispatch(recieveAuthUser(auth_user))
            dispatch(getUser())

        } else {
            dispatch(authClientDidLoad(false));
            login({targetUrl: {pathname: '/'}})
        }

    }
}

export function logout(...p) {
    auth0_client.logout();
}

function authClientDidLoad(loading=true) {
    return {
        type: actions.AUTH_CLIENT_DID_LOAD,
        loading: loading
    }
}


export function addClientAndPersist(id, name, email) {
    return async dispatch => {
        dispatch(addClient(name, email));
        const token = await auth0_client.getToken();
        fetch(`${API_URI}/clients`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                client: {
                    name,
                    email
                }
            })
        }).then(res => {
            let data = res.json();
            return data;
        })
    }
}
