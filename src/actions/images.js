import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

export const actions = {
    ADD_IMAGES: 'ADD_IMAGES',
    RECIEVE_IMAGE_URLS: 'RECIEVE_IMAGE_URLS',
    REMOVE_IMAGE: 'REMOVE_IMAGE',
}

function HttpExceptioon(status, body) {
    this.status = status;
    this.body = body;
}

function _getUrl(exercise_id) {
    return `${API_URI}/exercises/${exercise_id}/images`
}

export function addImages(images) {
    return {
        type: actions.ADD_IMAGES,
        images
    }
}

export function removeImage(index) {
    return {
        type: actions.REMOVE_IMAGE,
        index
    }
}

export function _recieveImageUrls(res) {
    return {
        type: actions.RECIEVE_IMAGE_URLS,
        images: res.images
    }
}

const exercises = {
    save: (exercise, images) => dispatched(_recieveExercises, makeRequest(_getUrl(exercise._id), 'POST', images)),
}
