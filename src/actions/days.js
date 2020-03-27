import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

function _getUrl(week_id) {
    return `${API_URI}/weeks/${week_id}/days`
}

const day = {
    add: (week, day) => dispatched(updateWeek, makeRequest(_getUrl(week._id), 'POST', day)),
    save: (week, day) => dispatched(updateWeek, makeRequest_getUrl(week._id, day.index), 'PUT', day)
}

export const addDay = day.add
