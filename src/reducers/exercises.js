import {ADD_EXERCISE, RECIEVE_EXERCISES, REQUEST_EXERCISES, SET_FILTER} from '../actions'

const initialState = {
    items: [],
    filter: ''
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
        default:
            return state;

    }
}
export default exercises;
