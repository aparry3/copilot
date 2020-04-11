import {copyState} from './utils'

import {actions as confirm_actions} from '../actions/confirm'

const initial_state = {
    open: false,
    action: null,
    details: null
}

const confirm = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch(action.type) {
        case confirm_actions.OPEN_CONFIRM: {
            return {
                open: true,
                action: action.action,
                details: action.details
            }
        }
        case confirm_actions.CLOSE_CONFIRM: {
            return {
                open: false,
                action: null,
                details: null
            }
        }
        default:
            return new_state
    }
}
export default confirm
