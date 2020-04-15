import React from 'react'
import {connect} from 'react-redux'

import {deleteDay, saveDay} from '../../../../../actions/days'
import {openConfirm} from '../../../../../actions/confirm'

import {Day} from './day'


const DayContainer = connect(
    null,
    (dispatch, own_props) => {
        return {
            deleteDay: () => dispatch(openConfirm(
                {action: 'delete', element: 'day'},
                () => deleteDay(own_props.week_id, own_props.index)
            )),
            saveDay: !!own_props.saveDay ? own_props.saveDay : (day) => dispatch(saveDay(own_props.week_id, own_props.index, day))
        }
    }
)(Day)

export default React.forwardRef((props, ref) => {
    return <DayContainer {...props} forwardRef={ref} />
})
