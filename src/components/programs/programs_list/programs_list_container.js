import React from 'react'
import {connect} from 'react-redux'
import {addProgram, deleteProgram, setActiveProgram} from '../../../actions/programs'

import {ProgramsList} from './programs_list'

const ProgramsListContainer = connect(
    (state, ownProps) => {
        console.log(state)
        return {
            programs: state.programs.all_programs,
            clients: state.auth.user.clients,
            user: state.auth.user
        }
    },
    dispatch => {
        return {
            addProgram: (name, length) => dispatch(addProgram(name, length)),
            deleteProgram: (program_id) => dispatch(deleteProgram(program_id)),
            setActiveProgram: (program_id) => dispatch(setActiveProgram(program_id))
        }
    }
)(ProgramsList)

export default ProgramsListContainer
