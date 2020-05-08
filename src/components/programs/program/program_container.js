import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import {addWeek, deleteWeek, setCurrentWeek} from '../../../actions/weeks'
import {exportProgram, getProgram, saveProgram} from '../../../actions/programs'
import {pages} from '../../../constants/programs'

import {Loading} from '../../utils'
import {Program} from './program'
import PrintProgram from './print_program'


const ProgramContainer = connect(
        (state, ownProps) => {
            function _getWeek(index) {
                return index != null ? {
                    ...state.active_program.weeks[index],
                    index
                } : null
            }
            return {
                program: state.active_program,
                user: state.users.user,
                current_week: _getWeek(state.active_program.current_week)
            }
        },
        (dispatch) => {
            return {
                exportProgram: (program_id) => dispatch(exportProgram(program_id)),
                getProgram: (program_id) => dispatch(getProgram(program_id)),
                saveProgram: (program) => dispatch(saveProgram(program)),
                setCurrentWeek: i => dispatch(setCurrentWeek(i))
            }
        }
)((props) => {
    let {...pass_through_props} = props
    let [page, setPage] = useState(pages.OVERVIEW)
    let [program, setProgram] = useState(props.program)

    useEffect(() => {
        if (!props.program._id) {
            props.getProgram(props.match.params.program_id)
        } else {
            setProgram(props.program)
        }
    }, [props.program, page])

    return (
        <>
            {!!props.program._id ? (
                <Switch>
                    <Route path={`${props.match.path}/print`} component={PrintProgram}/>
                    <Route component={() => <Program page={page} current_week={props.current_week} setPage={setPage} program={program} {...pass_through_props} />}/>
                </Switch>
            ) : <Loading />}
        </>
    )
})

export default ProgramContainer
