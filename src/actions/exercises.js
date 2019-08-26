export const SAVE_EXERCISE = 'SAVE_EXERCISE';
export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
export const RECIEVE_EXERCISES = 'RECIEVE_EXERCISES';
export const SELECT_EXERCISE = 'SELECT_EXERCISE';
export const SET_FILTER = 'SET_FILTER';

export function addExercise(exercise) {
    console.log(`New EX: ${JSON.stringify(exercise)}`)
    return (dispatch) => {
        return fetch(`http://localhost:3000/exercises`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
        }).then(res => {
            if (res.status > 300) {
                alert(`ERROR: ${res.status}: ${res.statusText}`);
                return;
            }

            alert(`Successfully created exercise: ${exercise.name}`);
            return res.json()
        }, err => {throw err})
        .then(json => {
            alert(`Successfully update exercise: ${json.name}`);
            dispatch(saveExercise(json, true))
        });;
    }
}
export function editExercise(exercise) {
    return (dispatch) => {
        return fetch(`http://localhost:3000/exercises/${exercise._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(exercise)
        }).then(res => {
            if (res.status > 300) {
                alert(`ERROR: ${res.status}: ${res.statusText}`);
                return;
            }
            return res.json();
        }, err => {
            console.log(err);
            throw err ;
        }).then(json => {
            alert(`Successfully update exercise: ${json.name}`);
            dispatch(saveExercise(json))
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
