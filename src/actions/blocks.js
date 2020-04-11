import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

function _getUrl(week_id, day_index, block_index = null) {
    return block_index == null ? (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks`) : (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks/${block_index}`)
}

const day = {
    add: (week_id, day) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day), 'POST', {})),
    delete: (week_id, day, block) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day, block), 'DELETE'))
}

export const addBlock = day.add
export const deleteBlock = day.delete
