import React from 'react'
import {connect} from 'react-redux'

import {addDay} from '../../../../actions/days'
import {saveWeek} from '../../../../actions/weeks'

import {Week} from './week'

const WeekContainer = connect(null,
    dispatch => ({
        addDay: (week, name) => dispatch(addDay(week._id, name)),
        saveWeek: (week) => dispatch(saveWeek(week))
    })
)(Week)

export default WeekContainer
