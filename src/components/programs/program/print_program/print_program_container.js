import {connect} from 'react-redux'

import {PrintProgram} from './print_program'

const PrintProgramContainer = connect(
    (state) => {
        return {
            program: state.active_program
        }
    },
)(PrintProgram)

export default PrintProgramContainer
