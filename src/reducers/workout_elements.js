import {copyState} from './utils'

import {actions as week_actions} from '../actions/weeks'
import {actions as workout_element_actions} from '../actions/workout_elements'


export const WORKOUT_ELEMENT_TYPES = {
    EXERCISE: {
        template: {
            type: 'EXERCISE',
            exercise: {
                id: null,
                name: null
            },
            details: {},
            placeholder: true
        },
        name: 'Exercise',
    },
    SUPERSET: {
        template: {
            type: 'SUPERSET',
            exercises: [
                {
                    exercise: {
                        id: null,
                        name: null
                    },
                    details: {}
                },
                {
                    exercise: {
                        id: null,
                        name: null
                    },
                    details: {}
                }
            ],
            details: {},
            placeholder: true
        },
        name: 'Superset',
    }

}

const initial_state = {types: WORKOUT_ELEMENT_TYPES, type: null}

const workout_elements = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case workout_element_actions.SET_CURRENT_WORKOUT_ELEMENT: {
            new_state = {
                ...new_state,
                type: action.workout_element_type
            }
            return new_state
        }
        case workout_element_actions.CANCEL_EDIT_WORKOUT_ELEMENT: {
            new_state = {...new_state, type: null }
            return new_state
        }
        case week_actions.UPDATE_WEEK: {
            new_state = {...new_state, type: null}
            return new_state
        }
        default:
            return state
    }
}
export default workout_elements
