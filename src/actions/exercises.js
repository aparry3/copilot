export const SAVE_EXERCISE = 'SAVE_EXERCISE';
export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
export const RECIEVE_EXERCISES = 'RECIEVE_EXERCISES';
export const SELECT_EXERCISE = 'SELECT_EXERCISE';
export const SET_FILTER = 'SET_FILTER';
export const PUSH_EXERCISE_STATUS = 'PUSH_EXERCISE_STATUS';

function HttpExceptioon(status, body) {
    this.status = status;
    this.body = body;
}


export function persistExercise(exercise) {
    let action = exercise._id ? 'EDIT' : 'ADD';
    return (dispatch) => {
        return fetch(`http://localhost:3000/exercises${action == 'EDIT' ? `/${exercise._id}`: ``}`, {
            method: action == 'EDIT' ? 'PUT' : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
        }).then(res => {
            if (res.status > 300) {
                throw new HttpException(res.status, res.json());
            }
            return res.json();
        }).then(exercise => {
            dispatch(saveExercise(exercise, action == 'ADD'))
            dispatch(pushExerciseStatus(true, exercise.name, action));
        }).catch(err => {
            dispatch(pushExerciseStatus(false, exercise.name, action));
        });

    }
}
export function saveExercise(exercise, is_new=false) {
    return {
        type: SAVE_EXERCISE,
        exercise: exercise,
        is_new: is_new
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
export function pushExerciseStatus(success, name, action) {
    return {
        type: PUSH_EXERCISE_STATUS,
        success: success,
        name: name,
        action: action
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
            dispatch(recieveExercises(json))
        })
    }
}
