import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

export const actions = {
    ADD_WEEK: 'ADD_WEEK',
    DELETE_WEEK: 'DELETE_WEEK',
    TOGGLE_WEEK: 'TOGGLE_WEEK',
    UPDATE_WEEK: 'UPDATE_WEEK',
    SET_CURRENT_WEEK: 'SET_CURRENT_WEEK'
}

function _getUrl(week_id = null) {
    return !!week_id ? `${API_URI}/weeks/${week_id}` : `${API_URI}/weeks`
}

function _addWeek(res) {
    return {
        type: actions.ADD_WEEK,
        program_id: res.program_id,
        week: res.week
    }
}

function _deleteWeek(res) {
    console.log(res)
    return {
        type: actions.DELETE_WEEK,
        program_id: res.program_id,
        week_id: res.week_id
    }
}

export function setCurrentWeek(index) {
    console.log('set current week')
    return {
        type: actions.SET_CURRENT_WEEK,
        index
    }
}

export function toggleCollapseWeek(week_id) {
    return {
        type: actions.TOGGLE_WEEK,
        week_id
    }
}

export function updateWeek(res) {
    return {
        type: actions.UPDATE_WEEK,
        week: res.week
    }
}


const week = {
    add: (program_id) => dispatched(_addWeek, makeRequest(_getUrl(), 'POST', {program_id: program_id})),
    delete: (week_id) => dispatched(_deleteWeek, makeRequest(_getUrl(week_id), 'DELETE')),
    save: (week) => dispatched(updateWeek, makeRequest(_getUrl(week._id), 'PUT', {week}))
}


export const addWeek = week.add
export const deleteWeek = week.delete
export const saveWeek = week.save

// export async function persistWeek(week_id, week) {
//     let token = await auth0_client.getToken()
//     return fetch(`${API_URI}/weeks/${week_id}/days`, {
//         method: 'PUT',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//             week: week
//         })
//     })
//
// }
