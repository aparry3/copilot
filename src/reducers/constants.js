import {copyState} from './utils'

import {actions as enum_actions} from '../actions/enums'

const initial_state = {
    muscles: [],
    muscle_groups: [],
    movements: [],
    categories: [],
}

const constants = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch(action.type) {
        case enum_actions.RECIEVE_MOVEMENTS: {
            return {
                ...new_state,
                movements: action.movements.sort((a,b) => a.id > b.id ? 1 : -1)
            }
        }
        case enum_actions.RECIEVE_CATEGORIES: {
            return {
                ...new_state,
                categories: action.categories.sort((a,b) => a.id > b.id ? 1 : -1)
            }
        }
        case enum_actions.RECIEVE_MUSCLES: {
            return {
                ...new_state,
                muscles: action.muscles
            }
        }
        case enum_actions.RECIEVE_MUSCLE_GROUPS: {
            return {
                ...new_state,
                muscle_groups: action.muscle_groups.sort((a,b) => a.id > b.id ? 1 : -1)
            }
        }
        default:
            return new_state
    }
}
export default constants
