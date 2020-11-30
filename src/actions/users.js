import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

import {getExercises} from './exercises'
import {
    getCategories,
    getMovements,
    getMuscles,
    getMuscleGroups
} from './enums'
import {getPrograms} from './programs'

export const actions = {
    RECIEVE_USER: 'RECIEVE_USER',
}

function _getUrl(get = false) {
    return !!get ? `${API_URI}/users/identity` : `${API_URI}/users`
}

export function recieveUser(res) {
    return async dispatch => {
        dispatch({
            type: actions.RECIEVE_USER,
            user: res.user
        })
        if (!!res.user) {
            await dispatch(getMovements())
            await dispatch(getCategories())
            await dispatch(getMuscles())
            await dispatch(getMuscleGroups())
            dispatch(getPrograms(res.user._id))
            dispatch(getExercises())
        }
    }
}

const users = {
    add: (user) => dispatched(recieveUser, makeRequest(_getUrl(), 'POST', user)),
    get: () => dispatched(recieveUser, makeRequest(_getUrl(true), 'GET'))
}

export const addUser = users.add
export const getUser = users.get
