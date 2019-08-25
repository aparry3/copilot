export const ADD_EXERCISE = 'ADD_EXERCISE';
export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
export const RECIEVE_EXERCISES = 'RECIEVE_EXERCISES';
export const SELECT_EXERCISE = 'SELECT_EXERCISE';
export const SET_FILTER = 'SET_FILTER';

export function addExercise(exercise) {
    return {
        type: ADD_EXERCISE,
        exercise: exercise
    }
}

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        filter: filter
    }
}
export function requestExercises(query) {
    return {
        type: REQUEST_EXERCISES,
        query: query
    }
}
export function recieveExercises(exercises) {
    return {
        type: RECIEVE_EXERCISES,
        exercises: exercises
    }
}

function fetchAllExercises(query=null) {
    return fetch(`http://localhost:3000/exercises${query ? `?search_text=${query}` : ''}`)
        .then(
            response => response.json(),
            error => console.log('An error occured', error)
        )
}


export function fetchExerises(query=null) {
    return (dispatch) => {
        dispatch(requestExercises())
        return fetchAllExercises(query).then(json => {
            console.log(json)
            dispatch(recieveExercises(json))
        })
    }
}
