import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

function _getUrl(week_id, day_index = null) {
    return day_index == null ? `${API_URI}/weeks/${week_id}/days` : `${API_URI}/weeks/${week_id}/days/${day_index}`
}

const day = {
    add: (week_id, day) => dispatched(updateWeek, makeRequest(_getUrl(week_id), 'POST', day)),
    delete: (week_id, day_index) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day_index), 'DELETE')),
    save: (week_id, day_index, day) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day_index), 'PUT', day))
}

export const addDay = day.add
export const deleteDay = day.delete
export const saveDay = day.save
