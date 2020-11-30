import { connect } from 'react-redux';

import {MuscleGroups} from './muscle_groups'


const MuscleGroupsContainer = connect(
    (state) => {
        return {
            muscle_groups_map: state.constants.muscle_groups
        }
    },
    null
)(MuscleGroups)

export default MuscleGroupsContainer
