import {API_URI} from '../config'
import {auth0_client} from '../auth'
import {getAllPrograms} from './programs'

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_OUT = 'LOGGING_OUT';
export const AUTH_CLIENT_DID_LOAD = 'LOGGING_OUT';
export const ADD_CLIENT = 'ADD_CLIENT';

export function login(...p) {
    console.log(p)
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
            dispatch(authClientDidLoad(true));
            const token = await auth0_client.getToken();
            const auth_user = await auth0_client.getUser();
            fetch(`${API_URI}/users/identity`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                let data = res.json();
                return data;
            }).then(data => {
                let user = data.user;
                if (!user || !user._id) {
                    fetch(`${API_URI}/users`, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body:JSON.stringify({
                            user:{
                                email: auth_user.email,
                                name: {
                                    first: auth_user.given_name,
                                    last: auth_user.given_name
                                }
                            }
                        })
                    }).then(res => {
                        let data = res.json();
                        return data;
                    }).then(data => {
                        dispatch(loggedIn(data.user))
                    })
                } else {
                    dispatch(loggedIn(data.user))
                }
            })
        } else {
            dispatch(authClientDidLoad(false));

        }

    }
}
export function logout(...p) {
    auth0_client.logout();
}


export function loggedIn(user) {
    return dispatch => {
        dispatch({
            type: LOGGED_IN,
            user: user
        })
        dispatch(getAllPrograms(user._id))

    }

}

function authClientDidLoad(loading=true) {
    return {
        type: AUTH_CLIENT_DID_LOAD,
        loading: loading
    }
}


function addClient(name, email) {
    return {
        type: ADD_CLIENT,
        client: {
            name,
            email
        }
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
