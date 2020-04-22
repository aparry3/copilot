import {authenticated} from './auth'

export function dispatched(action, res) {
    return async dispatch => {
        let data = await res
        dispatch(action(data))
        return data
    }

}

function _makeRequest(token, url, method, data = null) {
    let request = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    if (!!data) {
        request.body = JSON.stringify(data)
    }
    return fetch(url, request).then(res => {
        let data = res.json()
        return data
    })
}


export const makeRequest = authenticated(_makeRequest)
