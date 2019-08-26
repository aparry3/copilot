import {SAVE_EXERCISE, RECIEVE_EXERCISES, REQUEST_EXERCISES, SET_FILTER} from '../actions'

const initialState = {
    items: [],
    filter: ''
}

function saveExercise(items, exercise, is_new) {
    if (is_new) {
        console.log(exercise)
        return [...items, exercise]
    }
    return items.map(item => {
        return exercise._id == item._id ? exercise : item;
    })
}
const exercises = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case RECIEVE_EXERCISES: {
            return {
                ...state,
                items: action.exercises
            }
        }
        case SAVE_EXERCISE:
            return {
                ...state,
                items: saveExercise(state.items, action.exercise, action.is_new)
            }
        default:
            return state;

    }
}
export default exercises;
