import {actions as exercise_actions} from '../actions/exercises'

import {copyState} from './utils'

const initialState = {
    items: [],
    filter: '',
    statuses: [],
    show_exercise_form: false,
    current_exercise: null,
    previous_page: 'exercises',
    options: {}
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
    let new_state = copyState(state)
    switch (action.type) {
        case exercise_actions.CLOSE_EXERCISE_FORM: {
            return {
                ...new_state,
                current_exercise: null,
                show_exercise_form: false,
                options: {}
            }
        }
        case exercise_actions.OPEN_EXERCISE_FORM: {
            console.log(action.exercise)
            return {
                ...new_state,
                show_exercise_form: action.show_exercise_form,
                current_exercise: action.exercise,
                options: action.options
            }
        }
        case exercise_actions.SET_FILTER:
            return {
                ...new_state,
                filter: action.filter
            }
        case exercise_actions.RECIEVE_EXERCISES: {
            return {
                ...new_state,
                items: action.exercises
            }
        }
        case exercise_actions.SAVE_EXERCISE:
            let items = saveExercise([...state.items], action.exercise, action.is_new);
            return {
                ...new_state,
                items: items,
                current_exercise: null,
                options: {},
                show_exercise_form: false
            }
        default:
            return new_state;

    }
}
export default exercises;
