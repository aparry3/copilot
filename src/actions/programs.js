import {auth0_client} from '../auth'

export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REARRANGE_WORKOUT = 'REARRANGE_WORKOUT';
export const REARRANGE_EXERCISE = 'REARRANGE_EXERCISE';
export const ADD_WEEK = 'ADD_WEEK';
export const EDIT_WEEK = 'EDIT_WEEK';
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const RECIEVE_PROGRAMS = 'RECIEVE_PROGRAMS';
export const RECIEVE_PROGRAM = 'RECIEVE_PROGRAM';

export function combineExercises(item, drop_location) {
    console.log(item)

}
export function moveWorkoutElement(old_location, new_location, exercise) {
    console.log("moveWorkoutElement")
    return {
        type: REARRANGE_EXERCISE,
        old_location,
        new_location
    }
}

export function editWeekAndPersist(user_id, program_id, week_id, week) {
    return async dispatch => {
        dispatch(editWeek(week_id, week))
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${user_id}/${program_id}/week`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                week_id: week_id,
                week: week
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

export function getProgram(user_id, program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${user_id}/${program_id}`, {
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
export function addWeekAndPersist(user_id, program_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${user_id}/${program_id}/week`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            let data = res.json();
            return data;
        }).then(week => {
            dispatch(addWeekToProgram(program_id, week.week))
        })
    }
}
export function addProgramAndPersist(user_id, name, client) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${user_id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                author_id: user_id,
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
export function getAllPrograms(user_id) {
    return async (dispatch) => {
        let token = await auth0_client.getToken()
        return fetch(`http://localhost:3000/programs/${user_id}`, {
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
