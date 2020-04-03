import React from 'react'
import {connect} from 'react-redux'

import {saveDay} from '../../../../../actions/days'

import {Day} from './day'


const DayContainer = connect(
    null,
    (dispatch, own_props) => {
        return {
            saveDay: !!own_props.addDay ? own_props.addDay : (day) => dispatch(saveDay(own_props.week_id, day))
        }
    }
)(Day)

export default DayContainer
