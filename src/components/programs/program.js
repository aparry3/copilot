import {
    Divider,
    Grid
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
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
    },
    weekHeader: {
        width: '100%',
        height: '50px',
        padding: '0 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteWeek: {
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        color: theme.text.secondary,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: theme.text.accents.error,
            background: theme.accents.error
        }
    },
    deleteIcon: {
        height: '25px'
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
    async function handleDeleteWeek(index) {
        setProgram(update(program, {
            weeks: {
                $splice: [[index, 1]]
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
                            <div className={classes.weekHeader}>
                                <span className={classes.weekNumber}>week {index + 1}</span>
                                <div className={classes.deleteWeek} onClick={() => handleDeleteWeek(index)}>
                                    <ClearIcon className={classes.deleteIcon} />
                                </div>
                            </div>
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
                getProgram: (program_id) => dispatch(getProgram(program_id))

            }
        }
)(styled(ProgramView))
