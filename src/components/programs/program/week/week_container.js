import React from 'react'
import {connect} from 'react-redux'

import {addDay} from '../../../../actions/days'

import {Week} from './week'

const WeekContainer = connect(null,
    dispatch => ({
        addDay: (week, name) => dispatch(addDay(week._id, name))
    })
)(Week)

export default WeekContainer
