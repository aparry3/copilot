import {API_URI} from '../config'
import {authenticated} from './auth'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

function _getUrl(week_id, day_index, block_index = null) {
    console.log(week_id)
    return block_index == null ? (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks`) : (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks/${block_index}`)
}

const blocks = {
    add: (week_id, day) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day), 'POST', {})),
    delete: (week_id, day, index) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day, index), 'DELETE')),
    save: (week_id, day, index, block) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day, index), 'PUT', block)),
}

export const addBlock = blocks.add
export const deleteBlock = blocks.delete
export const saveBlock = blocks.save
