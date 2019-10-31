import {auth0_client} from '../auth'

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

export function combineExercises(item, drop_location) {
    console.log(item)

}

export function copyWorkoutElement(workout_element) {
    return {
        type: COPY_WORKOUT_ELEMENT,
        workout_element
    }

}
export function moveWorkoutElement(old_week, old_day, old_index, new_week, new_day, new_index) {
    console.log("moveWorkoutElement")
    return {
        type: REARRANGE_EXERCISE,
        old_week, old_day, old_index, new_week, new_day, new_index
    }
}

export async function fetchWeek(week_id) {
    let token = await auth0_client.getToken()
    return fetch(`http://localhost:3000/weeks/${week_id}`, {
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
    return fetch(`http://localhost:3000/weeks/${week_id}/days`, {
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

export async function persistWorkout(week_id, day, workout) {
    let token = await auth0_client.getToken()
    return fetch(`http://localhost:3000/weeks/${week_id}/days/${day}`, {
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

export function editWeek(week_id, week) {
    return {
        type: EDIT_WEEK,
        week_id,
        week
    }
}

export function getProgram(program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${program_id}`, {
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
    console.log(program)
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
        return fetch(`http://localhost:3000/weeks/${week_id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res)
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
        return fetch(`http://localhost:3000/weeks`, {
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
            console.log(res)
            let data = res.json();
            return data;
        }).then(week => {
            dispatch(addWeekToProgram(program_id, week.week))
            return week.week
        })
    }
}
export function addProgramAndPersist(name, client) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                client: client
            })
        }).then(res => {
            let data = res.json()
            return data;
        }).then(program => {
            dispatch(addProgram(program))
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
        return fetch(`http://localhost:3000/programs`, {
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
