import {
    Divider,
    Grid
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { DndProvider, } from 'react-dnd';
import {fade, withStyles} from '@material-ui/core/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import React, {useEffect, useState} from "react";
import update from 'immutability-helper';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {addWeekAndPersist, deleteWeekAndPersist, getProgram} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {Week} from './week'
import {ProgramHeader} from './utils'

const styled = withStyles(theme => ({
    programPage: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    back: {
        color: theme.text.secondary,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    program: {
        flexGrow: 1,
        overflow: 'auto'
    },
    weekContainer: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column'
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
    },
    addWeekSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    addWeek: {
        borderRadius: '25px',
        height: '50px',
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        background: theme.palette.background.mediumDark,
        opacity: 0.1,
        '&:hover': {
            opacity: .5
        }
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
        let week = await props.deleteWeek(props.program._id, program.weeks[index])

        setProgram(update(program, {
            weeks: {
                $splice: [[index, 1]]
            }
        }))

    }

    let classes = props.classes;
    return (
        <div className={classes.programPage}>
            <ProgramHeader>
                <div onClick={() => props.history.goBack()} className={classes.back}><KeyboardBackspaceIcon /><span>Back</span></div>
                <span>{program.name}</span>
            </ProgramHeader>
            <DndProvider backend={HTML5Backend} >
            <div className={classes.program}>
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
                <div className={classes.addWeekSection}>
                    <div className={classes.addWeek} onClick={handleAddWeek}><span className={classes.addWeekText}><AddIcon /> Add Week</span></div>
                </div>
            </div>
            </DndProvider>
        </div>

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
                deleteWeek: (program_id, week_id) => dispatch(deleteWeekAndPersist(program_id, week_id))

            }
        }
)(styled(ProgramView))
