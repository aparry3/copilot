import {auth0_client} from '../auth'
import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

export const actions = {
    ADD_PROGRAM: 'ADD_PROGRAM',
    DELETE_PROGRAM: 'DELETE_PROGRAM',
    RECIEVE_PROGRAM: 'RECIEVE_PROGRAM',
    RECIEVE_PROGRAMS: 'RECIEVE_PROGRAMS',
    SET_ACTIVE_PROGRAM: 'SELECT_ACTIVE_PROGRAM',
}


function _getUrl(program_id) {
    return !!program_id ? `${API_URI}/programs/${program_id}` : `${API_URI}/programs`
}


function _addProgram(res) {
    return {
        type: actions.ADD_PROGRAM,
        program: res.program
    }
}

function _deleteProgram(res) {
    return {
        type: actions.DELETE_PROGRAM,
        program_id: res.program,
        weeks: res.weeks
    }
}

function _recieveProgram(res) {
    console.log(res)
    return {
        type: actions.RECIEVE_PROGRAM,
        program: res.program
    }
}

function _recievePrograms(res) {
    console.log(res)
    return {
        type: actions.RECIEVE_PROGRAMS,
        programs: res.programs
    }
}

export function setActiveProgram(program_id) {
    return {
        type: actions.SET_ACTIVE_PROGRAM,
        id: program_id
    }
}

const programs = {
    add: (name, length) => dispatched(_addProgram, makeRequest(_getUrl(), 'POST', {name, length})),
    delete: (program_id) => dispatched(_deleteProgram, makeRequest(_getUrl(program_id), 'DELETE')),
    query: () => dispatched(_recievePrograms, makeRequest(_getUrl(), 'GET')),
    get: (program_id) => dispatched(_recieveProgram, makeRequest(_getUrl(program_id), 'GET')),
    save: (program) => dispatched(_recieveProgram, makeRequest(_getUrl(program._id), 'POST', program))
}

export const addProgram = programs.add
export const deleteProgram = programs.delete
export const getProgram = programs.get
export const getPrograms = programs.query
export const saveProgram = programs.save


//
// function updateWorkout(week_id, day, workout) {
//     return {
//         type: UPDATE_WORKOUT,
//         week_id,
//         day,
//         workout
//     }
// }
//
// export function persistWorkout(week_id, day, workout) {
//     return async dispatch => {
//         dispatch(updateWorkout(week_id, day, workout))
//         let token = await auth0_client.getToken()
//         fetch(`${API_URI}/weeks/${week_id}/days/${day}`, {
//             method: 'PUT',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 workout: workout
//             })
//         })
//     }
//
// }


//
// export function saveProgram(program_id, options={}) {
//     return async (dispatch) => {
//         let token = await auth0_client.getToken()
//         return fetch(`${API_URI}/programs/${program_id}`, {
//             method: 'PUT',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify(options)
//         }).then(res => {
//             let data = res.json();
//             return data
//         }).then(program => {
//             dispatch(recieveProgram(program))
//             return program
//         });
//     }
// }
