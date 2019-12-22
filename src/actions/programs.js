import {auth0_client} from '../auth'
import {API_URI} from '../config'

export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REARRANGE_WORKOUT = 'REARRANGE_WORKOUT';
export const REARRANGE_EXERCISE = 'REARRANGE_EXERCISE';
export const ADD_WEEK = 'ADD_WEEK';
export const EDIT_WEEK = 'EDIT_WEEK';
export const DELETE_WEEK = 'DELETE_WEEK';
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const RECIEVE_PROGRAMS = 'RECIEVE_PROGRAMS';
export const RECIEVE_PROGRAM = 'RECIEVE_PROGRAM';
export const SET_DRAG_ELEMENT = 'SET_DRAG_ELEMENT';
export const COPY_WORKOUT_ELEMENT = 'COPY_WORKOUT_ELEMENT';
export const SET_ACTIVE_PROGRAM = 'SELECT_ACTIVE_PROGRAM';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';
export const SET_CURRENT_WEEK = 'SET_CURRENT_WEEK';
export const DELETE_PROGRAM = 'DELETE_PROGRAM'


export function setActiveProgram(program_id) {
    return {
        type: SET_ACTIVE_PROGRAM,
        id: program_id
    }
}

export function combineExercises(item, drop_location) {

}

export function setCurrentWeek(index) {
    return {
        type: SET_CURRENT_WEEK,
        index
    }
}

export function copyWorkoutElement(workout_element) {
    return {
        type: COPY_WORKOUT_ELEMENT,
        workout_element
    }

}
export function moveWorkoutElement(old_week, old_day, old_index, new_week, new_day, new_index) {
    return {
        type: REARRANGE_EXERCISE,
        old_week, old_day, old_index, new_week, new_day, new_index
    }
}

export async function fetchWeek(week_id) {
    let token = await auth0_client.getToken()
    return fetch(`${API_URI}/weeks/${week_id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        let data = res.json();
        return data
    }).then(week => {
        return week
    });


}

export function setDragElement(element) {
    return {
        type: SET_DRAG_ELEMENT,
        element
    }
}

export async function persistWeek(week_id, week) {
    let token = await auth0_client.getToken()
    return fetch(`${API_URI}/weeks/${week_id}/days`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            week: week
        })
    })

}

function updateWorkout(week_id, day, workout) {
    return {
        type: UPDATE_WORKOUT,
        week_id,
        day,
        workout
    }
}

export function persistWorkout(week_id, day, workout) {
    return async dispatch => {
        dispatch(updateWorkout(week_id, day, workout))
        let token = await auth0_client.getToken()
        fetch(`${API_URI}/weeks/${week_id}/days/${day}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                workout: workout
            })
        })
    }

}

export function editWeek(week_id, week) {
    return {
        type: EDIT_WEEK,
        week_id,
        week
    }
}
export function deleteProgramAndPersist(program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/programs/${program_id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let data = res.json();
            return data
        }).then(delete_response => {
            dispatch(deleteProgram(program_id))
            return delete_response
        });
    }
}

function deleteProgram(program_id) {
    return {
        type: DELETE_PROGRAM,
        program_id
    }
}
export function getProgram(program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/programs/${program_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let data = res.json();
            return data
        }).then(program => {
            dispatch(recieveProgram(program))
            return program
        });
    }
}
function recieveProgram(program) {
    return {
        type: RECIEVE_PROGRAM,
        program
    }
}

export function addProgram(program) {
    return {
        type: ADD_PROGRAM,
        program
    }
}
export function addWeekToProgram(program_id, week) {
    return {
        type: ADD_WEEK,
        program_id,
        week
    }
}

export function deleteWeekFromProgram(program_id, week_id) {
    return {
        type: DELETE_WEEK,
        program_id,
        week_id
    }
}

export function deleteWeekAndPersist(program_id, week_id) {
    return async dispatch => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/weeks/${week_id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let data = res.json();
            return data;
        }).then(week => {
            dispatch(deleteWeekFromProgram(program_id, week_id))
            return week.week_id
        })
    }
}

export function addWeekAndPersist(program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/weeks`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                program_id: program_id
            })
        }).then(res => {
            let data = res.json();
            return data;
        }).then(week => {
            dispatch(addWeekToProgram(program_id, week.week))
            return week.week
        })
    }
}
export function addProgramAndPersist(name, length) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/programs`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                length: length
            })
        }).then(res => {
            let data = res.json()
            return data;
        }).then(program => {
            dispatch(addProgram(program))
            return program
        }, err => {
            console.error(err);
        })
    }
}
export function recievePrograms(programs) {
    return {
        type: RECIEVE_PROGRAMS,
        programs: programs
    }
}
export function getAllPrograms() {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`${API_URI}/programs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let programs = res.json();
            return programs
        }).then(programs => {
            dispatch(recievePrograms(programs))

        })
    }

}
