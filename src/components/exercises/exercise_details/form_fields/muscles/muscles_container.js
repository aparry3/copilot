import {connect} from 'react-redux'

import {Muscles} from './muscles'

const MusclesContainer = connect(
    state => ({
        muscles_map: state.constants.muscles
    }),
    null
)(Muscles)

export default MusclesContainer
