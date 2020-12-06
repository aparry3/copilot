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

function _getUrl() {
    return `${API_URI}/images`
}

function readDataToUri(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            resolve([image[0], reader.result])
        }
        reader.readAsDataURL(image[1])
    })
}

export function addImages(images) {
    return async dispatch => {
        let data_uris = await Promise.all([...images].map(readDataToUri))
        dispatch(_addImages(data_uris))
    }
}

function _addImages(images) {
    return {
        type: actions.ADD_IMAGES,
        images
    }
}

export function removeImage(index) {
    console.log(index)
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

function previewImage(img) {
}


const images = {
    save: (imgs) => dispatched(_recieveImageUrls, makeRequest(_getUrl(), 'POST', imgs)),
}

export const saveImages  = images.save
