import {copyState} from './utils'

import {actions as image_actions} from '../actions/images'


const initial_state = {images: []}

const images = (state = initial_state, action) => {
    switch (action.type) {
        case image_actions.ADD_IMAGES: {
            console.log(state.images)
            let images = state.images.concat([...action.images])
            console.log(images)
            return {
                ...state,
                images
            }
        }
        default:
            return state
    }
}
export default images
