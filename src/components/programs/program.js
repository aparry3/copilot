import {
    Divider,
    Grid
} from '@material-ui/core'
import { connect } from 'react-redux';
import { DndProvider, } from 'react-dnd';
import {fade, withStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import React, {useEffect, useState} from "react";
import update from 'immutability-helper';

import {addWeekAndPersist, getProgram} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {Week} from './week'

const styled = withStyles(theme => ({
    programContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-even',
        overflow: 'hidden',
    },
    programPage: {
        background: '#f6f8f9',
    },
    weekContainer: {
        width: '100%'
    }

}));


function ProgramView(props) {
    let [program, setProgram] = useState(props.program)
    useEffect(() => {
        setProgram(props.program)
    })

    async function handleAddWeek() {
        let week = await props.addWeek(props.program._id)

        setProgram(update(program, {
            weeks: {
                $splice: [[program.weeks.length, 0, week._id]]
            }
        }))
    }

    let classes = props.classes;

    return (
        <Grid container>
            <DndProvider backend={HTML5Backend} >
                {program.weeks.map((week_id, index) => {
                    return (
                        <div className={classes.weekContainer} key={`${week_id}`}>
                            <Week week_id={week_id} index={index} />
                            <Divider variant="middle"/>
                        </div>
                    )
                })}
                <button className='btn btn-success' onClick={handleAddWeek}>Add Week</button>
            </DndProvider>
        </Grid>

    );

}



export const Program = connect(
        (state, ownProps) => {
            function findProgram(programs, id) {

                for (var prog of programs) {
                    if (prog._id == id) {
                        return prog
                    }
                }
                return null
            }
            return {
                program: findProgram(state.programs.all_programs, ownProps.match.params.program_id),
                user: state.auth.user
            }
        },
        (dispatch) => {
            return {
                addWeek: (program_id) => dispatch(addWeekAndPersist(program_id)),
                getProgram: (program_id) => dispatch(getProgram(program_id)),

            }
        }
)(styled(ProgramView))
