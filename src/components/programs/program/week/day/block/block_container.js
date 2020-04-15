import {connect} from 'react-redux'
import React from 'react'

import {deleteBlock} from '../../../../../../actions/blocks'
import {openConfirm} from '../../../../../../actions/confirm'

import {Block} from './block'

const BlockContainer = connect(
    state => ({
        edit_workout_element: !!state.active_program.location
    }),
    (dispatch, own_props) => ({
        deleteBlock: () => dispatch(openConfirm(
            {action: 'delete', element: 'block'},
            () => deleteBlock(own_props.week_id, own_props.day_index, own_props.index)
        ))
    })
)(Block)

export default React.forwardRef((props, ref) => <BlockContainer {...props} forwardRef={ref} />)
