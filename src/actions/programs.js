export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REARRANGE_WORKOUT = 'REARRANGE_WORKOUT';
export const REARRANGE_EXERCISE = 'REARRANGE_EXERCISE';
export const ADD_WEEK = 'ADD_WEEK';
export const ADD_PROGRAM = 'ADD_PROGRAM';
export const RECIEVE_PROGRAMS = 'RECIEVE_PROGRAMS';
export function addExerciseToDay(client, week_index, day_index, exercise) {
    console.log(exercise)
    return {
        type: EDIT_WORKOUT,
        client,
        variation: 'add',
        exercise,
        week: week_index,
        day: day_index
    }
}

export function addExerciseAndPersist(client, week_index, day_index, exercise) {
    return (dispatch) => {
        dispatch(addExerciseToDay(client, week_index, day_index, exercise))
        return fetch(`http://localhost:3000/programs/${client.id}`, {
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
export function addProgramToClient(client, program) {
    return {
        type: ADD_PROGRAM,
        client,
        program
    }
}
export function addWeekToProgram(client) {
    return {
        type: ADD_WEEK,
        client
    }
}
export function addWeekAndPersist(client) {
    return (dispatch) => {
        dispatch(addWeekToProgram(client))
        return fetch(`http://localhost:3000/programs/${client.id}/week`, {
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
export function addProgramAndPersist(client) {
    return (dispatch) => {
        return fetch(`http://localhost:3000/programs/${client.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author_id: '1'
            })
        }).then(res => {
            let program = res.json();
            dispatch(addProgramToClient(client, program))
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
    return (dispatch) => {
        return fetch(`http://localhost:3000/programs`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                author_id: '1'
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
