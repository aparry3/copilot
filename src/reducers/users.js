import {copyState} from './utils'

import {actions as auth_actions} from '../actions/auth'
import {actions as workout_element_actions} from '../actions/workout_elements'


const initial_state = {user: null, loading: true}

const users = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case auth_actions.RECIEVE_USER: {
            return {
                ...new_state,
                loading: false,
                user: action.user
            }
        }
        default:
            return state
    }
}
export default users
