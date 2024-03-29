import {connect} from 'react-redux'

import {logout} from '../../../actions/auth'
import {setActivePage} from '../../../actions/app'
import {closeExerciseDetails} from '../../../actions/exercises'

import {Sidebar} from './sidebar'


const SidebarContainer = connect(
    (state, own_props) => ({
        active_page: state.app.active_page
    }),
    dispatch => ({
        logout: logout,
        setActivePage: (page) => dispatch(setActivePage(page)),
        hideExerciseForm: () => dispatch(closeExerciseDetails())
    })
)(Sidebar)

export default SidebarContainer
