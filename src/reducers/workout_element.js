import {copyState} from './utils'
import {actions as workout_element_actions} from '../actions/workout_elements'

const WORKOUT_ELEMENT_TYPES = {
    exercise: {
        template: {
            exercise_id: null,
            details: {}
        },
        name: 'Exercise',
    },
    superset: {
        template: {
            exercise_id: null,
            details: {}
        },
        name: 'Superset',
    }

}

const initial_state = {types: WORKOUT_ELEMENT_TYPES, current_workout_element: null}

const workout_element = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case workout_element_actions.ADD_WORKOUT_ELEMENT: {
            new_state.current_workout_element = state.types[action.workout_element_type].template
            return new_state
        }
        case workout_element_actions.EDIT_WORKOUT_ELEMENT: {
            new_state.current_workout_element = action.workout_element
            return new_state
        }
        default:
            return new_state
    }
}
export default workout_element
