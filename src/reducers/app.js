import {
    SELECT_PAGE,
} from '../actions'

const initialState = {
    active_page: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PAGE: {
            return {
                ...state,
                active_page: action.page
            }
        }
        default:
            return state;
    }
}
export default app;
