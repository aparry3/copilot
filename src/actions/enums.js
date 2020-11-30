import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

export const actions = {
    RECIEVE_CATEGORIES: 'RECIEVE_CATEGORIES',
    RECIEVE_MOVEMENTS: 'RECIEVE_MOVEMENTS',
    RECIEVE_MUSCLES: 'RECIEVE_MUSCLES',
    RECIEVE_MUSCLE_GROUPS: 'RECIEVE_MUSCLE_GROUPS',
}

function _getUrl(...args) {
    return `${API_URI}/${args.join('/')}`
}

export function _recieveCategories(res) {
    return {
        type: actions.RECIEVE_CATEGORIES,
        categories: res.categories
    }
}

export function _recieveMovements(res) {
    return {
        type: actions.RECIEVE_MOVEMENTS,
        movements: res.movements
    }
}

export function _recieveMuscles(res) {
    return {
        type: actions.RECIEVE_MUSCLES,
        muscles: res.muscles
    }
}

function _recieveMuscleGroups(res) {
    return {
        type: actions.RECIEVE_MUSCLE_GROUPS,
        muscle_groups: res.muscle_groups
    }
}

const muscles = {
    query: () => dispatched(_recieveMuscles, makeRequest(_getUrl('muscles'), 'GET')),
}
const muscle_groups = {
    query: () => dispatched(_recieveMuscleGroups, makeRequest(_getUrl('muscles', 'groups'), 'GET')),
}
const categories = {
    query: () => dispatched(_recieveCategories, makeRequest(_getUrl('exercises', 'categories'), 'GET')),
}
const movements = {
    query: () => dispatched(_recieveMovements, makeRequest(_getUrl('exercises', 'movements'), 'GET')),
}



export const getMuscles = muscles.query
export const getMuscleGroups = muscle_groups.query
export const getCategories = categories.query
export const getMovements = movements.query
