import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

function _getUrl(week_id) {
    return `${API_URI}/weeks/${week_id}/days`
}

const day = {
    add: (week, name) => dispatched(updateWeek, makeRequest(_getUrl(week._id), 'POST', {name})),
}

export const addDay = day.add
