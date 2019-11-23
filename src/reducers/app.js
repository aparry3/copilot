import {
    SET_ACTIVE_PAGE,
} from '../actions'

const initialState = {
    active_page: null
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE: {
            console.log(action.page)
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
