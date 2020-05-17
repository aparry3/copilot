import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

export const actions = {
    CLOSE_EXERCISE_FORM: 'CLOSE_EXERCISE_FORM',
    DELETE_EXERCISE: 'DELETE_EXERCISE',
    OPEN_EXERCISE_FORM: 'OPEN_EXERCISE_FORM',
    REQUEST_EXERCISES: 'REQUEST_EXERCISES',
    RECIEVE_EXERCISES: 'RECIEVE_EXERCISES',
    SAVE_EXERCISE: 'SAVE_EXERCISE',
    SELECT_EXERCISE: 'SELECT_EXERCISE',
    SET_FILTER: 'SET_FILTER',
}

function HttpExceptioon(status, body) {
    this.status = status;
    this.body = body;
}

function _getUrl(exercise_id = null) {
    return `${API_URI}/exercises${!!exercise_id ? `/${exercise_id}`: ``}`
}

export function closeExerciseDetails() {
    return {
        type: actions.CLOSE_EXERCISE_FORM
    }
}

export function _deleteExercise(res) {
    return {
        type: actions.DELETE_EXERCISE,
        exercise: res.exercise
    }
}


export function openExerciseDetails(exercise=null, options = {}, current_state = null) {
    return {
        type: actions.OPEN_EXERCISE_FORM,
        show_exercise_form: true,
        exercise,
        options,
        current_state
    }
}

export function _recieveExercises(res) {
    return {
        type: actions.RECIEVE_EXERCISES,
        exercises: res.exercises
    }
}

function _saveExercise(res) {
    return {
        type: actions.SAVE_EXERCISE,
        exercise: res.exercise
    }
}

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        filter: filter
    }
}


const exercises = {
    add: (exercise) => dispatched(_saveExercise, makeRequest(_getUrl(), 'POST', exercise)),
    delete: (exercise_id) => dispatched(_deleteExercise, makeRequest(_getUrl(exercise_id), 'DELETE')),
    query: () => dispatched(_recieveExercises, makeRequest(_getUrl(), 'GET')),
    save: (exercise, callback = null) => dispatched(_saveExercise, makeRequest(_getUrl(exercise._id), 'PUT', exercise))
}

export const addExercise = exercises.add
export const deleteExercise = exercises.delete
export const getExercises = exercises.query
export const saveExercise = exercises.save


export function requestExercises(query) {
    return {
        type: REQUEST_EXERCISES,
        query: query
    }
}
