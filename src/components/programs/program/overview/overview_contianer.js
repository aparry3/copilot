import React from 'react'
import {connect} from 'react-redux'

import {addWeek, deleteWeek, toggleCollapseWeek} from '../../../../actions/weeks'
import {openConfirm} from '../../../../actions/confirm'

import {Overview} from './overview'


const OverviewContainer = connect(
    null,
    (dispatch, own_props) => ({
        addWeek: () => dispatch(addWeek(own_props.program._id)),
        deleteWeek: (week_id) => dispatch(openConfirm(
            {action: 'delete', element: 'week'},
            () => deleteWeek(week_id)
        )),
        toggleCollapseWeek: (week_id) => dispatch(toggleCollapseWeek(week_id))
    })
)(Overview)

export default OverviewContainer
