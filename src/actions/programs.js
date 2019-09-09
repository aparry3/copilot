import {auth0_client} from '../auth'

export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REARRANGE_WORKOUT = 'REARRANGE_WORKOUT';
export const REARRANGE_EXERCISE = 'REARRANGE_EXERCISE';
export const ADD_WEEK = 'ADD_WEEK';
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const RECIEVE_PROGRAMS = 'RECIEVE_PROGRAMS';

export function addExerciseToDay(client, program_id, week_index, day_index, exercise) {
    console.log(exercise)
    return {
        type: EDIT_WORKOUT,
        client,
        program_id,
        variation: 'add',
        exercise,
        week: week_index,
        day: day_index
    }
}

export function addExerciseAndPersist(client, program_id, week_index, day_index, exercise) {
    return (dispatch) => {
        dispatch(addExerciseToDay(client, program_id, week_index, day_index, exercise))
        return fetch(`http://localhost:3000/programs/${program_id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author_id: '1',
                week: week_index,
                day: day_index,
                exercise: exercise
            })
        })
    }
}
export function addProgram(program) {
    return {
        type: ADD_PROGRAM,
        program
    }
}
export function addWeekToProgram(client, program_id) {
    return {
        type: ADD_WEEK,
        program_id
    }
}
export function addWeekAndPersist(client, program_id) {
    return (dispatch) => {
        dispatch(addWeekToProgram(client, program_id))
        return fetch(`http://localhost:3000/programs/${program_id}/week`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author_id: '1'
            })
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
            console.log()
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
            console.log(programs)
            dispatch(recievePrograms(programs))

        })
    }

}
