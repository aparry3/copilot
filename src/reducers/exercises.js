import {ADD_NEW_EXERCISE, SAVE_EXERCISE, RECIEVE_EXERCISES, REQUEST_EXERCISES, SET_FILTER, PUSH_EXERCISE_STATUS} from '../actions'

const initialState = {
    items: [],
    filter: '',
    statuses: [],
    is_adding: false
}

function saveExercise(items, exercise, is_new) {
    if (is_new) {
        return [...items, exercise]
    }
    return items.map(item => {
         if (exercise._id == item._id ) {
             return exercise;
         }
         return item;
    })
}
function buildStatus({type, success, name, action}) {
    return {
        success, name, action
    }
}
const exercises = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_EXERCISE: {
            return {
                ...state,
                is_adding: action.is_adding
            }
        }
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
            let items = saveExercise([...state.items], action.exercise, action.is_new);
            return {
                ...state,
                items: items
            }
        case PUSH_EXERCISE_STATUS: {
            return {
                ...state,
                statuses: [...state.statuses, buildStatus(action)]
            }
        }
        default:
            return state;

    }
}
export default exercises;
