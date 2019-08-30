import {SIGN_IN, SIGN_OUT} from '../actions'

initialState: {
    name: null,
    id: null,
    username: null,
    role: null
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN: {
            return {
                ...action.user_data
            }
        }
        default:
            return state;
    }
}
export default exercises;
