import update from 'immutability-helper'
import {actions as image_actions} from '../actions/images'
import {actions as exercise_actions} from '../actions/exercises'

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
        case image_actions.REMOVE_IMAGE: {
            console.log(state.images)
            let images = update(state.images, {
                $splice: [[action.index, 1]]
            })
            console.log(images)
            return {
                ...state,
                images
            }
        }
        case exercise_actions.CLOSE_EXERCISE_FORM: {
            return {
                ...state,
                images: [],
            }
        }
        default:
            return state
    }
}
export default images
