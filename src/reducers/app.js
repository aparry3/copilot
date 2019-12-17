import {
    SET_ACTIVE_PAGE,
} from '../actions'

const initialState = {
    active_page: null,
    page_state: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE: {
            console.log(action.page)
            return {
                ...state,
                active_page: action.page,
                page_state: action.page_state
            }
        }
        default:
            return state;
    }
}
export default app;
