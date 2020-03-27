import React from 'react'
import {connect} from 'react-redux'

import {saveDay} from '../../../../../actions/days'

import {Day} from './day'


const DayContainer = connect(
    null,
    (dispatch, own_props) => ({
        saveDay: !!own_props.addDay ? own_props.addDay : (day) => dispatch(saveDay(day, own_props.week_id))
    })
)(Day)

export default DayContainer
