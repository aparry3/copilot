import {copyState} from './utils'

import {
    actions as app_actions,
} from '../actions/app'

const initialState = {
    active_page: null,
    page_state: null
}

const app = (state = initialState, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case app_actions.SET_ACTIVE_PAGE: {
            return {
                ...new_state,
                active_page: action.page,
                page_state: action.page_state
            }
        }
        default:
            return new_state;
    }
}
export default app;
