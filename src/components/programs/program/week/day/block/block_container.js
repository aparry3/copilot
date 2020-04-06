import {connect} from 'react-redux'

import {Block} from './block'

const BlockContainer = connect(
    state => ({
        edit_workout_element: !!state.workout_element.location
    })
)(Block)

export default BlockContainer
