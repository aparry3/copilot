import {SAVE_EXERCISE, RECIEVE_EXERCISES, REQUEST_EXERCISES, SET_FILTER, PUSH_EXERCISE_STATUS} from '../actions'

const initialState = {
    items: [],
    filter: '',
    statuses: []
}

function saveExercise(items, exercise, is_new) {
    if (is_new) {
        return [...items, exercise]
    }
    return items.map(item => {
         if (exercise._id == item._id ) {
             console.log(`new ex ${exercise.name}`);
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
